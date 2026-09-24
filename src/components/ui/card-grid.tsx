import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface Article {
  id: string | number;
  imageSrc: string;
  title: string;
  category?: string;
  date?: string;
  excerpt?: string;
  linkText: string;
  linkHref: string;
}

interface ArticleCardGridProps {
  title?: string;
  subtitle?: string;
  articles: Article[];
  viewAllHref?: string;
}

export const ArticleCardGrid: React.FC<ArticleCardGridProps> = ({
  title,
  subtitle,
  articles,
  viewAllHref = "/blogs",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-4 md:px-6 bg-white text-slate-900 border-t border-slate-100">
      {/* Minimal Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase block mb-3">
            CLINICAL PERSPECTIVES & RESEARCH
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight">
            {title || "News & Insights"}
          </h2>
          {subtitle && (
            <p className="text-slate-500 text-sm md:text-base mt-2 max-w-xl font-normal">
              {subtitle}
            </p>
          )}
        </div>
        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="group inline-flex items-center text-xs font-semibold uppercase tracking-widest text-slate-700 hover:text-blue-700 transition-colors py-1 border-b border-slate-200 hover:border-blue-700"
          >
            All Articles
            <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Grid of Articles */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {articles.map((article) => (
          <motion.div
            key={article.id}
            variants={itemVariants}
            className="group flex flex-col h-full bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-slate-300/80 hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 overflow-hidden"
          >
            <Link
              to={article.linkHref}
              className="block relative overflow-hidden aspect-[16/10] bg-slate-100"
            >
              <img
                src={article.imageSrc}
                alt={article.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80";
                }}
              />
              {article.category && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md text-slate-800 rounded-full border border-slate-200/60 shadow-sm">
                    {article.category}
                  </span>
                </div>
              )}
            </Link>

            <div className="p-6 md:p-8 flex flex-col flex-grow">
              {article.date && (
                <span className="text-xs text-slate-400 font-medium tracking-wide uppercase mb-2">
                  {article.date}
                </span>
              )}
              <h3 className="text-xl font-medium text-slate-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                <Link to={article.linkHref}>{article.title}</Link>
              </h3>
              {article.excerpt && (
                <p className="text-sm text-slate-600 line-clamp-2 mb-6 font-normal leading-relaxed">
                  {article.excerpt}
                </p>
              )}
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={article.linkHref}
                  className="inline-flex items-center text-xs font-semibold tracking-wider text-slate-800 group-hover:text-blue-700 transition-colors uppercase"
                >
                  {article.linkText || "Read Article"}
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
export default ArticleCardGrid;
