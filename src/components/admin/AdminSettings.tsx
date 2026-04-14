import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Copy, Check, ExternalLink, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useCustomCode } from "@/hooks/use-custom-code";
import { Badge } from "@/components/ui/badge";

const API_KEY = "ctc_36x2v06t9b2";

const AdminSettings = () => {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const { bodyCode, setBodyCode } = useCustomCode();
  const [localBody, setLocalBody] = useState(bodyCode);

  const maskedKey = API_KEY.slice(0, 8) + "•••••••••••";

  const widgetCode = `<script>\n  window.CANTICO_KEY = "${API_KEY}";\n</script>\n<script src="https://cdn.cantico.ai/widget.js"></script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    toast.success("Kod panoya kopyalandı");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveIntegration = () => {
    setBodyCode(localBody);
    toast.success("Entegrasyon kodu kaydedildi ve siteye uygulandı.");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Ayarlar</h1>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="widget">Widget</TabsTrigger>
          <TabsTrigger value="billing">Fatura</TabsTrigger>
        </TabsList>

        {/* TAB 1 — Genel */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mağaza Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Mağaza Adı</label>
                <Input defaultValue="CANTI Butik" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">E-posta</label>
                <Input defaultValue="info@cantibutik.com" type="email" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Plan</label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">Pro Plan</Badge>
                  <span className="text-xs text-muted-foreground">Aylık yenileme</span>
                </div>
              </div>
              <Button>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2 — Widget */}
        <TabsContent value="widget" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">API Anahtarı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <code className="flex-1 bg-muted px-4 py-2.5 rounded-lg text-sm font-mono">
                  {showKey ? API_KEY : maskedKey}
                </code>
                <Button variant="ghost" size="icon" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Widget'ı Sitenize Ekleyin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <pre className="bg-muted rounded-lg p-4 text-xs font-mono overflow-x-auto whitespace-pre text-muted-foreground">
                {widgetCode}
              </pre>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleCopyCode} className="gap-2">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Kopyalandı" : "Kopyala"}
                </Button>
                <a href="#" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                  Nasıl Kurulur? <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Entegrasyon Kodu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Satın aldığınız servislerin entegrasyon kodlarını buraya yapıştırın. Body etiketinin sonuna eklenir.
              </p>
              <textarea
                value={localBody}
                onChange={(e) => setLocalBody(e.target.value)}
                placeholder={'<script>\n  window.CANTICO_KEY = "ctc_xxx";\n</script>\n<script src="https://..."></script>'}
                className="w-full h-36 rounded-lg border border-input bg-background px-4 py-3 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                spellCheck={false}
              />
              <Button onClick={handleSaveIntegration} disabled={localBody === bodyCode} size="sm">
                Kaydet ve Uygula
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3 — Fatura */}
        <TabsContent value="billing" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mevcut Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Pro Plan</p>
                  <p className="text-sm text-muted-foreground">₺1.299/ay • Sınırsız deneme</p>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">Aktif</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Sonraki yenileme: <span className="text-foreground">15 Mayıs 2026</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Ödeme Yöntemi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-muted rounded flex items-center justify-center text-xs font-bold">VISA</div>
                  <div>
                    <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-muted-foreground">Son kullanma: 08/28</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Değiştir</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
