import { useState } from "react";
import { Star, ShoppingCart, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import VirtualTryOnModal from "@/components/VirtualTryOnModal";

const sizes = ["XS", "S", "M", "L", "XL"];
const mainImage = "https://placehold.co/600x750/1a1a1a/ffffff?text=CANTI+OVERSIZE";
const thumbnails = [
  "https://placehold.co/150x180/1a1a1a/ffffff?text=1",
  "https://placehold.co/150x180/1a1a1a/ffffff?text=2",
  "https://placehold.co/150x180/1a1a1a/ffffff?text=3",
];

const ProductDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(mainImage);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Images */}
          <div>
            <div className="aspect-[4/5] rounded-xl overflow-hidden border border-border">
              <img src={currentImage} alt="Ürün" className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3 mt-4">
              {thumbnails.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(t)}
                  className="w-20 h-24 rounded-lg overflow-hidden border border-border hover:border-purple-500/50 transition-all duration-300"
                >
                  <img src={t} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-widest text-purple-400 mb-2">CANTI STUDIO</span>
            <h1 className="text-3xl font-bold mb-2">Oversize Acid Wash Tişört</h1>
            <p className="text-2xl font-bold text-purple-400 mb-4">₺649</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.8 (124 yorum)</span>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Acid wash işlemiyle benzersiz bir dokuya kavuşan bu oversize tişört, sokak modasının en cesur ifadesi.
              %100 pamuk, rahat kesim ve CANTI'nin imza detaylarıyla fark yarat.
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Beden</p>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 rounded-lg border text-sm font-medium transition-all duration-300 ${
                      selectedSize === s
                        ? "border-purple-500 bg-purple-500/10 text-purple-400"
                        : "border-border text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 py-3.5 rounded-xl font-semibold text-sm bg-foreground text-background hover:opacity-90 flex items-center justify-center gap-2 transition-all duration-300">
                <ShoppingCart className="h-4 w-4" />
                Sepete Ekle
              </button>
              <button
                onClick={() => setTryOnOpen(true)}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Sparkles className="h-4 w-4" />
                Sanal Kabinde Dene
              </button>
            </div>
          </div>
        </div>
      </section>

      <VirtualTryOnModal
        isOpen={tryOnOpen}
        onClose={() => setTryOnOpen(false)}
        productImageUrl={mainImage}
      />
    </div>
  );
};

export default ProductDetailPage;
