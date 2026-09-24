import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Post, fetchFeaturedPosts, getLocalPosts } from "../../lib/postsStore";
import { formatDriveImageUrl } from "../../lib/utils";
import { ArticleCardGrid, Article } from "../ui/card-grid";

export default function SwissNewsSection() {
  const [posts, setPosts] = useState<Post[]>(() => {
    const local = getLocalPosts().filter((p) => p.published);
    const featured = local.filter((p) => p.featured);
    return featured.length > 0 ? featured.slice(0, 3) : local.slice(0, 3);
  });

  const loadPosts = async () => {
    try {
      const data = await fetchFeaturedPosts();
      if (data && data.length > 0) {
        setPosts(data.slice(0, 3));
      } else {
        const local = getLocalPosts().filter((p) => p.published);
        const featured = local.filter((p) => p.featured);
        setPosts(featured.length > 0 ? featured.slice(0, 3) : local.slice(0, 3));
      }
    } catch (err) {
      console.info("Using local posts fallback:", err);
    }
  };

  useEffect(() => {
    loadPosts();
    const handleUpdate = () => loadPosts();
    window.addEventListener("emsurg_posts_updated", handleUpdate);
    return () => window.removeEventListener("emsurg_posts_updated", handleUpdate);
  }, []);

  if (posts.length === 0) return null;

  const articles: Article[] = posts.map((post) => {
    let dateStr: string | undefined = undefined;
    if (post.created_at) {
      try {
        dateStr = format(new Date(post.created_at), "MMM d, yyyy");
      } catch {
        dateStr = undefined;
      }
    }

    return {
      id: post.id,
      imageSrc: formatDriveImageUrl(post.cover_image),
      title: post.title,
      category: post.category || "Clinical Practice",
      date: dateStr,
      excerpt: post.excerpt,
      linkText: "Read Article",
      linkHref: `/blogs/${post.slug}`,
    };
  });

  return (
    <div id="news-section">
      <ArticleCardGrid
        title="Clinical Insights & News"
        subtitle="Original clinical research, surgical protocols, and regulatory advancements in orthobiologics, hemodialysis fluids, and active wound management."
        articles={articles}
        viewAllHref="/blogs"
      />
    </div>
  );
}
