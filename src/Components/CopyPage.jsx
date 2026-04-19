import { LuCopy } from "react-icons/lu";
import { toast } from "react-hot-toast";

const CopyPage = () => {
  const handleCopy = async () => {
    try {
      const title = document.querySelector("h1")?.innerText || document.title;
      const url = window.location.href;
      
      // Look for additional page context (like hidden sheet data)
      const contextEl = document.querySelector('[data-page-context]');
      const additionalContext = contextEl ? JSON.parse(contextEl.getAttribute('data-page-context')) : null;

      // Select content elements and filter out those within footer or nav
      const contentElements = document.querySelectorAll("h1, h2, h3, p, li, blockquote, code");
      const content = Array.from(contentElements)
        .filter(el => !el.closest('footer') && !el.closest('nav') && !el.closest('button'))
        .map(el => ({
          type: el.tagName.toLowerCase(),
          text: el.innerText.trim()
        }))
        .filter(item => item.text.length > 0);

      const pageData = {
        title,
        url,
        timestamp: new Date().toISOString(),
        content,
        details: additionalContext // Include the sheet data or other context
      };

      await navigator.clipboard.writeText(JSON.stringify(pageData, null, 2));
      
      toast.success("Page content copied as JSON!", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        iconTheme: {
          primary: '#00D1FF',
          secondary: '#fff',
        },
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy page content.");
    }
  };

  return (
    <button
      className="fixed z-50 btn btn-ghost top-4 right-28"
      onClick={handleCopy}
      aria-label="Copy Page Content"
      title="Copy Page as JSON"
    >
      <span className="text-xl">
        <LuCopy />
      </span>
    </button>
  );
};

export default CopyPage;
