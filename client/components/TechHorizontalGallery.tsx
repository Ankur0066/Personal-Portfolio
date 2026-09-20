import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const technologies = [
  {
    number: "01",
    icon: "JS",
    title: "JavaScript",
    description:
      "Building scalable application logic, async workflows, and reliable backend services.",
    snippet: "const result = await service.execute();",
  },
  {
    number: "02",
    icon: "TS",
    title: "TypeScript",
    description:
      "Using strong typing to keep large frontend and backend codebases predictable and maintainable.",
    snippet: "type Response<T> = { data: T; error?: string };",
  },
  {
    number: "03",
    icon: "RE",
    title: "React",
    description:
      "Creating responsive interfaces with reusable components, state management, and clean UI architecture.",
    snippet: "const { data, loading } = useQuery();",
  },
  {
    number: "04",
    icon: "ND",
    title: "Node.js",
    description:
      "Developing REST APIs, authentication flows, business logic, and backend integrations.",
    snippet: "router.post('/api/resource', verifyToken);",
  },
  {
    number: "05",
    icon: "SQL",
    title: "MS SQL",
    description:
      "Designing queries, stored procedures, relationships, and data-heavy application workflows.",
    snippet: "EXEC sp_ProjectMaster @flag = 'GET';",
  },
  {
    number: "06",
    icon: "EX",
    title: "Express",
    description:
      "Structuring backend APIs with middleware, validation, authentication, and service layers.",
    snippet: "app.use('/api', authenticatedRoutes);",
  },
  {
    number: "07",
    icon: "NX",
    title: "Next.js",
    description:
      "Building modern React applications with routing, server-side capabilities, and optimized rendering.",
    snippet: "export default async function Page() {}",
  },
  {
    number: "08",
    icon: "TW",
    title: "Tailwind",
    description:
      "Building responsive interfaces with utility-first styling and reusable design patterns.",
    snippet: "className='grid gap-4 md:grid-cols-2'",
  },
];

const TechHorizontalGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [distance, setDistance] = useState(0);

  /*
   * Calculate the exact amount the gallery
   * needs to move horizontally.
   */
  useEffect(() => {
    const calculateDistance = () => {
      if (!galleryRef.current) return;

      const galleryWidth = galleryRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      const maxDistance = Math.max(
        0,
        galleryWidth - viewportWidth
      );

      setDistance(maxDistance);
    };

    calculateDistance();

    const resizeObserver = new ResizeObserver(
      calculateDistance
    );

    if (galleryRef.current) {
      resizeObserver.observe(galleryRef.current);
    }

    window.addEventListener(
      "resize",
      calculateDistance
    );

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener(
        "resize",
        calculateDistance
      );
    };
  }, []);

  /*
   * Track vertical scrolling only while this
   * section is active.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * Convert vertical scroll progress
   * into horizontal movement.
   */
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -distance]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[450vh]"
    >
      {/* 
        THIS is the viewport that stays fixed.
        It occupies exactly one screen.
      */}
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        
        <motion.div
          ref={galleryRef}
          style={{ x }}
          className="
            flex
            w-max
            items-center
            gap-5
            pl-[6vw]
            pr-[6vw]
            will-change-transform

            max-sm:gap-4
            max-sm:pl-5
            max-sm:pr-5
          "
        >
          {technologies.map(
            ({
              number,
              icon,
              title,
              description,
              snippet,
            }) => (
              <motion.article
                key={title}
                whileHover={{ y: -8 }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="
                  group
                  relative
                  flex
                  h-[520px]
                  w-[430px]
                  shrink-0
                  flex-col
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-ink-soft
                  p-7
                  transition-colors
                  duration-300
                  hover:border-signal/40

                  max-sm:h-[430px]
                  max-sm:w-[calc(100vw-40px)]
                  max-sm:p-5

                  sm:h-[480px]
                  sm:w-[420px]

                  lg:h-[520px]
                  lg:w-[460px]
                "
              >
                {/* Background number */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    -right-5
                    -top-5
                    select-none
                    font-mono
                    text-[150px]
                    font-bold
                    leading-none
                    text-white/[0.025]
                  "
                >
                  {number}
                </span>

                {/* Card header */}
                <div className="relative flex items-start justify-between">
                  <span
                    className="
                      flex
                      h-12
                      min-w-12
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-signal/25
                      bg-signal/10
                      px-3
                      font-mono
                      text-sm
                      font-medium
                      text-signal
                      transition-transform
                      duration-300
                      group-hover:rotate-6
                    "
                  >
                    {icon}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="
                      text-muted-foreground
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-signal
                    "
                  />
                </div>

                {/* Card content */}
                <div className="relative mt-auto">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-signal/60">
                    Technology / {number}
                  </p>

                  <h3
                    className="
                      text-3xl
                      font-semibold
                      tracking-[-0.04em]
                      sm:text-4xl
                    "
                  >
                    {title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>

                  {/* Code block */}
                  <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.07] bg-background/70">
                    <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    </div>

                    <pre className="overflow-x-auto p-3 font-mono text-[10px] leading-5 text-signal/70 sm:text-xs">
                      <code>{snippet}</code>
                    </pre>
                  </div>
                </div>

                {/* Hover border */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-3xl
                    border
                    border-transparent
                    transition-colors
                    duration-300
                    group-hover:border-signal/30
                  "
                />
              </motion.article>
            )
          )}
        </motion.div>

        {/* Progress */}
        <div
          className="
            absolute
            bottom-8
            left-1/2
            w-[70%]
            max-w-2xl
            -translate-x-1/2
            max-sm:w-[calc(100%-40px)]
          "
        >
          <div className="h-px w-full bg-white/10">
            <motion.div
              style={{
                scaleX: scrollYProgress,
                transformOrigin: "left",
              }}
              className="h-full bg-signal"
            />
          </div>
        </div>

        {/* Scroll label */}
        <div
          className="
            absolute
            bottom-12
            left-6
            font-mono
            text-[10px]
            uppercase
            tracking-widest
            text-muted-foreground
            lg:left-10
            max-sm:bottom-14
          "
        >
          Scroll →
        </div>
      </div>
    </section>
  );
};

export default TechHorizontalGallery;