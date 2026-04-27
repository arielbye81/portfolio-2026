import Image from "next/image"
import { PAGE_SHELL, PAGE_INNER } from "@/lib/layout"

const skills = [
  { name: "Figma", icon: "F" },
  { name: "Sketch", icon: "S" },
  { name: "Adobe XD", icon: "Xd" },
  { name: "Photoshop", icon: "Ps" },
  { name: "Illustrator", icon: "Ai" },
  { name: "After Effects", icon: "Ae" },
  { name: "Principle", icon: "Pr" },
  { name: "React", icon: "Re" },
  { name: "HTML/CSS", icon: "H" },
  { name: "Miro", icon: "M" },
  { name: "Jira", icon: "J" },
]

export function AboutSection() {
  return (
    <section id="about" className={`min-h-screen ${PAGE_SHELL} pt-32 pb-[calc(8rem*2/3)]`}>
      <div className={PAGE_INNER}>
        <div className="flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-x-24 lg:gap-y-24">
          <div className="max-lg:contents lg:col-span-7 lg:flex lg:flex-col lg:gap-20 lg:-mt-14">
            <div className="max-lg:contents lg:flex lg:flex-col lg:gap-10">
              <div className="order-1 lg:order-none space-y-10">
                <div>
                  <p className="mb-8 text-xs text-muted-foreground uppercase tracking-widest">About</p>
                  <p className="text-xl md:text-2xl text-foreground leading-[1.3] text-balance font-schnyder-title">
                    I believe with a little psychology, creativity, and empathy, what starts as a limitation can end up as a benefit.
                  </p>
                </div>

                <div className="space-y-6 text-sm font-normal leading-relaxed text-muted-foreground">
                  <p>
                    Most recently, I designed multiple applications for{" "}
                    <span className="text-foreground">Apple China&apos;s supply chain management</span>,
                    saving over 100 hours per quarter across 80+ business DRIs and planners.
                    Previously, I led the UI/UX design for{" "}
                    <span className="text-foreground">PwC&apos;s ESG SaaS products</span>,
                    achieving a CSAT score of 4.7/5.
                  </p>

                  <p>
                    I also integrate{" "}
                    <span className="text-foreground">AI-driven Vibe Coding</span>
                    {" "}
                    into my workflow — from building my own portfolio to prototyping interactive components — enabling faster validation, clearer communication with stakeholders, and more efficient design-to-development handoff.
                  </p>

                  <p>
                    My four years of overseas study and work have shaped an{" "}
                    <span className="text-foreground">international perspective</span> on culture,
                    design, and business. I also run an illustration account with{" "}
                    <span className="text-foreground">90K followers</span>, strengthening both my
                    visual sensibility and content strategy.
                  </p>

                  <p>
                    Outside of work, I enjoy long-distance running and music. I hold a{" "}
                    <span className="text-foreground">psychology certificate</span>, which helps me
                    better understand users and design with empathy.
                  </p>
                </div>
              </div>

              <div className="order-2 lg:order-none">
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 px-3 py-2 border border-border/50 hover:border-border transition-colors"
                    >
                      <span className="text-[10px] font-medium text-muted-foreground/60 w-4">{skill.icon}</span>
                      <span className="text-xs text-muted-foreground">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-3 flex min-h-[280px] flex-col items-center gap-6 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:min-h-0 lg:-mt-[4.25rem] lg:gap-8 lg:overflow-visible p-6 md:p-8 lg:p-0">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[32rem] shrink-0 overflow-hidden rounded-sm lg:mt-[100px] lg:w-[min(100%,24rem)] lg:max-w-none lg:aspect-[4/5]">
              <div className="relative h-full w-full min-h-0">
                <Image
                  src="/images/photo-20260424.png"
                  alt="Portrait"
                  fill
                  className="object-cover lg:object-contain lg:object-top"
                  sizes="(min-width: 1024px) 22vw, 100vw"
                  priority
                />
              </div>
            </div>
            <p className="mx-auto w-full max-w-[min(100%,calc(32rem*4/3))] text-center text-sm leading-relaxed text-muted-foreground md:text-base lg:-mt-[100px]">
              Crafted using vibe coding. Feel free to reach
              <br />
              me at{" "}
              <a
                href="mailto:beiye.81@yahoo.com"
                className="font-medium text-foreground underline underline-offset-4 decoration-foreground/70 transition-colors hover:decoration-foreground"
              >
                beiye.81@yahoo.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
