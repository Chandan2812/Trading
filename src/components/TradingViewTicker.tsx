// components/TradingViewTicker.tsx
import { useEffect, useRef } from "react";

const TradingViewTicker = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD" },
        { proName: "FOREXCOM:NSXUSD" },
        { proName: "FX_IDC:EURUSD" },
        { proName: "BITSTAMP:BTCUSD" },
        { proName: "BITSTAMP:ETHUSD" },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });

    containerRef.current.innerHTML = ""; // Clear on re-render
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget" />
    </div>
  );
};

export default TradingViewTicker;
