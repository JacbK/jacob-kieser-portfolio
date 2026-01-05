import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12 md:py-24 max-w-3xl mx-auto">
      {/* Header / Hero */}
      <header className="mb-24 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-normal tracking-tight mb-4">
          Jacob Kieser
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-xl leading-relaxed mb-6">
          Software Engineer. 
        </p>
        
        <div className="flex gap-5 mt-8 mb-8 text-neutral-500">
          <a href="mailto:jacobk2112@gmail.com" className="hover:text-white transition-colors" aria-label="Email">
            <Mail size={20} strokeWidth={1.5} />
          </a>
          <a href="https://github.com/JacbK" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
            <Github size={20} strokeWidth={1.5} />
          </a>
          <a href="https://linkedin.com/in/jacobkieser" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin size={20} strokeWidth={1.5} />
          </a>
        </div>

        <p className="text-neutral-500 leading-relaxed max-w-xl text-sm md:text-base">
          Originally from Yakima, WA, I moved to Seattle to study Computer Science at the University of Washington. Currently I am working on improving manufacturing productivity at Palantir, but in my free time I enjoy messing with AI tools or other various ventures.
        </p>
      </header>

      {/* Experience Section */}
      <section className="mb-24 animate-fade-in delay-100">
        <h2 className="text-sm font-light text-neutral-500 uppercase tracking-widest mb-12 border-b border-neutral-800 pb-4">
          Experience
        </h2>
        
        <div className="space-y-16">
          <ExperienceItem 
            company="Palantir Technologies"
            role="Forward Deployed Software Engineer"
            period="Nov 2025 – Present"
            description="Warp Speed - TypeScript, GraphQL, Python"
          />
          
          <ExperienceItem 
            company="Uber"
            role="Software Engineer"
            period="Sep 2024 – Nov 2025"
            description="Competitive Intelligence Data Platform - Python, Spark, Hudi, SQL"
          />
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-24 animate-fade-in delay-200">
        <h2 className="text-sm font-light text-neutral-500 uppercase tracking-widest mb-12 border-b border-neutral-800 pb-4">
          Selected Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard 
            title="Vetera"
            description="An AI-powered veterinary care platform modernizing patient pre-screening and clinical documentation for over 20,000 users."
            tech="Next.js, Supabase, OpenAI, Anthropic"
            link="https://veteravet.com"
          />
          <ProjectCard 
            title="Persona"
            description="An intelligent portfolio engine that gathers context from resumes and codebases to generate unique, authentic digital identities."
            tech="Next.js, AI CLI's"
            link="https://jacbk.github.io/persona/"
          />
        </div>
      </section>

      {/* Education */}
      <section className="mb-24 animate-fade-in delay-300">
        <h2 className="text-sm font-light text-neutral-500 uppercase tracking-widest mb-8 border-b border-neutral-800 pb-4">
          Education
        </h2>
        <div>
          <h3 className="text-xl font-normal text-white">University of Washington</h3>
          <div className="flex justify-between items-baseline mt-1">
            <p className="text-neutral-400">Paul G. Allen School of CSE</p>
            <span className="text-sm text-neutral-500">2021 – 2024</span>
          </div>
          <p className="text-neutral-500 mt-2">Bachelor of Science in Computer Science</p>
        </div>
      </section>

      <footer className="text-center text-neutral-600 text-sm pb-12 animate-fade-in delay-300">
        <p>&copy; {new Date().getFullYear()} Jacob Kieser.</p>
      </footer>
    </main>
  );
}

function ExperienceItem({ company, role, period, description }: { company: string, role: string, period: string, description: string }) {
  return (
    <div className="group">
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
        <h3 className="text-2xl font-normal text-white group-hover:text-neutral-200 transition-colors">
          {company}
        </h3>
        <span className="text-sm text-neutral-500 font-mono mt-1 md:mt-0">{period}</span>
      </div>
      <p className="text-lg text-neutral-400 mb-2">{role}</p>
      <p className="text-neutral-500 leading-relaxed max-w-2xl text-sm md:text-base">
        {description}
      </p>
    </div>
  );
}

function ProjectCard({ title, description, tech, link }: { title: string, description: string, tech: string, link?: string }) {
  const Wrapper = link ? Link : 'div';
  const props = link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    // @ts-ignore
    <Wrapper {...props} className="block group p-6 border border-neutral-900 bg-neutral-900/30 hover:bg-neutral-900/60 hover:border-neutral-800 transition-all rounded-sm">
      <h3 className="text-xl font-normal text-white mb-2 group-hover:underline decoration-neutral-600 underline-offset-4">
        {title}
      </h3>
      <p className="text-neutral-400 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className="text-xs text-neutral-600 font-mono uppercase tracking-wider">
        {tech}
      </div>
    </Wrapper>
  );
}
