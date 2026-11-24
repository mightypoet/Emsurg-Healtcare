import { supabase } from "./supabase";

/*
Supabase SQL Schema Reference for Careers:

-- 1. job_openings table
CREATE TABLE IF NOT EXISTS job_openings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  division TEXT NOT NULL,
  employment_type TEXT DEFAULT 'Full-time',
  experience TEXT NOT NULL,
  summary TEXT,
  description_markdown TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id TEXT NOT NULL,
  job_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  current_location TEXT NOT NULL,
  experience_years TEXT NOT NULL,
  current_company TEXT,
  linkedin_url TEXT,
  cover_note TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. resumes storage bucket (public or signed URLs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;
*/

export interface JobOpening {
  id: string;
  title: string;
  location: string;
  division: string;
  employment_type: string;
  experience: string;
  summary: string;
  description_markdown: string;
  is_active: boolean;
  created_at: string;
}

export type ApplicationStatus =
  | "New"
  | "Reviewing"
  | "Shortlisted"
  | "Interviewing"
  | "Hired"
  | "Rejected";

export interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  current_location: string;
  experience_years: string;
  current_company?: string | null;
  linkedin_url?: string | null;
  cover_note?: string | null;
  resume_url: string | null;
  resume_filename?: string;
  status: ApplicationStatus;
  created_at: string;
}

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "New",
  "Reviewing",
  "Shortlisted",
  "Interviewing",
  "Hired",
  "Rejected",
];

export const DEFAULT_SEED_JOB: JobOpening = {
  id: "seed-abm-south-india",
  title: "Area Business Manager",
  location: "Bangalore / Chennai",
  division: "Orthobiologics & Advanced Wound Management",
  employment_type: "Full-time",
  experience: "3–7 Years",
  summary:
    "A market-development and business-growth role focusing on Orthobiologics and Advanced Wound Management across South India, offering significant ownership and leadership progression.",
  description_markdown: `**Company:** Emsurg Healthcare (India) Pvt. Ltd.

We are not just offering a job. We are offering an opportunity to build a career in the future of Indian MedTech.

At Emsurg Healthcare (India) Pvt. Ltd., we believe the next generation of medical technology leaders will emerge from organisations that combine indigenous innovation, clinical excellence, and entrepreneurial thinking. With a strong foundation in medical device manufacturing and a growing presence across India, Emsurg is on an ambitious journey to establish itself as a leading principal MedTech company, with aspirations to expand into global healthcare markets.

As we strengthen our presence in South India, we are looking for ambitious, self-driven professionals who want to do more than achieve sales targets — individuals who aspire to establish markets, build lasting clinical relationships, and grow into future business leaders.

### The Opportunity
We are inviting applications for the position of **Area Business Manager – Bangalore / Chennai**, primarily focusing on our **Orthobiologics and Advanced Wound Management** portfolios. This is a market-development and business-growth role, offering significant ownership, exposure to innovative medical technologies, and opportunities for long-term career progression.

### Key Responsibilities

**1. Market Development & Business Expansion**
* Establish and strengthen Emsurg’s presence across the assigned territory.
* Identify new business opportunities across hospitals, surgical centres, and healthcare institutions.
* Drive product adoption, revenue growth, and sustainable market penetration.

**2. Channel & Distribution Network Development**
* Identify, appoint, manage, and expand a strong network of channel partners and distributors.
* Strengthen existing dealer relationships while exploring new territories and accounts.
* Work closely with channel partners to improve market coverage, product availability, and business performance.

**3. Clinical & Institutional Relationship Management**
* Develop strong professional relationships with Orthopaedic Surgeons, Wound Care Specialists, Clinicians, and other healthcare professionals.
* Engage with hospital purchase departments, procurement teams, and institutional decision-makers.
* Conduct product presentations, clinical discussions, and awareness programmes.

**4. Clinical Application & KOL Engagement**
* Support selected Key Opinion Leaders (KOLs) during specific clinical cases, including product familiarisation and application support within the scope of training.
* Coordinate product demonstrations, workshops, CMEs, and surgeon engagement initiatives.
* Act as a bridge between clinicians, distributors, and Emsurg’s product and technical teams.

**5. Business Ownership & Strategic Execution**
* Take ownership of territory performance, business development initiatives, and growth objectives.
* Provide market intelligence, competitor insights, and customer feedback to support product and business strategy.
* Collaborate with leadership to develop and execute long-term regional growth plans.

### Who Are We Looking For?
* Graduates with experience in Medical Devices, Orthopaedics, Surgical Products, Advanced Wound Care, or related healthcare segments.
* Preferably 3–7 years of relevant sales or business development experience.
* Strong relationships with surgeons, hospitals, and medical device distributors will be an advantage.
* Entrepreneurial mindset with the ability to independently develop and manage a territory.
* Excellent communication, relationship management, and business negotiation skills.
* Willingness to travel extensively within the assigned territory.

*Most importantly, we value ambition, ownership, integrity, and the willingness to learn over conventional corporate hierarchies.*`,
  is_active: true,
  created_at: new Date().toISOString(),
};

