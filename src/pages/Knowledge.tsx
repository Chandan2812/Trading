import Footer from "../components/Footer";
import Navbar from "../components/Nav";

const knowledgeList = [
  "Trading",
  "Equity Trading",
  "Future & Options",
  "Commodity Trading",
  "Margin Trading",
  "Intraday Trading",
];

// Function to generate URL-safe slug
const toSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, "") // remove special characters
    .replace(/\s+/g, "-");

function Knowledge() {
  return (
    <div className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white">
      <div className="mb-14">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Knowledge Center
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {knowledgeList.map((knowledge) => {
            const slug = toSlug(knowledge);
            return (
              <a
                key={knowledge}
                href={`/knowledge/${slug}`}
                className="block border p-6 rounded-lg shadow-md hover:shadow-xl transition bg-white dark:bg-[var(--bg-color1)] hover:bg-[var(--primary-color)] hover:text-white text-center"
              >
                <h3 className="text-xl font-semibold">{knowledge}</h3>
              </a>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Knowledge;
