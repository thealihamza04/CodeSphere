// A–Z index of libraries, frameworks and developer tools.
// Libraries and frameworks come from the site's own catalogs; tools are listed below.
import librariesRegistry from "./LibrariesRegistry.json";
import languagesCatalog from "./LanguagesCatalog.json";

// Format: "Name|Kind|Brief"
const tools = `
Android Studio|IDE|Google's official IDE for Android app development.
Ansible|DevOps|Agentless automation for configuring servers over SSH.
Apache Kafka|Data|A distributed platform for streaming events at scale.
Argo CD|DevOps|GitOps continuous delivery for Kubernetes.
AWS CLI|Cloud|Command-line tool for managing Amazon Web Services.
Babel|Build|Compiles modern JavaScript into code older browsers understand.
Bitbucket|Version Control|Atlassian's Git hosting with built-in CI pipelines.
Biome|Code Quality|A fast formatter and linter for JavaScript and TypeScript.
Bun|Runtime|An all-in-one JavaScript runtime, bundler and package manager.
CircleCI|CI/CD|A hosted platform for continuous integration and delivery.
Cloudflare|Cloud|CDN, DNS, security and edge computing platform.
Cursor|IDE|An AI-first code editor built on VS Code.
Cypress|Testing|End-to-end testing for anything that runs in a browser.
Datadog|Monitoring|Monitoring and observability for cloud apps and infrastructure.
DBeaver|Database|A universal desktop client for SQL databases.
Deno|Runtime|A secure JavaScript and TypeScript runtime.
Docker|DevOps|Builds and runs apps in lightweight containers.
Docker Compose|DevOps|Defines and runs multi-container apps from one YAML file.
Elasticsearch|Data|A distributed search and analytics engine.
esbuild|Build|An extremely fast JavaScript bundler written in Go.
ESLint|Code Quality|Finds and fixes problems in JavaScript code.
Figma|Design|Collaborative interface design in the browser.
Firebase|Backend|Google's backend platform with auth, database and hosting.
Git|Version Control|The distributed version control system.
GitHub|Version Control|Git hosting with pull requests, issues and Actions.
GitHub Actions|CI/CD|CI/CD workflows built into GitHub.
GitHub Copilot|AI|An AI pair programmer inside your editor.
GitLab|Version Control|A DevOps platform with Git hosting and built-in CI.
Grafana|Monitoring|Dashboards and visualization for metrics and logs.
Gradle|Build|A build automation tool for JVM and Android projects.
Helm|DevOps|The package manager for Kubernetes.
Heroku|Cloud|A platform for deploying apps with minimal setup.
Homebrew|Package Manager|The package manager for macOS and Linux.
Insomnia|API|A desktop client for designing and testing APIs.
IntelliJ IDEA|IDE|JetBrains' IDE for Java and Kotlin.
Jenkins|CI/CD|An open-source automation server for builds and deploys.
Jest|Testing|A JavaScript testing framework focused on simplicity.
Jira|Project Management|Atlassian's issue and project tracker.
Jupyter|Data|Interactive notebooks for code, charts and notes.
Kubernetes|DevOps|Orchestrates, scales and manages containers.
Maven|Build|A build and dependency tool for Java projects.
MongoDB|Database|A popular document-oriented NoSQL database.
MySQL|Database|A widely used open-source relational database.
Neon|Database|Serverless Postgres with branching.
Netlify|Cloud|Hosting and serverless functions for web projects.
Nginx|DevOps|A fast web server, reverse proxy and load balancer.
Node.js|Runtime|Runs JavaScript outside the browser.
Notion|Productivity|Docs, wikis and project tracking in one workspace.
npm|Package Manager|The default package manager for Node.js.
Ollama|AI|Runs large language models locally.
Playwright|Testing|Reliable end-to-end testing across all browsers.
pnpm|Package Manager|A fast, disk-efficient Node.js package manager.
Postman|API|A platform for building and testing APIs.
PostgreSQL|Database|An advanced open-source relational database.
Prettier|Code Quality|An opinionated code formatter.
Prisma|Database|A type-safe ORM for Node.js and TypeScript.
Prometheus|Monitoring|Metrics collection and alerting toolkit.
PyCharm|IDE|JetBrains' IDE for Python.
Railway|Cloud|Deploy apps and databases with little configuration.
Redis|Database|An in-memory data store for caching and queues.
Render|Cloud|A cloud for hosting web services, sites and databases.
Rollup|Build|A module bundler for libraries and apps.
Selenium|Testing|Automates browsers for testing across languages.
Sentry|Monitoring|Error tracking and performance monitoring.
SonarQube|Code Quality|Continuous inspection of code quality and security.
SQLite|Database|A small, self-contained, file-based SQL database.
Storybook|Testing|Builds and tests UI components in isolation.
Supabase|Backend|An open-source Firebase alternative built on Postgres.
Terraform|DevOps|Defines cloud infrastructure as code.
tmux|Terminal|A terminal multiplexer for sessions, windows and panes.
Turborepo|Build|A high-performance build system for monorepos.
Vercel|Cloud|Frontend cloud for deploying web apps.
Vim|Editor|A fast, keyboard-driven text editor.
Visual Studio|IDE|Microsoft's full IDE for .NET and C++.
Visual Studio Code|Editor|Microsoft's free, extensible code editor.
Vite|Build|A fast frontend build tool and dev server.
Vitest|Testing|A Vite-native unit testing framework.
Webpack|Build|A configurable JavaScript module bundler.
Wireshark|Networking|Captures and inspects network traffic.
Xcode|IDE|Apple's IDE for iOS and macOS apps.
Yarn|Package Manager|A JavaScript package manager.
Zed|Editor|A high-performance, collaborative code editor.
`
  .trim()
  .split("\n")
  .map((line) => {
    const [term, kind, brief] = line.split("|");
    return { term, category: `Tool · ${kind}`, brief };
  });

const libraries = librariesRegistry.flatMap((group) =>
  group.Libraries.map((lib) => ({
    term: lib.Name,
    category: `Library · ${group.Language}`,
    brief: lib.Summary,
  }))
);

const frameworks = languagesCatalog.flatMap((group) =>
  (group.More || [])
    .filter((fw) => fw.Framework)
    .map((fw) => ({
      term: fw.Framework,
      category: `Framework · ${group.Language}`,
      brief: fw.Summary,
    }))
);

// Ignore leading symbols so ".NET MAUI" files under N
export const sortKey = (name) => name.replace(/^[^A-Za-z0-9]+/, "");

// Catalog entries that are topics rather than actual libraries or tools
const EXCLUDE = new Set(["ai & llm integration"]);

// Tools first so their briefs win over duplicates, then frameworks, then libraries
const seen = new Set();
const terms = [...tools, ...frameworks, ...libraries]
  .filter((item) => {
    const key = item.term.trim().toLowerCase();
    if (seen.has(key) || EXCLUDE.has(key)) return false;
    seen.add(key);
    return true;
  })
  .sort((a, b) => sortKey(a.term).localeCompare(sortKey(b.term), "en", { sensitivity: "base" }));

export default terms;
