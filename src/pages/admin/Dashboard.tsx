import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { LogOut, Plus, Edit2, Trash2, Globe, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Orthobiologics");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const CATEGORIES = ["Orthobiologics", "Wound Care", "Dialysis", "Indigenous Manufacturing"];

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    const isMockAuth = sessionStorage.getItem("admin_auth") === "true";
    
    if (!data.session && !isMockAuth) {
      navigate("/admin/login");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem("admin_auth");
    navigate("/admin/login");
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (!error && data) {
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!currentPost) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const openEditor = (post: any = null) => {
    if (post) {
      setCurrentPost(post);
      setTitle(post.title);
      setSlug(post.slug);
      setCategory(post.category);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCoverImage(post.cover_image);
      setPublished(post.published);
      setFeatured(post.featured);
    } else {
      setCurrentPost(null);
      setTitle("");
      setSlug("");
      setCategory("Orthobiologics");
      setExcerpt("");
      setContent("");
      setCoverImage("");
      setPublished(true);
      setFeatured(false);
    }
    setIsEditing(true);
  };

  const savePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const postData = {
      title,
      slug,
      category,
      excerpt,
      content,
      cover_image: coverImage,
      published,
      featured,
      author: "Emsurg Medical Team"
    };

    try {
      if (currentPost) {
        await supabase.from("posts").update(postData).eq("id", currentPost.id);
      } else {
        await supabase.from("posts").insert([postData]);
      }
      
      setIsEditing(false);
      fetchPosts();
    } catch (err) {
      console.error("Error saving post", err);
      alert("Error saving post. Check console.");
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await supabase.from("posts").delete().eq("id", id);
        fetchPosts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleFeatured = async (post: any) => {
    try {
      await supabase.from("posts").update({ featured: !post.featured }).eq("id", post.id);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-slate-900">Emsurg Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-500 hidden sm:block">rohan.d@emsurg.com</span>
              <Link to="/blogs" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-md">
                <Globe className="w-4 h-4" /> Live Site
              </Link>
              <button 
                onClick={handleLogout}
                className="text-slate-500 hover:text-slate-700 p-2"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Articles</h1>
              <button 
                onClick={() => openEditor()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> New Article
              </button>
            </div>
            
            <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {loading ? (
                    <tr><td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">Loading...</td></tr>
                  ) : posts.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">No articles found. Click "New Article" to create one.</td></tr>
                  ) : posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-slate-900">{post.title}</div>
                        <div className="text-xs text-slate-500">{post.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        {post.featured && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{post.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {format(new Date(post.created_at), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => toggleFeatured(post)} className={`text-slate-400 hover:text-blue-600 ${post.featured ? 'text-blue-600' : ''}`} title="Toggle Featured">
                            {post.featured ? <CheckCircle className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                          </button>
                          <button onClick={() => openEditor(post)} className="text-slate-400 hover:text-slate-900">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => deletePost(post.id)} className="text-slate-400 hover:text-red-600">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bg-white shadow-sm rounded-xl border border-slate-200 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">{currentPost ? 'Edit Article' : 'New Article'}</h2>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={savePost} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                  <input type="text" required value={title} onChange={handleTitleChange} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Slug</label>
                  <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Cover Image URL</label>
                  <input type="url" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                  {coverImage && <img src={coverImage} alt="Preview" className="mt-4 h-32 w-auto object-cover rounded-lg border border-slate-200" />}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Excerpt (Short description)</label>
                  <textarea required value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Content (Markdown supported)</label>
                  <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" />
                </div>
              </div>
              
              <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-700">Publish Now</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-700">Feature on Homepage</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
