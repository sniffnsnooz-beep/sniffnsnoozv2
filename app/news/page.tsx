import Image from "next/image";
import Link from "next/link";
import connectToDatabase from "@/libs/db";
import News from "@/models/news";

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

  return (
    <div className="bg-[#f6efe6] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-[#5b3a26] mb-12 text-center">Latest News & Pet Tips</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {allNews.map((post) => (
            <Link href={`/news/${post.slug}`} key={post._id} className="group">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{post.category}</span>
                  <h2 className="text-2xl font-bold text-[#5b3a26] mt-3 group-hover:text-orange-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 mt-4 line-clamp-2 text-sm">
                    {post.content.substring(0, 100)}...
                  </p>
                  <div className="mt-6 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase">
                    <span>By {post.author}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-16">
            {page > 1 ? (
              <Link href={`/news?page=${page - 1}`} className="px-6 py-3 bg-white text-[#5b3a26] rounded-full font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-orange-100">
                &larr; Previous
              </Link>
            ) : (
              <div className="px-6 py-3 bg-gray-100 text-gray-400 rounded-full font-bold cursor-not-allowed">
                &larr; Previous
              </div>
            )}
            
            <span className="font-bold text-gray-500 bg-white px-6 py-3 rounded-full shadow-sm">
              Page <span className="text-[#5b3a26]">{page}</span> of {totalPages}
            </span>
            
            {page < totalPages ? (
              <Link href={`/news?page=${page + 1}`} className="px-6 py-3 bg-white text-[#5b3a26] rounded-full font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-orange-100">
                Next &rarr;
              </Link>
            ) : (
              <div className="px-6 py-3 bg-gray-100 text-gray-400 rounded-full font-bold cursor-not-allowed">
                Next &rarr;
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}