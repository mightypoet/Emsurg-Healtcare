import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Post, fetchFeaturedPosts, getLocalPosts } from "../../lib/postsStore";

export default function FeaturedBlogs() {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>(() => {
    const local = getLocalPosts().filter(p => p.published && p.featured);
    return local.slice(0, 3);
  });
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const data = await fetchFeaturedPosts();
        if (isMounted && data && data.length > 0) {
          setFeaturedPosts(data);
        }
      } catch (err) {
        console.info("Using local featured posts:", err);
      }
    }

    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  if (featuredPosts.length === 0) return null;

  return (
    <section className="py-24 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h3 className="text-blue-600 font-bold tracking-widest text-sm mb-3 uppercase">Clinical Insights</h3>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Latest from Our Research & Practice
            </h2>
          </div>
          <Link 
            to="/blogs" 
            className="inline-flex items-center text-slate-900 font-bold hover:text-blue-600 transition-colors shrink-0"
          >
            View All Articles <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blogs/${post.slug}`} 
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.cover_image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-blue-700 tracking-wide uppercase shadow-sm">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.created_at), "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    4 min read
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                  Read Full Article <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
