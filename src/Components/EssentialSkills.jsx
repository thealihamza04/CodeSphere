/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useSEO from "./Hooks/useSEO";

const AccordionItem = ({ title, content }) => (
  <div
    className='collapse  join-item border-b border-base-200'
  >
    <input type='radio' name='my-accordion-4' />
    <div className='collapse-title text-xl font-normal'>{title}</div>
    <div className='collapse-content opacity-65'>
      <p>{content}</p>
    </div>
  </div>
);

const EssentialSkills = () => {
  useSEO({
    title: "Developer Essential Skills | CodeSphere",
    description:
      "Key questions highlighting why core developer skills like version control, testing and design patterns matter.",
    keywords:
      "AliHamza projects, thealihamza04 projects, programming language timeline, projramming lang time line",
    canonical: "https://codes-sphere.vercel.app/developer-essential-skills",
    og: {
      title: "Developer Essential Skills | CodeSphere",
      description:
        "Key questions highlighting why core developer skills like version control, testing and design patterns matter.",
      url: "https://codes-sphere.vercel.app/developer-essential-skills",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Developer Essential Skills | CodeSphere",
      description:
        "Key questions highlighting why core developer skills like version control, testing and design patterns matter.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          name: "Developer Essential Skills",
          url: "https://codes-sphere.vercel.app/developer-essential-skills",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://codes-sphere.vercel.app/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Developer Essential Skills",
              item: "https://codes-sphere.vercel.app/developer-essential-skills",
            },
          ],
        },
      ],
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const items = [
    {
      title: "Why should you learn Programming Languages?",
      content: (
        <span>
          Programming languages are the foundation of all software. Mastery of multiple paradigms (Imperative, Functional, Object-Oriented) allows you to choose the <strong>best tool for the task</strong> and simplifies learning new frameworks as the industry evolves.
        </span>
      ),
    },
    {
      title: "Why use Version Control (Git)?",
      content: (
        <span>
          Git is the industry standard for <strong>collaboration and safety</strong>. It enables developers to experiment with new features in branches without breaking the main codebase and provides a comprehensive history of every change made to a project.
        </span>
      ),
    },
    {
      title: "Why study Data Structures & Algorithms (DSA)?",
      content: (
        <span>
          DSA is about <strong>efficiency and problem-solving</strong>. Understanding how to organize data (Arrays, Linked Lists, Trees) and write optimized logic (Big O notation) is what separates a coder from a true software engineer.
        </span>
      ),
    },
    {
      title: "Why learn Database Management?",
      content: (
        <span>
          Data is at the heart of every application. Understanding <strong>Relational (SQL)</strong> and <strong>NoSQL</strong> databases allows you to design scalable schemas, ensure data integrity, and optimize complex queries for high-performance apps.
        </span>
      ),
    },
    {
      title: "Why know Web Development Basics (HTML, CSS, JS)?",
      content: (
        <span>
          These are the <strong>languages of the web</strong>. Even if you specialize in backend or mobile, knowing how browsers render content and how users interact with interfaces is crucial for building cohesive, accessible products.
        </span>
      ),
    },
    {
      title: "Why understand APIs & System Integration?",
      content: (
        <span>
          Modern apps are rarely isolated. Mastering <strong>REST and GraphQL APIs</strong> allows your frontend to communicate with backends and integrate powerful third-party services like Stripe for payments or OpenAI for intelligence.
        </span>
      ),
    },
    {
      title: "Why practice Automated Testing?",
      content: (
        <span>
          Testing (Unit, Integration, and E2E) is about <strong>shipping with confidence</strong>. It ensures that new changes don't break existing features, reducing technical debt and allowing teams to move faster without fear of regressions.
        </span>
      ),
    },
    {
      title: "Why understand Operating Systems & Network Basics?",
      content: (
        <span>
          Software doesn't run in a vacuum. Knowing how <strong>memory management, file systems, and HTTP protocols</strong> work helps you debug low-level issues and optimize your application's performance and security.
        </span>
      ),
    },
    {
      title: "Why master the Command Line (CLI)?",
      content: (
        <span>
          The CLI is a <strong>power-user's playground</strong>. It provides speed and automation capabilities far beyond what GUIs offer, from managing remote servers via SSH to running complex build scripts and version control commands.
        </span>
      ),
    },
    {
      title: "Why care about Security & Best Practices?",
      content: (
        <span>
          Security is not an afterthought; it's a <strong>core responsibility</strong>. Understanding OWASP principles, encryption, and authentication (JWT, OAuth) protects both your user's sensitive data and your company's reputation.
        </span>
      ),
    },
    {
      title: "Why learn Cloud, Docker & DevOps?",
      content: (
        <span>
          The "it works on my machine" era is over. <strong>Containerization (Docker)</strong> and <strong>Cloud Platforms (AWS/Azure)</strong> ensure your application runs consistently across all environments, enabling seamless scaling and reliability.
        </span>
      ),
    },
    {
      title: "Why embrace AI & LLM Tools?",
      content: (
        <span>
          AI tools like GitHub Copilot and ChatGPT are <strong>force multipliers</strong>. Learning to write effective prompts and integrate AI APIs into your workflow allows you to automate boilerplate code and focus on higher-level system design.
        </span>
      ),
    },
    {
      title: "Why understand System Design & Architecture?",
      content: (
        <span>
          Writing code is easy; building <strong>scalable systems</strong> is hard. Understanding architectural patterns (Microservices, Event-Driven, Serverless) ensures your application can handle millions of users and remain maintainable as it grows.
        </span>
      ),
    },
    {
      title: "Why learn Concurrency & Parallelism?",
      content: (
        <span>
          Modern hardware is multi-core. Mastering <strong>async/await, threading, and race conditions</strong> allows you to write software that performs multiple operations simultaneously, drastically improving responsiveness and throughput.
        </span>
      ),
    },
    {
      title: "Why care about Technical Debt & Refactoring?",
      content: (
        <span>
          Speed often leads to "messy" code. <strong>Technical debt</strong> is the cost of choosing an easy solution now instead of a better one later. Regular refactoring is "paying interest" on that debt to keep the codebase healthy.
        </span>
      ),
    },
    {
      title: "Why prioritize Observability & Logging?",
      content: (
        <span>
          When things break in production, you need <strong>visibility</strong>. Implementing structured logging, metrics (Prometheus), and tracing (OpenTelemetry) allows you to diagnose issues in minutes rather than hours of guessing.
        </span>
      ),
    },
    {
      title: "Why know Functional vs. OOP Paradigms?",
      content: (
        <span>
          Different problems require different mental models. <strong>Object-Oriented Programming</strong> is great for modeling real-world entities, while <strong>Functional Programming</strong> excels at data transformation and avoiding side effects through immutability.
        </span>
      ),
    },
    {
      title: "Why understand Memory Management?",
      content: (
        <span>
          Whether it's C++ manual management or Java/JS <strong>Garbage Collection</strong>, knowing how the Stack and Heap work helps you prevent memory leaks and write code that is respectful of the machine's resources.
        </span>
      ),
    },
    {
      title: "Why study Data Privacy & Compliance (GDPR)?",
      content: (
        <span>
          In the modern era, <strong>data is a liability</strong>. Understanding how to handle PII (Personally Identifiable Information), encryption at rest/transit, and compliance laws is critical for any developer handling user data.
        </span>
      ),
    },
    {
      title: "Why improve Soft Skills (Teamwork & PRs)?",
      content: (
        <span>
          Coding is a <strong>team sport</strong>. Strong communication, code review etiquette, and documentation skills are just as important as technical ability when it comes to delivering large-scale, impactful software projects.
        </span>
      ),
    },
  ];

  return (
    <>
      <div className='container mx-auto py-12 space-y-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl md:text-5xl font-extrabold'>
            Essential Skills & Concepts
          </h1>
          <p className='max-w-2xl mx-auto text-base-content/60 text-lg'>
            The tech industry moves fast, but core principles remain. Here are the fundamental areas every software developer should master to build high-quality, professional products.
          </p>
        </div>
        <div className='join join-vertical w-full space-y-4'>
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EssentialSkills;
