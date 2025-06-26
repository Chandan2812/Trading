function RegulatoryDisclaimer() {
  return (
    <section className="bg-white text-black dark:bg-black dark:text-white py-5 font-light transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-10 text-sm leading-relaxed">
        {/* Trade Responsibility Disclaimer */}
        <div>
          <h3 className="font-semibold text-lg mb-2">
            Trade Responsibility Disclaimer
          </h3>
          <p>
            Trading Forex and CFDs involves a high level of risk and may not be
            suitable for all investors. Leverage can work both for and against
            you, and it's possible to lose more than your initial investment.
            Please ensure that you fully understand the risks involved, taking
            into account your financial objectives and risk appetite. Seek
            independent financial advice if necessary before starting trading.
            Close Friends Traders does not offer financial advice.
          </p>
        </div>

        {/* General Disclaimer */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Disclaimer</h3>
          <p>
            Information on this site is not intended for distribution to, or use
            by, any person in any country or jurisdiction where such
            distribution or use would be contrary to local law or regulation.
            Please ensure compliance with your local laws and regulations before
            engaging with any of our services.
          </p>
        </div>

        {/* Regulatory Information */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Regulatory Information</h3>
          <p>
            <a
              href="https://closefriendstraders.com/"
              className="text-teal-600 dark:text-teal-400 hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              closefriendstraders.com
            </a>{" "}
            is the official platform operated by Close Friends Traders. We are
            committed to transparency, client safety, and strict adherence to
            all applicable financial and data protection regulations.
          </p>
          <p className="mt-4">
            Close Friends Traders is the only authorized entity permitted to
            operate under our MetaTrader platform license. We do not partner
            with or delegate this responsibility to any third parties.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegulatoryDisclaimer;
