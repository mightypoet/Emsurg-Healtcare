import { ArrowRight, Package, Handshake, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTACards() {
  return (
    <section className="py-20 bg-white relative -mt-10 z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <Link to="/products" className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Explore Products</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">Discover Emsurg's comprehensive medical technology portfolio.</p>
            <div className="flex items-center text-sm font-bold text-blue-600">
              View Catalog <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/partners" className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Partner With Emsurg</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">Connect with our healthcare and distribution team.</p>
            <div className="flex items-center text-sm font-bold text-blue-600">
              Partnership Opportunities <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3 */}
          <Link to="/contact" className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Request Information</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">Get technical specifications or product information.</p>
            <div className="flex items-center text-sm font-bold text-blue-600">
              Submit Inquiry <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
