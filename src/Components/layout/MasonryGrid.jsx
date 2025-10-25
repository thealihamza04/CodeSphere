import { Children, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const MasonryGrid = ({ children, className, options }) => {
  const containerRef = useRef(null);
  const masonryInstanceRef = useRef(null);
  const childCount = Children.count(children);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    let isActive = true;

    const setupMasonry = async () => {
      const node = containerRef.current;
      if (!node) {
        return;
      }

      const masonryModule = await import("masonry-layout");
      if (!isActive || !containerRef.current) {
        return;
      }

      const MasonryConstructor = masonryModule.default ?? masonryModule;

      masonryInstanceRef.current = new MasonryConstructor(containerRef.current, {
        itemSelector: "[data-masonry-item]",
        percentPosition: true,
        transitionDuration: "0.3s",
        horizontalOrder: true,
        ...options,
      });

      masonryInstanceRef.current.layout();
    };

    setupMasonry();

    return () => {
      isActive = false;
      masonryInstanceRef.current?.destroy();
      masonryInstanceRef.current = null;
    };
  }, [options]);

  useEffect(() => {
    if (!masonryInstanceRef.current) {
      return;
    }

    masonryInstanceRef.current.reloadItems();
    masonryInstanceRef.current.layout();
  }, [childCount]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleResize = () => {
      masonryInstanceRef.current?.layout();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`.trim()}
    >
      {children}
    </div>
  );
};

MasonryGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  options: PropTypes.object,
};

MasonryGrid.defaultProps = {
  className: "",
  options: {},
};

export default MasonryGrid;
