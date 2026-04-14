import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";

import adidas1 from "@/assets/product-1.png";
import adidas2 from "@/assets/product-2.png";
import salvar from "@/assets/product-3.png";
import ertugrul1 from "@/assets/product-4.png";
import ertugrul2 from "@/assets/product-5.png";
import ertugrul3 from "@/assets/product-6.png";
import etek from "@/assets/product-7.png";
import orgu from "@/assets/product-8.png";
import vintage from "@/assets/product-10.png";

const sizes = ["XS", "S", "M", "L", "XL"];

interface ProductData {
  name: string;
  brand: string;
  price: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
}

const productsData: Record<string, ProductData> = {
  "adidas-esofman": {
    name: "İthal Adidas Eşofman Takımı",
    brand: "CANTI STUDIO",
    price: "₺1.400",
    description: "Adidas logolu, rahat kesim eşofman takımı. Günlük kullanım ve spor için ideal. Üst kalite kumaş, dayanıklı dikiş detayları.",
    images: [adidas1, adidas2],
    rating: 4.8,
    reviewCount: 124,
  },
  "salvar-elbise": {
    name: "Şalvar Elbise",
    brand: "CANTI STUDIO",
    price: "₺899",
    description: "Yöresel motiflerle modern dokunuşun buluştuğu şık şalvar elbise. Özel günler ve davetler için mükemmel tercih.",
    images: [salvar],
    rating: 4.6,
    reviewCount: 87,
  },
  "ertugrul-kiyafeti": {
    name: "Ertuğrul Kıyafeti",
    brand: "CANTI STUDIO",
    price: "₺45.000",
    description: "Osmanlı'nın Doğuşuna Şahitlik Eden Zırh — Tarihi Doku, Usta İşçilik. Bu eşsiz zırh, orijinaline sadık kalınarak birinci sınıf gerçek kuzu, koyun, keçi ve dana derileri ile kürkleri kullanılarak üretilmiştir. Her detay, usta el işçiliğiyle özenle işlenmiş ve dikilmiştir. Zırhın iç kısmında giyilen kaftan, kumaşı rahat ve nefes alabilen bir yapıya sahiptir. Dizi, sinema, tiyatro ve dönem etkinlikleri için profesyonel düzeyde tasarlanmıştır. M, L ve XL bedenlere uygundur. Özel ölçüler için bizimle iletişime geçebilirsiniz.",
    images: [ertugrul1, ertugrul2, ertugrul3],
    rating: 5.0,
    reviewCount: 42,
  },
  "kemerli-etek": {
    name: "Kemerli Çan Etek",
    brand: "CANTI STUDIO",
    price: "₺649",
    description: "İthal scuba krep kemerli çan kumaş etek. 38/48 beden arası, tüylenmeme garantili. 10 farklı renk seçeneği mevcuttur.",
    images: [etek],
    rating: 4.7,
    reviewCount: 56,
  },
  "orgu-suveter": {
    name: "Örgü Süveter",
    brand: "CANTI STUDIO",
    price: "₺700",
    description: "El yapımı motifli örgü süveter. Doğal renkler, sıcak tutan kaliteli iplik. Kadın giyim koleksiyonunun en şık parçası.",
    images: [orgu],
    rating: 4.9,
    reviewCount: 74,
  },
  "vintage-elbise": {
    name: "Vintage Elbise",
    brand: "CANTI STUDIO",
    price: "₺850",
    description: "Kırmızı kareli vintage elbise. Beyaz gömlek detayıyla retro şıklığı modern çizgilerle buluşturan özel tasarım. Günlük ve özel günler için ideal.",
    images: [vintage],
    rating: 4.7,
    reviewCount: 63,
  },
};
const fallback = productsData["adidas-esofman"];

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData[slug || ""] || fallback;

  const [selectedSize, setSelectedSize] = useState("M");
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  useEffect(() => {
    setSelectedSize("M");
    setCurrentImage(product.images[0]);
  }, [product]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Images */}
          <div>
            <div className="aspect-[4/5] rounded-xl overflow-hidden border border-border">
              <img src={currentImage} alt={product.name} data-cantico-image className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(img)}
                    className={`w-20 h-24 rounded-lg overflow-hidden border transition-all duration-300 ${
                      currentImage === img ? "border-purple-500" : "border-border hover:border-purple-500/50"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Info */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-widest text-purple-400 mb-2">{product.brand}</span>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-purple-400 mb-4">{product.price}</p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} yorum)</span>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

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

            <div className="flex gap-3">
              <button className="flex-1 py-3.5 rounded-xl font-semibold text-sm bg-foreground text-background hover:opacity-90 flex items-center justify-center gap-2 transition-all duration-300">
                <ShoppingCart className="h-4 w-4" />
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductDetailPage;
