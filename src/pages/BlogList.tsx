import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import { Post, fetchPublishedPosts, getLocalPosts } from "../lib/postsStore";

export type { Post };

const CATEGORIES = ["All", "Orthobiologics", "Wound Care", "Dialysis", "Indigenous Manufacturing"];

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>(() => getLocalPosts().filter(p => p.published));
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadPosts() {
      try {
        const fetched = await fetchPublishedPosts();
        if (isMounted && fetched.length > 0) {
          setPosts(fetched);
        }
      } catch (err) {
        console.info("Using local posts fallback:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="pt-40 pb-16 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Clinical Insights & Medical Technology Updates</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Explore the latest advancements, research, and perspectives from the Emsurg medical team and our industry partners.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Link key={post.id} to={`/blogs/${post.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.cover_image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 tracking-wide uppercase">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(post.created_at), "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    4 min read
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                  Read Full Article <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No articles found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
