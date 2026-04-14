import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import product1 from "@/assets/product-1.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";

const products = [
  { name: "Adidas Eşofman Takımı", price: "₺1.400", image: product1, slug: "adidas-esofman" },
  { name: "Şalvar Elbise", price: "₺899", image: product3, slug: "salvar-elbise" },
  { name: "Ertuğrul Kıyafeti", price: "₺45.000", image: product4, slug: "ertugrul-kiyafeti" },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard
              key={i}
              name={p.name}
              price={p.price}
              imageUrl={p.image}
              link={`/product/${p.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
