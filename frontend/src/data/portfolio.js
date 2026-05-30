// Sample placeholder content — user will replace with real info later
export const profile = {
  firstName: "Alex",
  lastName: "Mercer",
  title: "Senior Software Engineer",
  tagline:
    "I design and ship resilient cloud platforms — turning complex systems into calm, reliable products.",
  location: "Bengaluru, India",
  email: "alex.mercer@example.com",
  phone: "+91 98XXX XXXXX",
  availability: "Open to senior IC & staff roles",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X / Twitter", href: "https://x.com" },
  ],
  portrait:
    "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
};

export const about = {
  body: [
    "I'm a software engineer with 8+ years building distributed systems, developer platforms, and customer-facing apps across fintech and SaaS.",
    "I care deeply about clarity — clean APIs, fast feedback loops, and teams that ship without drama. Recently I've been focused on Kubernetes-native platforms, event-driven architectures, and AI-assisted developer tooling.",
  ],
  stats: [
    { label: "Years in IT", value: "8+" },
    { label: "Projects shipped", value: "40+" },
    { label: "Engineers mentored", value: "25" },
    { label: "Open source stars", value: "3.2k" },
  ],
};

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Nimbus Cloud Labs",
    period: "2022 — Present",
    location: "Remote",
    points: [
      "Led the migration of the billing platform to an event-driven architecture, cutting reconciliation latency by 78%.",
      "Built an internal developer platform on Kubernetes adopted by 14 teams across the org.",
      "Mentored 6 engineers; introduced an RFC process now used company-wide.",
    ],
  },
  {
    role: "Software Engineer II",
    company: "Quark Fintech",
    period: "2019 — 2022",
    location: "Bengaluru",
    points: [
      "Owned the payments orchestration service handling ~$120M / month at p99 < 240ms.",
      "Designed a typed feature-flag SDK shipped to web, iOS, and Android clients.",
      "Drove SOC 2 evidence automation across 8 services.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Orbit Studios",
    period: "2017 — 2019",
    location: "Pune",
    points: [
      "Built customer-facing React apps used by 200k+ monthly users.",
      "Set up the company's first CI/CD pipeline on GitHub Actions.",
    ],
  },
];

export const education = [
  {
    school: "Indian Institute of Technology, Bombay",
    degree: "B.Tech, Computer Science & Engineering",
    period: "2013 — 2017",
    note: "Graduated with honors. Thesis on distributed consensus.",
  },
  {
    school: "Delhi Public School, R.K. Puram",
    degree: "Higher Secondary, PCM + Computer Science",
    period: "2011 — 2013",
    note: "School topper, Computer Science.",
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Go", "Rust", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "gRPC", "GraphQL", "Postgres", "MongoDB"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "GCP", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    category: "Practice",
    items: ["System design", "DDD", "Observability", "Mentoring"],
  },
];

export const projects = [
  {
    title: "Helios — internal developer platform",
    summary:
      "A Kubernetes-native platform giving teams self-serve environments, golden paths, and one-click rollbacks.",
    stack: ["Go", "Kubernetes", "Terraform", "Next.js"],
    href: "#",
    image:
      "https://images.unsplash.com/photo-1776702701448-36220108225d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1100",
    size: "lg",
  },
  {
    title: "Drift — usage-based billing engine",
    summary: "Event-sourced billing for SaaS — flexible pricing, audit-grade ledger.",
    stack: ["Python", "Kafka", "Postgres"],
    href: "#",
    image:
      "https://images.pexels.com/photos/10054188/pexels-photo-10054188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    size: "md",
  },
  {
    title: "Pager Therapy",
    summary:
      "An OSS toolkit that turns noisy on-call alerts into clean, deduped incidents.",
    stack: ["TypeScript", "Deno", "SQLite"],
    href: "#",
    image:
      "https://images.unsplash.com/photo-1778585037417-c7ba22d42160?crop=entropy&cs=srgb&fm=jpg&q=85&w=1100",
    size: "md",
  },
];

export const certifications = [
  { name: "AWS Certified Solutions Architect — Professional", issuer: "Amazon Web Services", year: "2024" },
  { name: "CKA — Certified Kubernetes Administrator", issuer: "CNCF", year: "2023" },
  { name: "Google Professional Cloud Architect", issuer: "Google Cloud", year: "2022" },
  { name: "HashiCorp Certified: Terraform Associate", issuer: "HashiCorp", year: "2021" },
];

export const testimonials = [
  {
    quote:
      "Alex is the rare engineer who can hold the architecture in their head and still write the cleanest pull request on the team.",
    name: "Priya Raman",
    role: "VP Engineering, Nimbus Cloud Labs",
  },
  {
    quote:
      "Calm under pressure, ruthless about clarity. Our incident response improved the day Alex joined.",
    name: "Daniel Okoye",
    role: "Staff SRE, Quark Fintech",
  },
  {
    quote:
      "A force multiplier — Alex makes everyone around them ship better software.",
    name: "Maria Costa",
    role: "Product Lead, Orbit Studios",
  },
];

export const blog = [
  {
    title: "Designing internal platforms that engineers actually use",
    date: "Nov 2025",
    readTime: "8 min",
    href: "#",
  },
  {
    title: "Event sourcing without the regret — a pragmatic guide",
    date: "Sep 2025",
    readTime: "12 min",
    href: "#",
  },
  {
    title: "The quiet power of small, boring architectures",
    date: "Jul 2025",
    readTime: "6 min",
    href: "#",
  },
];
