import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Widget: any;
  }
}

const FinlogixWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent loading the script multiple times
    const existingScript = document.getElementById("finlogix-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "finlogix-script";
      script.src = "https://widget.finlogix.com/Widget.js";
      script.async = true;
      script.onload = () => {
        initWidget();
      };
      document.body.appendChild(script);
    } else {
      initWidget();
    }

    function initWidget() {
      if (window.Widget && containerRef.current) {
        window.Widget.init({
          widgetId: "fab8747b-90e9-44de-9d00-a1284a8d56e0",
          type: "StripBar",
          language: "en",
          showBrand: true,
          isShowTradeButton: true,
          isShowBeneathLink: true,
          isShowDataFromACYInfo: true,
          symbolPairs: [
            { symbolId: "20317", symbolName: "Reliance Steel & Aluminum" },
            { symbolId: "20273", symbolName: "HDFC Bank Limited" },
            { symbolId: "20281", symbolName: "ICICI Bank Ltd" },
            { symbolId: "83", symbolName: "INDIA50" },
            { symbolId: "120145", symbolName: "8473TKS" },
            { symbolId: "40005", symbolName: "HERO" },
          ],
          isAdaptive: true,
        });
      }
    }
  }, []);

  return <div className="finlogix-container" ref={containerRef}></div>;
};

export default FinlogixWidget;
