/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import useSEO from "./Hooks/useSEO";

const AIMLDL = () => {
  useSEO({
    title: "AI / ML / DL for Beginners | CodeSphere",
    description:
      "Introductory guide explaining the basics of Artificial Intelligence, Machine Learning and Deep Learning.",
    keywords:
      "AI basics, machine learning overview, deep learning introduction, CodeSphere",
    canonical: "https://codes-sphere.vercel.app/ai-ml-dl",
    og: {
      title: "AI / ML / DL for Beginners | CodeSphere",
      description:
        "Introductory guide explaining the basics of Artificial Intelligence, Machine Learning and Deep Learning.",
      url: "https://codes-sphere.vercel.app/ai-ml-dl",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "AI / ML / DL for Beginners | CodeSphere",
      description:
        "Introductory guide explaining the basics of Artificial Intelligence, Machine Learning and Deep Learning.",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      name: "AI / ML / DL for Beginners",
      url: "https://codes-sphere.vercel.app/ai-ml-dl",
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const topics = [
    {
      title: "Artificial Intelligence",
      summary:
        "AI is the science of making machines perform tasks that typically require human intelligence such as reasoning or problem solving.",
      roadmap: [
        "Learn programming fundamentals and logic",
        "Explore search, knowledge representation and planning",
        "Build small AI projects like chatbots or game agents",
      ],
    },
    {
      title: "Machine Learning",
      summary:
        "Machine learning enables systems to learn from data and improve their performance without being explicitly programmed.",
      roadmap: [
        "Study statistics, probability and linear algebra",
        "Understand supervised and unsupervised learning",
        "Practice with libraries such as scikit-learn or TensorFlow",
      ],
    },
    {
      title: "Deep Learning",
      summary:
        "Deep learning is a subset of machine learning that uses multi-layered neural networks to model complex patterns in data.",
      roadmap: [
        "Review neural network fundamentals",
        "Dive into architectures like CNNs and RNNs",
        "Experiment with frameworks such as PyTorch",
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-gray-100 py-9 px-4 md:px-20 space-y-6'>
      <h1 className='heading'>AI / ML / DL Basics</h1>
      <p className='text-sm tracking-wider text-justify leading-relaxed opacity-70'>
        This beginner friendly guide introduces core concepts behind artificial intelligence, machine learning and deep learning.
      </p>
      <div className='flex flex-col gap-6'>
        {topics.map((topic) => (
          <div key={topic.title} className='bg-white shadow rounded-lg p-4 space-y-2'>
            <h2 className='text-lg font-semibold'>{topic.title}</h2>
            <p className='text-sm tracking-wider leading-relaxed opacity-70'>
              {topic.summary}
            </p>
            <h3 className='text-sm font-medium mt-2'>Roadmap</h3>
            <ul className='list-disc list-inside text-sm tracking-wider leading-relaxed opacity-70 space-y-1'>
              {topic.roadmap.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIMLDL;
