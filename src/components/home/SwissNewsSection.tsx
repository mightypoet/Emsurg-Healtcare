import React, { useState, useEffect } from "react";
import { Post, fetchPublishedPosts, getLocalPosts } from "../../lib/postsStore";
import { formatDriveImageUrl } from "../../lib/utils";
import { ArgentLoopInfiniteSlider, SliderArticle } from "../ui/argent-loop-infinite-slider";

export default function SwissNewsSection() {
  const [posts, setPosts] = useState<Post[]>(() => {
    const local = getLocalPosts().filter((p) => p.published);
    return local;
  });

  const loadPosts = async () => {
    try {
      const data = await fetchPublishedPosts();
      if (data && data.length > 0) {
        setPosts(data);
      } else {
        const local = getLocalPosts().filter((p) => p.published);
        setPosts(local);
      }
    } catch (err) {
      console.info("Using local posts fallback:", err);
      const local = getLocalPosts().filter((p) => p.published);
      setPosts(local);
    }
  };

  useEffect(() => {
    loadPosts();
    const handleUpdate = () => loadPosts();
    window.addEventListener("emsurg_posts_updated", handleUpdate);
    return () => window.removeEventListener("emsurg_posts_updated", handleUpdate);
  }, []);

  if (!posts || posts.length === 0) return null;

  const sliderArticles: SliderArticle[] = posts.map((post) => {
    let year = "2025";
    if (post.created_at) {
      try {
        year = new Date(post.created_at).getFullYear().toString();
      } catch {
        year = "2025";
      }
    }

    // Clean excerpt without markdown headings
    let cleanDescription = post.excerpt;
    if (!cleanDescription && post.content) {
      cleanDescription = post.content.replace(/^#+\s+/gm, "").slice(0, 140) + "...";
    }

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      image:
        formatDriveImageUrl(post.cover_image) ||
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1800&q=85",
      category: post.category || "Clinical Research",
      year: year,
      description: cleanDescription || "Read clinical insights and surgical updates from Emsurg Healthcare.",
    };
  });

  return (
    <section id="news-section" className="relative w-full bg-slate-950 overflow-hidden border-t border-sky-100/20">
      <ArgentLoopInfiniteSlider
        articles={sliderArticles}
        title="Clinical Insights & Research"
        subtitle="Original clinical research, surgical protocols, and regulatory advancements in orthobiologics, hemodialysis fluids, and active wound management."
      />
    </section>
  );
}
