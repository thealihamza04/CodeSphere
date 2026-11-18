import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import AppRoutes from './AppRoutes.jsx'
import techStackTerms from './Data/TechStack.js'
import handleInsultsData from './Data/HandleInsults.json'

const SITE = 'https://codes-sphere.vercel.app'

export function render(url = '/') {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </React.StrictMode>,
  )
}

// Page-specific structured data baked into the prerendered HTML, so answer engines
// and AI crawlers see it without running JavaScript.
export const pageJsonLd = {
  '/handle-insults': {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'Handle Insults & Bullies Like a Pro',
    url: `${SITE}/handle-insults`,
    mainEntity: handleInsultsData.Situations.map((situation) => ({
      '@type': 'Question',
      name: `How do I respond to ${situation.Title.toLowerCase()}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [
          `Example: ${situation.Example.replace(/"/g, '')}`,
          ...situation.Scripts.map(
            (script) => `${script.Name}: "${script.Line}"${script.Note ? ` ${script.Note}` : ''}`,
          ),
        ].join(' '),
      },
    })),
  },
  '/tech-stack': {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tech Stack A–Z',
    url: `${SITE}/tech-stack`,
    description: `An A–Z index of ${techStackTerms.length} libraries, frameworks and developer tools.`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: techStackTerms.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: techStackTerms.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.term,
      })),
    },
  },
  '/rag': {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    name: 'Retrieval-Augmented Generation (RAG) Architecture Guide',
    headline: 'Retrieval-Augmented Generation (RAG) Architecture Guide',
    url: `${SITE}/rag`,
    description: 'Comprehensive architectural guide to Retrieval-Augmented Generation (RAG): data ingestion, document chunking, vector embeddings, hybrid retrieval, cross-encoder reranking, and grounded LLM generation.',
    author: {
      '@type': 'Person',
      name: 'Ali Hamza',
      url: 'https://github.com/thealihamza04',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CodeSphere',
      url: `${SITE}/`,
    },
    inLanguage: 'en-US',
    keywords: [
      'Retrieval-Augmented Generation',
      'RAG Architecture',
      'Vector Database',
      'Embeddings',
      'Semantic Search',
      'Cross-Encoder Reranking',
      'Hybrid Retrieval',
      'BM25',
      'Grounded LLM Generation',
    ],
  },
}
