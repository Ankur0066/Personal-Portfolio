import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import LiquidEther from "@/components/LiquidEther";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Mail,
  Menu,
  SplinePointer,
  Terminal,
  X,
} from "lucide-react";
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import TechHorizontalGallery from "@/components/TechHorizontalGallery";

const navItems = [
  ["01", "tech", "Tech"],
  ["02", "experience", "Experience"],
  ["03", "education", "Education"],
  ["04", "projects", "Projects"],
  ["05", "blogs", "Blogs"],
  ["06", "contact", "Contact"],
];

const experience = [
  [
    "APRIL 2025 — NOW",
    "Junior Software Developer",
    "Can Image Media Tech",
    "Working on backend automation with AI, server-side rendering, and frontend development using Next.js, TypeScript, and Ant Design. Building reliable application workflows while contributing across backend and frontend systems.",
  ],
  [
    "NOV 2024 — MAR 2025",
    "Backend Developer Intern",
    "Macson India",
    "Automated challan and bill email dispatch using SQL Server Agent and Database Mail, reducing manual effort by 80% and processing time by 60% in a logistics application.",
  ],
  [
    "JUNE 2024 — NOV 2024",
    "Frontend Developer Intern",
    "Startly Ecosystem",
    "Built responsive React.js interfaces, integrated RESTful APIs, and created Cypress test cases to improve user interactions and application reliability.",
  ],
];

const projects = [
  {
    number: "01",
    title: "StockXchange",
    description:
      "A backend-focused stock trading platform that fetches live market data and provides portfolio tracking and smart insights.",
    tags: ["Next.js", "TypeScript", "MS SQL", "Prisma"],
    accent: "from-lime-300/20 via-lime-300/5 to-transparent",
  },
  {
    number: "02",
    title: "Mentor Connect",
    description:
      "A mentor-mentee platform with scheduling, chat, role-based access control, and secure API-driven communication.",
    tags: ["Java", "Spring Boot", "MySQL", "WebSocket"],
    accent: "from-cyan-300/20 via-cyan-300/5 to-transparent",
  },
  {
    number: "03",
    title: "Fuel Delivery System",
    description:
      "A full-stack platform connecting customers, fuel suppliers, distributors, and station owners to streamline fuel scheduling and delivery.",
    tags: ["MERN", "TypeScript", "Node.js", "React"],
    accent: "from-violet-300/20 via-violet-300/5 to-transparent",
  },
];

