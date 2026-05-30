import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { profile } from "../../data/portfolio";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setStatus("loading");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("success");
      toast.success("Message sent. I'll reply within 2 business days.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("idle");
      const detail = err?.response?.data?.detail || "Could not send. Please try again.";
      toast.error(typeof detail === "string" ? detail : "Could not send. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-28 lg:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <div className="font-mono-accent text-muted-foreground mb-4">· 09 / CONTACT</div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
            Let's build <br />
            <span className="text-muted-foreground">something useful.</span>
          </h2>
          <p className="mt-8 max-w-md text-muted-foreground leading-relaxed">
            Got a role, a project, or just want to compare notes on platforms?
            Drop a line — I read every message.
          </p>
          <div className="mt-10 space-y-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="block link-underline w-fit"
              data-testid="contact-email-link"
            >
              {profile.email}
            </a>
            <span className="block text-muted-foreground">{profile.phone}</span>
            <span className="block text-muted-foreground">{profile.location}</span>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-6 grid-border rounded-md p-7 lg:p-9 bg-card/40 backdrop-blur-sm space-y-6"
          data-testid="contact-form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="font-mono-accent text-muted-foreground block mb-2">Name</label>
              <Input
                value={form.name}
                onChange={update("name")}
                placeholder="Jane Doe"
                data-testid="contact-name-input"
                className="rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-accent"
              />
            </div>
            <div>
              <label className="font-mono-accent text-muted-foreground block mb-2">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@company.com"
                data-testid="contact-email-input"
                className="rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-accent"
              />
            </div>
          </div>
          <div>
            <label className="font-mono-accent text-muted-foreground block mb-2">Subject</label>
            <Input
              value={form.subject}
              onChange={update("subject")}
              placeholder="Optional"
              data-testid="contact-subject-input"
              className="rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-accent"
            />
          </div>
          <div>
            <label className="font-mono-accent text-muted-foreground block mb-2">Message</label>
            <Textarea
              rows={5}
              value={form.message}
              onChange={update("message")}
              placeholder="Tell me a little about the project..."
              data-testid="contact-message-input"
              className="rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-accent resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              No spam — I'll only use this to reply.
            </span>
            <Button
              type="submit"
              disabled={status === "loading"}
              data-testid="contact-submit-button"
              className="rounded-full h-11 px-6"
            >
              {status === "loading" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {status === "success" && <Check className="h-4 w-4 mr-2" />}
              {status === "idle" && <Send className="h-4 w-4 mr-2" />}
              {status === "success" ? "Sent" : "Send message"}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
