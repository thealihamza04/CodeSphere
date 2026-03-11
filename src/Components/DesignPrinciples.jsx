import DesignPrinciplesData from "../Data/DesignPrinciples.json";
import GuideLayout from "./common/GuideLayout";
import { 
  LuMonitor, 
  LuFileText, 
  LuShapes, 
  LuAccessibility, 
  LuLayers, 
  LuUserCheck,
  LuBrain,
  LuTarget,
  LuHeart,
  LuSparkles,
  LuLightbulb
} from "react-icons/lu";

const categoryIcons = {
  "Core UI/UX Foundations": LuMonitor,
  "The Laws of UX": LuFileText,
  "Gestalt Principles of Perception": LuShapes,
  "Accessibility & Inclusivity": LuAccessibility,
  "Visual Hierarchy & Flow": LuLayers,
  "Interaction Design Heuristics": LuUserCheck,
  "Advanced Cognitive Laws": LuBrain,
  "Strategic Efficiency Principles": LuTarget,
  "Ethical & Emotional Design": LuHeart
};

const DesignPrinciples = () => {
    return (
        <GuideLayout 
          data={DesignPrinciplesData}
          title="Design Principles"
          description="A collection of the most effective design laws, cognitive heuristics, and UX principles used to build world-class user interfaces."
          seoConfig={{
            title: "Design Principles & UX Laws | CodeSphere",
            description: "Explore the fundamental laws of design, from Gestalt principles to Interaction Heuristics, built for modern developers.",
            keywords: "design principles, ux laws, gestaly principles, accessibility, visual hierarchy, cognitive load, intuitive design",
            canonical: "https://codes-sphere.vercel.app/design-principles",
          }}
          categoryIcons={categoryIcons}
          defaultIcon={LuSparkles}
          insightLabel="Design Insight"
          footerNoteTitle="Design with Intention"
          footerNoteText="Great design isn't just about how it looks, but how it works. By applying these objective laws of human perception, you can create interfaces that feel natural and effortless."
          footerNoteIcon={LuLightbulb}
        />
    );
};

export default DesignPrinciples;
