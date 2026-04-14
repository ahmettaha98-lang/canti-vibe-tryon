import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
  link?: string;
}

const ProductCard = ({ name, price, imageUrl, link }: ProductCardProps) => {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-card border border-border transition-all duration-300 hover:border-purple-500/30">
      <Link to={link || "#"} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Hover action icons */}
      <div className="absolute bottom-16 right-3 flex flex-col gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border text-foreground flex items-center justify-center shadow-lg hover:scale-110 hover:text-red-500 transition-all duration-300">
          <Heart className="h-4 w-4" />
        </button>
        <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
