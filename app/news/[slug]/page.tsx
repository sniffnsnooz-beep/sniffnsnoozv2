import connectToDatabase from "@/libs/db";
import News from "@/models/news";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// SEO Dynamic Metadata - Next.js 15 Fix
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Params ko await kiya
  await connectToDatabase();
  
  const post = await News.findOne({ slug: slug });
  if (!post) return { title: "News Not Found" };

  return {
    title: `${post.title} | Sniff n Snooz News`,
    description: post.content.substring(0, 160),
    openGraph: { images: [post.image || post.video] },
  };
}

export default async function SingleNews({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Params ko await kiya (Next.js 15 crash fix)
  const { slug } = await params;

  await connectToDatabase();
  
  // 2. Awaited slug se database search kiya
  const post = await News.findOne({ slug: slug });

  if (!post) notFound();

  return (
    <article className="pt-32 pb-20 px-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {post.video ? (
          <video 
            src={post.video} 
            className="w-full rounded-[3rem] shadow-2xl mb-10" 
            controls 
            autoPlay 
            loop 
            muted 
            playsInline 
          />
        ) : (
          <Image 
            src={post.image} 
            width={1200} 
            height={600} 
            alt={post.title} 
            className="rounded-[3rem] shadow-2xl mb-10" 
          />
        )}
        <h1 className="text-4xl md:text-6xl font-serif text-[#5b3a26] leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex gap-4 mb-10 text-sm font-bold text-orange-600 uppercase">
          <span>{post.category}</span> • <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        {/* Content Area with spacing fix */}
        <div className="whitespace-pre-wrap prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {post.content}
        </div>
      </div>
    </article>
  );
}