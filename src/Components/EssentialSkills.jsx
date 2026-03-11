import EssentialSkillsData from "../Data/EssentialSkills.json";
import GuideLayout from "./common/GuideLayout";
import { 
  LuCode, 
  LuDatabase, 
  LuSettings, 
  LuShield, 
  LuSparkles,
  LuZap,
  LuLightbulb
} from "react-icons/lu";

const categoryIcons = {
  "Core Foundations": LuCode,
  "Systems & Data": LuDatabase,
  "Process & Automation": LuSettings,
  "Deployment, Security & AI": LuShield
};

const EssentialSkills = () => {
    return (
        <GuideLayout 
          data={EssentialSkillsData}
          title="Essential Skills"
          description="The non-negotiable technical competencies every modern developer must master to build, secure, and scale high-impact software."
          seoConfig={{
            title: "Essential Developer Skills | CodeSphere",
            description: "A deep dive into the core technical skills, systems, and processes required for modern software engineering excellence.",
            keywords: "developer skills, clean code, data structures, cloud computing, security, devops, software engineering best practices",
            canonical: "https://codes-sphere.vercel.app/developer-essential-skills",
          }}
          categoryIcons={categoryIcons}
          defaultIcon={LuSparkles}
          insightLabel="Growth Insight"
          footerNoteTitle="Engineering Excellence"
          footerNoteText="Mastery is a journey of continuous refinement. By focusing on these core pillars, you transform from a coder into a high-impact software architect."
          footerNoteIcon={LuZap}
        />
    );
};

export default EssentialSkills;
