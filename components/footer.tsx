import { PAGE_SHELL, PAGE_INNER } from "@/lib/layout"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`${PAGE_SHELL} border-t border-border py-10`}>
      <div className={`${PAGE_INNER} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
        <p className="text-xs text-muted-foreground">
          &copy; {currentYear} Bei Ye. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:406597900@qq.com"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
