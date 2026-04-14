import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

const products = [
  { name: "Oversize Acid Wash Tişört", price: "₺649", image: "https://placehold.co/500x500/1a1a1a/ffffff?text=CANTI+1", keyword: "tshirt" },
  { name: "Street Hoodie", price: "₺899", image: "https://placehold.co/500x500/1a1a1a/ffffff?text=CANTI+2", keyword: "hoodie" },
  { name: "Cargo Jogger", price: "₺749", image: "https://placehold.co/500x500/1a1a1a/ffffff?text=CANTI+3", keyword: "jogger" },
  { name: "Denim Oversize Ceket", price: "₺1.199", image: "https://placehold.co/500x500/1a1a1a/ffffff?text=CANTI+4", keyword: "denim" },
  { name: "Graphic Sweatshirt", price: "₺799", image: "https://placehold.co/500x500/1a1a1a/ffffff?text=CANTI+5", keyword: "sweatshirt" },
  { name: "Utility Vest", price: "₺549", image: "https://placehold.co/500x500/1a1a1a/ffffff?text=CANTI+6", keyword: "vest" },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-purple-600/20 text-purple-400 mb-4">
          Yeni Sezon
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Sokağın Ruhu, Sende.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Şehrin enerjisini taşıyan, sınırları zorlayan sokak modası koleksiyonu.
        </p>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard
              key={i}
              name={p.name}
              price={p.price}
              imageUrl={p.image}
              link="/product/canti-oversize"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
