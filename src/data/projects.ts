export type ProjectTone = "pink" | "lime" | "ink" | "cream";

export type Project = {
  slug: string;
  url: string;
  thumbnail: string;
  title: string;
  category: string;
  result: string;
  metric: string;
  tone: ProjectTone;
  summary: string;
  challenge: string;
  approach: string[];
  impact: string[];
  caseStudy?: {
    role: string;
    timeline: string;
    platform: string;
    scope: string;
    problem: string;
    research: string[];
    decisions: {
      title: string;
      detail: string;
    }[];
    qa: {
      title: string;
      detail: string;
    }[];
    outcomes: string[];
    nextSteps: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "final-year-project-study-abroad",
    url: "https://dribbble.com/shots/26018029-Final-Year-Project-Educational-Website-to-study-abroad",
    thumbnail: "https://cdn.dribbble.com/userupload/43293374/file/original-262ea261f2759766477280f2d3299bf5.png?format=webp&resize=800x600&vertical=center",
    title: "Final Year Project",
    category: "Educational Website",
    result: "A study-abroad education website concept with structured browsing and academic discovery.",
    metric: "01",
    tone: "pink",
    summary: "A study-abroad education website concept with structured browsing and academic discovery.",
    challenge: "Students needed a clearer way to explore education options and understand next steps.",
    approach: ["Structured the landing flow", "Clarified program discovery", "Designed trust-building sections"],
    impact: ["Cleaner academic discovery", "Stronger enrollment path", "More credible education interface"],
    caseStudy: {
      role: "UX research, IA, UI design, QA review",
      timeline: "Concept case study",
      platform: "Responsive education website",
      scope: "Discovery, program browsing, trust, inquiry flow",
      problem:
        "Study-abroad websites often ask students to choose too early. The design problem was to help them compare options, understand credibility, and move toward an inquiry without feeling lost.",
      research: [
        "Mapped a first-time student journey from country curiosity to course comparison.",
        "Grouped content into decision stages: destination, program, requirements, proof, and inquiry.",
        "Identified trust gaps where students need university context, eligibility signals, and clear support.",
      ],
      decisions: [
        {
          title: "Browse before commitment",
          detail: "The hero and program sections prioritize exploration first, then inquiry, so the user does not feel pushed into a lead form too early.",
        },
        {
          title: "Trust next to action",
          detail: "Eligibility, university, and support cues sit close to action areas to reduce doubt before the student clicks.",
        },
        {
          title: "Scan-friendly hierarchy",
          detail: "Large category blocks and repeated CTA rhythm make the page easier to skim for students comparing multiple destinations.",
        },
      ],
      qa: [
        {
          title: "Inquiry path checks",
          detail: "Reviewed whether every major browsing area gives the student a clear next step without duplicate or competing CTAs.",
        },
        {
          title: "Responsive risk review",
          detail: "Checked the mobile flow for stacked content order, tap target spacing, and whether trust cues remain visible before inquiry actions.",
        },
        {
          title: "Content clarity pass",
          detail: "Flagged vague labels and replaced them with student-facing language around programs, requirements, and support.",
        },
      ],
      outcomes: [
        "A clearer path from exploration to inquiry.",
        "Stronger credibility moments around student decision points.",
        "A reusable structure for future education landing pages.",
      ],
      nextSteps: [
        "Validate program-card labels with students.",
        "Test inquiry-form completion on mobile.",
        "Add real conversion data once deployed.",
      ],
    },
  },
  {
    slug: "vehicle-rental-website",
    url: "https://dribbble.com/shots/26017999-Vehicle-Rental-Website-Design-UIUX",
    thumbnail: "https://cdn.dribbble.com/userupload/43293283/file/original-345e5b950cd4a442f7162d528af2919a.png?format=webp&resize=800x600&vertical=center",
    title: "Vehicle Rental Website",
    category: "Rental Website UIUX",
    result: "A rental website interface focused on vehicle discovery, booking clarity, and trust.",
    metric: "02",
    tone: "lime",
    summary: "A rental website interface focused on vehicle discovery, booking clarity, and trust.",
    challenge: "Rental options needed to be easy to scan, compare, and act on.",
    approach: ["Built listing hierarchy", "Clarified booking actions", "Balanced product and trust cues"],
    impact: ["Easier vehicle comparison", "Cleaner rental flow", "More confident booking path"],
    caseStudy: {
      role: "Product UX, UI design, booking-flow QA",
      timeline: "Concept case study",
      platform: "Responsive rental website",
      scope: "Vehicle discovery, comparison, booking confidence",
      problem:
        "Vehicle rental users need to compare price, type, availability, and trust quickly. The design needed to reduce comparison effort and make booking intent obvious.",
      research: [
        "Mapped the rental decision flow from vehicle browsing to booking confirmation.",
        "Prioritized comparison attributes: vehicle type, price, feature set, availability, and trust signals.",
        "Reviewed common failure points in rental flows, including hidden fees, weak availability states, and unclear CTAs.",
      ],
      decisions: [
        {
          title: "Comparison-first cards",
          detail: "Vehicle cards place core decision data in a repeatable layout so users can compare options without opening every detail page.",
        },
        {
          title: "Action hierarchy",
          detail: "Primary booking actions are visually stronger than secondary exploration actions to prevent decision drift.",
        },
        {
          title: "Trust before booking",
          detail: "Support, policy, and reliability cues are positioned near booking moments where hesitation usually appears.",
        },
      ],
      qa: [
        {
          title: "Booking path audit",
          detail: "Checked the flow for missing states around selected vehicle, pickup details, availability, and final action.",
        },
        {
          title: "Edge-case checklist",
          detail: "Defined QA scenarios for unavailable vehicles, missing price data, invalid dates, and repeated booking attempts.",
        },
        {
          title: "Mobile tap review",
          detail: "Reviewed card density, CTA spacing, and filter interactions for thumb-friendly mobile use.",
        },
      ],
      outcomes: [
        "A faster scan path for rental decisions.",
        "A clearer booking hierarchy with fewer competing actions.",
        "A QA checklist that connects UI states to real booking risks.",
      ],
      nextSteps: [
        "Prototype filters and date selection.",
        "Run task testing for vehicle comparison.",
        "Add error-state screens for the full booking path.",
      ],
    },
  },
  {
    slug: "cafe-website-hero-section",
    url: "https://dribbble.com/shots/26017956-Cafe-Website-Hero-section-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/43293143/file/original-ea26e3e0d64265290f23461dd8c42c62.png?format=webp&resize=800x600&vertical=center",
    title: "Cafe Website Hero",
    category: "Web Hero Design",
    result: "A cafe landing hero with warm visual hierarchy and a focused first impression.",
    metric: "03",
    tone: "ink",
    summary: "A cafe landing hero with warm visual hierarchy and a focused first impression.",
    challenge: "The cafe needed a rich first-screen moment without losing menu and visit intent.",
    approach: ["Created food-led hero hierarchy", "Balanced mood with action", "Built a warm web composition"],
    impact: ["Stronger cafe presence", "Clearer landing focus", "More appetizing brand moment"],
  },
  {
    slug: "trading-website-design",
    url: "https://dribbble.com/shots/26017862-Trading-Website-Design-UI-UX-Web-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/43292851/file/original-b9ee9d300f67cd3baff64c31affc1a5a.jpg?format=webp&resize=800x600&vertical=center",
    title: "Trading Website Design",
    category: "Finance Web UI",
    result: "A trading website concept designed for quick scanning, market confidence, and action.",
    metric: "04",
    tone: "cream",
    summary: "A trading website concept designed for quick scanning, market confidence, and action.",
    challenge: "Finance content needed to feel sharp, credible, and easy to process.",
    approach: ["Structured market signals", "Built trust-focused landing sections", "Clarified account actions"],
    impact: ["Faster financial scanning", "Stronger credibility", "Cleaner trading interface"],
  },
  {
    slug: "tourism-website-design",
    url: "https://dribbble.com/shots/26017080-Tourism-website-design",
    thumbnail: "https://cdn.dribbble.com/userupload/43290573/file/original-dca8dca4350ac1535715778693ce4653.png?format=webp&resize=800x600&vertical=center",
    title: "Tourism Website",
    category: "Travel Web UI",
    result: "A tourism website concept shaped around destination discovery and travel inspiration.",
    metric: "05",
    tone: "pink",
    summary: "A tourism website concept shaped around destination discovery and travel inspiration.",
    challenge: "Travel content needed to feel immersive while keeping destination actions clear.",
    approach: ["Built destination-first hierarchy", "Used scenic visual rhythm", "Clarified exploration paths"],
    impact: ["More inspiring discovery", "Cleaner travel browsing", "Stronger destination storytelling"],
  },
  {
    slug: "ngo-website-design",
    url: "https://dribbble.com/shots/26017053-NGO-Website-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/43290512/file/original-9b9514cbf102d566195fe8bd8fb8c87f.png?crop=0x0-3002x2251&format=webp&resize=800x600&vertical=center",
    title: "NGO Website Design",
    category: "Nonprofit Website",
    result: "A nonprofit website design for mission clarity, trust, and donation-oriented storytelling.",
    metric: "06",
    tone: "lime",
    summary: "A nonprofit website design for mission clarity, trust, and donation-oriented storytelling.",
    challenge: "The nonprofit story needed to feel trustworthy, human, and easy to act on.",
    approach: ["Designed mission-first hierarchy", "Structured trust and donation moments", "Balanced emotional story with clear action"],
    impact: ["Clearer mission communication", "More donation-ready layout", "Stronger nonprofit web presence"],
  },
  {
    slug: "smart-home-application",
    url: "https://dribbble.com/shots/26017029-Smart-Home-Application-UI-UX-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/43290436/file/original-3689a6c8f8507c7eecf15962d51bdc2c.png?format=webp&resize=800x600&vertical=center",
    title: "Smart Home Application",
    category: "Smart Home UIUX",
    result: "A smart home application interface for device control, status, and home automation.",
    metric: "07",
    tone: "ink",
    summary: "A smart home application interface for device control, status, and home automation.",
    challenge: "Connected-home controls needed to feel simple, immediate, and reliable.",
    approach: ["Grouped device controls", "Clarified system status", "Designed quick action patterns"],
    impact: ["Easier device management", "Clearer smart-home status", "More confident control flow"],
    caseStudy: {
      role: "Mobile UX, interface design, QA scenarios",
      timeline: "Concept case study",
      platform: "Smart-home mobile app",
      scope: "Device control, status visibility, automation confidence",
      problem:
        "Smart-home interfaces fail when users cannot tell what is on, what changed, or what needs attention. The design needed to make control states feel immediate and trustworthy.",
      research: [
        "Mapped core smart-home tasks: check status, control device, review room, create quick automation.",
        "Separated everyday controls from deeper configuration so frequent actions stay fast.",
        "Identified QA risks around offline devices, delayed states, and unclear toggle feedback.",
      ],
      decisions: [
        {
          title: "Status-led dashboard",
          detail: "The first screen favors room and device status so users can understand the home before taking action.",
        },
        {
          title: "Immediate control feedback",
          detail: "Controls are designed with clear active, inactive, and pending patterns to reduce uncertainty after a tap.",
        },
        {
          title: "Grouped by mental model",
          detail: "Rooms and device groups follow how people think about their home, not only how devices are technically categorized.",
        },
      ],
      qa: [
        {
          title: "State coverage",
          detail: "Defined UI checks for on, off, pending, offline, error, and disabled device states.",
        },
        {
          title: "Automation safety",
          detail: "Reviewed whether scheduled actions and quick toggles clearly communicate what will happen next.",
        },
        {
          title: "Regression checklist",
          detail: "Created repeatable checks for status cards, room navigation, and device-control consistency.",
        },
      ],
      outcomes: [
        "A more reliable control experience for everyday smart-home actions.",
        "Clearer state handling for QA and handoff.",
        "A stronger bridge between UI design and product safety.",
      ],
      nextSteps: [
        "Prototype delayed device response states.",
        "Test automation creation with non-technical users.",
        "Document component states for development handoff.",
      ],
    },
  },
  {
    slug: "portfolio-website-design",
    url: "https://dribbble.com/shots/25301424-Portfolio-Website-Design-UI-UX",
    thumbnail: "https://cdn.dribbble.com/userupload/17910522/file/original-46aa04b0cda56f15972bdf89f7ce007b.png?format=webp&resize=800x600&vertical=center",
    title: "Portfolio Website Design",
    category: "Portfolio UI UX",
    result: "A personal portfolio website concept for presenting UI UX work and case-study direction.",
    metric: "08",
    tone: "cream",
    summary: "A personal portfolio website concept for presenting UI UX work and case-study direction.",
    challenge: "The profile needed a clear visual system for showing work quickly and credibly.",
    approach: ["Built a strong first-screen hierarchy", "Balanced identity, work, and contact moments", "Prepared the layout for project storytelling"],
    impact: ["Clearer personal brand", "More scannable portfolio flow", "Easier project discovery"],
  },
  {
    slug: "e-commerce-mobile-app-design",
    url: "https://dribbble.com/shots/25301360-E-Commerce-Mobile-App-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/17910316/file/original-ab641d04c4cacd3785f3b143596ef035.jpg?format=webp&resize=800x600&vertical=center",
    title: "E-Commerce Mobile App",
    category: "Mobile Commerce UI",
    result: "A commerce app interface focused on browsing, product discovery, and purchase clarity.",
    metric: "09",
    tone: "pink",
    summary: "A commerce app interface focused on browsing, product discovery, and purchase clarity.",
    challenge: "Shopping actions needed to feel fast, visual, and easy to compare on mobile.",
    approach: ["Structured product browsing", "Clarified item and cart hierarchy", "Designed clean purchase moments"],
    impact: ["Easier product discovery", "Cleaner mobile commerce flow", "More confident shopping decisions"],
  },
  {
    slug: "music-website-hero-section",
    url: "https://dribbble.com/shots/24272382-Music-Website-Hero-Section-Ui-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/14867595/file/original-463a133871794bc44a3a789964da1089.jpg?format=webp&resize=800x600&vertical=center",
    title: "Music Website Hero",
    category: "Web Hero UI",
    result: "A music landing hero concept with bold visual hierarchy and immersive first-screen energy.",
    metric: "10",
    tone: "lime",
    summary: "A music landing hero concept with bold visual hierarchy and immersive first-screen energy.",
    challenge: "The landing page needed to communicate mood, sound, and action immediately.",
    approach: ["Created a strong poster-like hero", "Focused type, media, and call-to-action hierarchy", "Used contrast to guide attention"],
    impact: ["More memorable first impression", "Clearer hero composition", "Stronger entertainment landing direction"],
  },
  {
    slug: "skincare-ecommerce-mobile-app",
    url: "https://dribbble.com/shots/23404060-Skincare-Ecommerce-Mobile-App-UI-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/12367707/file/original-40f1340df872df9bcf15c6a9b0f0bd12.jpg?format=webp&resize=800x600&vertical=center",
    title: "Skincare Ecommerce App",
    category: "Mobile App UI",
    result: "A beauty commerce mobile experience shaped around product browsing and clean purchase flow.",
    metric: "11",
    tone: "ink",
    summary: "A beauty commerce mobile experience shaped around product browsing and clean purchase flow.",
    challenge: "Beauty products needed a soft visual style while keeping buying actions easy to follow.",
    approach: ["Built calm product hierarchy", "Balanced editorial feel with shop actions", "Simplified product browsing moments"],
    impact: ["Cleaner beauty shopping flow", "Softer brand experience", "More focused mobile screens"],
  },
  {
    slug: "deal-mobile-dashboard-app",
    url: "https://dribbble.com/shots/23088174--DEAL-is-mobile-dashboard-app-UI-UX-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/11495109/file/original-bb006f8a393a387d0a3c2e4feaab22ce.jpg?format=webp&resize=800x600&vertical=center",
    title: "DEAL Mobile Dashboard",
    category: "Dashboard UX",
    result: "A mobile dashboard app concept for status, deals, and quick operational scanning.",
    metric: "12",
    tone: "cream",
    summary: "A mobile dashboard app concept for status, deals, and quick operational scanning.",
    challenge: "The dashboard needed to make deals, status, and key actions visible without clutter.",
    approach: ["Grouped important dashboard signals", "Designed mobile-first summary cards", "Clarified action and status hierarchy"],
    impact: ["Faster scan pattern", "Cleaner dashboard structure", "More useful mobile overview"],
  },
  {
    slug: "food-delivery-mobile-app",
    url: "https://dribbble.com/shots/22992389-Food-Delivery-Mobile-App-Ui-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/11228164/file/original-fdce70f45d96dd8707408486f9af34f7.png?format=webp&resize=800x600&vertical=center",
    title: "Food Delivery App",
    category: "Food Delivery UI",
    result: "A food ordering mobile interface for menu browsing, cart clarity, and checkout decisions.",
    metric: "13",
    tone: "pink",
    summary: "A food ordering mobile interface for menu browsing, cart clarity, and checkout decisions.",
    challenge: "Ordering needed to feel visual, quick, and low-friction from menu to cart.",
    approach: ["Designed food discovery screens", "Simplified item selection", "Clarified cart and checkout moments"],
    impact: ["Faster ordering flow", "Cleaner menu browsing", "More confident checkout path"],
  },
  {
    slug: "hunchha-digital-agency",
    url: "https://dribbble.com/shots/22771940-Web-design-of-Hunchha-Digital-Agency",
    thumbnail: "https://cdn.dribbble.com/userupload/10632662/file/original-1894ed621ac90be6231614257b959522.jpg?format=webp&resize=800x600&vertical=center",
    title: "Hunchha Digital Agency",
    category: "Agency Website",
    result: "A digital agency landing design with branding, service messaging, and modern web layout.",
    metric: "14",
    tone: "lime",
    summary: "A digital agency landing design with branding, service messaging, and modern web layout.",
    challenge: "The agency page needed to present credibility, services, and style in one clear path.",
    approach: ["Defined a bold agency hero", "Organized service messaging", "Created a modern landing structure"],
    impact: ["Stronger brand presence", "Clearer service discovery", "More polished web direction"],
  },
  {
    slug: "id-card-design",
    url: "https://dribbble.com/shots/22691798-ID-Card-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/10415159/file/original-3a1fe456a562291c8c99ef7f0c04adf8.png?format=webp&resize=800x600&vertical=center",
    title: "ID Card Design",
    category: "Visual Design",
    result: "A clean identity card design focused on branding, readability, and graphic structure.",
    metric: "15",
    tone: "ink",
    summary: "A clean identity card design focused on branding, readability, and graphic structure.",
    challenge: "The card needed clear hierarchy, identity details, and a professional visual system.",
    approach: ["Structured identity information", "Balanced brand and readability", "Designed a clean print-ready layout"],
    impact: ["Clearer personal identification", "More professional brand touchpoint", "Readable visual hierarchy"],
  },
  {
    slug: "playground-esport-tournament",
    url: "https://dribbble.com/shots/22663264-PlayGround-e-sport-Tournament-Web-Landing-Page-Design",
    thumbnail: "https://cdn.dribbble.com/userupload/10340394/file/original-28fcb92d28f965f94fb9ae4e7c5d3e29.jpg?format=webp&resize=800x600&vertical=center",
    title: "PlayGround Esport Tournament",
    category: "Esports Landing Page",
    result: "A tournament landing page concept with high-energy hierarchy and event-focused conversion.",
    metric: "16",
    tone: "cream",
    summary: "A tournament landing page concept with high-energy hierarchy and event-focused conversion.",
    challenge: "The page needed to make the event feel exciting while keeping registration intent clear.",
    approach: ["Built a high-energy hero", "Prioritized event and action hierarchy", "Used bold visual contrast"],
    impact: ["Stronger event presence", "Clearer registration path", "More expressive gaming layout"],
  },
  {
    slug: "cloud-service-provider",
    url: "https://dribbble.com/shots/22655773-Landing-Page-Design-Of-Cloud-Service-Provider",
    thumbnail: "https://cdn.dribbble.com/userupload/10320878/file/original-697c00ec229e803f05d3674eefd0d8bd.jpg?format=webp&resize=800x600&vertical=center",
    title: "Cloud Service Provider",
    category: "Cloud Landing Page",
    result: "A SaaS-style landing page concept for cloud service positioning and conversion.",
    metric: "17",
    tone: "pink",
    summary: "A SaaS-style landing page concept for cloud service positioning and conversion.",
    challenge: "The page needed to explain cloud value quickly and guide visitors toward action.",
    approach: ["Clarified service promise", "Built landing page sections for scanning", "Balanced product trust and conversion"],
    impact: ["Clearer service positioning", "More structured SaaS layout", "Better conversion-focused hierarchy"],
  },
  {
    slug: "ngo-feed-landing-page",
    url: "https://dribbble.com/shots/22655722-Landing-Page-Design-of-NGO-FEED",
    thumbnail: "https://cdn.dribbble.com/userupload/10320766/file/original-f3b46a411c3adbb326f19f5993828892.jpg?format=webp&resize=800x600&vertical=center",
    title: "NGO FEED Landing Page",
    category: "NGO Landing Page",
    result: "A nonprofit landing page design for clear mission, trust, and donation-oriented storytelling.",
    metric: "18",
    tone: "lime",
    summary: "A nonprofit landing page design for clear mission, trust, and donation-oriented storytelling.",
    challenge: "The nonprofit story needed to feel trustworthy, human, and easy to act on.",
    approach: ["Designed mission-first hierarchy", "Structured trust and donation moments", "Balanced emotional story with clear action"],
    impact: ["Clearer mission communication", "More donation-ready layout", "Stronger nonprofit web presence"],
  },
];
