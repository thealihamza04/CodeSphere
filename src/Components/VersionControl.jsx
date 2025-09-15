/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useSEO from "./Hooks/useSEO";

const AccordionItem = ({ title, content }) => (
    <div className='border-b collapse join-item border-base-200'>
        <input
            type='radio'
            name='my-accordion-4'
        />
        <div className='text-xl font-normal collapse-title'>{title}</div>
        <div className='collapse-content opacity-65'>
            <p>{content}</p>
        </div>
    </div>
);

const AccordionGroup = () => {
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
                <em>
                    Programming languages are the core tools used to create
                    software, automate tasks, and solve technical problems
                    efficiently.
                </em>
            ),
        },
        {
            title: "Why use Version Control?",
            content: (
                <em>
                    Version control systems like Git track code changes, enable
                    team collaboration, and allow rollback to previous versions
                    when needed.
                </em>
            ),
        },
        {
            title: "Why study Data Structures & Algorithms?",
            content: (
                <em>
                    They are essential for writing efficient code, solving
                    complex problems, and performing well in technical
                    interviews.
                </em>
            ),
        },
        {
            title: "Why learn Database Management?",
            content: (
                <em>
                    Understanding databases allows you to store, organize, and
                    retrieve application data effectively using SQL or NoSQL
                    systems.
                </em>
            ),
        },
        {
            title: "Why know Web Development Basics?",
            content: (
                <em>
                    HTML, CSS, and JavaScript are fundamental for creating
                    websites and user interfaces that work across devices and
                    browsers.
                </em>
            ),
        },
        {
            title: "Why understand APIs?",
            content: (
                <em>
                    APIs allow applications to communicate with each other and
                    integrate external services such as payment gateways or data
                    sources.
                </em>
            ),
        },
        {
            title: "Why practice Testing?",
            content: (
                <em>
                    Testing ensures your code is reliable, helps identify bugs
                    early, and maintains software quality over time.
                </em>
            ),
        },
        {
            title: "Why learn Operating Systems?",
            content: (
                <em>
                    Knowledge of operating systems helps you understand how
                    software interacts with hardware, manages resources, and
                    runs processes.
                </em>
            ),
        },
        {
            title: "Why use Command Line?",
            content: (
                <em>
                    The command line provides powerful tools for navigating
                    files, running scripts, and automating development tasks
                    efficiently.
                </em>
            ),
        },
        {
            title: "Why know Software Design Patterns?",
            content: (
                <em>
                    Design patterns provide proven solutions to common problems,
                    making code more modular, reusable, and easier to maintain.
                </em>
            ),
        },
        {
            title: "Why care about Security Basics?",
            content: (
                <em>
                    Security knowledge helps protect your applications from
                    threats like data breaches, unauthorized access, and code
                    vulnerabilities.
                </em>
            ),
        },
        {
            title: "Why learn Cloud & DevOps?",
            content: (
                <em>
                    Cloud and DevOps skills allow you to deploy, monitor, and
                    scale applications efficiently using platforms like AWS and
                    tools like Docker and CI/CD.
                </em>
            ),
        },
        {
            title: "Why develop Problem Solving skills?",
            content: (
                <em>
                    Problem solving is crucial for debugging, designing
                    algorithms, and building efficient and scalable software
                    systems.
                </em>
            ),
        },
        {
            title: "Why improve Soft Skills?",
            content: (
                <em>
                    Soft skills such as communication, teamwork, and
                    adaptability are essential for working effectively in teams
                    and delivering successful projects.
                </em>
            ),
        },
    ];

    return (
        <>
            <div className='container py-12 mx-auto md:px-12 spacey-y-24'>
                <h1 className='py-12 text-3xl font-extrabold text-center md:text-3xl'>
                    Essential Questions Every Developer Should Know
                </h1>
                <div className='w-full space-y-4 join join-vertical'>
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

export default AccordionGroup;
