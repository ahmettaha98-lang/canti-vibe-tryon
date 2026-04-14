import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

const AdminDashboardPage = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cantico_api_key");
    if (saved) setApiKey(saved);
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({ title: "Hata", description: "API anahtarı boş olamaz.", variant: "destructive" });
      return;
    }
    localStorage.setItem("cantico_api_key", apiKey.trim());
    toast({ title: "Kaydedildi", description: "Cantico API anahtarı başarıyla kaydedildi. Sayfa yenilendiğinde widget aktif olacak." });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-2">Cantico Ayarları</h1>
        <p className="text-muted-foreground mb-8">Sanal Kabin widget'ını aktif etmek için API anahtarınızı girin.</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="api-key" className="text-sm font-medium mb-2 block">
              Cantico API Anahtarı
            </label>
            <input
              id="api-key"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="ctc_xxxxx"
              className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
