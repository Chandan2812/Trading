import { useEffect, useRef, useState, memo } from "react";

const TradingViewWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 👇 Dropdown states
  const [feedMode, setFeedMode] = useState<"all_symbols" | "market" | "symbol">(
    "all_symbols"
  );
  const [displayMode, setDisplayMode] = useState<"regular" | "compact">(
    "regular"
  );

  // 👇 Loading state for skeleton/spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset loading every time widget re-renders
    setLoading(true);

    // Clear old widget
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      displayMode: displayMode,
      feedMode: feedMode,
      colorTheme: "dark",
      isTransparent: false,
      locale: "en",
      width: "100%",
      height: "600",
    });

    // Append script
    containerRef.current.appendChild(script);

    // ⏳ Assume it takes ~2s for TradingView to render
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer);
  }, [feedMode, displayMode]);

  return (
    <div className="w-full bg-[#0d1117] rounded-lg shadow-md p-4 relative">
      <h2 className="text-xl font-bold text-white mb-4">📢 Technical News</h2>

      {/* Controls */}
      <div className="flex gap-4 mb-4">
        {/* Feed Selector */}
        <div>
          <label className="text-sm text-gray-300 block mb-1">Feed</label>
          <select
            value={feedMode}
            onChange={(e) =>
              setFeedMode(e.target.value as "all_symbols" | "market" | "symbol")
            }
            className="bg-gray-800 text-white px-3 py-2 rounded"
          >
            <option value="all_symbols">All Symbols</option>
            <option value="market">Market</option>
            <option value="symbol">Symbol</option>
          </select>
        </div>

        {/* Display Selector */}
        <div>
          <label className="text-sm text-gray-300 block mb-1">
            Display Mode
          </label>
          <select
            value={displayMode}
            onChange={(e) =>
              setDisplayMode(e.target.value as "regular" | "compact")
            }
            className="bg-gray-800 text-white px-3 py-2 rounded"
          >
            <option value="regular">Regular</option>
            <option value="compact">Compact</option>
          </select>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117] bg-opacity-80">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-400">Loading news...</span>
        </div>
      )}

      {/* TradingView Widget */}
      <div
        className="tradingview-widget-container__widget"
        ref={containerRef}
      ></div>

      <div className="tradingview-widget-copyright text-center mt-2">
        <a
          href="https://www.tradingview.com/news-flow/?priority=top_stories"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          Top stories by TradingView
        </a>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