const LOCAL_JOBS_KEY = "emsurg_job_openings";

function readLocalJobs(): JobOpening[] {
  try {
    const raw = localStorage.getItem(LOCAL_JOBS_KEY);
    if (!raw) return [DEFAULT_SEED_JOB];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return [DEFAULT_SEED_JOB];
  } catch {
    return [DEFAULT_SEED_JOB];
  }
}

function writeLocalJobs(jobs: JobOpening[]): void {
  try {
    localStorage.setItem(LOCAL_JOBS_KEY, JSON.stringify(jobs));
    window.dispatchEvent(new CustomEvent("emsurg-careers-updated", { detail: jobs }));
  } catch (err) {
    console.warn("Could not persist local jobs:", err);
  }
}

function normalizeJobRow(row: any): JobOpening {
  return {
    id: String(row.id),
    title: row.title || "",
    location: row.location || "",
    division: row.division || "Medical Devices",
    employment_type: row.employment_type || "Full-time",
    experience: row.experience || "",
    summary: row.summary || "",
    description_markdown: row.description_markdown || "",
    is_active: row.is_active !== false,
    created_at: row.created_at || new Date().toISOString(),
  };
}

function normalizeApplicationRow(row: any): JobApplication {
  return {
    id: String(row.id),
    job_id: String(row.job_id || ""),
    job_title: row.job_title || "Position",
    full_name: row.full_name || "",
    email: row.email || "",
    phone: row.phone || "",
    current_location: row.current_location || "",
    experience_years: row.experience_years || row.years_of_experience || "",
    current_company: row.current_company || "",
    linkedin_url: row.linkedin_url || "",
    cover_note: row.cover_note || "",
    resume_url: row.resume_url || null,
    resume_filename: row.resume_filename || "",
    status: (row.status as ApplicationStatus) || "New",
    created_at: row.created_at || new Date().toISOString(),
  };
}

export async function fetchJobOpenings(activeOnly = false): Promise<{
  jobs: JobOpening[];
  fromDatabase: boolean;
  isEmptyInDb: boolean;
}> {
  try {
    let query = supabase
      .from("job_openings")
      .select("*")
      .order("created_at", { ascending: false });

    if (activeOnly) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query;

    if (!error && Array.isArray(data)) {
      if (data.length === 0) {
        // Check if table truly has zero rows (when activeOnly was true, check all rows)
        let isEmptyInDb = true;
        if (activeOnly) {
          const allCheck = await supabase.from("job_openings").select("id").limit(1);
          isEmptyInDb = !allCheck.error && Array.isArray(allCheck.data) && allCheck.data.length === 0;
        }
        const fallback = activeOnly ? [DEFAULT_SEED_JOB] : readLocalJobs();
        return { jobs: fallback, fromDatabase: false, isEmptyInDb };
      }

      const normalized = data.map(normalizeJobRow);
      if (!activeOnly) {
        writeLocalJobs(normalized);
      }
      return { jobs: normalized, fromDatabase: true, isEmptyInDb: false };
    }
  } catch (err) {
    console.info("Supabase job_openings fallback:", err);
  }

  const local = readLocalJobs();
  return {
    jobs: activeOnly ? local.filter((j) => j.is_active) : local,
    fromDatabase: false,
    isEmptyInDb: false,
  };
}

