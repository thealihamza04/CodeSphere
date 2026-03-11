import SystemDesignData from "../Data/SystemDesign.json";
import GuideLayout from "./common/GuideLayout";
import { 
  LuServer, 
  LuDatabase, 
  LuCpu, 
  LuActivity, 
  LuZap,
  LuCircuitBoard,
  LuLightbulb
} from "react-icons/lu";

const categoryIcons = {
  "Fundamental Concepts": LuServer,
  "Architecture Patterns": LuCpu,
  "Data Management": LuDatabase,
  "Network & Delivery": LuActivity
};

const SystemDesign = () => {
    return (
        <GuideLayout 
          data={SystemDesignData}
          title="System Design"
          description="Architecture patterns and engineering principles for building robust, scalable, and high-performance distributed systems."
          seoConfig={{
            title: "System Design Concepts & Architecture | CodeSphere",
            description: "Master the principles of large-scale distributed systems, scalability, availability, and modern architecture patterns.",
            keywords: "system design, distributed systems, scalability, microservices, load balancing, caching, database sharding",
            canonical: "https://codes-sphere.vercel.app/system-design",
          }}
          categoryIcons={categoryIcons}
          defaultIcon={LuZap}
          insightLabel="Engineering Insight"
          footerNoteTitle="Scalable Thinking"
          footerNoteText="System design is the art of managing complexity. By understanding Decoupling, Observability, and Reliability, you can build systems that grow effortlessly with your user base."
          footerNoteIcon={LuCircuitBoard}
        />
    );
};

export default SystemDesign;
