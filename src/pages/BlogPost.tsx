import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ChevronRight, Clock, Calendar, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

  const normalizedContent = (post.content || "").replace(/\\n/g, "\n");

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Article Hero */}
      <div className="pt-24 sm:pt-32 pb-8 sm:pb-12 bg-[#0F172A] border-b border-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center text-xs sm:text-sm text-slate-400 mb-6 font-medium gap-1">
            <Link to="/" className="hover:text-blue-400 transition-colors py-1">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
            <Link to="/blogs" className="hover:text-blue-400 transition-colors py-1">Blogs</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
            <span className="text-slate-200 truncate max-w-[140px] sm:max-w-xs py-1">{post.title}</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-blue-500/30">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.created_at), "MMMM d, yyyy")}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-slate-300">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border-2 border-slate-700 shadow-sm shrink-0">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Article Body */}
        <article className="lg:w-2/3 max-w-4xl">
          <img
            src={post.cover_image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800'}
            alt={post.title}
            onError={(e) => {
              // If the database URL fails or is broken, gracefully use a fallback clinical image
              e.currentTarget.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800';
            }}
            className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-12 shadow-sm"
          />
          
          <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-10 mb-4 leading-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-10 mb-4 leading-snug">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-8 mb-3 leading-snug">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-6 mb-2">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="my-5 text-base sm:text-lg leading-relaxed text-slate-700">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-slate-900">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-slate-800">{children}</em>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 my-5 space-y-2.5 text-base sm:text-lg text-slate-700">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 my-5 space-y-2.5 text-base sm:text-lg text-slate-700">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-600 bg-blue-50/50 pl-5 py-3 my-6 italic text-slate-700 rounded-r-xl">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    {children}
                  </a>
                ),
                hr: () => <hr className="my-8 border-slate-200" />,
                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-sm text-left">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-slate-100 text-slate-900 font-bold">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 font-bold text-slate-900">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 border-t border-slate-200 text-slate-700">{children}</td>
                ),
              }}
            >
              {normalizedContent}
            </ReactMarkdown>
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
