import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ChevronRight, Clock, Calendar, ArrowLeft } from "lucide-react";
import { Post, fetchPostBySlug, getLocalPostBySlug } from "../lib/postsStore";

// Export this for backwards compatibility
export const getInitialPostBySlug = (slug: string) => {
  return getLocalPostBySlug(slug);
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(() => slug ? getLocalPostBySlug(slug) || null : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadPost() {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        const found = await fetchPostBySlug(slug);
        if (isMounted) {
          setPost(found || getLocalPostBySlug(slug) || null);
        }
      } catch (err) {
        if (isMounted) {
          setPost(getLocalPostBySlug(slug) || null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPost();
    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
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
