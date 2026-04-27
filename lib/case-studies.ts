export interface CaseStudyImage {
  src: string
  alt: string
}

export const CASE_STUDY_SLUGS = ["daily-bread", "apolink", "emissions-tracker", "flower-plus"] as const
export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number]
const CASE_STUDY_SLUG_SET = new Set<string>(CASE_STUDY_SLUGS)

export function isCaseStudySlug(slug: string): slug is CaseStudySlug {
  return CASE_STUDY_SLUG_SET.has(slug)
}

export interface CaseStudySummary {
  slug: CaseStudySlug
  title: string
  subtitle: string
  tags: string[]
  techniques: string[]
  heroImage?: CaseStudyImage
}

export type CaseStudySection =
  | { type: "intro"; content: string }
  | { type: "split"; left: string; right: string }
  | { type: "full-image"; image: string | CaseStudyImage }
  | { type: "stats"; stats: { value: string; label: string }[] }
  | { type: "quote"; content: string; author?: string }
  | { type: "text-block"; content: string }
  | { type: "image-grid"; images: (string | CaseStudyImage)[] }
  | { type: "highlight"; content: string }
  | { type: "section-header"; title: string }
  | { type: "list"; title?: string; items: string[]; emphasizeLeadBeforeArrow?: boolean }
  | {
      type: "two-column-list"
      leftTitle?: string
      leftItems: string[]
      leftFoot?: string
      rightTitle?: string
      rightItems: string[]
      rightFoot?: string
    }
  | {
      type: "two-column-features"
      leftTitle?: string
      leftItems: { title: string; description: string }[]
      rightTitle?: string
      rightItems: { title: string; description: string }[]
    }

export interface CaseStudyContent {
  title: string
  subtitle: string
  year: string
  role: string
  client: string
  duration: string
  tags: string[]
  techniques?: string[]
  heroImage?: CaseStudyImage
  sections: CaseStudySection[]
}

