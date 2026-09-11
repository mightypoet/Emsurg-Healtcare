import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { format } from "date-fns";
import { ChevronRight, Clock, Calendar } from "lucide-react";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  published: boolean;
  featured: boolean;
  created_at: string;
}

const CATEGORIES = ["All", "Orthobiologics", "Wound Care", "Dialysis", "Indigenous Manufacturing"];

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    title: "Advancements in Nanocrystalline Hydroxyapatite (BoneSurg HA) for Orthopaedic Surgery",
    slug: "advancements-in-nanocrystalline-hydroxyapatite-bonesurg-ha",
    excerpt: "Exploring the latest clinical outcomes and surgical techniques utilizing next-generation synthetic bone grafts.",
    content: "Full content here...",
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
    content: "Full content here...",
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
    content: "Full content here...",
    cover_image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2070&auto=format&fit=crop",
    category: "Indigenous Manufacturing",
    author: "Emsurg Medical Team",
    published: true,
    featured: true,
    created_at: new Date(Date.now() - 300000000).toISOString(),
  }
];

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching posts:", error);
          // Fallback to initial posts if table doesn't exist yet
        } else if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Supabase not fully configured, using initial data.", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
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
