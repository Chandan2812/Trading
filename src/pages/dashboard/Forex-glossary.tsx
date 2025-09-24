import { useState } from "react";

interface GlossaryItem {
  term: string;
  definition: string;
}

const glossaryData: GlossaryItem[] = [
  {
    term: "Abandon",
    definition:
      "This is derived from the French term abondon which means to abandon or to forsake. In finance, an action of forfeiting a right, abandoning or quitting a trade, or refusing to use an option before that option expires.",
  },
  {
    term: "Accelerator/Decelerator",
    definition:
      "A technical indicator that tracks the rate at which the market's driving force gains or loses momentum.",
  },
  {
    term: "Accumulation/Distribution",
    definition:
      "An indicator that measures the total flow of funds into and out of an asset by comparing closing prices to their respective highs and lows.",
  },
  {
    term: "ADRs (American Depository Receipts) ",
    definition:
      "It enableS U.S. investors to trade shares of international firms on American exchanges. A US depositary bank buys overseas shares and issues ADRs priced in US dollars. This system, which has been in place since 1927, assists enterprises in raising finance in the United States and other international markets, as well as trading freely throughout Europe.",
  },
  {
    term: "AMEX",
    definition:
      "The American Stock Exchange began as a small group of merchants and is now the second-largest stock exchange in the United States. It is well-known for listing shares of small and medium-sized enterprises. Two important indices, the AMEX important Market Index and the AMEX Market Value Index, are computed here",
  },
  {
    term: "Arbitrage",
    definition:
      "A method in which a trader buys an inexpensive asset while simultaneously selling an overpriced equivalent, benefitting from the momentary price differential while avoiding market risk.",
  },
  {
    term: "Ascending Triangle",
    definition:
      "A bullish continuation chart pattern that typically forms during an uptrend and indicates that the trend will continue in the same direction.",
  },
  {
    term: "Ask Price",
    definition:
      "The amount that a seller consents to charge for a financial item.",
  },
  {
    term: "Ask Rate",
    definition: "Another term for Ask Price.",
  },
  {
    term: "Asset",
    definition:
      "Any resource with economic value that can generate future income or benefits.",
  },
  {
    term: "AUDUSD",
    definition:
      "A pair referencing the rate at which you can exchange the Australian dollar (base currency) into the U.S. dollar (quote currency).",
  },
  { term: "Aussie", definition: "Australian dollar slang." },
  {
    term: "Automated Trading",
    definition:
      "A system where trades can be placed and maintained automatically under pre-configured rules or sets of algorithms, minimising or eliminating manual input.",
  },
  {
    term: "Average Directional Index (ADX)",
    definition:
      "Welles Wilder invented this indicator that measures the power of a trend based on the analysis of ranges between the high and low-prices.",
  },
  {
    term: "Average True Range Indicator",
    definition:
      "An indicator that measures market volatility by analysing the average range between high and low prices over a set period.",
  },
  {
    term: "Awesome Oscillator",
    definition:
      "A technical tool that reflects changes in market momentum by comparing current and past price movements (definition continues if needed).",
  },
  {
    term: "Backwardation",
    definition:
      "The state of the market where a futures contract's price is lower than the underlying's price as established by the spot market. Or when further-dated futures are priced at a lesser level than near future futures.",
  },
  {
    term: "Balance/Account Balance",
    definition:
      "The entire value of all closed trades, deposits, and withdrawals from a trading account.",
  },
  {
    term: "Bank of Canada (BOC)",
    definition:
      "The financial system, the monetary policy and the supply of currencies in Canada are managed by the bank of Canada (BOC).",
  },
  {
    term: "Bank of England (BOE)",
    definition: "The United Kingdom's central bank is the Bank of England.",
  },
  {
    term: "Bank of Japan (BOJ)",
    definition:
      "The central bank of Japan monitors monetary policy, the issuance of currency, and has the stability of the economy.",
  },
  {
    term: "Bar Chart",
    definition:
      "A bar chart that displays the high, low, open, and close points over a specific period of time. The vertical stroke represents high and low and the horizontal marks are open (left) and close (right).",
  },
  {
    term: "Base Currency",
    definition:
      "The first currency in a currency pair represents the unit being purchased or sold.",
  },
  {
    term: "Base Interest Rate",
    definition:
      "The interest rate established by a nation's central bank has an impact on the value of its currency and lending rates within the economy.",
  },
  {
    term: "Basis",
    definition:
      "An asset's futures price minus its current price. As a futures contract approaches expiration, its basis narrows to zero.",
  },
  {
    term: "Basis Point",
    definition:
      "Basis points, or 0.01 percent (one tenth of a percentage point),are frequently used to quantify changes in interest rates.",
  },
  {
    term: "Bear Market",
    definition:
      "A market climate characterized by persistently declining pricing.",
  },
  {
    term: "Bearish Rectangle",
    definition:
      "A continuation chart pattern formed during a downtrend, indicating that the decline will most likely continue.",
  },
  {
    term: "Beneficiary",
    definition:
      "An individual or organization entitled to receive advantages or profits, as stipulated in a financial agreement or legal document.",
  },
  {
    term: "Bid Price",
    definition:
      "The price at which a buyer is willing to pay for a financial asset.",
  },
  {
    term: "Bid-Ask Spread",
    definition:
      "Bid (buy) and ask (sell) prices of a financial instrument are not equal.",
  },
  {
    term: "Big Board",
    definition:
      "In terms of market value, the New York Stock Exchange, or NYSE, is the biggest stock exchange in the world, with over 3000 listed companies.",
  },
  {
    term: "Binary Options",
    definition:
      "A kind of monetary option whose payment is fixed, and whose risk is set in advance; where traders gamble whether an asset would go up or down in price, given a certain amount of time.",
  },
  {
    term: "Bollinger Bands Indicator",
    definition:
      "An indicator developed based on volatility, which employs moving average with upper and lower bands to make price extremes, potential breakouts and market consolidation evident.",
  },
  {
    term: "Break",
    definition:
      "The steep rise or fall in price that often takes place when there is an uneven relationship between the buyers and the sellers.",
  },
  {
    term: "Bretton Woods Agreement",
    definition:
      "An agreement of 1944 between Allied Countries to create a fixed exchange rate regime with currencies pegged to the US dollar which was convertible to gold. This made the International Monetary Fund come into being. This system failed in 1971 when America ended the convertibility of gold.",
  },
  {
    term: "Broker",
    definition:
      "The individual or business that serves as a broker allows a client to enter a market and trades on their behalf.",
  },
  {
    term: "Bull",
    definition:
      "A trader or investor who expects prices to rise and positions himself accordingly.",
  },
  {
    term: "Bull Market",
    definition: "A bull market is characterized by persistently rising prices.",
  },
  {
    term: "Bullish Rectangle",
    definition:
      "A continuation chart pattern that appears during an upswing, indicating a high likelihood that the upward rise will continue.",
  },
  {
    term: "Candlestick Chart",
    definition:
      "One of the common charts of technical analysis showing price changes during a certain period. Each of the candlesticks illustrates opening, closing, high, and low prices, or symbolically shows the mood on the market.",
  },
  {
    term: "Contract for difference (CFDs)",
    definition:
      "They are derivative products through which traders speculate on the movements of prices without necessarily having the underlying asset. The opening price of a contract and its closing price determines the profit or loss.",
  },
  {
    term: "Channel",
    definition:
      "A channel is a relatively constant range of prices that an asset value moves in, causing the fluctuation range to be fairly steady width.",
  },
  {
    term: "Chart",
    definition:
      "A chart graphically represents the historical price changes of a financial instrument during a specific period of time and it is simpler to determine the trends and patterns.",
  },
  {
    term: "Clearing",
    definition:
      "Clearing is the procedure of registering the financial transactions between the participants involved and ensuring payments of the promises.",
  },
  {
    term: "Commodity Channel Index (CCI)",
    definition:
      "The Commodity Channel Index (CCI) was created by Donald Lambert to detect fresh market trends. Today, it is commonly used to determine how far the current price deviates from its average value.",
  },
  {
    term: "Commodity Currencies",
    definition:
      "These are the currencies of countries whose primary source of income is the export of natural resources. These include the Canadian dollar, Australian dollar, New Zealand dollar, Russian ruble among others.",
  },
  {
    term: "Cross Pair",
    definition:
      "A cross pair is an exchange rate between two currencies determined using their respective rates against a third currency, typically excluding the US dollar.",
  },
  {
    term: "Currency Cross Pairs",
    definition:
      "The foreign exchange market terminology calls currency pairings which does not involve the US dollar cross currency pairs or simply crosses.",
  },
  {
    term: "Currency Pair",
    definition:
      "A trading instrument that depicts the process of purchasing one currency while selling another.",
  },
  {
    term: "Daily Chart",
    definition:
      "A market chart with each time unit representing a full trading day.",
  },
  {
    term: "Day Trading",
    definition:
      "Day trading involves opening and closing all positions inside a single trading day.",
  },
  {
    term: "Dealer",
    definition:
      "A person or business that serves as the main counterparty or executor in a transaction.",
  },
  {
    term: "DeMarker (DeM) Indicator",
    definition:
      "A technical analysis tool used to identify probable buy or sell opportunities. It entails intervals of high price volatility which adds on to the market tops and bottoms.",
  },
  {
    term: "Depreciation",
    definition:
      "The reduction in value of an asset to an extent as time passes, usually because of wear and tear, use or being outdated.",
  },
  {
    term: "Derivative",
    definition:
      "The value of a financial instrument is determined by the performance of an underlying asset or assets which may consist of indices, equities, commodities, currencies and other financial instruments.",
  },
  {
    term: "Descending Triangle",
    definition:
      "A bearish continuation pattern is a chart pattern that typically shows up during a downward trend. It is distinguished by a sequence of lower highs and a horizontal support level, implying possibility for more downward movement.",
  },
  {
    term: "Diamond",
    definition:
      "A pattern on the chart that suggests the current trend might be poised to turn around. The diamond pattern, which most typically forms during an advance, indicates a shift in market mood.",
  },
  {
    term: "Double Bottom",
    definition:
      "A bullish reversal chart pattern that develops following a prolonged downturn. It happens when the price strikes a support level twice with a moderate rebound in between, indicating a decrease in selling pressure. The longer the pattern takes to emerge, the more reliable it is as a reversal indication.",
  },
  {
    term: "Economic Calendar",
    definition:
      "To do so, brokers and financial platforms offer an economic calendar, a list of economic events and data releases of a significant nature and are capable of affecting the price of assets. Market shakers participate in forecasting market volatility to come up with strategies accordingly.",
  },
  {
    term: "Envelope Indicator",
    definition:
      "The Envelopes indicator can detect overbought and oversold market conditions. Through showing potential reversal points traders can decide the position at which they enter or exit as well as determine future breakouts of trends.",
  },
  {
    term: "EUR/JPY",
    definition:
      "The currency pair EUR/JPY refers to the parity between the Euro and the Japanese yen, i.e. how many Japanese yen one can buy at a single Euro.",
  },
  {
    term: "Euro",
    definition:
      "It circulates the Euro that is allowed to be used in 19 countries of the European Union that encompass Austria, Belgium, Germany, Greece, Ireland, Spain, Italy, Cyprus, Latvia and Lithuania, Luxembourg, Malta,the Netherlands, Portugal, Slovakia, Slovenia, and Estonia.",
  },
  {
    term: "EURUSD",
    definition:
      "It is the biggest traded in the world where Euro is the base currency and the quoted currency is the US dollar.",
  },
  {
    term: "Expiration",
    definition:
      "Expiration refers to the final date for exercising or canceling a derivative contract (e.g., futures or options).",
  },
  {
    term: "Flag",
    definition:
      "A price chart pattern which is observed in a short term chart and shows that the direction of the trend being experienced will continue. It indicates that the market's trajectory is likely to be steady in the near future. This generally forms over one to two weeks on a daily chart.",
  },
  {
    term: "Force Index",
    definition:
      "To measure how strong the price movements are, Alexander Elder has developed an indicator that searches three parameters namely direction, size, and volume. This oscillator swings between the zero line, which determines the equilibrium between the buying and the selling pressures.",
  },
  {
    term: "ForexForex",
    definition:
      "The term forex could be described as being a universal market under which currency pairs can be bought, sold, exchanged and speculated. Commercial banks, central banks, hedge funds, investment firms, retail brokers, and individual traders are all participants in the foreign exchange market.",
  },
  {
    term: "Forex Dealer",
    definition:
      "A forex dealer is a regulated financial organization or business that handles and administers foreign currency transactions.",
  },
  {
    term: "Forex Resistance",
    definition:
      "A resistance level in Forex is a price point that serves as a ceiling, stopping the currency price from increasing any further.",
  },
  {
    term: "Forward Transaction",
    definition:
      "A forward transaction is a contractual agreement in which the buyer and seller agree to exchange an asset (such as currency or commodities) at a future date, with the price established at the time of the arrangement",
  },
  {
    term: "Fractals Indicator",
    definition:
      "The Fractals Indicator determines the local high and low in the movement of price, showing a time when the trend has stopped and has gone into reverse. These turning points are called peak (or highs) and trough (or lows).",
  },
  {
    term: "Fundamental Analysis",
    definition:
      "Fundamental analysis investigates economic and political developments that may have an impact on the future direction of financial market values. Forex relies mostly on macroeconomic factors.",
  },
  {
    term: "Gap",
    definition:
      "Where the price of an asset is moving a great deal and no trades occur between movements, it creates a gap.",
  },
  {
    term: "Gator Oscillator",
    definition:
      "The Gator Oscillator is a companion tool to the Alligator indicator that shows the degree of convergence and divergence among its three SMAs. It focuses on the Alligator's hunger (trending markets) and sleep (non-trending markets) phases.",
  },
  {
    term: "GBP/USD",
    definition:
      "The GBP/USD currency pair trades the British Pound against the US Dollar. The quote indicates how many US dollars are necessary to buy one British pound.",
  },
  {
    term: "Growth Stock",
    definition:
      "A growth stock is a company's stock that has shown above-average profit indicators over a specific time period (usually a few years) or is predicted to exhibit considerable growth potential in the near future. Such equities frequently increase in value far quicker than regular stocks, but they can also fall sharply. Shareholders in growth companies typically get little to no dividends because profits are frequently reinvested in the company's development—particularly when the company is new.",
  },
  {
    term: "Head and Shoulders",
    definition:
      "The head and shoulders price pattern indicates the end of an existing trend and a reversal in price movement. This pattern usually appears during a well-established uptrend and is distinguished by its unmistakable three-peak structure, with the main peak (the head) higher than the two side peaks (the shoulders).",
  },
  {
    term: "Hedge / Hedging",
    definition:
      "A risk management technique that aims to decrease exposure to volatile price swings. Hedging typically entails taking an offsetting position in a comparable asset or using forward contracts to lock in pricing. It becomes more prevalent during periods of market instability.",
  },
  {
    term: "The Ichimoku Indicator",
    definition:
      "Ichimoku indicator is a complete technical analysis method that was developed by a Japanese author Goichi Hosoda in 1968. It enables traders to quickly identify the direction of trends, momentum and strength through the analysis of five different components in addition to price activity. The standard will measure individual behavior as a factor that affects changes in the market, which run on a cycle.",
  },
  {
    term: "Inflation",
    definition:
      "A steady rise in the average level of prices for goods and services over time.",
  },
  {
    term: "Inverse Head and Shoulders",
    definition:
      "A reversal chart pattern that generally marks finality of a downtrend and a possible beginning of an uptrend. It is characterised by three depressions with the central depression (the so-called head) the deepest and the two outer depressions (the so-called shoulders) slightly higher and approximately the same height.",
  },
  {
    term: "Leverage",
    definition:
      "Brokers offer a service that enables traders to open positions significantly larger than their own capital. It effectively acts as a loan, amplifying both potential gains and potential losses.",
  },
  {
    term: "LIBID ",
    definition:
      "The interest rate at which banks are willing to lend to one another is known as the London Interbank Bid Rate, or LIBID.",
  },
  {
    term: "LIBOR ",
    definition:
      "The rate at which banks are willing to lend to one another is known as the London Interbank Offered Rate, or LIBOR.",
  },
  {
    term: "Limit Order ",
    definition:
      "An order for the purchase or sale of a specific quantity of an asset at a defined price or higher. For example, a trader may place a buy limit order of 107.50 while the current USD/JPY price is 108.24/108.26 (Bid/Ask). The order will be executed, initiating the buy position, if the market drops and the ask price hits 107.50.",
  },
  {
    term: "Liquid Market",
    definition:
      "A market in which traders can purchase and sell enormous amounts of assets at any moment for low transaction costs.",
  },
  {
    term: "Listed Stocks",
    definition:
      "Stocks authorized for trading on stock exchanges. Before being included, shares must go through a listing procedure in which companies are evaluated for compliance with specified requirements such as market capitalization, sales volume, the number of shares in circulation, and other factors. Only those who achieve these conditions can trade.",
  },
  {
    term: "Lot",
    definition:
      "A standardised amount of financial assets traded in a single transaction.",
  },
  {
    term: "Margin",
    definition:
      "The minimum amount of money a client must have in their account to keep positions open.",
  },
  {
    term: "Margin Call",
    definition:
      "A broker requests that the client deposit additional monies into their trading account to meet margin requirements.",
  },
  {
    term: "Market Facilitation Index (MFI-Bill Williams)",
    definition:
      "A technical measurement of the readiness of the market to become price-adaptive. The actual numbers are not as relevant as is the gauging of the value against the trading volume and thus can help the trader determine times of heavy or light activity.",
  },
  {
    term: "Market Order",
    definition:
      "Market orders are directions to buy or sell a financial item at the most advantageous available market.",
  },
  {
    term: "Momentum Indicator",
    definition:
      "One technical analysis technique where the rate of price movement is calculated by comparing the present price to a prior price between a specific time. It creates aid in ascertaining the power and heading of a trend",
  },
  {
    term: "Money Flow Index (MFI)",
    definition:
      "This momentum technical indicator measures price and volume data using the Money Flow Index (MFI) to assess the purchasing and selling pressure. It helps identify an overbought or an oversold situation in a market.",
  },
  {
    term: "Moving Average Envelops",
    definition:
      "Two bands make up this technical indicator, which is displayed at predetermined percentages above and below the moving average. It is useful to distinguish overbought and oversold markets and also trend changes.",
  },
  {
    term: "Moving Average Indicator",
    definition:
      "The Moving Average is a technical analysis indicator used to find out the average price of an asset with respect to time. It eliminates short-term movements in the prices, thus it would be easier to find the direction and the strength of the trend.",
  },
  {
    term: "Moving Average of Oscillator (OsMA)",
    definition:
      "Moving Average of Oscillator (OsMA) is a technical indicator that distinguishes between an oscillator type (like MACD) and the oscillator's moving average, commonly known as the signal line.",
  },
  {
    term: "Moving Average Convergence/Divergence Indicator (MACD)",
    definition:
      "The MACD is a technical indicator which shows the relationship between two prices moving averages of an asset. Based on these three ingredients, it determines the strength of the trend, the direction of the trend as well as likely points of reversal using the fast line, the slow line, and the signal line.",
  },
  {
    term: "OCO Order",
    definition:
      "Two pending orders placed at prices different from the current market price make up an OCO (One Cancels the Other) order. When one order is completed, the other is instantly canceled",
  },
  {
    term: "Offer",
    definition:
      "The offer price, or ask price, is the price at which a currency or item can be purchased.",
  },
  {
    term: "On Balance Volume (OBV)",
    definition:
      "On-Balance Volume is a cumulative indicator based on trade volumes that depicts the link between transaction volume and asset price movements.",
  },
  {
    term: "Open Position",
    definition:
      "A transaction that is still active and has not been closed by its opposite transaction.",
  },
  {
    term: "Order",
    definition: "A client's order to undertake a trading operation.",
  },
  {
    term: "Out-of-Money Option",
    definition:
      "Out-of-the-money options are those whose value is less than the buying price. For example, if you estimate that an asset's price would rise but then fall, your forecast is incorrect, leading to a loss. Before expiration, an option can fluctuate between in-the-money (profitable) and out-of-the-money (loss-making).",
  },
  {
    term: "Pair",
    definition:
      "A financial tool that shows how much one currency is worth in relation to another.",
  },
  {
    term: "Parabolic Indicator",
    definition:
      "The Parabolic Indicator is intended to confirm or reject a trend, detect correction phases or sideways movement, and recommend potential closing targets for positions. Its principle is summarized by the phrase stop and reverse (SAR).",
  },
  {
    term: "Pennant",
    definition:
      "A pennant is a short-term chart pattern that indicates trend continuity, implying that the present direction will likely persist in the near future. On a daily chart, this pattern usually appears over a week or two.",
  },
  {
    term: "Point or Pip",
    definition:
      "A pip is the smallest potential variation to a pricing quote. Most currency pairs are stated to four or five decimal places, thus one pip represents 0.0001 or 0.00001. For JPY pairs, a pip equals 0.01 or 0.001 and is expressed to two or three decimals. In other financial instruments, a pip typically fluctuates between 0.1 and 0.001.",
  },
  {
    term: "Portfolio Trading",
    definition:
      "The simultaneous purchase and sale of a set of securities organized as a portfolio based on particular criteria.",
  },
  {
    term: "Profit",
    definition:
      "The good consequence or financial gain that arises from trade activity.",
  },
  {
    term: "Quoted Currency",
    definition:
      "In a currency pair, the second currency listed is known as the quoted currency.",
  },
  {
    term: "Rate",
    definition: "The exchange rate between two currencies.",
  },
  {
    term: "Relative Strength Index (RSI)",
    definition:
      "It measures the strength or weakness of a trend. It assesses the speed of price swings by comparing recent gains and losses to closing prices.",
  },
  {
    term: "Relative Vigor Index (RVI)",
    definition:
      "A technical analysis tool called the Relative Vigor Index can be used to determine whether the current trend is trending upward or downward. It is founded on the perception that in bull markets the end of an issue is more when compared to the cost of opening, and in a bearish market the end cost is low in comparison with the beginning of an issue.",
  },
  {
    term: "Resistance Level",
    definition:
      "In technical analysis, a resistance level refers to a price level when significant selling activity prevents future price increases.",
  },
  {
    term: "Retail Customers",
    definition:
      "A forex trader who does not fulfill the definition of an eligible contract participant under the Commodity Exchange Act. This frequently includes most small businesses and people with assets under $10 million.",
  },
  {
    term: "Risk Management",
    definition:
      "Risk management is the process of identifying and analyzing risks, implementing measures to decrease them to an acceptable level, and continuously monitoring those risks.",
  },
  {
    term: "Rollover",
    definition:
      "The act of extending the settlement date of an open position by transferring it to the following settlement date.",
  },
  {
    term: "Saucer",
    definition:
      "A saucer is a long-term technical analysis pattern that shows a slow transition from a downtrend to an upswing. It usually has a rounded, arc-shaped bottom, which is most noticeable on weekly charts. The creation of a saucer might take over a year.",
  },
  {
    term: "Security Deposit",
    definition:
      "The amount of money needed to start or maintain a trading position is referred to as margin.",
  },
  {
    term: "Settlement",
    definition:
      "The procedure of delivering securities to the buyer in exchange for payment from the seller. This usually happens one to three days after the transaction date.",
  },
  {
    term: "Spot Market",
    definition:
      "A market where transactions happen instantly. Although final settlements may take up to two business days, ownership rights are transferred from the seller to the buyer in the spot market at the moment of the transaction.",
  },
  {
    term: "Spot Price",
    definition: "The spot market price as of right now for a quick settlement.",
  },
  {
    term: "Disperse",
    definition:
      "The variation between the asking and bid prices. The pricing feed of a trading platform displays both prices. One important measure of an asset's liquidity is its spread.",
  },
  {
    term: "Sterling",
    definition: "A popular way to refer to the British pound (GBP).",
  },
  {
    term: "Stochastic Oscillator",
    definition:
      "A technical indicator that illustrates how the current closing price compares to the price range over a given number of sessions. It is based on the premise that in an uptrend, prices tend to close around the range's high, while in a downtrend, they close near the low.",
  },
  {
    term: "Stock",
    definition:
      "A share signifies ownership in a firm, allowing investors to receive dividends and profit from share price variations. Companies can raise capital by issuing shares, and investors can profit from dividends and share price movements.",
  },
  {
    term: "Strike Price",
    definition:
      "The price at which a call option buyer can purchase or sell a certain currency pair or asset is called the exercise price, sometimes referred to as the strike price.",
  },
  {
    term: "Support Level",
    definition:
      "In technical analysis, a price level at which purchasing interest is sufficient to prevent additional price decreases. It serves as a floor where asset prices tend to stabilize or rebound.",
  },
  {
    term: "Swap",
    definition:
      "The credit or debit of money to a trader's account when a position is held overnight (rolled over to the next value date). The swap amount is determined by the position size and the interest rate differential between the base and quoted currencies (or assets) in the interbank market.",
  },
  {
    term: "Symmetric Triangle",
    definition:
      "A Symmetric Triangle is a continuation chart pattern that can occur during an upswing or a downtrend. It indicates that after the pattern is completed, the current trend will most likely continue.",
  },
  {
    term: "Take Profit Order",
    definition:
      "Take Profit orders cause a trade to automatically close once the market has reached a predetermined profit target which is set at a price higher than the entry/execution price of a pending order.",
  },
  {
    term: "Technical Analysis",
    definition:
      "Technical analysis refers to the projection of future market trends of the financial and commodity market through the past behaviour and price trends.",
  },
  {
    term: "Technical Indicators",
    definition:
      "Technical indicators play an important role in technical analysis and can be utilized to predict the market trend. Examples are the indicators, oscillators, trend indicators, and volume-based strategies of Bill Williams.",
  },
  {
    term: "Tick",
    definition:
      "A tick is the smallest potential price fluctuation of a financial asset.",
  },
  {
    term: "Trailing Stop",
    definition:
      "A trailing stop is a system that automatically adjusts a stop loss order. When a position's profit reaches a predetermined threshold, the Stop Loss moves closer to the current market price while maintaining the same distance between them.",
  },
  {
    term: "Transaction Costs",
    definition:
      "These are the costs spent by a trader when doing currency or commodity transactions, such as broker commissions and fees.",
  },
  {
    term: "Transaction Date",
    definition: "The precise day that a transaction or trade is finished.",
  },
  {
    term: "Trend Continuation Patterns",
    definition:
      "Trend continuation patterns (graphical models) emerge after minor pauses in an established market trend. They predict that the current price movement will likely continue rather than reverse.",
  },
  {
    term: "Trend Line",
    definition:
      "A line drawn on a price chart that helps identify the market trend by joining a number of significant highs or lows.",
  },
  {
    term: "Trend Reversal Patterns",
    definition:
      "Trend reversal patterns are graphical structures that emerge after a trend has reached its peak or bottom. They imply a high probability that the trend may shift direction.",
  },
  {
    term: "Triple Bottom",
    definition:
      "A triple bottom pattern often occurs during a slump and indicates a potential upward reversal. It is regarded as more dependable than the double bottom pattern.",
  },
  {
    term: "Triple Top",
    definition:
      "Usually forming during an upswing, a triple top pattern signals a possible reversal and following market decline. It is considered more significant than the double top motif.",
  },
  {
    term: "USDCAD",
    definition:
      "A currency pair that includes the US dollar (USD) and the Canadian dollar (CAD). It displays the amount of Canadian dollars required to purchase/buy one US dollar.",
  },
  {
    term: "USDCHF",
    definition:
      "The Swiss franc (CHF) is the quoted currency in the USDCHF currency pair, while the US dollar (USD) serves as the base currency.",
  },
  {
    term: "USDJPY",
    definition:
      "A currency pair with the US dollar (USD) as the base currency and the Japanese yen (JPY) as the currency.",
  },
  {
    term: "Value Date",
    definition:
      "It refers to the date when the parties involved in a transaction must settle monies by delivering the purchased currency and paying the seller.",
  },
  {
    term: "Volatility",
    definition:
      "Volatility is a measure of risk that measures an asset's price changes, typically indicated through statistical indicators.",
  },
  {
    term: "Volume Indicator",
    definition:
      "Volume Indicator is a technical analysis tool that tracks investor trading activity over a given time period.",
  },
  {
    term: "Volume Indicators",
    definition:
      "These metrics measure market participation, showing the strength and intensity of trade in an asset.",
  },
  {
    term: "Wedge",
    definition:
      "A wedge is a short-term chart pattern that indicates the continuation of the present trend, implying that its direction will remain steady in the near future. On a daily chart, it usually appears within one or two weeks.",
  },
  {
    term: "Williams Alligator",
    definition:
      "An indicator used to identify trends and determine their direction.",
  },
  {
    term: "Williams Percentage Range Indicator",
    definition:
      "A technical tool used to identify overbought or oversold levels in an asset and predict future reversal points.",
  },
  {
    term: "Yen",
    definition: "The official currency of Japan.",
  },
];

export default function ForexGlossary() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGlossary = glossaryData.filter((item) =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-black text-white py-10 px-4 sm:px-10">
      {/* Glossary Title */}
      <h2 className="text-3xl font-bold mb-6">Forex Glossary</h2>
      {/* Top description */}
      <p className="max-w-4xl mb-6 text-gray-300">
        Our Forex Glossary gives a concise view of important trading terms and
        concepts. It discusses not only such technical indicators as RSI and
        MACD but also such financial terms as bid/ask spread, leverage, and
        volatility, which makes it an efficient choice regardless of what stage
        of progression of a trader.
      </p>

      {/* Search bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-500 bg-black text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Glossary List */}
      <div className="space-y-2">
        {filteredGlossary.map((item) => (
          <details
            key={item.term}
            className="border border-white rounded-md overflow-hidden"
          >
            <summary className="cursor-pointer px-3 py-2 font-bold bg-black text-white">
              {item.term}
            </summary>
            <p className="px-3 py-2 text-sm">{item.definition}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
