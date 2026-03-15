import SocialIntelligenceData from "../Data/SocialIntelligence.json";
import GuideLayout from "./common/GuideLayout";
import { 
  LuBrain, 
  LuHeart, 
  LuMessageCircle, 
  LuUsers, 
  LuZap,
  LuSparkles,
  LuLightbulb,
  LuShieldAlert,
  LuMagnet,
  LuHeartHandshake,
  LuStar
} from "react-icons/lu";

const categoryIcons = {
  "Cognitive Biases in Social Perception": LuBrain,
  "Friendship Formation Mechanics": LuHeart,
  "Conversation Dynamics": LuMessageCircle,
  "Group Conversation Strategy": LuUsers,
  "Confidence & Nonverbal Communication": LuZap,
  "The Charisma Framework": LuStar,
  "High-Stakes Communication & Conflict": LuShieldAlert,
  "The Psychology of Influence": LuMagnet,
  "Emotional Intelligence (EQ)": LuHeartHandshake
};

const SocialIntelligence = () => {
    return (
        <GuideLayout 
          data={SocialIntelligenceData}
          title="Social Intelligence"
          description="Master the psychological and behavioral dynamics of human interaction—from overcoming internal perception biases to mastering the art of conversation and building lasting connections."
          seoConfig={{
            title: "Social Intelligence & Human Dynamics | CodeSphere",
            description: "Explore the science of social interaction, cognitive biases, and conversation strategies to improve your interpersonal skills and build stronger relationships.",
            keywords: "social intelligence, social psychology, cognitive biases, conversation skills, friendship mechanics, nonverbal communication, human dynamics",
            canonical: "https://codes-sphere.vercel.app/social-intelligence",
          }}
          categoryIcons={categoryIcons}
          defaultIcon={LuSparkles}
          insightLabel="Social Insight"
          footerNoteTitle="The Science of Connection"
          footerNoteText="Intelligence isn't just about what you know—it's about how you relate to others. By understanding the underlying mechanics of social perception and interaction, we can navigate the human world with greater empathy and confidence."
          footerNoteIcon={LuLightbulb}
        />
    );
};

export default SocialIntelligence;
