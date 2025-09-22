import Footer from "../components/Footer";
import Navbar from "../components/Nav";

const productList = ["Stocks", "Commodity", "Indexes", "Forex", "Comex"];

function Products() {
  return (
    <div className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white">
      <div className="mb-14">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productList.map((product) => (
            <a
              key={product}
              href={`/products/${product.toLowerCase()}`}
              className="block border p-6 rounded-lg shadow-md hover:shadow-xl transition bg-white dark:bg-[var(--bg-color1)] hover:bg-[var(--primary-color)] hover:text-white text-center"
            >
              <h3 className="text-xl font-semibold">{product}</h3>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Products;
