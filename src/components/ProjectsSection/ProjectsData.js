export const PROJECTS = [
  {
    id: "project-1",
    title: "Lembaga Sertifikasi Profesi (LSP) GeTI",
    description: "A high-performance BNSP-accredited P1 certification platform redefining professional credentials. It streamlines everything from interactive assessments to secure PSrE digital signatures (supervised by Komdigi), delivering a seamless, automated flow from onboarding to e-certificate issuance.",
    highlights: [
      "BNSP-Accredited P1 Certification",
      "Automated End-to-End Workflow",
      "Interactive Assessment Engine",
      "Secure PSrE Digital Signatures",
      "Komdigi-Validated Compliance"
    ],
    stacks: [
      { id: "nuxtjs", name: "NuxtJS", iconPath: "nuxtjs/nuxtjs-original.svg" },
      { id: "vuejs", name: "VueJS", iconPath: "vuejs/vuejs-original.svg" },
      { id: "php", name: "PHP", iconPath: "php/php-original.svg" },
      { id: "laravel", name: "Laravel", iconPath: "laravel/laravel-original.svg" },
      { id: "mysql", name: "MySQL", iconPath: "mysql/mysql-original.svg" },
      { id: "react", name: "React", iconPath: "react/react-original.svg" },
      { id: "js", name: "Javascript", iconPath: "javascript/javascript-original.svg" },
      { id: "socketio", name: "Socket.io", iconPath: "socketio/socketio-original.svg" },
    ],
    images: [
      "/projects/lsp/Screenshot 2026-03-28 at 11.41.12 PM.png",
      "/projects/lsp/Screenshot 2026-03-28 at 11.55.02 PM.png",
      "/projects/lsp/Screenshot 2026-03-28 at 11.57.32 PM.png",
      "/projects/lsp/Screenshot 2026-03-28 at 11.58.22 PM.png",
      "/projects/lsp/Screenshot 2026-03-28 at 11.59.30 PM.png",
      "/projects/lsp/Screenshot 2026-03-29 at 12.00.09 AM.png",
    ]
  },
  {
    id: "project-2",
    title: "SIRAPTOR",
    description: "A comprehensive 'Super App' re-engineering internal operations for Pertamina branches across Indonesia. Siraptor automates role-based assignments and role-specific workflows through enterprise-grade monitoring dashboards. It serves as a centralized productivity hub, featuring a sophisticated communication engine with personal, group, and Discord-style channel chats, integrated seamlessly with interactive Kanban boards for high-velocity task management.",
    highlights: [
      "Nationwide Pertamina Internal Deployment",
      "Real-Time Cross-Branch Data Monitoring",
      "Discord-Style Advanced Chat Engine",
      "Interactive Kanban Task Orchestration",
      "Granular Role-Based Access Control (RBAC)"
    ],
    stacks: [
      { id: "nuxtjs", name: "NuxtJS", iconPath: "nuxtjs/nuxtjs-original.svg" },
      { id: "vuejs", name: "VueJS", iconPath: "vuejs/vuejs-original.svg" },
      { id: "laravel", name: "Laravel", iconPath: "laravel/laravel-original.svg" },
      { id: "php", name: "PHP", iconPath: "php/php-original.svg" },
      { id: "mysql", name: "MySQL", iconPath: "mysql/mysql-original.svg" },
      { id: "socketio", name: "Socket.io", iconPath: "socketio/socketio-original.svg" },
      { id: "nodejs", name: "NodeJS", iconPath: "nodejs/nodejs-original.svg" },
    ],
    images: [
      "/projects/siraptor/Screenshot 2026-03-29 at 12.10.13 AM.png",
      "/projects/siraptor/Screenshot 2026-03-29 at 12.12.48 AM.png",
      "/projects/siraptor/Screenshot 2026-03-29 at 12.14.53 AM.png",
    ]
  },
  {
    id: "project-3",
    title: "Momento Project",
    description: "A premium digital wedding ecosystem that harmonizes artistic aesthetics with high-performance functionality. Momento Project offers a bespoke invitation builder with real-time theme customization, secure guest data management, and insightful analytics. It also doubles as a curated showroom for exclusive wedding services, providing a unified booking gateway for 'Seserahan', 'Mahar', and other essential wedding products.",
    highlights: [
      "Artistic-Driven Digital Invitations",
      "Dynamic Custom Invitation Builder",
      "Comprehensive Guest Data Analytics",
      "Integrated Wedding Product Showroom",
      "Streamlined Service Booking Gateway"
    ],
    stacks: [
      { id: "vuejs", name: "VueJS", iconPath: "vuejs/vuejs-original.svg" },
      { id: "firebase", name: "Firebase", iconPath: "firebase/firebase-original.svg" },
    ],
    images: [
      "/projects/momento/Screenshot 2026-03-29 at 12.02.03 AM.png",
      "/projects/momento/Screenshot 2026-03-29 at 12.03.49 AM.png",
      "/projects/momento/Screenshot 2026-03-29 at 12.05.55 AM.png",
      "/projects/momento/Screenshot 2026-03-28 at 11.41.03 PM.png",
    ]
  },
  {
    id: "project-4",
    title: "Megure",
    description: "An enterprise-grade asset management and infrastructure monitoring system tailored for Pertamina’s nationwide operations. Megure digitizes the entire lifecycle of facility maintenance—from nationwide asset inventory and problem reporting to real-time repair tracking. It simplifies complex corporate bureaucracy with automated digital document handling and role-specific approval workflows, integrated with geospatial mapping for data-driven facility oversight.",
    highlights: [
      "Nationwide Facility Asset Inventory",
      "Real-Time Incident & Repair Tracking",
      "Automated Multi-Role Approval Workflow",
      "Geospatial Resource Mapping (Leaflet)",
      "Digital Bureaucracy & Document Archiving"
    ],
    stacks: [
      { id: "nuxtjs", name: "NuxtJS", iconPath: "nuxtjs/nuxtjs-original.svg" },
      { id: "vuejs", name: "VueJS", iconPath: "vuejs/vuejs-original.svg" },
      { id: "laravel", name: "Laravel", iconPath: "laravel/laravel-original.svg" },
      { id: "mysql", name: "MySQL", iconPath: "mysql/mysql-original.svg" },
      { id: "php", name: "PHP", iconPath: "php/php-original.svg" },
      { id: "leaflet", name: "Leaflet", iconPath: "javascript/javascript-original.svg" }, // Using JS icon as fallback or specific leaflet if available
    ],
    images: [
      "/projects/megure/Screenshot 2026-03-29 at 12.17.29 AM.png",
      "/projects/megure/Screenshot 2026-03-29 at 12.18.18 AM.png",
      "/projects/megure/Screenshot 2026-03-29 at 12.18.48 AM.png",
      "/projects/megure/Screenshot 2026-03-29 at 12.19.26 AM.png",
    ]
  },
  {
    id: "project-5",
    title: "Warehouse Management System (WMS)",
    description: "A robust enterprise-grade solution engineered to optimize complex logistics and supply chain workflows. This platform digitizes the entire inventory lifecycle—from initial procurement and goods receiving to high-precision storage, cross-warehouse stock transfers, and automated delivery tracking. It provides a real-time, high-accuracy data engine for inventory monitoring, stock reconciliation, and end-to-end warehouse orchestration.",
    highlights: [
      "End-to-End Logistics Orchestration",
      "Precision Receiving & Procurement Workflow",
      "High-Velocity Stock Transfer Management",
      "Real-Time Global Inventory Monitoring",
      "Automated Stock Health Reporting"
    ],
    stacks: [
      { id: "nextjs", name: "NextJS", iconPath: "nextjs/nextjs-original.svg" },
      { id: "react", name: "React", iconPath: "react/react-original.svg" },
      { id: "laravel", name: "Laravel", iconPath: "laravel/laravel-original.svg" },
      { id: "postgresql", name: "PostgreSQL", iconPath: "postgresql/postgresql-original.svg" },
      { id: "php", name: "PHP", iconPath: "php/php-original.svg" },
    ],
    images: [
      "/projects/wmsv2/Screenshot 2026-03-29 at 12.29.07 AM.png",
      "/projects/wmsv2/Screenshot 2026-03-29 at 12.30.03 AM.png",
      "/projects/wmsv2/Screenshot 2026-03-29 at 12.30.43 AM.png",
      "/projects/wmsv2/Screenshot 2026-03-29 at 12.30.58 AM.png",
    ]
  },
  {
    id: "project-6",
    title: "Kernel App",
    description: "A highly adaptable 'Super App' inspired by the modularity of Odoo, designed to serve as the unified operating system for high-growth enterprises. Kernel provides an end-to-end framework that captures the entire business lifecycle—from procurement and HR to financials and operations. It is built for infinite customization, allowing clients to tailor every module to their unique organizational logic.",
    highlights: [
      "Odoo-Inspired Modular 'Super App'",
      "End-to-End Business Lifecycle Hub",
      "Infinite Module Customization Engine",
      "Unified Enterprise Resource Planner",
      "Adaptive Scalable Architecture"
    ],
    stacks: [
      { id: "nextjs", name: "NextJS", iconPath: "nextjs/nextjs-original.svg" },
      { id: "react", name: "React", iconPath: "react/react-original.svg" },
      { id: "laravel", name: "Laravel", iconPath: "laravel/laravel-original.svg" },
      { id: "php", name: "PHP", iconPath: "php/php-original.svg" },
      { id: "mysql", name: "MySQL", iconPath: "mysql/mysql-original.svg" },
    ],
    images: [
      "/projects/kernel/Screenshot 2026-03-29 at 12.26.03 AM.png",
      "/projects/kernel/Screenshot 2026-03-29 at 12.24.11 AM.png",
      "/projects/kernel/Screenshot 2026-03-29 at 12.25.48 AM.png",
      "/projects/kernel/Screenshot 2026-03-29 at 12.23.07 AM.png",
    ]
  }
];

export const INITIAL_PROJECTS = PROJECTS.slice(0, 5);
export const MORE_PROJECTS = PROJECTS.slice(5);
