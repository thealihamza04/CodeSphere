const PRETEXT_PACKAGE = "@chenglou/pretext";

const CARD_WIDTH = 320;
const CARD_INNER_WIDTH = 256;
const GAP = 24;
const CARD_VERTICAL_CHROME = 170;
const SUMMARY_LINE_HEIGHT = 22;
const SUMMARY_FONT = "500 14px Arial, sans-serif";

let pretextPromise;

const loadPretext = () => {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!pretextPromise) {
    pretextPromise = import(/* @vite-ignore */ PRETEXT_PACKAGE).catch(() => null);
  }

  return pretextPromise;
};

const fallbackTextHeight = (text, width) => {
  const averageCharacterWidth = 7;
  const charactersPerLine = Math.max(1, Math.floor(width / averageCharacterWidth));
  const normalizedLength = text.trim().replace(/\s+/g, " ").length;
  const lineCount = Math.max(1, Math.ceil(normalizedLength / charactersPerLine));

  return lineCount * SUMMARY_LINE_HEIGHT;
};

const measureSummaryHeight = (text, pretext) => {
  if (pretext?.prepare && pretext?.layout) {
    const prepared = pretext.prepare(text, SUMMARY_FONT);
    return pretext.layout(prepared, CARD_INNER_WIDTH, SUMMARY_LINE_HEIGHT).height;
  }

  return fallbackTextHeight(text, CARD_INNER_WIDTH);
};

export const getLanguageMasonryConfig = (viewportWidth = 1024) => {
  const sidePadding = viewportWidth >= 1024 ? 32 : viewportWidth >= 768 ? 40 : 16;
  const availableWidth = Math.max(CARD_WIDTH, viewportWidth - sidePadding * 2);
  const columns = Math.max(
    1,
    Math.floor((availableWidth + GAP) / (CARD_WIDTH + GAP))
  );

  return {
    cardWidth: CARD_WIDTH,
    columns,
    containerWidth: columns * CARD_WIDTH + (columns - 1) * GAP,
    gap: GAP,
  };
};

export const buildLanguageMasonryLayout = (items, config, pretext = null) => {
  const columnHeights = Array(config.columns).fill(0);

  const cards = items.map((item) => {
    const column = columnHeights.indexOf(Math.min(...columnHeights));
    const summaryHeight = measureSummaryHeight(item.Summary, pretext);
    const height = Math.ceil(summaryHeight + CARD_VERTICAL_CHROME);
    const x = column * (config.cardWidth + config.gap);
    const y = columnHeights[column];

    columnHeights[column] += height + config.gap;

    return { height, x, y };
  });

  return {
    cards,
    height: Math.max(...columnHeights, 0) - config.gap,
  };
};

export const buildEnhancedLanguageMasonryLayout = async (items, config) => {
  const pretext = await loadPretext();
  return buildLanguageMasonryLayout(items, config, pretext);
};
