/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { 
  Github, 
  ExternalLink, 
  ArrowLeft, 
  Mail, 
  Linkedin, 
  Sun, 
  Moon, 
  Layers, 
  Code
} from "lucide-react";

import { PROJECTS, SKILL_CATEGORIES, EXPERIENCE, personalInfo } from "./data";
import MarkdownRenderer from "./components/MarkdownRenderer";
import ConsolePanel from "./components/ConsolePanel";
import { useToast } from "./components/Toast";

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);


export default function App() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hash-based client-side router
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || "#/");

  
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  // Listen to hash changes for lightning-fast routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || "#/");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Sync theme changes to classList
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleNavigate = (route: string) => {
    window.location.hash = route;
  };

  // Extract ID from project routes
  const isProjectView = currentRoute.startsWith("#/project/");
  const activeProjectId = isProjectView ? currentRoute.replace("#/project/", "") : null;
  const activeProject = activeProjectId ? PROJECTS.find(p => p.id === activeProjectId) : null;

  return (
    <div className="app-container">
      {/* HEADER SECTION - Same for both or slightly lighter on detail views */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-8">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight m-0 text-neutral-900 dark:text-neutral-50 animate-fade-in">
              {personalInfo.name}
            </h1>
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-0 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Software Developer
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="px-2.5 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 bg-[#f9f8f4] dark:bg-[#141414] hover:bg-[#eae7df] dark:hover:bg-[#1f1f1f] text-neutral-700 dark:text-neutral-300 transition-all font-mono text-xs cursor-pointer flex items-center gap-1.5"
              aria-label="Toggle visual layout modes"
            >
              {theme === "light" ? (
                <>
                  <Moon size={12} />
                  <span>[ Night ]</span>
                </>
              ) : (
                <>
                  <Sun size={12} />
                  <span>[ Light ]</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* PRIMARY META SOCIALS INDEX */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs font-mono">
          <a href="mailto:vedant.anil.desai@gmail.com" className="flex items-center gap-1 border-b-0 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            <Mail size={12} />
            <span>vedant.anil.desai@gmail.com</span>
          </a>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 border-b-0 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            <Github size={12} />
            <span>github.com/TheVedantDesai</span>
          </a>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 border-b-0 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            <Linkedin size={12} />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </header>

      {/* CORE CONTENT ROUTING FRAME */}
      <main id="portfolio-content">
        {!isProjectView ? (
          /* ==========================================
             HOME / INDEX VIEW
             ========================================== */
          <div className="space-y-12 animate-fade-in">
            
            {/* BIO BRIEF */}
            <section aria-labelledby="section-about">
              <h2 id="section-about" className="font-serif text-lg border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-4 text-slate-900 dark:text-slate-50">
                ~/about_me
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {personalInfo.title}
              </p>
            </section>

            {/* PROJECTS DIRECTORY SECTION */}
            <section aria-labelledby="section-projects">
              <h2 id="section-projects" className="font-serif text-lg border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-4 text-slate-900 dark:text-slate-50">
                ~/projects/
              </h2>
              <div className="space-y-6">
                {PROJECTS.map(project => (
                  <article 
                    key={project.id} 
                    className="p-5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/10 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-200 flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="m-0 font-serif text-base text-slate-900 dark:text-slate-100">
                          <a 
                            href={`#/project/${project.id}`} 
                            className="border-none text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 font-bold transition-colors"
                          >
                            {project.title}
                          </a>
                        </h3>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase mt-1 tracking-wider">
                          CATEGORY: {project.category}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => handleNavigate(`#/project/${project.id}`)}
                        className="btn-secondary text-[11px] py-1 px-3 cursor-pointer flex items-center gap-1.5 font-mono"
                        aria-label={`View documentation for ${project.title}`}
                      >
                        <span>Inspect Tech</span>
                        <ExternalLink size={11} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed m-0">
                      {project.description}
                    </p>

                    {/* Badge line of technologies */}
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.technologies.map(tech => (
                        <span 
                          key={tech} 
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[10px] font-mono border border-slate-200 dark:border-slate-800 select-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* TECHNICAL SKILLS INDEX */}
            <section aria-labelledby="section-skills">
              <h2 id="section-skills" className="font-serif text-lg border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-4 text-slate-900 dark:text-slate-50">
                ~/skills/
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SKILL_CATEGORIES.map(cat => (
                  <div key={cat.category} className="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900/10">
                    <h3 className="m-0 font-serif text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
                      <Code size={13} className="text-slate-500 dark:text-slate-400" />
                      <span>{cat.category}</span>
                    </h3>
                    <ul className="list-none p-0 m-0 mt-3 space-y-2">
                      {cat.items.map(skill => (
                        <li key={skill} className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-sky-500 dark:text-sky-400 select-none font-bold">•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* EXPERIENCE TIMELINE PROGRESS */}
            <section aria-labelledby="section-experience">
              <h2 id="section-experience" className="font-serif text-lg border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-4 text-slate-900 dark:text-slate-100">
                ~/experience_history.log
              </h2>
              <div className="space-y-6">
                {EXPERIENCE.map(exp => (
                  <div key={`${exp.company}-${exp.role}`} className="border border-slate-200 dark:border-slate-800/80 p-5 rounded-lg bg-slate-50/20 dark:bg-slate-900/10 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-3.5">
                      <div>
                        <h3 className="m-0 text-sm font-serif font-bold text-slate-900 dark:text-slate-50">
                          {exp.role}
                        </h3>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 m-0 mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-300 py-0.5 px-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded self-start sm:self-center select-none">
                        {exp.period}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 m-0 font-sans leading-relaxed mb-3">
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>


            {/* SIMPLE REUSABLE CONTACT FORM & FOOTER */}
            <section aria-labelledby="section-contact">
              <h2 id="section-contact" className="font-serif text-lg border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-4 text-slate-900 dark:text-slate-100">
                ~/contact.md
              </h2>
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900/10">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Validate inputs and prepare data
                    if (typeof window === "undefined") return;
                    const nameInput = document.getElementById("input-name") as HTMLInputElement;
                    const emailInput = document.getElementById("input-email") as HTMLInputElement;
                    const msgInput = document.getElementById("input-msg") as HTMLTextAreaElement;

                    if (!nameInput.value || !emailInput.value || !msgInput.value) {
                      showToast("Please fill in all fields before submitting.", "warning");
                      return;
                    }

                    if(!/\S+@\S+\.\S+/.test(emailInput.value)) {
                      showToast("Please enter a valid email address.", "warning");
                      return;
                    }

                    const formData = {
                      name: nameInput.value,
                      email: emailInput.value,
                      message: msgInput.value
                    };

                    setIsSubmitting(true);

                    // Send Email with EmailJS
                    try {
                      const templateParams = {
                        from_name: formData.name,
                        from_email: formData.email,
                        message: formData.message
                      };

                      emailjs.send(
                        import.meta.env.VITE_EMAILJS_SERVICE_ID,
                        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                        templateParams
                      ).then(
                        () => {
                          showToast("Message sent successfully! I'll get back to you soon.", "success");
                          nameInput.value = "";
                          emailInput.value = "";
                          msgInput.value = "";
                          setIsSubmitting(false);
                        },
                        (error: unknown) => {
                          console.error("EmailJS error:", error);
                          showToast("An error occurred while sending your message. Please try again later.", "error");
                          setIsSubmitting(false);
                        }
                      );
                    } catch (error) {
                      console.error("Form submission error:", error);
                      showToast("An unexpected error occurred. Please try again.", "error");
                      setIsSubmitting(false);
                    }

                  }} 
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="space-y-1">
                      <label htmlFor="input-name" className="text-slate-700 dark:text-slate-300 font-medium block">Name:</label>
                      <input 
                        required 
                        disabled={isSubmitting}
                        id="input-name"
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-slate-100/50 dark:bg-slate-900/50 p-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="input-email" className="text-slate-700 dark:text-slate-300 font-medium block">Email:</label>
                      <input 
                        required 
                        disabled={isSubmitting}
                        id="input-email"
                        type="email" 
                        placeholder="client@enterprise.com" 
                        className="w-full bg-slate-100/50 dark:bg-slate-900/50 p-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1 font-mono text-xs">
                    <label htmlFor="input-msg" className="text-slate-700 dark:text-slate-300 font-medium block">Message Pipeline Content:</label>
                    <textarea 
                      required 
                      disabled={isSubmitting}
                      id="input-msg"
                      rows={3} 
                      placeholder="Input pipeline data structures..." 
                      className="w-full bg-slate-100/50 dark:bg-slate-900/50 p-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                        <span>TRANSMITTING PACKETS...</span>
                      </>
                    ) : (
                      <span>Send UDP Connection (Trigger Email)</span>
                    )}
                  </button>
                </form>
              </div>
            </section>
          </div>
        ) : (
          /* ==========================================
             PROJECT DETAILED VIEW
             ========================================== */
          <div className="space-y-8 animate-fade-in">
            {/* TOP NAVIGATION ROUTE INDEX */}
            <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center gap-4">
              <button 
                onClick={() => handleNavigate("#/")}
                className="btn-secondary py-1 px-3 flex items-center gap-1.5 text-xs font-mono select-none cursor-pointer"
              >
                <ArrowLeft size={12} />
                <span>cd .. / index_root</span>
              </button>
              
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest hidden sm:block">
                location: root_index / projects / {activeProject?.id}
              </div>
            </div>
            {activeProject ? (
              <div className="max-w-3xl mx-auto space-y-8">
                
                {/* CENTERED MAIN DOCUMENT MARKDOWN PANEL */}
                <article className="space-y-6">
                  <header>
                    <div className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 font-mono text-[10px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 inline-block mb-3 select-none">
                      FILE: {activeProject.id}.md
                    </div>
                    <h1 className="text-3xl font-serif font-bold tracking-tight m-0 text-slate-900 dark:text-slate-50">
                      {activeProject.title}
                    </h1>
                    <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mt-1.5 mb-4">
                      {activeProject.tagline}
                    </p>
                  </header>

                  <section className="border-t border-slate-200 dark:border-slate-800 pt-6">
                    <MarkdownRenderer content={activeProject.markdownContent} />
                  </section>

                  {/* PROJECT ACTION GATEWAY - FOOTER */}
                  <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
                    <div className="pb-6 border-b border-dashed border-slate-200 dark:border-slate-800">
                      
                      {/* Technology Stack Info Box Only */}
                      <div>
                        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 m-0 pb-1.5 flex items-center gap-1.5 select-none font-bold">
                          <Layers size={11} className="text-slate-400" />
                          <span>Framework Stack</span>
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {activeProject.technologies.map(tech => (
                            <span 
                              key={tech} 
                              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[10px] font-mono border border-slate-200 dark:border-slate-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Custom actionable CTA button */}
                    <div className="flex justify-center">
                      <a 
                        href={activeProject.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-center justify-center flex items-center gap-2 font-mono text-xs border border-slate-200 dark:border-slate-800 py-3.5 cursor-pointer rounded-lg hover:text-sky-600 dark:hover:text-sky-400 transition-all font-semibold"
                      >
                        <Github size={13} />
                        <span>{activeProject.ctaText || "Inspect Complete Technical Source Code"}</span>
                      </a>
                    </div>
                  </footer>
                </article>
              </div>
            ) : (
              <div className="text-center py-12 border border-slate-200 dark:border-slate-800 rounded-lg">
                <p className="font-mono text-xs text-rose-500">
                  SYSTEM CORE: Project segment '{activeProjectId}' lookup failed inside binary catalog registers.
                </p>
                <button 
                  onClick={() => handleNavigate("#/")}
                  className="btn-secondary mt-4 py-1.5 px-3"
                >
                  Return to home root
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER METRICS RAIL AND ACTIVE TERMINAL DIAGNOSTICS */}
      <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center space-y-6">
        <ConsolePanel 
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          toggleTheme={toggleTheme}
        />
        
        <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 leading-normal mb-0 py-2">
          Designed by Vedant Desai | Handcrafted with Raw Semantic HTML &amp; CSS Variables via TSX/Vite.
          <br />
          Optimized for minimal index repaint profiles. Zero tracker policies active.
        </p>
      </footer>
    </div>
  );
}
