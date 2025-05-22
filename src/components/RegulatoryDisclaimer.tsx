function RegulatoryDisclaimer() {
  return (
    <section className="bg-black text-white py-16 px-6 md:px-16 font-light">
      <div className="max-w-5xl mx-auto space-y-10 text-sm leading-relaxed">
        {/* Trade Responsibility Disclaimer */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-2">
            Trade Responsibility Disclaimer
          </h3>
          <p>
            Trading Forex and CFDs involves a high level of risk and may not be
            suitable for all investors. Leverage can work both for and against
            you, and it's possible to lose more than your initial investment.
            Please ensure that you fully understand the risks involved, taking
            into account your financial objectives and risk appetite. Seek
            independent financial advice if necessary before starting trading.
            ArrowTrade does not offer financial advice.
          </p>
        </div>

        {/* General Disclaimer */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-2">Disclaimer</h3>
          <p>
            Information on this site is not directed at residents of any country
            or jurisdiction where distribution or use would be contrary to local
            law or regulation. Please check with your local regulations before
            proceeding.
          </p>
        </div>

        {/* Regulatory Information */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-2">
            Regulatory Information
          </h3>
          <p>
            <a
              href="https://closefriendstraders.com/"
              className="text-teal-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              closefriendstraders.com
            </a>{" "}
            is a website operated by closefriendstraders, which is registered
            in: 3 Emerald Park, Trianon, Quatre Bornes 72257, Republic of
            Mauritius - company number 214424 GBC. (closefriendstraders offices:
            Ebene Junction, Rue de la Democratie, Ebene, MU 72201, Mauritius).
          </p>
          <p className="mt-4">
            closefriendstraders is the sole entity authorized to operate the
            MetaTrader platform under our license. No other companies are
            involved in the operation or management of our MetaTrader license.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegulatoryDisclaimer;
