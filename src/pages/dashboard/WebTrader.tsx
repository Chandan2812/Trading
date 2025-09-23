export default function MoneyPlantTrader() {
  return (
    <div className="h-screen md:h-[80vh] w-full bg-[#0a0f1d] flex justify-center items-center p-4">
      <div className="w-full h-full max-w-[1440px] rounded-xl overflow-hidden shadow-lg border border-gray-800">
        <iframe
          src="https://web.moneyplantfx.com/terminal"
          title="MoneyPlant Trader"
          className="w-full h-full"
          frameBorder="0"
        />
      </div>
    </div>
  );
}
