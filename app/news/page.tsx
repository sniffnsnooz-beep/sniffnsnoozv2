import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import connectToDatabase from "@/libs/db";
import News from "@/models/news";
import { ArrowRight, Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Care News & Grooming Tips | Sniffnsnooz Blog",
  description:
    "Stay updated with the latest pet grooming tips, dog care guides, cat health advice, and expert insights from the Sniffnsnooz team. Your go-to resource for pet wellness in Delhi NCR.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "Pet Care News & Grooming Tips | Sniffnsnooz Blog",
    description:
      "Expert pet grooming tips, dog care advice, and cat health guides from Sniffnsnooz — Delhi NCR's trusted pet grooming brand.",
    url: "https://sniffnsnooz.in/news",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function NewsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const PAGE_SIZE = 12;

  await connectToDatabase();
  
  const totalCount = await News.countDocuments();
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const allNews = await News.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);

  const featuredPost = page === 1 && allNews.length > 0 ? allNews[0] : null;
  const gridPosts = page === 1 ? allNews.slice(1) : allNews;

  return (
    <div className="bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="section-label mb-4">
            <span>📰</span> The Sniffnsnooz Journal
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-4">
            Latest News & <span className="shimmer-text italic">Pet Tips</span>
          </h1>
          <p className="text-[#7a5741] text-lg max-w-2xl mx-auto">
            Expert grooming advice, pet care guides, and the latest updates from our doorstep grooming professionals.
          </p>
        </div>
        
        {/* Featured Post (Only on Page 1) */}
        {featuredPost && (
          <div className="mb-16">
            <Link href={`/news/${featuredPost.slug}`} className="group block">
              <div className="card-premium grid md:grid-cols-2 gap-0 overflow-hidden">
                <div className="relative h-80 md:h-full min-h-[400px]">
                  {featuredPost.video ? (
                    <video 
                      src={featuredPost.video} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                    />
                  ) : (
                    <Image 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-10 md:p-14 flex flex-col justify-center bg-white/40">
                  <span className="inline-block px-3 py-1 bg-[#5b3a26] text-white text-xs font-bold uppercase tracking-widest rounded-full w-fit mb-6">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5b3a26] mb-6 leading-tight group-hover:text-[#8c5a3b] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-[#7a5741] text-lg line-clamp-3 mb-8 leading-relaxed">
                    {featuredPost.content.replace(/<[^>]*>?/gm, '').substring(0, 180)}...
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm font-semibold text-[#8c5a3b] mt-auto">
                    <div className="flex items-center gap-2">
                      <User size={16} /> {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} /> {new Date(featuredPost.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <Link href={`/news/${post.slug}`} key={post._id} className="group">
              <div className="card-premium h-full flex flex-col group-hover:-translate-y-2 transition-all duration-300">
                <div className="relative h-60 overflow-hidden">
                  {post.video ? (
                    <video 
                      src={post.video} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                    />
                  ) : (
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  {/* Floating Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#5b3a26] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow bg-white/30">
                  <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-3 group-hover:text-[#8c5a3b] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[#7a5741] text-sm line-clamp-3 leading-relaxed mb-6 flex-grow">
                    {post.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#5b3a26]/10">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#8c5a3b]">
                      <Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <span className="text-[#5b3a26] group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-20">
            {page > 1 ? (
              <Link href={`/news?page=${page - 1}`} className="btn-ghost !px-5">
                &larr; Prev
              </Link>
            ) : (
              <div className="btn-ghost !px-5 opacity-50 cursor-not-allowed">
                &larr; Prev
              </div>
            )}
            
            <span className="font-bold text-[#7a5741] bg-white/50 px-6 py-3.5 rounded-full border border-white/60 shadow-sm text-sm">
              Page <span className="text-[#5b3a26]">{page}</span> of {totalPages}
            </span>
            
            {page < totalPages ? (
              <Link href={`/news?page=${page + 1}`} className="btn-ghost !px-5">
                Next &rarr;
              </Link>
            ) : (
              <div className="btn-ghost !px-5 opacity-50 cursor-not-allowed">
                Next &rarr;
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}