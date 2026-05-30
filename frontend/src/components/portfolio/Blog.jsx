import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { blog } from "../../data/portfolio";

const Blog = () => {
  return (
    <section id="blog" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10">
          <div className="lg:col-span-4">
            <div className="font-mono-accent text-muted-foreground mb-4">· 08 / WRITING</div>
            <h2 className="font-heading text-3xl lg:text-4xl tracking-tight">
              Notes & essays.
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-6 text-muted-foreground leading-relaxed">
            Occasional writing on engineering, platforms, and team dynamics.
          </p>
        </div>

        <ul className="border-t border-border">
          {blog.map((post, i) => (
            <motion.li
              key={post.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="border-b border-border"
            >
              <a
                href={post.href}
                data-testid={`blog-post-${i}`}
                className="group grid grid-cols-12 items-baseline gap-4 py-6 hover:bg-secondary/30 transition-colors px-1"
              >
                <div className="col-span-2 sm:col-span-1 font-mono-accent text-muted-foreground">
                  0{i + 1}
                </div>
                <div className="col-span-10 sm:col-span-7 font-heading text-lg sm:text-xl tracking-tight group-hover:text-accent transition-colors">
                  {post.title}
                </div>
                <div className="hidden sm:block col-span-2 text-sm text-muted-foreground">
                  {post.readTime}
                </div>
                <div className="col-span-12 sm:col-span-2 text-sm text-muted-foreground flex items-center justify-between sm:justify-end gap-2">
                  {post.date}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blog;
