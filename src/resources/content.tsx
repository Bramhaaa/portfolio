import { About, Blog, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Bramha",
  lastName: "Bajannavar",
  name: "Bramha Bajannavar",
  role: "CSE Undergrad & Mobile Developer",
  avatar: "/images/avatar.jpeg",
  email: "altbramhabajannavar@gmail.com",
  location: "Bengaluru/India",
  timeZone: "Asia/Kolkata",
  languages: ["English", "Hindi", "Kannada"],
  handles: {
    github: "bramhaaa",
    leetcode: "general_BR",
    geeksforgeeks: "generalbr",
  },
};

const newsletter: Newsletter = {
  display: true,
  title: <>Contact Me</>,
  description: <>Have a project or a question? Send me a message.</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/bramhaaa",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/bramhabajannavar",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Codolio",
    icon: "codolio",
    link: "https://codolio.com/profile/generalBR",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Flutter Developer · AI Application Builder</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Hover Dock</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/hover-dock",
  },
  subline: (
    <>
    I'm Bramha, a developer focused on AI, mobile apps, and backend systems. When I'm not building products, I'm usually solving problems or learning something new.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "Summary",
    description: (
      <>
        Computer Science student building mobile applications, backend systems, and AI-powered products. Experienced with Flutter, FastAPI, real-time systems, and LLM integrations, with a focus on creating practical, scalable software.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Samsung PRISM (Samsung Research)",
        timeframe: "Jan 2026 - Present",
        role: "Research Intern · Bengaluru (Remote)",
        achievements: [
          <>
            Implemented DFA-based text normalization for multi-locale systems, including numbers,
            currency, dates, and time.
          </>,
          <>
            Formalized deterministic parsing logic to reduce ambiguity in rule processing.
          </>,
          <>
            Contributed through structured technical reviews and milestone evaluations.
          </>,
        ],
      },
      {
        company: "Antariksha Labs",
        timeframe: "Apr 2026 - Present",
        role: "AI App Developer Intern · Bengaluru (Remote)",
        achievements: [
          <>
            Integrated LLM-based features, including chatbots and natural-language query
            interfaces, using modern APIs and prompt pipelines.
          </>,
          <>
            Built and optimized Retrieval-Augmented Generation pipelines with vector databases for
            context-aware responses.
          </>,
          <>
            Developed and deployed on-device TensorFlow Lite models for OCR and offline-first
            capabilities.
          </>,
        ],
      },
    ],
  },
  projects: {
    display: true,
    title: "Selected Projects",
    projects: [
      {
        title: "Hover Dock",
        description: <>Swift · AppKit · CoreGraphics · Accessibility APIs</>,
        link: "https://github.com/Bramhaaa/Hover-Dock",
        achievements: [
          <>Developed a native macOS utility bringing interactive window previews to the macOS Dock.</>,
          <>Integrated Accessibility APIs and CoreGraphics to track dock icons and render real-time window thumbnails.</>,
          <>Designed a lightweight, system-optimized background process with smooth animations.</>,
        ],
      },
      {
        title: "Real-time Search & Chat System",
        description: <>Flutter · FastAPI · WebSockets · RAG</>,
        link: "https://perplexity-clone-ai.web.app",
        achievements: [
          <>Built a Flutter application that lets users query documents using AI.</>,
          <>Implemented a Retrieval-Augmented Generation pipeline for contextual answers.</>,
          <>Integrated a FastAPI backend, WebSockets, and LLM APIs for real-time responses.</>,
        ],
      },
      {
        title: "Flutter Blog Platform",
        description: <>Flutter · Clean Architecture · BLoC · Supabase</>,
        link: "https://flutter-blog-app-clean.web.app",
        achievements: [
          <>Developed a cross-platform blog application with authentication and CRUD features.</>,
          <>Implemented Clean Architecture with BLoC state management.</>,
          <>Integrated Supabase and PostgreSQL for content storage and API communication.</>,
        ],
      },
      {
        title: "Scalable Document Indexing & Query System",
        description: <>Python · RAG · Document Processing · Streamlit</>,
        link: "https://intelligent-pdf-answering-system.streamlit.app",
        achievements: [
          <>Built a multi-document ingestion and indexing pipeline for efficient retrieval.</>,
          <>Achieved sub-three-second responses on documents longer than 20 pages.</>,
          <>Reduced memory usage by about 70% through dependency and pipeline optimization.</>,
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "BMS College of Engineering",
        description: (
          <>
            B.E. in Computer Science and Engineering · Aug 2023 - Jul 2027
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Tech Stack",
    skills: [
      {
        title: "Programming",
        tags: [
          { name: "Python", icon: "python" },
          { name: "C++", icon: "cplusplus" },
          { name: "Dart", icon: "dart" },
          { name: "SQL", icon: "sql" },
        ],
      },
      {
        title: "Application Development",
        tags: [
          { name: "Flutter", icon: "flutter" },
          { name: "Android", icon: "android" },
          { name: "BLoC", icon: "bloc" },
          { name: "Clean Architecture", icon: "cleanarch" },
          { name: "REST APIs", icon: "api" },
        ],
      },
      {
        title: "Backend & Data",
        tags: [
          { name: "FastAPI", icon: "fastapi" },
          { name: "WebSockets", icon: "websockets" },
          { name: "Supabase", icon: "supabase" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MySQL", icon: "mysql" },
        ],
      },
      {
        title: "AI & Machine Learning",
        tags: [
          { name: "OpenAI", icon: "openai" },
          { name: "RAG", icon: "rag" },
          { name: "Vector Databases", icon: "vectordb" },
          { name: "TensorFlow Lite", icon: "tensorflow" },
          { name: "OCR", icon: "ocr" },
          { name: "NLP", icon: "nlp" },
        ],
      },
      {
        title: "Cloud & DevOps",
        tags: [
          { name: "Docker", icon: "docker" },
          { name: "AWS EC2", icon: "aws" },
          { name: "AWS IAM", icon: "awsiam" },
          { name: "Git", icon: "git" },
          { name: "GitHub", icon: "github" },
          { name: "Linux", icon: "linux" },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export { person, social, newsletter, home, about, blog, work };
