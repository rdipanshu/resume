import React, { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, Loader2, Check, Github, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import TabLayout from "./TabLayout";
import ContactBg from "../backgrounds/ContactBg";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { profile } from "../../data/portfolio";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const iconFor = (name) => {
  const map = { github: Github, instagram: Instagram, facebook: Facebook, twitter: Twitter, mail: Mail };
  const Icon = map[name] || Mail;
  return <Icon size={18} />;
};

// magnetic hover wrapper
const Magnetic = ({ children, className, ...rest }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <span
      ref={ref}
      className={"magnetic inline-flex " + (className || "")}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </span>
  );
};

const dropIn = {
  hidden: { opacity: 0, y: -40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 18, delay: 0.1 + i * 0.1 },
  }),
};

const ContactTab = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

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
    <TabLayout testId="tab-contact" bg={<ContactBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-24 text-white min-h-screen">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="section-overline text-emerald-300/80 mb-4">· 06 / Contacts</div>
            <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.02]">
              Let&rsquo;s build<br /><span className="text-emerald-300/70">something useful.</span>
            </h2>
            <p className="mt-6 text-white/60 max-w-md">
              A role, a project, or notes to compare — drop a line. I read every message.
            </p>

            <div className="mt-10 space-y-4 text-sm">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-white/80 hover:text-emerald-300 transition-colors" data-testid="contact-email-link">
                <Mail size={16} className="text-emerald-400" /> {profile.email}
              </a>
              <div className="flex items-center gap-3 text-white/70"><Phone size={16} className="text-emerald-400" /> {profile.phone}</div>
              <div className="flex items-center gap-3 text-white/70"><MapPin size={16} className="text-emerald-400" /> {profile.location}</div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              {profile.socials.map((s) => (
                <Magnetic key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="h-11 w-11 rounded-full grid place-items-center border border-emerald-300/25 bg-emerald-300/5 text-emerald-100 hover:bg-emerald-400 hover:text-black transition-colors"
                  >
                    {iconFor(s.icon)}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-7 rounded-2xl border border-emerald-300/15 bg-white/[0.03] backdrop-blur-md p-7 lg:p-9 space-y-5"
            data-testid="contact-form"
            initial="hidden"
            animate="show"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div custom={0} variants={dropIn}>
                <label className="section-overline text-emerald-300/70 block mb-2">Name</label>
                <Input value={form.name} onChange={update("name")} placeholder="Jane Doe" data-testid="contact-name-input" className="bg-white/5 border-white/10 text-white" />
              </motion.div>
              <motion.div custom={1} variants={dropIn}>
                <label className="section-overline text-emerald-300/70 block mb-2">Email</label>
                <Input type="email" value={form.email} onChange={update("email")} placeholder="jane@company.com" data-testid="contact-email-input" className="bg-white/5 border-white/10 text-white" />
              </motion.div>
            </div>
            <motion.div custom={2} variants={dropIn}>
              <label className="section-overline text-emerald-300/70 block mb-2">Subject</label>
              <Input value={form.subject} onChange={update("subject")} placeholder="What's this about?" data-testid="contact-subject-input" className="bg-white/5 border-white/10 text-white" />
            </motion.div>
            <motion.div custom={3} variants={dropIn}>
              <label className="section-overline text-emerald-300/70 block mb-2">Message</label>
              <Textarea value={form.message} onChange={update("message")} placeholder="Tell me a little about it..." rows={5} data-testid="contact-message-input" className="bg-white/5 border-white/10 text-white" />
            </motion.div>

            <Magnetic className="w-full">
              <button
                type="submit"
                disabled={status === "loading"}
                data-testid="contact-submit-btn"
                className="w-full h-12 rounded-xl bg-emerald-400 text-black font-semibold flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors disabled:opacity-60"
              >
                {status === "loading" && <Loader2 size={18} className="animate-spin" />}
                {status === "success" && <Check size={18} />}
                {status === "idle" && <Send size={18} />}
                {status === "success" ? "Sent" : status === "loading" ? "Sending..." : "Send message"}
              </button>
            </Magnetic>
          </motion.form>
        </div>

        <div className="mx-auto max-w-7xl mt-20 pt-8 border-t border-white/10 text-xs text-white/40 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
          <span className="font-mono-accent">Built &amp; burned with intent</span>
        </div>
      </section>
    </TabLayout>
  );
};

export default ContactTab;
