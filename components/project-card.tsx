"use client"

import Image from "next/image"
import Link from "next/link"
import type { CaseStudyImage } from "@/lib/case-studies"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  techniques: string[]
  slug: string
  index: number
  image?: CaseStudyImage
}

export function ProjectCard({
  title,
  description,
  tags,
  techniques,
  slug,
  index,
  image,
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="project-card-link group block flex-shrink-0 w-[calc(45%-12px)] min-w-[360px] md:min-w-[480px]"
    >
      <div
        {...(image ? { "data-cursor-morph-image": "" } : {})}
        className="relative mb-5"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-muted transition-transform duration-300 group-hover:scale-[0.98]">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-left"
              sizes="(min-width: 768px) 480px, 45vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground/30 text-sm">
              Project {index + 1}
            </div>
          )}
        </div>
      </div>
      {/* Tags: hidden on homepage only (ProjectCard is only used in InfiniteScroll); keep markup + tags prop for easy restore */}
      <div className="mb-3 hidden flex-wrap gap-2" aria-hidden="true">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-[2px] border border-border px-2.5 py-0.5 text-xs tracking-wider text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-muted-foreground transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {techniques.slice(0, 3).map((technique) => (
          <span
            key={technique}
            className="text-xs text-muted-foreground/70 bg-muted px-2 py-0.5 rounded-sm"
          >
            {technique}
          </span>
        ))}
        {techniques.length > 3 && (
          <span className="inline-flex self-center text-xs leading-none text-muted-foreground/50">
            +{techniques.length - 3}
          </span>
        )}
      </div>
    </Link>
  )
}
