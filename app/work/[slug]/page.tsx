import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { CaseStudyContent } from "@/components/case-study-content"
import { caseStudies } from "@/lib/case-studies"
import { PAGE_SHELL, PAGE_INNER } from "@/lib/layout"

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies[slug]

  if (!study) {
    notFound()
  }

  const slugs = Object.keys(caseStudies)
  const currentIndex = slugs.indexOf(slug)
  const prevSlug = slugs[(currentIndex - 1 + slugs.length) % slugs.length]
  const prevStudy = caseStudies[prevSlug]
  const nextSlug = slugs[(currentIndex + 1) % slugs.length]
  const nextStudy = caseStudies[nextSlug]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article>
        <CaseStudyContent study={study} />

        <footer className={`${PAGE_SHELL} border-t border-border`}>
          <div className={PAGE_INNER}>
            <div className="flex items-center gap-6 py-14 md:py-16">
              <Link
                href={`/work/${prevSlug}`}
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground hover:bg-foreground"
                aria-label={`Previous project: ${prevStudy.title}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                    className="rotate-180 transition-colors group-hover:text-background"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href={`/work/${nextSlug}`}
                className="group flex flex-1 items-center justify-end gap-6"
              >
                <div className="min-w-0 text-right">
                  <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Next Project</p>
                  <h3 className="text-base font-normal text-foreground transition-colors group-hover:text-muted-foreground md:text-lg">
                    {nextStudy.title}
                  </h3>
                  <p className="mt-1 ml-auto max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {nextStudy.subtitle}
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground group-hover:bg-foreground">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-colors group-hover:text-background"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  )
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}
