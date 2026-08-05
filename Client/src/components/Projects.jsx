import Reveal from "./Reveal";
import { PROJECTS } from "../data/projects";

import { ExternalLink } from "lucide-react";

const Projects = () => {
    return (
      <>
        {/* =================================================================
          PROJECTS
        ================================================================= */}
        <section id="projects" className="px-6 py-24 border-t border-slate-100">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="font-mono text-xs text-emerald-600">
                // 02 — projects
              </span>
              <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                Things I've built
              </h2>
              <p className="mt-3 text-slate-600 max-w-xl">
                A mix of CMS, backend, and frontend work — each one solving a
                different kind of problem.
              </p>
            </Reveal>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {PROJECTS.map((project, i) => {
                const Icon = project.icon;
                return (
                  <Reveal key={project.title} delay={i * 100}>
                    <div className="group h-full flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/70 hover:-translate-y-1 transition-all duration-300">
                      {/* Image placeholder — swap for a real screenshot via project.image */}
                      <div className="relative h-40 bg-slate-900 flex items-center justify-center overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 12px)",
                          }}
                        />
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Icon
                            className="relative text-emerald-400"
                            size={34}
                            strokeWidth={1.5}
                          />
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-display font-semibold text-slate-900 leading-snug">
                          {project.title}
                        </h3>
                        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed flex-1">
                          {project.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5 flex items-center gap-4 pt-4 border-t border-slate-100 text-sm">
                          <a
                            href={project.links.demo}
                            className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:text-emerald-600 transition-colors"
                          >
                            Live Demo <ExternalLink size={20} />
                          </a>
                          <a
                            href={project.links.code}
                            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            {/* <Github size={13} /> Source */}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
}

export default Projects