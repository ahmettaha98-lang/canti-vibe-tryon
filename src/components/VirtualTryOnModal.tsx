import { useState, useRef, useCallback } from "react";
import { X, Upload, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  productImageUrl?: string;
}

const VirtualTryOnModal = ({ isOpen, onClose, productImageUrl }: VirtualTryOnModalProps) => {
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [userPhotoPreview, setUserPhotoPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setUserPhoto(file);
    setUserPhotoPreview(URL.createObjectURL(file));
    setResultImage(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFileSelect(file);
  }, []);

  const handleTryOn = async () => {
    if (!userPhoto) return;
    setIsLoading(true);
    setResultImage(null);

    // TODO: Replace with real API call
    // const formData = new FormData();
    // formData.append('user_photo', userPhoto);
    // formData.append('product_image', productImageUrl);
    // const response = await fetch('/api/try-on', { method: 'POST', body: formData });
    // const data = await response.json();
    // setResultImage(data.result_url);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    setResultImage(userPhotoPreview);
    setIsLoading(false);
  };

  const handleClose = () => {
    setUserPhoto(null);
    setUserPhotoPreview(null);
    setResultImage(null);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={handleClose} />
      <div className="relative w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold flex items-center gap-2">
            Sanal Kabin <Sparkles className="h-5 w-5 text-purple-400" />
          </h2>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-all duration-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left — Upload */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Sen</p>
            {userPhotoPreview ? (
              <div
                className="relative aspect-[3/4] rounded-xl overflow-hidden border border-border cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <img src={userPhotoPreview} alt="Kullanıcı" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="aspect-[3/4] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm font-medium">Fotoğrafını Yükle</p>
                <p className="text-xs text-muted-foreground">veya sürükle & bırak</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </div>

          {/* Right — Result */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Sonuç</p>
            <div className="aspect-[3/4] rounded-xl border border-border overflow-hidden flex items-center justify-center bg-secondary/30">
              {isLoading ? (
                <div className="w-full h-full p-4 flex flex-col gap-3">
                  <Skeleton className="w-full flex-1 rounded-lg" />
                  <Skeleton className="w-3/4 h-4 rounded" />
                  <Skeleton className="w-1/2 h-4 rounded" />
                </div>
              ) : resultImage ? (
                <img src={resultImage} alt="Sonuç" className="w-full h-full object-cover" />
              ) : (
                <p className="text-sm text-muted-foreground">Sonuç burada görünecek</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleTryOn}
            disabled={!userPhoto || isLoading}
            className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 disabled:opacity-40 transition-all duration-300"
          >
            Yapay Zeka ile Üzerimde Gör 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnModal;
