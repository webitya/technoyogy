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
    <main className="min-h-screen bg-white">
      <Navbar />
      <ViewTracker slug={slug} />
      
      {/* Blog Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-muted/20 -z-10 rounded-b-[100px]"></div>
        
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12 text-center items-center">
           <div className="flex flex-col gap-6 items-center">
             <span className="px-6 py-2 bg-primary text-white rounded-full text-xs font-black tracking-widest uppercase shadow-lg shadow-primary/20">
               {blog.category || "TECH"}
             </span>
             <h1 className="text-5xl md:text-7xl font-black leading-tight text-foreground tracking-tighter">
               {blog.title}
             </h1>
             <div className="flex items-center gap-6 text-foreground/40 font-bold uppercase tracking-widest text-sm">
               <span>BY YOG PRAKASH SAH</span>
               <span>•</span>
               <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
               <span>•</span>
               <span>5 MIN READ</span>
             </div>
           </div>
           
           <div className="relative w-full aspect-[16/9] rounded-[60px] overflow-hidden shadow-2xl">
             <img
               src={blog.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
               alt={blog.title}
               className="object-cover w-full h-full"
             />
           </div>
        </div>
      </section>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-6 py-24">
        <div 
          className="tiptap-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Author Bio Card */}
        <div className="mt-32 p-12 bg-muted/20 rounded-[50px] flex flex-col md:flex-row gap-12 items-center border border-foreground/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]"></div>
             <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img src="/hero-blogger.png" alt="Yog Prakash" className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                <h4 className="text-2xl font-black heading-gradient">Yog Prakash Sah</h4>
                <p className="text-foreground/60 text-lg">Independent creator, technology enthusiast, and the founder of Technoyogyx. Passionate about sharing deep tech insights that help you stay ahead in the digital world.</p>
                <div className="flex gap-6 justify-center md:justify-start items-center">
                    <Link href="#" className="text-primary font-black uppercase tracking-widest text-sm border-b-2 border-primary">Follow on Twitter</Link>
                    <Link href="#" className="text-foreground/40 font-black uppercase tracking-widest text-sm hover:text-primary transition-colors">Know More</Link>
                </div>
             </div>
        </div>
      </article>

      {/* Newsletter Section */}
      <section className="py-24 bg-foreground text-white rounded-t-[100px]">
         <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-10">
            <h2 className="text-6xl font-black tracking-tighter">Stay Ahead Of The Curve.</h2>
            <p className="text-white/60 text-xl font-medium">Join 500k+ subscribers getting weekly technology insights directly in their inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full glass p-2 rounded-full">
               <input type="email" placeholder="Enter your email" className="flex-1 bg-transparent border-none outline-none px-8 py-4 font-bold" />
               <button className="btn-premium px-12 py-4">Subscribe Now</button>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
