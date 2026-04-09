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
    <section id="about" className={`min-h-screen ${PAGE_SHELL} py-32`}>
      <div className={PAGE_INNER}>
        <div className="flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-x-24 lg:gap-y-24">
          <div className="max-lg:contents lg:col-span-7 lg:flex lg:flex-col lg:gap-20 lg:-mt-14">
            <div className="max-lg:contents lg:flex lg:flex-col lg:gap-10">
              <div className="order-1 lg:order-none space-y-10">
                <div>
                  <p className="mb-8 text-xs text-muted-foreground uppercase tracking-widest">About</p>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed font-normal text-balance">
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
                    My four years of overseas study and work have given me an{" "}
                    <span className="text-foreground">international perspective</span> on culture,
                    design, and business values. I also run an illustration social media account with{" "}
                    <span className="text-foreground">90k followers</span>—strengthening both my
                    aesthetic sense and content management skills.
                  </p>

                  <p>
                    Outside of work, I enjoy long-distance running and music. I hold a{" "}
                    <span className="text-foreground">psychology certificate</span>, which helps me
                    empathize with users and design with their needs in mind.
                  </p>
                </div>
              </div>

              <div className="order-3 lg:order-none">
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

            <div className="order-4 lg:order-none">
              <p className="mb-8 text-xs text-muted-foreground uppercase tracking-widest">Contact</p>
              <p className="text-lg md:text-xl leading-relaxed font-normal text-balance text-muted-foreground">
                Crafted using vibe coding. Feel free to reach me at{" "}
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

          <div className="relative order-2 min-h-[280px] lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:min-h-0 lg:h-full lg:-mt-14 lg:overflow-visible p-6 md:p-8 lg:p-0">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm lg:mx-0 lg:absolute lg:top-[100px] lg:right-[50px] lg:left-auto lg:w-[min(100%,18rem)] lg:max-w-none lg:aspect-[4/5] lg:h-auto">
              <div className="relative h-full w-full min-h-0">
                <Image
                  src="/images/photo.png"
                  alt="Portrait"
                  fill
                  className="object-cover lg:object-contain lg:object-top"
                  sizes="(min-width: 1024px) 22vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