export const caseStudies: Record<CaseStudySlug, CaseStudyContent> = {
  "daily-bread": {
    title: "Daily Bread",
    subtitle: "A Unified and Action-Oriented Supply Chain Management System",
    year: "2025",
    role: "Solo Designer, Design Sprint Leader",
    client: "Enterprise Client",
    duration: "6 months",
    tags: ["SCM", "Web"],
    techniques: [
      "User Story",
      "Impact vs. Effort Matrix",
      "Design Sprint",
    ],
    heroImage: {
      src: "/images/dailybread/Case 1-1.png",
      alt: "Daily Bread project overview and design context",
    },
    sections: [
      {
        type: "intro",
        content:
          "Designed a unified platform for supply chain planners to monitor risks, simulate scenarios, and accelerate operational decisions across global logistics.",
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-1.png",
          alt: "Daily Bread project overview and design context",
        },
      },
      {
        type: "section-header",
        title: "Problem",
      },
      {
        type: "split",
        left: "Supply chain planners manage complex global operations, but workflows are fragmented across multiple legacy systems - causing inefficiencies and data inconsistencies.",
        right: "Users constantly switch between tools to identify risks, run simulations, and adjust inventory. No unified view exists across regions.",
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-2.png",
          alt: "User journey map highlighting pain points across fragmented supply chain workflows",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-3.png",
          alt: "Workflow analysis showing task switching patterns between legacy systems",
        },
      },
      {
        type: "section-header",
        title: "Solution",
      },
      {
        type: "two-column-list",
        leftTitle: "Workflows",
        leftItems: [
          "Monitor KPIs across regions",
          "Identify and prioritize risks",
          "Simulate scenarios",
          "Execute action plans",
        ],
        rightTitle: "Modules",
        rightItems: [
          "KPI Dashboard",
          "Logistics & Production",
          "Inventory Insights",
          "Admin Configuration",
        ],
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-4.png",
          alt: "Information architecture of the Daily Bread platform modules and navigation",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-5.png",
          alt: "Solution framework mapping workflows to unified platform modules",
        },
      },
      {
        type: "section-header",
        title: "Process",
      },
      {
        type: "text-block",
        content:
          "Led a cross-functional design sprint with PMs, engineers, and stakeholders. Rapid ideation, layout explorations, and alignment through structured reviews.",
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-6.png",
          alt: "Design sprint workshop artifacts and ideation outputs",
        },
      },
      {
        type: "section-header",
        title: "Prototype",
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-7.png",
          alt: "Prototype screens showing key interaction flows",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-8.png",
          alt: "High-fidelity prototype for dashboard and data views",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-9.png",
          alt: "Prototype iterations with annotated design decisions",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-10.png",
          alt: "Component library with reusable UI patterns and token definitions",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-11.png",
          alt: "Typography scale and color palette specifications",
        },
      },
      {
        type: "section-header",
        title: "Results",
      },
      {
        type: "full-image",
        image: {
          src: "/images/dailybread/Case 1-12.png",
          alt: "Before and after comparison of the unified dashboard",
        },
      },
      {
        type: "stats",
        stats: [
          { value: "30%", label: "Faster task completion" },
          { value: "~100h", label: "Saved per quarter" },
          { value: "+18%", label: "Completion rate" },
        ],
      },
      {
        type: "quote",
        content:
          "For the first time, I can see everything I need in one place. It's changed how our entire team operates.",
        author: "Operations Manager",
      },
    ],
  },
  "apolink": {
    title: "ApoLink",
    subtitle: "An AI-powered chat assistant for Procurement and Supply Chain teams",
    year: "2025",
    role: "Solo & Visual Designer",
    client: "ApoLink Inc.",
    duration: "4 months",
    tags: ["AI", "Cross-platform"],
    techniques: [
      "User Interview",
      "Empathy Map",
      "Motion Design",
      "Data Research",
    ],
    heroImage: {
      src: "/images/apolink/Case 2-1.png",
      alt: "ApoLink AI assistant overview and product context",
    },
    sections: [
      {
        type: "intro",
        content:
          "An AI assistant for supply chain teams\u2014enabling cross-system queries, structured reports, and confident decisions.",
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-1.png",
          alt: "ApoLink AI assistant overview and product context",
        },
      },
      {
        type: "section-header",
        title: "Research & Insight",
      },
      {
        type: "text-block",
        content:
          "Users see value in AI but struggle to trust it, often cross-checking results and preferring structured outputs like tables and charts. Adoption is constrained less by model capability than by trust, transparency, and fit with existing workflows.",
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-2.png",
          alt: "Research synthesis: user interviews and insight artifacts",
        },
      },
      {
        type: "section-header",
        title: "Opportunity",
      },
      {
        type: "highlight",
        content:
          "How might we design an AI assistant that users can rely on in real operational contexts?",
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-3.png",
          alt: "Problem space: operational context and design opportunity",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-4.png",
          alt: "Solution: multimodal chat with structured summaries, tables, and charts",
        },
      },
      {
        type: "section-header",
        title: "Key Features",
      },
      {
        type: "two-column-features",
        leftItems: [
          {
            title: "AI report generation",
            description:
              "Generate weekly reports with summaries, KPIs, and charts.",
          },
          {
            title: "Flexible visualization",
            description: "Switch chart formats based on analysis needs.",
          },
          {
            title: "Context-aware assistance",
            description: "Provide answers based on workflow context.",
          },
        ],
        rightItems: [
          {
            title: "Lightweight side panel",
            description: "Resizable and works across tools.",
          },
          {
            title: "Mobile accessibility",
            description: "Access insights and reports on the go.",
          },
        ],
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-5.png",
          alt: "Trust patterns: data sources, consistency, and domain-specific language",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-6.png",
          alt: "Feature: AI report generation and flexible data visualization",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-7.png",
          alt: "Feature: context-aware assistance and lightweight side panel",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-8.png",
          alt: "Impact: product engagement and usage in operational workflows",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-9.png",
          alt: "Learning: gap between generated insights and user action",
        },
      },
      {
        type: "section-header",
        title: "Impact & Learning",
      },
      {
        type: "stats",
        stats: [
          { value: "65%", label: "Weekly active users" },
          { value: "5.6", label: "Avg. interactions / user / week" },
          { value: "35%", label: "Reports led to user action" },
        ],
      },
      {
        type: "full-image",
        image: {
          src: "/images/apolink/Case 2-10.png",
          alt: "Closing: actionable, trustworthy AI integrated into real workflows",
        },
      },
      {
        type: "text-block",
        content:
          "Engagement was strong, but the gap between insight and action remained: successful adoption depends on making outputs not only accurate, but actionable, trustworthy, and woven into real workflows.",
      },
    ],
  },
  "emissions-tracker": {
    title: "Emissions Tracker",
    subtitle: "A SaaS platform for managing ESG data across GRI standards",
    year: "2023",
    role: "UI/UX, 3D Designer",
    client: "GreenMetrics",
    duration: "8 months",
    tags: ["SaaS", "Tool-based"],
    techniques: [
      "Fogg Behavior Model",
      "User Journey",
      "User Testing",
      "3D Campus Design",
    ],
    heroImage: {
      src: "/images/emissions/Case 3-1.png",
      alt: "Emissions Tracker — Case 3-1",
    },
    sections: [
      {
        type: "intro",
        content:
          "Designing clarity for complex ESG reporting systems and workflows",
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-1.png",
          alt: "Emissions Tracker — Case 3-1",
        },
      },
      {
        type: "section-header",
        title: "The Challenge",
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-2.png",
          alt: "Emissions Tracker — Case 3-2",
        },
      },
      {
        type: "split",
        left:
          "ESG reporting is inherently complex\u2014fragmented data, unclear formulas, and heavy manual input create a cognitively demanding experience.",
        right:
          "Users struggled to configure templates, validate data, and understand how results were calculated, often leading to errors and inefficiencies.",
      },
      {
        type: "section-header",
        title: "Key Insight",
      },
      {
        type: "text-block",
        content:
          "The problem wasn\u2019t system capability\u2014it was cognitive overload. Reducing friction required structuring workflows, making calculations transparent, and supporting users with real-time guidance.",
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-3.png",
          alt: "Emissions Tracker — Case 3-3",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-4.png",
          alt: "Emissions Tracker — Case 3-4",
        },
      },
      {
        type: "section-header",
        title: "What I Designed",
      },
      {
        type: "list",
        items: [
          "Guided workflows \u2014 Break down complex tasks into clear steps",
          "Real-time validation \u2014 Surface errors early and reduce rework",
          "Clear information hierarchy \u2014 Improve readability",
          "OCR-assisted input \u2014 Reduce manual effort",
          "Explainable logic \u2014 Make calculations understandable",
        ],
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-5.png",
          alt: "Emissions Tracker — Case 3-5",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-6.png",
          alt: "Emissions Tracker — Case 3-6",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-7.png",
          alt: "Emissions Tracker — Case 3-7",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-8.png",
          alt: "Emissions Tracker — Case 3-8",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-9.png",
          alt: "Emissions Tracker — Case 3-9",
        },
      },
      {
        type: "section-header",
        title: "User Testing Result",
      },
      {
        type: "text-block",
        content:
          "The redesign reduced friction in ESG reporting, improving usability, efficiency, and user confidence through guided flows, automation, and clearer system logic.",
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-10.png",
          alt: "Emissions Tracker — Case 3-10",
        },
      },
      {
        type: "stats",
        stats: [
          { value: "+22", label: "SUS score increase" },
          { value: "\u2193 27%", label: "Error rate reduction" },
          { value: "\u2193 40%", label: "Time on task" },
          { value: "+18%", label: "Task completion rate" },
        ],
      },
      {
        type: "text-block",
        content:
          "Designing complex tools is less about adding features, and more about reducing mental effort through clarity, transparency, and guidance.",
      },
      {
        type: "section-header",
        title: "3D Digital Twin",
      },
      {
        type: "highlight",
        content:
          "A 3D visualization layer helps users identify spatial patterns, understand system relationships, and explore emissions data more intuitively.",
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-11.png",
          alt: "Emissions Tracker — Case 3-11",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/emissions/Case 3-12.png",
          alt: "Emissions Tracker — Case 3-12",
        },
      },
    ],
  },

  "flower-plus": {
    title: "Flower+",
    subtitle:
      "Floral Living is a flower lifestyle APP combining shopping, floral courses, and a community.",
    year: "2022",
    role: "Product Designer",
    client: "Flower+ Inc.",
    duration: "5 months",
    tags: ["Mobile", "B2C", "E-commerce"],
    techniques: [
      "User Persona",
      "Competitive Audits",
      "Visual Design",
      "Data Analysis",
    ],
    heroImage: {
      src: "/images/flower+/Case 4-1.png",
      alt: "Flower+ — Case 4-1",
    },
    sections: [
      {
        type: "intro",
        content:
          "Designing a scalable system where content generates demand, learning builds habit, and commerce captures value",
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-1.png",
          alt: "Flower+ — Case 4-1",
        },
      },
      {
        type: "section-header",
        title: "Problem",
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-2.png",
          alt: "Flower+ — Case 4-2",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-3.png",
          alt: "Flower+ — Case 4-3",
        },
      },
      {
        type: "text-block",
        content:
          "Urban flower lovers buy, learn, and share across platforms \u2014 resulting in a fragmented experience. How might we design a unified system without adding complexity or losing depth?",
      },
      {
        type: "section-header",
        title: "Key Insight",
      },
      {
        type: "text-block",
        content: "Flower consumption is not purely transactional \u2014 it is:",
      },
      {
        type: "list",
        items: [
          "Emotional (relaxation, lifestyle expression)",
          "Habitual (daily care, repeated purchase)",
          "Social (sharing & validation)",
        ],
      },
      {
        type: "text-block",
        content:
          "The real opportunity is not selling flowers, but designing a behavior loop:",
      },
      {
        type: "highlight",
        content:
          "Content \u2192 Inspire \u2192 Learn \u2192 Create \u2192 Share \u2192 Purchase \u2192 Repeat",
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-4.png",
          alt: "Flower+ — Case 4-4",
        },
      },
      {
        type: "section-header",
        title: "Key Design Moves",
      },
      {
        type: "list",
        emphasizeLeadBeforeArrow: true,
        items: [
          "Daily check-ins \u2192 build habit, not just visits",
          "Embedded purchase \u2192 capture peak intent",
          "UGC system \u2192 scale content & retention",
          "Lightweight learning \u2192 fit fragmented time",
        ],
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-5.png",
          alt: "Flower+ — Case 4-5",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-6.png",
          alt: "Flower+ — Case 4-6",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-7.png",
          alt: "Flower+ — Case 4-7",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-8.png",
          alt: "Flower+ — Case 4-8",
        },
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-9.png",
          alt: "Flower+ — Case 4-9",
        },
      },
      {
        type: "section-header",
        title: "Trade-offs & Rationale",
      },
      {
        type: "two-column-list",
        leftTitle: "Depth vs Simplicity",
        leftItems: [
          "Full-featured education platform",
          "Lightweight inspiration feed only",
        ],
        leftFoot: "Chosen: Structured but lightweight learning",
        rightTitle: "Content vs Commerce Priority",
        rightItems: [
          "Commerce-first (low engagement)",
          "Content-only (weak monetization)",
        ],
        rightFoot: "Chosen: Content-first, commerce-enabled",
      },
      {
        type: "two-column-list",
        leftTitle: "Why not build a pure e-commerce platform?",
        leftItems: [
          "Fails to create emotional engagement",
          "Low retention, price-driven competition",
        ],
        rightTitle: "Why not rely on external content platforms?",
        rightItems: ["Breaks user journey", "No control over conversion funnel"],
      },
      {
        type: "section-header",
        title: "Design Impact",
      },
      {
        type: "text-block",
        content:
          "Shifted from transaction-driven to behavior-driven, building a closed loop where content drives demand, learning builds habit, and commerce captures value.",
      },
      {
        type: "full-image",
        image: {
          src: "/images/flower+/Case 4-10.png",
          alt: "Flower+ — Case 4-10",
        },
      },
      {
        type: "stats",
        stats: [
          { value: "+17.6%", label: "MAU (200K total)" },
          { value: "+33.1%", label: "Conversion rate (3.2%)" },
          { value: "+41.2%", label: "LTV" },
        ],
      },
    ],
  },
}
