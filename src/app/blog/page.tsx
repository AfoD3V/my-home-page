import { getAllPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog | Roman Afonin",
  description: "Articles about ML Engineering, AI, Data, and DevOps",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="min-h-screen bg-black text-green-400">
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-3">Blog</h1>
          <p className="text-gray-400">Notes on ML/AI, Data, and DevOps</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-green-500/30 bg-black/50 p-6 transition hover:border-green-500/60 hover:bg-green-500/5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-green-400">{post.title}</h2>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              {post.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                  <span key={t} className="rounded border border-green-500/30 px-2 py-0.5 text-xs text-green-300">
                    {t}
                  </span>
                  ))}
                </div>
              ) : null}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}