const posts = [
  [
    "BUILDING IN PUBLIC",
    "Designing for the pause between states",
    "How intentional motion and good empty states make interfaces easier to understand.",
    "6 min read",
  ],
  [
    "ENGINEERING",
    "A small guide to calmer React",
    "Patterns I use to keep components expressive without turning them into a puzzle.",
    "8 min read",
  ],
  [
    "PROCESS",
    "The case for shipping less",
    "What happens when you trade feature volume for a deeper understanding of the problem.",
    "5 min read",
  ],
];
const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spotlight-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spotlight-y",
      `${event.clientY - bounds.top}px`,
    );
  };
  return (
    <article
      onMouseMove={handleMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-soft p-6 transition-all duration-500 hover:border-signal/40 hover:shadow-glow before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(240px_circle_at_var(--spotlight-x)_var(--spotlight-y),hsl(var(--signal)/.13),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 ${className}`}
    >
      {children}
    </article>
  );
}
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const experienceRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start 70%", "end 70%"],
  });
  const ropeProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
  });
  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveProject((current) => (current + 1) % projects.length),
      4200,
    );
    return () => window.clearInterval(timer);
  }, []);

  
const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
 
  event.preventDefault();
  const form = event.currentTarget;

  const formData = new FormData(form);
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("projectType"),
    message: formData.get("message"),
  };

  setLoading(true);

  
  try {
    
    const response = await fetch(
      "https://ankur-writes.vercel.app/api/contact/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );


    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to send message");
    }
    setSubmitted(true);
    form.reset();
    console.log("Contact form submitted:", data);
  } catch (error) {
    console.error("Contact form submission failed:", error);
  }
  finally{
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen overflow-x-clip bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            onClick={() => navigate("intro")}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal text-ink shadow-glow transition-transform group-hover:rotate-12">
              <Code2 size={19} strokeWidth={2.5} />
            </span>
            <span className="font-mono text-sm font-medium tracking-tight">
              Ankur.dev
            </span>
          </button>
          <nav
            className="hidden items-center gap-4 2xl:flex"
            aria-label="Main navigation"
          >
            {navItems.map(([num, id, label]) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className="group flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:text-signal"
              >
                <span className="text-signal/60">{num}</span>
                {label}
                <span className="h-px w-0 bg-signal transition-all group-hover:w-3" />
              </button>
            ))}
          </nav>
          <button
            className="hidden rounded-full border border-signal/50 px-4 py-2 font-mono text-xs text-signal transition-all hover:bg-signal hover:text-ink md:block"
            onClick={() => navigate("contact")}
          >
            Let&apos;s talk ↗
          </button>
          <button
            className="text-foreground 2xl:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/[0.07] bg-background px-6 py-5 2xl:hidden">
            <div className="grid grid-cols-2 gap-5">
              {navItems.map(([num, id, label]) => (
                <button
                  key={id}
                  onClick={() => navigate(id)}
                  className="flex items-center gap-3 text-left font-mono text-sm text-muted-foreground"
                >
                  <span className="text-signal">{num}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
      <section
        id="intro"
        className="relative mx-auto flex min-h-screen max-w-7xl items-center overflow-hidden px-6 pb-20 pt-32 lg:px-10"
      >
        {/* Liquid Ether Background */}
        <LiquidEther
          colors={[
            "#B8FF4A", // lime
            "#00E5FF", // cyan
            "#7C3AED", // violet
          ]}
          backgroundColor="#080B12"
          lightMode={false}
          autoDemo={true}
          autoSpeed={0.35}
          autoIntensity={2.8}
          autoRampDuration={0.8}
          autoResumeDelay={1000}
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "auto",
          }}
        />

        {/* Dark overlay */}
        <div
          className="
    pointer-events-none
    absolute inset-0
    z-[1]
    bg-background/20
    [mask-image:linear-gradient(to_bottom,black,transparent_85%)]
  "
        />

        {/* Grid */}
        <div
          className="
    pointer-events-none
    grid-bg absolute inset-0
    z-[2]
    opacity-20
    [mask-image:linear-gradient(to_bottom,black,transparent_85%)]
  "
        />

        {/* Decorative glow */}
        <div className="pointer-events-none absolute right-[9%] top-[18%] z-[3] h-56 w-56 animate-float rounded-full bg-signal/10 blur-3xl" />

        {/* HERO CONTENT */}
        <div className="relative z-10 grid w-full gap-16 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center gap-3 font-mono text-xs text-signal"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              SOFTWARE ENGINEER · FULL STACK · 2026
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.15,
                  },
                },
              }}
              className="max-w-4xl text-balance text-6xl font-semibold leading-[.94] tracking-[-0.07em] sm:text-8xl lg:text-[clamp(5rem,10vw,9.5rem)]"
            >
              <motion.span variants={reveal} className="inline-block">
                I build{" "}
              </motion.span>

              <motion.span
                variants={reveal}
                className="inline-block text-signal"
              >
                Scalable
              </motion.span>

              <br />

              <motion.span
                variants={reveal}
                className="inline-block text-stroke"
              >
                Software
              </motion.span>

              <motion.span variants={reveal} className="inline-block">
                {" "}
                that matter.
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-center"
            >
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
                Software engineer focused on backend systems, RESTful APIs, and
                reliable data-driven applications with Node.js, MS SQL, React,
                and Next.js.
              </p>

              <button
                onClick={() => navigate("tech")}
                className="group flex w-fit items-center gap-3 rounded-full bg-signal px-5 py-3 font-mono text-xs font-medium text-ink transition-transform hover:-translate-y-1"
              >
                Explore my Skills
                <ArrowDown
                  size={15}
                  className="transition-transform group-hover:translate-y-1"
                />
              </button>
            </motion.div>
          </div>

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="hidden justify-self-end lg:block"
          >
            <div className="relative w-72 overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/80 p-5 shadow-2xl shadow-black/30">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">
                  ~/ankur/profile.ts
                </span>

                <Terminal size={14} className="text-signal" />
              </div>

              <pre className="font-mono text-xs leading-7 text-muted-foreground">
                <code>
                  <span className="text-violet-300">const</span>{" "}
                  <span className="text-signal">ankur</span> = {"{"}
                  {"\n"} role:{" "}
                  <span className="text-amber-200">
                    &quot;software engineer&quot;
                  </span>
                  ,{"\n"} focus: [
                  <span className="text-amber-200">&quot;backend&quot;</span>],
                  {"\n"} stack: [
                  <span className="text-amber-200">&quot;Node.js&quot;</span>],
                  {"\n"} database:{" "}
                  <span className="text-amber-200">&quot;MS SQL&quot;</span>
                  {"\n"}
                  {"}"}
                </code>
              </pre>

              <div className="mt-5 h-px bg-white/10" />

              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span>status</span>
                <span className="text-signal">● online</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-6 z-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground lg:left-10">
          <span className="h-8 w-px bg-signal" />
          Scroll to explore
        </div>
      </section>

      <section id="tech" className="relative bg-background">
        {/* Heading */}
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pb-20 lg:px-10 lg:pt-36">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="mb-5 font-mono text-xs tracking-widest text-signal">
                  01 / TECHNOLOGIES
                </p>

                <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  Technologies I use
                  <br />
                  <span className="text-muted-foreground">
                    to build reliable systems.
                  </span>
                </h2>
              </div>

              <p className="max-w-sm font-mono text-xs leading-relaxed text-muted-foreground">
                A practical stack for building maintainable backends, APIs, and
                modern web applications.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Sticky horizontal gallery */}
        <TechHorizontalGallery />
      </section>

      <section
        id="experience"
        className="border-y border-white/[0.07] bg-ink-soft/40"
      >
        <div
          ref={experienceRef}
          className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:px-10 lg:py-28"
        >
          {/* LEFT — stays fixed */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 font-mono text-xs text-signal">
              02 / EXPERIENCE
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              Experience
              <br />
              <span className="text-muted-foreground">
                that shaped how I build.
              </span>
            </h2>

            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A few chapters of building, learning, and helping teams make their
              best products.
            </p>
          </Reveal>

          {/* RIGHT — scrollable experiences */}
          <div className="relative min-h-0">
            <div
              className="
          relative
          max-h-[70vh]
          overflow-y-auto
          pr-3
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-white/10
          hover:scrollbar-thumb-white/20
          lg:max-h-[680px]
        "
            >
              {/* Timeline line */}
              <motion.div
                style={{
                  scaleY: ropeProgress,
                  originY: 0,
                }}
                className="
            absolute
            bottom-0
            left-[7px]
            top-0
            w-px
            bg-gradient-to-b
            from-signal
            via-signal/70
            to-transparent
            sm:left-[15px]
          "
              />

              {experience.map(([date, role, company, description], index) => (
                <motion.article
                  key={`${role}-${company}-${index}`}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-50px",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="
                relative
                border-b
                border-white/10
                pb-10
                pl-8
                pt-2
                last:border-0
                last:pb-4
                sm:pb-12
                sm:pl-12
              "
                >
                  {/* Timeline dot */}
                  <span
                    className="
                  absolute
                  -left-[33px]
                  top-2
                  flex
                  h-4
                  w-4
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-signal
                  bg-background
                  shadow-glow
                  sm:-left-[41px]
                "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                  </span>

                  {/* Date + Company */}
                  <div className="mb-4 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="font-mono text-xs text-signal">
                      {date}
                    </span>

                    <span className="font-mono text-xs text-muted-foreground">
                      {company}
                    </span>
                  </div>

                  {/* Role */}
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                    {role}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="education"
        className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-32"
      >
        <Reveal className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="mb-4 font-mono text-xs text-signal">03 / EDUCATION</p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Always
              <br />
              <span className="text-muted-foreground">learning.</span>
            </h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink-soft p-7 sm:p-10">
            <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 sm:flex-row">
              <div>
                <h3 className="text-2xl font-medium">BE Computer Science</h3>
                <p className="mt-2 font-mono text-xs text-yellow-100">
                  St. John College of Engineering and Management
                </p>

                <p className="mt-2 font-mono text-xs text-red-500">
                  University of Mumbai
                </p>
              </div>

              <span className="font-mono text-xs text-muted-foreground">
                2021 — 2025
              </span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 p-4">
                <p className="font-mono text-[10px] text-muted-foreground">
                  CGPA
                </p>
                <p className="mt-2 text-2xl text-signal">7.6</p>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <p className="font-mono text-[10px] text-muted-foreground">
                  DATA SCIENCE
                </p>
                <p className="mt-2 text-2xl text-signal">9.0</p>
              </div>
            </div>

            <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
              Enigneering&apos;s degree in Computer Science with an Honors
              specialization in Data Science, building a strong foundation in
              software engineering, data, and application development.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "NSS Volunteer",
                "GDSC PR Head",
                "Technical Event Coordinator",
                "Hackathon Participant",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-white/20 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="projects"
        className="border-y border-white/[0.07] bg-ink-soft/40 py-28 lg:py-36"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 font-mono text-xs tracking-wider text-signal">
                04 / SELECTED PROJECTS
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Built with
                <br />
                <span className="text-muted-foreground">
                  care and curiosity.
                </span>
              </h2>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setActiveProject(
                    (activeProject - 1 + projects.length) % projects.length,
                  )
                }
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all duration-300 hover:border-signal hover:bg-signal/10 hover:text-signal"
                aria-label="Previous project"
              >
                <ArrowLeft
                  size={17}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
              </button>

              <div className="min-w-[70px] text-center font-mono text-xs">
                <span className="text-signal">
                  {String(activeProject + 1).padStart(2, "0")}
                </span>
                <span className="mx-1 text-white/20">/</span>
                <span className="text-muted-foreground">
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              <button
                onClick={() =>
                  setActiveProject((activeProject + 1) % projects.length)
                }
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all duration-300 hover:border-signal hover:bg-signal/10 hover:text-signal"
                aria-label="Next project"
              >
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </Reveal>

          {/* Carousel */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `-${activeProject * 100}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
              }}
            >
              {projects.map((project, index) => (
                <div key={project.number} className="w-full shrink-0 px-1">
                  <motion.div
                    animate={{
                      scale: index === activeProject ? 1 : 0.96,
                      opacity: index === activeProject ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <SpotlightCard className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 p-7 sm:min-h-[390px] sm:p-10">
                      {/* Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-50`}
                      />

                      {/* Content */}
                      <div className="relative flex min-h-[300px] flex-col justify-between">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-signal">
                            {project.number}
                          </span>

                          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            Case Study / 2024
                          </span>
                        </div>

                        {/* Main */}
                        <div className="mt-16">
                          {/* Tags */}
                          <div className="mb-5 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-black/10 px-3 py-1 font-mono text-[10px] text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <h3 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                            {project.title}
                          </h3>

                          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                            {project.description}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-10 flex items-center justify-between">
                          <button
                            onClick={() => navigate("contact")}
                            className="group flex items-center gap-2 font-mono text-xs text-signal transition-colors hover:text-white"
                          >
                            Discuss a similar project
                            <ArrowUpRight
                              size={15}
                              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                          </button>

                          <span className="font-mono text-[10px] text-white/30">
                            {String(index + 1).padStart(2, "0")} /{" "}
                            {String(projects.length).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel indicators */}
          <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {projects.map((project, index) => (
                <button
                  key={project.number}
                  onClick={() => setActiveProject(index)}
                  aria-label={`Show ${project.title}`}
                  className="group flex h-4 items-center"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      index === activeProject
                        ? "w-10 bg-signal"
                        : "w-3 bg-white/20 group-hover:w-5 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Swipe / Explore
            </span>
          </div>
        </div>
      </section>

      <section
        id="blogs"
        className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36"
      >
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-soft">
            {/* Background glow */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-signal/10 blur-3xl transition-all duration-700 group-hover:bg-signal/20" />

            <div className="absolute inset-0 opacity-[0.035]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                  backgroundSize: "45px 45px",
                }}
              />
            </div>

            <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1.4fr_.6fr] lg:p-16">
              {/* Main content */}
              <div>
                <p className="mb-5 font-mono text-xs tracking-widest text-signal">
                  05 / WRITING & THOUGHTS
                </p>

                <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  I write about
                  <br />
                  <span className="text-muted-foreground">things I build.</span>
                </h2>

                <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Notes, experiments, lessons, and ideas from my journey through
                  software development — from building products to exploring new
                  technologies.
                </p>

                <a
                  href="https://ankur-writes.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-10 inline-flex items-center gap-3 rounded-full border border-signal/40 bg-signal/10 px-6 py-3 font-mono text-xs text-signal transition-all duration-300 hover:bg-signal hover:text-black"
                >
                  Visit my blog
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                  />
                </a>
              </div>

              {/* Right side */}
              <div className="flex flex-col justify-between lg:items-end lg:text-right">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    My writing space
                  </span>

                  <div className="mt-5 text-5xl font-semibold tracking-tight text-white/10 transition-colors duration-500 group-hover:text-signal/20 sm:text-7xl">
                    BLOG
                  </div>
                </div>

                <div className="mt-10 lg:mt-0">
                  <p className="font-mono text-xs text-muted-foreground">
                    ENGINEERING / LEARNING / IDEAS
                  </p>

                  <div className="mt-4 h-px w-32 bg-white/10 lg:ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <section
        id="contact"
        className="relative mx-auto max-w-7xl overflow-hidden px-6 py-28 lg:px-10 lg:py-40"
      >
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-signal/10 blur-3xl" />
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-24">
          <Reveal>
            <p className="mb-5 font-mono text-xs text-signal">06 / CONTACT</p>
            <h2 className="text-5xl font-semibold leading-[.95] tracking-[-0.06em] sm:text-7xl">
              Let&apos;s make
              <br />
              <span className="text-muted-foreground">something good.</span>
            </h2>
            <p className="mt-8 max-w-sm leading-relaxed text-muted-foreground">
              Have a project, a question, or just want to say hello? Drop me a
              line and I&apos;ll get back to you soon.
            </p>
            <a
              href="mailto:hello@jordan.dev"
              className="mt-8 flex w-fit items-center gap-3 font-mono text-sm text-signal"
            >
              hireeankur2025@gmail.com <ArrowUpRight size={17} />
            </a>
          </Reveal>
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-ink-soft p-6 sm:p-8"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="font-mono text-xs text-muted-foreground">
                  Your name
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Ankur Tiwari"
                    className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-display text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-signal"
                  />
                </label>
                <label className="font-mono text-xs text-muted-foreground">
                  Email address
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="hireeankur2025@gmail.com"
                    className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-display text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-signal"
                  />
                </label>
              </div>
              <label className="mt-7 block font-mono text-xs text-muted-foreground">
                What are we making?
                <select
                  name="projectType"
                  defaultValue=""
                  className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-display text-base text-foreground outline-none transition-colors focus:border-signal"
                >
                  <option value="" disabled className="bg-ink-soft">
                    Select Requirement
                  </option>
                  <option className="bg-ink-soft">Hiring opportunity</option>
                  <option className="bg-ink-soft">Let's connect</option>
                  <option className="bg-ink-soft">Interesting project</option>
                  <option className="bg-ink-soft">Need development help</option>
                  <option className="bg-ink-soft">Freelance opportunity</option>
                  <option className="bg-ink-soft">
                    Just want to say hello
                  </option>
                  <option className="bg-ink-soft">Something else</option>
                </select>
              </label>
              <label className="mt-7 block font-mono text-xs text-muted-foreground">
                Tell me a little more
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="A few words about your idea..."
                  className="mt-3 w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 font-display text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-signal"
                />
              </label>
              <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
  <button
    type="submit"
    disabled={loading}
    className="group flex items-center gap-3 rounded-full bg-signal px-5 py-3 font-mono text-xs font-medium text-ink transition-transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
  >
    {loading ? "Sending..." : "Send message"}

    {loading ? (
      <SplinePointer size={15} />
    ) : (
      <ArrowUpRight size={15} />
    )}
  </button>

  {submitted && (
    <span className="font-mono text-[10px] text-signal">
      Thanks — I&apos;ll be in touch.
    </span>
  )}
</div>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row">
          <span>© 2025 Ankur Tiwari</span>
          <div className="flex gap-5">
            <a
              href="https://github.com/Ankur0066"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-signal"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-signal"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hireeankur2025@gmail.com"
              className="transition-colors hover:text-signal"
            >
              Email
            </a>
            <a
              href="https://ankur-writes.vercel.app/"
              className="transition-colors hover:text-signal"
            >
              Blogs
            </a>
          </div>
          <button
            onClick={() => navigate("intro")}
            className="text-left transition-colors hover:text-signal"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </main>
  );
}
