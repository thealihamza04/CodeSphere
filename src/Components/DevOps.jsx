import DevOpsData from "../Data/DevOps.json";
import GuideLayout from "./common/GuideLayout";
import { 
  LuZap, 
  LuBox, 
  LuActivity, 
  LuCloud, 
  LuShield, 
  LuTerminal,
  LuRocket
} from "react-icons/lu";

const categoryIcons = {
  "CI/CD Pipelines": LuZap,
  "Containers & Orchestration": LuBox,
  "Infrastructure as Code": LuTerminal,
  "Observability & Logging": LuActivity,
  "Cloud Computing": LuCloud,
  "Security & DevSecOps": LuShield
};

const DevOps = () => {
    return (
        <GuideLayout 
          data={DevOpsData}
          title="DevOps & Infrastructure"
          description="Modern engineering practices for automating software delivery, managing scalable infrastructure, and ensuring system reliability."
          seoConfig={{
            title: "Infrastructure & DevOps Guide | CodeSphere",
            description: "Master CI/CD pipelines, containerization, infrastructure as code, and cloud computing principles.",
            keywords: "devops, cicd, docker, kubernetes, terraform, aws, cloud computing, devsecops, observability",
            canonical: "https://codes-sphere.vercel.app/devops",
          }}
          categoryIcons={categoryIcons}
          defaultIcon={LuRocket}
          insightLabel="DevOps Insight"
          footerNoteTitle="Automate Everything"
          footerNoteText="Modern infrastructure is code. By embracing Automation, Immutability, and Observability, you can build systems that are as resilient as they are scalable."
          footerNoteIcon={LuTerminal}
        />
    );
};

export default DevOps;
