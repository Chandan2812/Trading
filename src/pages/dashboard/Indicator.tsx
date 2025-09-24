import { useState, useEffect } from "react";

export default function TechnicalIndicatorPage() {
  const [pair, setPair] = useState("EUR/USD");
  const [loading, setLoading] = useState(true); // 👈 loader state

  // Map user selection to iframe-friendly format (EURUSD, USDJPY, etc.)
  const formatPair = (p: string) => p.replace("/", "");

  const iframeSrc = `https://fxpricing.com/fx-widget/technical-indicator-widget.php?id=1&symbol=${formatPair(
    pair
  )}&fcs_link=hide&click_target=blank&theme=dark&tm-cr=212529&hr-cr=FFFFFF13&by-cr=28A745&sl-cr=DC3545&flags=circle&value_alignment=center&tab=5M,15M,30M,1H,4H,5H,1D,1W,M&lang=en&font=Arial, sans-serif`;

  // reset loader when pair changes
  useEffect(() => {
    setLoading(true);
  }, [pair]);

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-white mb-6">
        📊 Technical Indicator
      </h1>

      {/* Dropdown to select pair */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">
          Select Currency Pair:
        </label>
        <select
          value={pair}
          onChange={(e) => setPair(e.target.value)}
          className="bg-gray-900 text-white p-2 rounded-md border border-gray-700"
        >
          <option>EUR/USD</option>
          <option>EUR/CHF</option>
          <option>EUR/JPY</option>
          <option>EUR/GBP</option>
          <option>EUR/NZD</option>
          <option>EUR/CAD</option>
          <option>USD/JPY</option>
          <option>GBP/USD</option>
          <option>AUD/USD</option>
          <option>NZD/USD</option>
          <option>USD/CAD</option>
          <option>USD/CHF</option>
        </select>
      </div>

      {/* Widget wrapper */}
      <div className="w-full bg-[#0d1117] rounded-lg shadow-md p-4 relative min-h-[567px]">
        {/* Loader */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1117] bg-opacity-80 z-10">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="mt-2 text-gray-400">Loading indicator...</span>
          </div>
        )}

        <iframe
          key={pair} // 👈 re-render iframe when pair changes
          src={iframeSrc}
          width="100%"
          height="567"
          style={{ border: "1px solid #1f2937" }}
          className="rounded-md"
          onLoad={() => setLoading(false)} // 👈 hide loader when iframe fully loads
        ></iframe>

        {/* Copyright */}
        <div
          id="fx-pricing-widget-copyright"
          className="text-center text-sm text-gray-400 mt-3"
        >
          <span>Powered by </span>
          <a
            href="https://fxpricing.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 font-semibold hover:underline"
          >
            FX Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
