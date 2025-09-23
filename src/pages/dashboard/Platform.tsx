import { FaApple, FaGooglePlay, FaWindows } from "react-icons/fa";
import { SiMacos } from "react-icons/si";
import lap from "../../assets/lap2.webp";
import mob from "../../assets/mob2.webp";

export default function TradingPlatform() {
  return (
    <div className="bg-black min-h-screen py-12 px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
        Trading Platform
      </h2>

      {/* Mobile Section */}
      <div className="bg-[#0e3b4c] rounded-xl p-6 md:p-10 mb-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
        {/* Left - Mobile Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={mob} // Replace with your mobile image path
            alt="Mobile MT5"
            width={400}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Right - Mobile Text and Buttons */}
        <div className="w-full md:w-1/2 text-white text-right">
          <p className="text-sm text-gray-300 mb-1">TRADING PLATFORM</p>
          <h3 className="text-xl md:text-2xl font-bold">
            Download MT 5 <br />
            <span className="text-cyan-400">For Mobile</span>
          </h3>

          <div className="flex justify-end gap-4 mt-6">
            <a
              href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5
"
              className="bg-[#1d2233] hover:bg-[#2a314a] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaGooglePlay className="text-xl" />
              <span>
                <p className="text-[10px] leading-tight">GET IT FOR</p>
                <strong>Google Play</strong>
              </span>
            </a>
            <a
              href="https://apps.apple.com/in/app/metatrader-5/id413251709"
              className="bg-[#1d2233] hover:bg-[#2a314a] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaApple className="text-xl" />
              <span>
                <p className="text-[10px] leading-tight">GET IT FOR</p>
                <strong>App Store</strong>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* PC Section */}
      <div className="bg-[#0e3b4c] rounded-xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left - PC Text and Buttons */}
        <div className="w-full md:w-1/2 text-white">
          <p className="text-sm text-gray-300 mb-1">TRADING PLATFORM</p>
          <h3 className="text-xl md:text-2xl font-bold">
            Download MT 5 <br />
            <span className="text-cyan-400">For your PC</span>
          </h3>

          <div className="flex gap-4 mt-6">
            <a
              href="https://download.mql5.com/cdn/web/metaquotes.ltd/mt5/mt5setup.exe?utm_source=www.metatrader5.com&utm_campaign=download"
              className="bg-[#1d2233] hover:bg-[#2a314a] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaWindows className="text-xl" />
              <span>
                <p className="text-[10px] leading-tight">GET IT FOR</p>
                <strong>Windows</strong>
              </span>
            </a>
            <a
              href="https://apps.apple.com/us/app/metatrader-5/id413251709"
              className="bg-[#1d2233] hover:bg-[#2a314a] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <SiMacos className="text-xl" />
              <span>
                <p className="text-[10px] leading-tight">GET IT FOR</p>
                <strong>mac OS</strong>
              </span>
            </a>
          </div>
        </div>

        {/* Right - PC Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={lap} // Replace with your PC image path
            alt="PC MT5"
            width={400}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