export async function seedDefaultJobOpening(): Promise<JobOpening> {
  const payload = {
    title: DEFAULT_SEED_JOB.title,
    location: DEFAULT_SEED_JOB.location,
    division: DEFAULT_SEED_JOB.division,
    employment_type: DEFAULT_SEED_JOB.employment_type,
    experience: DEFAULT_SEED_JOB.experience,
    summary: DEFAULT_SEED_JOB.summary,
    description_markdown: DEFAULT_SEED_JOB.description_markdown,
    is_active: true,
  };

  try {
    const { data, error } = await supabase
      .from("job_openings")
      .insert([payload])
      .select()
      .single();

    if (!error && data) {
      const saved = normalizeJobRow(data);
      const current = readLocalJobs().filter((j) => j.id !== DEFAULT_SEED_JOB.id);
      writeLocalJobs([saved, ...current]);
      return saved;
    }
  } catch (err) {
    console.info("Seed default job Supabase fallback:", err);
  }

  const current = readLocalJobs();
  const exists = current.some(
    (j) =>
      j.title.toLowerCase() === DEFAULT_SEED_JOB.title.toLowerCase() &&
      j.location.toLowerCase() === DEFAULT_SEED_JOB.location.toLowerCase()
  );
  if (!exists) {
    writeLocalJobs([DEFAULT_SEED_JOB, ...current]);
  }
  return DEFAULT_SEED_JOB;
}

