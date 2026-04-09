import Image from "next/image"
import type { CaseStudySection } from "@/lib/case-studies"

type SectionNeighbor = CaseStudySection["type"] | undefined

export function SectionRenderer({
  section,
  prevType,
  nextType,
}: {
  section: CaseStudySection
  prevType?: SectionNeighbor
  nextType?: SectionNeighbor
}) {
  switch (section.type) {
    case "intro":
      return (
        <div className="mb-12 max-w-2xl md:mb-14">
          <p className="text-base font-normal leading-relaxed text-foreground md:text-lg">
            {section.content}
          </p>
        </div>
      )

    case "stats": {
      const isQuad = section.stats.length >= 4
      return (
        <div
          className={`my-8 grid border-y border-border py-8 md:my-10 md:py-10 ${
            isQuad
              ? "grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-6 xl:gap-8"
              : "grid-cols-3 gap-6 md:gap-8"
          }`}
        >
          {section.stats.map((stat, i) => (
            <div key={i} className="min-w-0">
              <p className="mb-1 text-2xl font-normal text-foreground md:text-3xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      )
    }

    case "split":
      return (
        <div className="my-8 grid grid-cols-1 gap-8 md:my-10 lg:grid-cols-2 lg:gap-12">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {section.left}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {section.right}
          </p>
        </div>
      )

    case "full-image":
      if (typeof section.image !== "string") {
        return (
          <figure className="my-8 md:my-10">
            <div className="w-full overflow-hidden rounded-[3px] border border-border">
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={1920}
                height={1080}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 1100px"
              />
            </div>
          </figure>
        )
      }

      return (
        <figure className="my-8 md:my-10">
          <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/30 px-4">
            <span className="text-center text-sm text-muted-foreground">
              {typeof section.image === "string" ? section.image : "Image"}
            </span>
          </div>
        </figure>
      )

    case "quote":
      return (
        <div className="my-8 max-w-2xl md:my-10">
          <blockquote className="mb-3 text-base font-normal leading-relaxed text-foreground md:text-lg">
            &ldquo;{section.content}&rdquo;
          </blockquote>
          {section.author && (
            <cite className="text-xs not-italic text-muted-foreground">&mdash; {section.author}</cite>
          )}
        </div>
      )

    case "text-block": {
      const tightBeforeList = nextType === "list"
      return (
        <div
          className={
            tightBeforeList
              ? "mt-8 mb-2 max-w-2xl md:mt-10 md:mb-2"
              : "my-8 max-w-2xl md:my-10"
          }
        >
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {section.content}
          </p>
        </div>
      )
    }

    case "image-grid":
      return (
        <div
          className={`my-8 grid w-full gap-4 md:my-10 md:gap-5 ${
            section.images.length <= 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {section.images.map((image, i) =>
            typeof image === "string" ? (
              <div
                key={i}
                className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/30 p-4"
              >
                <span className="text-center text-sm text-muted-foreground">
                  {image}
                </span>
              </div>
            ) : (
              <div
                key={i}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/50 bg-muted/20"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ),
          )}
        </div>
      )

    case "highlight":
      return (
        <div className="my-8 rounded-sm bg-muted px-6 py-6 md:my-10 md:px-8 md:py-8">
          <p className="text-sm font-normal leading-relaxed text-foreground md:text-base">
            {section.content}
          </p>
        </div>
      )

    case "section-header":
      return (
        <div className="mb-6 border-t border-border pt-6 md:pt-8">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
            {section.title}
          </h2>
        </div>
      )

    case "list": {
      const arrowSep = " \u2192 "
      const afterTextBlock = prevType === "text-block"
      return (
        <div
          className={
            afterTextBlock ? "mb-8 mt-0 md:mb-10 md:mt-0" : "my-8 md:my-10"
          }
        >
          {section.title && (
            <p className="mb-3 text-sm font-medium leading-relaxed text-muted-foreground md:text-base">{section.title}</p>
          )}
          <ul className="space-y-2.5">
            {section.items.map((item, i) => {
              const parts =
                section.emphasizeLeadBeforeArrow && item.includes(arrowSep)
                  ? item.split(arrowSep)
                  : null
              return (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                  <span className="min-w-0">
                    {parts && parts.length >= 2 ? (
                      <>
                        <span className="font-semibold">{parts[0]}</span>
                        {" \u2192 "}
                        {parts.slice(1).join(arrowSep)}
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }

    case "two-column-list": {
      const afterAnotherTwoCol = prevType === "two-column-list"
      return (
        <div
          className={
            afterAnotherTwoCol
              ? "mb-8 mt-14 grid grid-cols-1 gap-8 md:mb-10 md:mt-20 md:grid-cols-2 md:gap-12"
              : "my-8 grid grid-cols-1 gap-8 md:my-10 md:grid-cols-2 md:gap-12"
          }
        >
          <div>
            {section.leftTitle && (
              <p className="mb-3 text-sm font-medium leading-relaxed text-muted-foreground md:text-base">{section.leftTitle}</p>
            )}
            <ul className="space-y-2.5">
              {section.leftItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                  {item}
                </li>
              ))}
            </ul>
            {section.leftFoot && (
              <p className="mt-4 text-sm italic leading-relaxed text-muted-foreground md:text-base">
                {section.leftFoot}
              </p>
            )}
          </div>
          <div>
            {section.rightTitle && (
              <p className="mb-3 text-sm font-medium leading-relaxed text-muted-foreground md:text-base">{section.rightTitle}</p>
            )}
            <ul className="space-y-2.5">
              {section.rightItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                  {item}
                </li>
              ))}
            </ul>
            {section.rightFoot && (
              <p className="mt-4 text-sm italic leading-relaxed text-muted-foreground md:text-base">
                {section.rightFoot}
              </p>
            )}
          </div>
        </div>
      )
    }

    case "two-column-features":
      return (
        <div className="my-8 grid grid-cols-1 gap-8 md:my-10 md:grid-cols-2 md:gap-12">
          <div>
            {section.leftTitle && (
              <p className="mb-3 text-sm font-medium leading-relaxed text-muted-foreground md:text-base">{section.leftTitle}</p>
            )}
            <ul className="list-none space-y-5">
              {section.leftItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-normal leading-relaxed text-foreground md:text-base">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs font-normal leading-relaxed text-muted-foreground md:text-sm">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {section.rightTitle && (
              <p className="mb-3 text-sm font-medium leading-relaxed text-muted-foreground md:text-base">{section.rightTitle}</p>
            )}
            <ul className="list-none space-y-5">
              {section.rightItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-normal leading-relaxed text-foreground md:text-base">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs font-normal leading-relaxed text-muted-foreground md:text-sm">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )

    default:
      return null
  }
}
