import DesignPatternsData from "../Data/DesignPatterns.json";
import GuideLayout from "./common/GuideLayout";
import { 
  LuZap,
  LuBox,
  LuLayers,
  LuActivity,
  LuPuzzle,
  LuServer,
  LuShapes
} from "react-icons/lu";

const categoryIcons = {
  "Creational Patterns": LuBox,
  "Structural Patterns": LuLayers,
  "Behavioral Patterns": LuActivity,
  "Architectural Patterns": LuServer,
  "Concurrency Patterns": LuZap,
  "Cloud & Distributed Patterns": LuPuzzle
};

const DesignPatterns = () => {
    return (
        <GuideLayout 
          data={DesignPatternsData}
          title="Design Patterns"
          description="Standardized solutions to common software design problems, providing templates for writing robust and reusable code."
          seoConfig={{
            title: "Software Design Patterns Guide | CodeSphere",
            description: "Explore creational, structural, and behavioral design patterns to write cleaner, more maintainable software.",
            keywords: "design patterns, solid principles, creational patterns, structural patterns, behavioral patterns, singleton, factory, observer",
            canonical: "https://codes-sphere.vercel.app/design-patterns",
          }}
          categoryIcons={categoryIcons}
          defaultIcon={LuShapes}
          insightLabel="Architecture Insight"
          footerNoteTitle="The Art of Abstraction"
          footerNoteText="Patterns are not about copy-pasting code; they are about understanding the Relationships and Responsibility between objects to solve architectural puzzles elegantly."
          footerNoteIcon={LuPuzzle}
        />
    );
};

export default DesignPatterns;
