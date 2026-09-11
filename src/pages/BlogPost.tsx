import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { format } from "date-fns";
import { ChevronRight, Clock, Calendar, ArrowLeft } from "lucide-react";
import { Post } from "./BlogList";

// Export this so we can reuse the initial data fallback for the detail page too
export const getInitialPostBySlug = (slug: string) => {
  const INITIAL_POSTS: Post[] = [
    {
      id: "1",
      title: "Advancements in Nanocrystalline Hydroxyapatite (BoneSurg HA) for Orthopaedic Surgery",
      slug: "advancements-in-nanocrystalline-hydroxyapatite-bonesurg-ha",
      excerpt: "Exploring the latest clinical outcomes and surgical techniques utilizing next-generation synthetic bone grafts.",
      content: `## The Evolution of Synthetic Bone Grafts\n\nFor decades, autografts have been considered the gold standard in orthopaedic and maxillofacial bone grafting due to their osteoconductive, osteoinductive, and osteogenic properties. However, donor site morbidity, limited availability, and prolonged surgical times have driven the search for effective alternatives.\n\n### Enter Nanocrystalline Hydroxyapatite (HA)\n\nBoneSurg HA represents a significant leap forward in synthetic grafting. By mimicking the exact mineral composition and nanostructure of natural human bone, it provides an optimal scaffold for new bone ingrowth.\n\n- **High Porosity:** Ensures excellent vascularization and cellular penetration.\n- **Biocompatibility:** Elicits minimal immune response.\n- **Resorption Profile:** Gradually resorbs as it is replaced by natural host bone.\n\n### Clinical Outcomes\n\nRecent multi-center studies indicate that when used in spinal fusion and trauma cases, BoneSurg HA demonstrates fusion rates comparable to autografts, without the associated donor site complications. The handling characteristics—allowing it to be mixed with blood or bone marrow aspirate—make it highly versatile in the operating theater.\n\nAs we continue to advance our manufacturing techniques in India, making these high-grade synthetic materials more accessible will be crucial for improving patient outcomes globally.`,
      cover_image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop",
      category: "Orthobiologics",
      author: "Emsurg Medical Team",
      published: true,
      featured: true,
      created_at: new Date(Date.now() - 100000000).toISOString(),
    },
    {
      id: "2",
      title: "The Role of Negative Pressure Wound Therapy (NPWT) in Managing Complex Surgical Wounds",
      slug: "role-of-npwt-in-managing-complex-surgical-wounds",
      excerpt: "A comprehensive review of NPWT protocols, efficacy, and patient recovery metrics in postoperative care.",
      content: `## Transforming Wound Care\n\nComplex surgical wounds present a significant challenge in postoperative patient care. Negative Pressure Wound Therapy (NPWT) has emerged as a critical modality in accelerating healing.\n\nOur research into optimized pressure settings and advanced dressing materials highlights how maintaining a controlled negative pressure environment promotes angiogenesis, reduces edema, and stimulates granulation tissue formation.`,
      cover_image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop",
      category: "Wound Care",
      author: "Emsurg Medical Team",
      published: true,
      featured: false,
      created_at: new Date(Date.now() - 200000000).toISOString(),
    },
    {
      id: "3",
      title: "Indigenous Manufacturing of Hemodialysis Fluids: Strengthening India's Nephro Infrastructure",
      slug: "indigenous-manufacturing-of-hemodialysis-fluids",
      excerpt: "How domestic production of critical dialysis components is transforming accessibility and cost-efficiency in renal care.",
      content: `## Building a Self-Reliant Healthcare Ecosystem\n\nThe rising prevalence of chronic kidney disease (CKD) in India necessitates a robust and accessible dialysis infrastructure. Historically, the reliance on imported hemodialysis fluids and consumables has driven up costs for patients.\n\nAt Emsurg, our focus on indigenous manufacturing of high-purity hemodialysis fluids is changing this paradigm. By producing locally under stringent WHO-GMP guidelines, we ensure unbroken supply chains and significant cost reductions for partner hospitals and clinics across the subcontinent.`,
      cover_image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2070&auto=format&fit=crop",
      category: "Indigenous Manufacturing",
      author: "Emsurg Medical Team",
      published: true,
      featured: true,
      created_at: new Date(Date.now() - 300000000).toISOString(),
    }
  ];
  return INITIAL_POSTS.find(p => p.slug === slug);
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .eq("published", true)
          .single();

        if (error) {
          console.error("Error fetching post:", error);
          setPost(getInitialPostBySlug(slug) || null);
        } else if (data) {
          setPost(data);
        }
      } catch (err) {
        console.error("Supabase error:", err);
        setPost(getInitialPostBySlug(slug) || null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading article...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Article not found</h2>
        <Link to="/blogs" className="text-blue-600 hover:underline">Return to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Article Hero */}
      <div className="pt-32 pb-12 bg-[#0F172A] border-b border-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center text-sm text-slate-400 mb-8 font-medium">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <Link to="/blogs" className="hover:text-blue-400 transition-colors">Blogs</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-slate-200 line-clamp-1">{post.title}</span>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-blue-500/30">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.created_at), "MMMM d, yyyy")}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border-2 border-slate-700 shadow-sm">
              EM
            </div>
            <div>
              <div className="text-white font-bold">{post.author}</div>
              <div className="text-slate-400 flex items-center gap-2">
                Emsurg Clinical Research <span className="w-1 h-1 rounded-full bg-slate-500"></span> 4 min read
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Article Body */}
        <article className="lg:w-2/3 max-w-4xl">
          <img 
            src={post.cover_image} 
            alt={post.title} 
            className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-12 shadow-sm"
          />
          
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-700">
            {/* Simple markdown parsing for the content */}
            {post.content.split('\\n\\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-bold mt-8 mb-3">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\\n- ').map(item => item.replace('- ', ''));
                return (
                  <ul key={i} className="list-disc pl-6 my-6 space-y-2">
                    {items.map((item, j) => {
                      // Handle bolding
                      const parts = item.split('**');
                      if (parts.length > 2) {
                         return <li key={j}><strong>{parts[1]}</strong>{parts[2]}</li>;
                      }
                      return <li key={j}>{item}</li>;
                    })}
                  </ul>
                );
              }
              return <p key={i} className="my-6 leading-relaxed text-slate-700">{paragraph}</p>;
            })}
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-1/3">
          <div className="sticky top-32 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Related Solutions</h3>
              
              {post.category === "Orthobiologics" ? (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center">
                      {/* Placeholder for BoneSurg HA thumbnail */}
                      <span className="text-xs font-bold text-slate-400">HA</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">BoneSurg HA</h4>
                      <p className="text-xs text-slate-500">Synthetic Bone Graft</p>
                    </div>
                  </div>
                  <Link to="/products" className="w-full text-center py-2.5 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors">
                    Explore Orthobiologics
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-slate-600">Discover our comprehensive range of medical solutions designed for clinical excellence.</p>
                  <Link to="/products" className="w-full text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors">
                    View All Products
                  </Link>
                </div>
              )}
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md">
              <h3 className="text-lg font-bold mb-2">Discuss with an Expert</h3>
              <p className="text-sm text-slate-400 mb-6">Want to learn more about our clinical applications and product efficacy?</p>
              <Link to="/contact" className="block w-full text-center py-3 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