export async function saveJobOpening(
  jobData: Omit<JobOpening, "id" | "created_at">,
  existingId?: string
): Promise<JobOpening> {
  const cleanPayload = {
    title: jobData.title.trim(),
    location: jobData.location.trim(),
    division: jobData.division.trim(),
    employment_type: jobData.employment_type.trim() || "Full-time",
    experience: jobData.experience.trim(),
    summary: jobData.summary.trim(),
    description_markdown: jobData.description_markdown.trim(),
    is_active: jobData.is_active,
  };

  const isSeedOrLocalId =
    !existingId || existingId.startsWith("seed-") || existingId.startsWith("job-");

  try {
    if (existingId && !isSeedOrLocalId) {
      const { data, error } = await supabase
        .from("job_openings")
        .update(cleanPayload)
        .eq("id", existingId)
        .select()
        .single();

      if (!error && data) {
        const saved = normalizeJobRow(data);
        const current = readLocalJobs();
        const updated = current.map((j) => (j.id === existingId ? saved : j));
        writeLocalJobs(updated);
        return saved;
      }
    } else {
      const { data, error } = await supabase
        .from("job_openings")
        .insert([cleanPayload])
        .select()
        .single();

      if (!error && data) {
        const saved = normalizeJobRow(data);
        const current = readLocalJobs().filter((j) => j.id !== existingId);
        writeLocalJobs([saved, ...current]);
        return saved;
      }
    }
  } catch (err) {
    console.info("Supabase saveJobOpening fallback to local:", err);
  }

  const current = readLocalJobs();
  let localSaved: JobOpening;

  if (existingId) {
    const idx = current.findIndex((j) => j.id === existingId);
    if (idx !== -1) {
      localSaved = { ...current[idx], ...cleanPayload };
      current[idx] = localSaved;
    } else {
      localSaved = {
        id: existingId,
        ...cleanPayload,
        created_at: new Date().toISOString(),
      };
      current.unshift(localSaved);
    }
  } else {
    localSaved = {
      id: `job-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...cleanPayload,
      created_at: new Date().toISOString(),
    };
    current.unshift(localSaved);
  }

  writeLocalJobs(current);
  return localSaved;
}

export async function toggleJobOpeningActive(
  id: string,
  currentIsActive: boolean
): Promise<boolean> {
  const nextActive = !currentIsActive;
  const current = readLocalJobs();
  const updated = current.map((j) =>
    j.id === id ? { ...j, is_active: nextActive } : j
  );
  writeLocalJobs(updated);

  try {
    if (!id.startsWith("seed-") && !id.startsWith("job-")) {
      await supabase
        .from("job_openings")
        .update({ is_active: nextActive })
        .eq("id", id);
    }
  } catch (err) {
    console.info("Supabase toggleJobOpeningActive fallback:", err);
  }

  return nextActive;
}

export async function deleteJobOpening(id: string): Promise<void> {
  const filtered = readLocalJobs().filter((j) => j.id !== id);
  try {
    localStorage.setItem(LOCAL_JOBS_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent("emsurg-careers-updated", { detail: filtered }));
  } catch {}

  try {
    if (!id.startsWith("seed-") && !id.startsWith("job-")) {
      await supabase.from("job_openings").delete().eq("id", id);
    }
  } catch (err) {
    console.info("Supabase deleteJobOpening notice:", err);
  }
}

/**
 * Upload resume (PDF/DOC/DOCX) to Supabase Storage 'resumes' bucket.
 * Returns publicUrl on success, or null if storage upload fails (logs error without aborting application).
 */
export async function uploadResumeFile(file: File): Promise<{
  url: string | null;
  filename: string;
  uploadedToStorage: boolean;
}> {
  const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  try {
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(cleanFileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined,
      });

    if (uploadError) {
      console.error("Supabase 'resumes' storage upload error:", uploadError.message, uploadError);
      return {
        url: null,
        filename: file.name,
        uploadedToStorage: false,
      };
    }

    const { data } = supabase.storage.from("resumes").getPublicUrl(cleanFileName);
    if (data?.publicUrl) {
      return {
        url: data.publicUrl,
        filename: file.name,
        uploadedToStorage: true,
      };
    }

    console.error("Supabase 'resumes' storage error: publicUrl was empty.");
  } catch (err: any) {
    console.error("Resume upload exception:", err?.message || err);
  }

  return {
    url: null,
    filename: file.name,
    uploadedToStorage: false,
  };
}

export interface SubmitJobApplicationInput {
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  current_location: string;
  experience_years: string;
  current_company?: string | null;
  linkedin_url?: string | null;
  cover_note?: string | null;
  resume_url: string | null;
}

export async function submitJobApplication(
  application: SubmitJobApplicationInput
): Promise<void> {
  const payload = {
    job_id: application.job_id,
    job_title: application.job_title,
    full_name: application.full_name.trim(),
    email: application.email.trim(),
    phone: application.phone.trim(),
    current_location: application.current_location.trim(),
    experience_years: application.experience_years.trim(),
    current_company: application.current_company?.trim() || null,
    linkedin_url: application.linkedin_url?.trim() || null,
    cover_note: application.cover_note?.trim() || null,
    resume_url: application.resume_url ?? null,
    status: "New" as ApplicationStatus,
  };

  const { error } = await supabase.from("job_applications").insert([payload]);

  if (error) {
    console.error("Supabase job_applications insert error:", error.message, error);
    throw new Error(error.message || "Failed to submit job application.");
  }
}

export async function fetchJobApplications(): Promise<JobApplication[]> {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetchJobApplications error:", error.message, error);
    throw new Error(error.message || "Failed to fetch job applications.");
  }

  return (data || []).map(normalizeApplicationRow);
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
): Promise<void> {
  const { error } = await supabase
    .from("job_applications")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Supabase updateApplicationStatus error:", error.message, error);
    throw new Error(error.message || "Failed to update application status.");
  }
}

export async function deleteJobApplication(id: string): Promise<void> {
  const { error } = await supabase.from("job_applications").delete().eq("id", id);

  if (error) {
    console.error("Supabase deleteJobApplication error:", error.message, error);
    throw new Error(error.message || "Failed to delete job application.");
  }
}

export function subscribeToJobOpenings(
  callback: (jobs: JobOpening[]) => void,
  activeOnly = false
): () => void {
  const channel = supabase
    .channel(`public:job_openings:${activeOnly ? "active" : "all"}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "job_openings" },
      async () => {
        const res = await fetchJobOpenings(activeOnly);
        callback(res.jobs);
      }
    )
    .subscribe();

  const handleLocal = (e: any) => {
    if (Array.isArray(e.detail)) {
      callback(activeOnly ? e.detail.filter((j: JobOpening) => j.is_active) : e.detail);
    }
  };

  window.addEventListener("emsurg-careers-updated", handleLocal);

  return () => {
    supabase.removeChannel(channel);
    window.removeEventListener("emsurg-careers-updated", handleLocal);
  };
}

export function subscribeToJobApplications(
  callback: (apps: JobApplication[]) => void
): () => void {
  const channel = supabase
    .channel("public:job_applications-live")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "job_applications" },
      async () => {
        try {
          const apps = await fetchJobApplications();
          callback(apps);
        } catch (err) {
          console.error("Realtime job_applications refresh error:", err);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
