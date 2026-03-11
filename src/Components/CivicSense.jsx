import CivicSenseData from "../Data/CivicSense.json";
import GuideLayout from "./common/GuideLayout";
import { 
  LuUsers, 
  LuLeaf, 
  LuShieldCheck, 
  LuGlobe, 
  LuSparkles,
  LuHeart,
  LuLightbulb
} from "react-icons/lu";

const categoryIcons = {
  "Social Etiquette & Respect": LuUsers,
  "Environmental Stewardship": LuLeaf,
  "Safety & Legal Compliance": LuShieldCheck,
  "Digital Citizenship": LuGlobe
};

const CivicSense = () => {
    return (
        <GuideLayout 
          data={CivicSenseData}
          title="Civic Sense"
          description="The cornerstone of a functioning society—encompassing social ethics, shared responsibilities, and the collective duty to care for our community and environment."
          seoConfig={{
            title: "Civic Sense & Social Responsibility | CodeSphere",
            description: "A comprehensive guide to civic sense, social etiquette, environmental stewardship, and digital citizenship for a better society.",
            keywords: "civic sense, social responsibility, etiquette, environmental stewardship, digital citizenship, community",
            canonical: "https://codes-sphere.vercel.app/civic-sense",
          }}
          categoryIcons={categoryIcons}
          defaultIcon={LuSparkles}
          insightLabel="Citizen Insight"
          footerNoteTitle="The Power of Collective Action"
          footerNoteText="Civic sense is the social ethics which defines the character of a nation. By being mindful of our surroundings and others, we build a legacy of respect and sustainability."
          footerNoteIcon={LuLightbulb}
        />
    );
};

export default CivicSense;
