import mosuraImg from "../assets/projects/Mosura.png";
import senseiImg from "../assets/projects/sensei.png";
import autobotImg from "../assets/projects/Autobot.png";
import synappsesImg from "../assets/projects/synappses.png";
import competishunImg from "../assets/projects/competishun.png";

export const projectsData = [
  {
    id: 5,
    title: "Synappses",
    tags: ["Next.js", "NestJS", "GraphQL", "Redis", "FFmpeg/HLS", "Widevine DRM"],
    year: "2026",
    link: "https://synappses.in",
    image: synappsesImg,
    description: "Scaling Newral's LMS SaaS platform for creator-led education businesses, serving 30K+ users and 2K+ daily students across a microservice and microfrontend architecture."
  },
  {
    id: 6,
    title: "Competishun",
    tags: ["React", "NestJS", "PostgreSQL", "Redis", "Docker"],
    year: "2026",
    link: "https://competishun.com",
    image: competishunImg,
    description: "Optimized the Test Management service for 4K+ concurrent students on mock-test days, load and stress testing with k6 to remove bottlenecks across APIs, services, and infrastructure."
  },
  {
    id: 4,
    title: "AutoBot",
    tags: ["React", "Next.js", "GitHub API", "Tailwind CSS", "SaaS"],
    year: "2026",
    link: "https://github-autobot.vercel.app/",
    image: autobotImg,
    description: "Built an autonomous workflow orchestrator that listens to GitHub events. Through intelligent comparison logic and API integrations, it automates issue triage, priority labeling, and webhook alerts."
  },
  {
    id: 1,
    title: "Mosura",
    tags: ["React", "Next.js", "Three.js", "Framer Motion", "TypeScript"],
    year: "2026",
    link: "https://mosura-eta.vercel.app/",
    image: mosuraImg,
    description: "Built a SaaS landing page using Next.js with 3D elements via Three.js and scroll-driven animations via Framer Motion that kept visitors engaged long enough to convert."
  },
  {
    id: 2,
    title: "Sensei",
    tags: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    year: "2025",
    link: "https://sensei-connect.vercel.app/",
    image: senseiImg,
    description: "Built a full-stack platform where students find alumni mentors, request referrals, and get career guidance without hunting across LinkedIn and cold emails."
  },
  {
    id: 3,
    title: "Tabshit",
    tags: ["Extension", "React", "Chrome API", "Productivity"],
    year: "2026",
    link: "https://chromewebstore.google.com/detail/tabshit/ofleepcdmmmdccnooojlcofgcdcfahlk",
    image: "https://lh3.googleusercontent.com/WDx-Po6zCOUD0tvnEIXysgoSHsB7JSCE0KYTLTnuxe5BqOWwasmAlukLw9B0TliZqJW6FZneYyP0Vc9IU5p4IgS4kg=s1280-w1280-h800",
    description: "Transforms the Chrome new tab into a premium visual workspace with dynamic boards, glassmorphic UI, and productivity tools while maintaining total local privacy."
  }
];
