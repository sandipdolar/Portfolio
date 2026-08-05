import Reveal from "./Reveal";
import SkillBar from "./SkillBar";
import { SKILL_GROUPS } from "../data/skills";
import { TOOLS } from "../data/tools";

import { Terminal} from "lucide-react";

const Skills = () => {
    return (
      <>
        {/* =================================================================
          SKILLS
        ================================================================= */}
        <section
          id="skills"
          className="px-6 py-24 border-t border-slate-100 bg-slate-50/60"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="font-mono text-xs text-emerald-600">
                // 03 — skills
              </span>
              <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                What I work with
              </h2>
            </Reveal>

            <div className="mt-12 grid lg:grid-cols-3 gap-6">
              {SKILL_GROUPS.map((group, i) => (
                <Reveal key={group.category} delay={i * 100}>
                  <div className="h-full rounded-xl border border-slate-200 bg-white p-6">
                    <div className="flex items-center gap-2 mb-5 font-mono text-xs text-slate-400">
                      <Terminal size={20} />
                      /skills/{group.category}
                    </div>
                    {group.items.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                      />
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Tools — shown terminal-style, as a flat "$ cat tools.json" output */}
            <Reveal delay={300}>
              <div className="mt-6 rounded-xl border border-slate-200 bg-[#0d1117] p-6 font-mono text-[13px] overflow-x-auto">
                <div className="text-slate-500 mb-3">$ cat tools.json</div>
                <div className="flex flex-wrap gap-2">
                  {TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="select-none rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
}

export default Skills