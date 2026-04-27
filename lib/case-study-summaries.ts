import type { CaseStudySummary } from "@/lib/case-studies"

export const homeProjectSummaries: CaseStudySummary[] = [
  {
    slug: "daily-bread",
    title: "Daily Bread",
    subtitle: "A Unified and Action-Oriented Supply Chain Management System",
    tags: ["SCM", "Web"],
    techniques: ["User Story", "Impact vs. Effort Matrix", "Design Sprint"],
    heroImage: {
      src: "/images/dailybread/Case 1-1.png",
      alt: "Daily Bread project overview and design context",
    },
  },
  {
    slug: "apolink",
    title: "ApoLink",
    subtitle: "An AI-powered chat assistant for Procurement and Supply Chain teams",
    tags: ["AI", "Cross-platform"],
    techniques: ["User Interview", "Empathy Map", "Motion Design", "Data Research"],
    heroImage: {
      src: "/images/apolink/Case 2-1.png",
      alt: "ApoLink AI assistant overview and product context",
    },
  },
  {
    slug: "emissions-tracker",
    title: "Emissions Tracker",
    subtitle: "A SaaS platform for managing ESG data across GRI standards",
    tags: ["SaaS", "Tool-based"],
    techniques: ["Fogg Behavior Model", "User Journey", "User Testing", "3D Campus Design"],
    heroImage: {
      src: "/images/emissions/Case 3-1.png",
      alt: "Emissions Tracker — Case 3-1",
    },
  },
  {
    slug: "flower-plus",
    title: "Flower+",
    subtitle: "Floral Living is a flower lifestyle APP combining shopping, floral courses, and a community.",
    tags: ["Mobile", "B2C", "E-commerce"],
    techniques: ["User Persona", "Competitive Audits", "Visual Design", "Data Analysis"],
    heroImage: {
      src: "/images/flower+/Case 4-1.png",
      alt: "Flower+ — Case 4-1",
    },
  },
]
