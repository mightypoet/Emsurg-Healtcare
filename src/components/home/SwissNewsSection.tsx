import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Post, fetchFeaturedPosts, getLocalPosts } from "../../lib/postsStore";

export default function SwissNewsSection() {
  const [posts, setPosts] = useState<Post[]>(() => {
    const local = getLocalPosts().filter((p) => p.published);
    return local.slice(0, 3);
  });

  useEffect(() => {
    let isMounted = true;
    async function loadPosts() {
      try {
        const data = await fetchFeaturedPosts();
        if (isMounted && data && data.length > 0) {
          setPosts(data.slice(0, 3));
        }
      } catch (err) {
        console.info("Using local posts fallback:", err);
      }
    }

    loadPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="news-section" className="bg-white py-20 md:py-28 border-t border-slate-100 select-none">
      <div className="max-w-6xl mx-auto px-4">
        {/* Minimal Swiss Left-Aligned Heading */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-light text-3xl md:text-4xl text-slate-900 tracking-tight">
            News
          </h2>
        </div>

        {/* 3-Column Minimal Grid without Card Boxes or Heavy Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {posts.map((post) => {
            const formattedDate = post.created_at
              ? format(new Date(post.created_at), "MM.dd.yy")
              : "09.21.26";

            return (
              <article key={post.id} className="group flex flex-col items-start">
                {/* 16:9 Photo with Crisp Rounded Corners */}
                <Link
                  to={`/blogs/${post.slug}`}
                  className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-100 mb-4 block focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </Link>

                {/* Date & Category in Minimalist Slate Monospace / Uppercase */}
                <div className="text-xs text-slate-400 font-medium tracking-wide uppercase mb-2">
                  <span>{formattedDate}</span>
                  <span className="mx-2">·</span>
                  <span className="text-slate-500">{post.category || "CLINICAL PRACTICE"}</span>
                </div>

                {/* Bold Readable Title */}
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug mb-3">
                  <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Light 2-Line Summary */}
                <p className="text-sm text-slate-600 font-normal line-clamp-3 mb-5 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Minimalist Link with Circular Arrow Badge */}
                <div className="mt-auto">
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 group-hover:text-blue-700 transition-colors"
                  >
                    <span>Read the article</span>
                    <span className="w-5 h-5 rounded-full border border-slate-300 text-slate-700 flex items-center justify-center text-[10px] group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-200">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Centered Bottom Pill: "All news →" */}
        <div className="mt-16 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-2 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200 group/btn shadow-2xs"
          >
            <span>All news</span>
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white group-hover/btn:bg-white group-hover/btn:text-slate-900 flex items-center justify-center text-[10px] transition-colors">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
