// src/components/ZohoSalesIQ.tsx
import { useEffect } from "react";

const ZohoSalesIQ = () => {
  useEffect(() => {
    // Prevent multiple script inserts
    if (document.getElementById("zsiqscript")) return;

    // Set global Zoho object
    (window as any).$zoho = (window as any).$zoho || {};
    (window as any).$zoho.salesiq = (window as any).$zoho.salesiq || {
      ready: function () {},
    };

    // Create and append the script tag
    const script = document.createElement("script");
    script.id = "zsiqscript";
    script.src =
      "https://salesiq.zohopublic.com/widget?wc=siqf3aeeab430a8b7b248182f48ec21015054db23d9ac8dead1e18b9c70435a0227";
    script.defer = true;

    document.body.appendChild(script);
  }, []);

  return null;
};

export default ZohoSalesIQ;
