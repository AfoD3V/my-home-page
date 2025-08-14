import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPostsMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post?.meta.title ?? "Post",
    description: post?.meta.tags?.join(", ") ?? "Blog post",
  };
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return (
      <main className="min-h-screen bg-black text-green-400 grid place-items-center">
        <p>Post not found.</p>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-black text-green-400">
      <section className="container mx-auto px-4 py-20">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-green-400">{post.meta.title}</h1>
          <p className="mt-2 text-sm text-gray-500">{post.meta.date}</p>
          <div className="prose prose-invert mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </section>
    </main>
  );
}


