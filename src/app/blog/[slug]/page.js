import clientPromise from '@/lib/mongodb';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ViewTracker from '@/components/ViewTracker';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getBlog(slug) {
  try {
    const client = await clientPromise;
    const db = client.db("technoyogy");
    const blog = await db.collection("blogs").findOne({ slug });
    return JSON.parse(JSON.stringify(blog));
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function BlogPost(props) {
  const { slug } = await props.params;

  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-[72px] md:pt-20">
      <Navbar />
      <ViewTracker slug={slug} />
      
      {/* Cinematic Full-Width Banner */}
      <section className="relative w-full overflow-hidden border-b border-gray-50 bg-white">
        <div className="w-full h-[220px] md:h-[450px] relative">
          <img
            src={blog.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
            alt={blog.title}
            className="object-cover object-top w-full h-full grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </section>

      {/* Blog Metadata & Title Container */}
      <section className="pt-8 sm:pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-5 items-start text-left">
           <span className="px-5 py-2 bg-[#fb2576] text-white rounded-[2px] text-[10px] font-bold tracking-[3px] uppercase shadow-lg shadow-[#fb2576]/20">
             {blog.category || "TECH"}
           </span>
           <h1 className="text-3xl sm:text-5xl font-bold leading-[1.1] text-[#1a1a1a] tracking-tighter uppercase">
             {blog.title}
           </h1>
           <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
             <span className="text-[#1a1a1a]">BY YOG PRAKASH SAH</span>
             <span className="hidden sm:inline">•</span>
             <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
             <span className="hidden sm:inline">•</span>
             <span>5 MIN READ</span>
           </div>
        </div>
      </section>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div 
          className="tiptap-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Identity Registry Card (Author Bio) */}
        <div className="mt-20 p-8 md:p-12 bg-white border-2 border-[#1a1a1a]/10 rounded-[3px] flex flex-col md:flex-row gap-10 items-center shadow-sm relative overflow-hidden">
             <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl relative z-10 border-2 border-white flex-shrink-0">
                <img src="/hero-blogger.png" alt="Yog Prakash" className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-2xl font-bold text-[#1a1a1a] uppercase tracking-tight">Yog Prakash Sah</h4>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">Independent creator, technology enthusiast, and the founder of Technoyogyx. Passionate about sharing deep tech insights that help you stay ahead in the digital world.</p>
                <div className="flex gap-6 justify-center md:justify-start items-center pt-2">
                    <Link href="#" className="text-[#fb2576] font-bold uppercase tracking-widest text-[10px] border-b-2 border-[#fb2576]/20 hover:border-[#fb2576] transition-all">Follow on Twitter</Link>
                    <Link href="#" className="text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-[#1a1a1a] transition-colors">Know More</Link>
                </div>
             </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
