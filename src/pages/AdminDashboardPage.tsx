import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, Settings, Eye, EyeOff, Copy, Check,
  CreditCard, TrendingUp, Zap, DollarSign, ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
} from "recharts";
import cantiLogo from "@/assets/canti-logo.png";

const API_KEY = "ctc_36x2v06t9b2";
const MASKED_KEY = "ctc_36x2•••••••••••";

const usageData = [
  { day: "Pzt", deneme: 124 },
  { day: "Sal", deneme: 189 },
  { day: "Çar", deneme: 156 },
  { day: "Per", deneme: 210 },
  { day: "Cum", deneme: 278 },
  { day: "Cmt", deneme: 198 },
  { day: "Paz", deneme: 145 },
];

const productStats = [
  { name: "Kaftan Sultan", deneme: 1243, donusum: "18.2%" },
  { name: "Osmanlı Bindallı", deneme: 987, donusum: "15.7%" },
  { name: "Hürrem Sultan Kıyafeti", deneme: 856, donusum: "21.3%" },
  { name: "Ertuğrul Kıyafeti", deneme: 734, donusum: "12.8%" },
  { name: "Padişah Cübbesi", deneme: 621, donusum: "16.5%" },
];

type Section = "dashboard" | "stats" | "settings";

const AdminDashboardPage = () => {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [statFilter, setStatFilter] = useState<"daily" | "weekly" | "monthly">("weekly");

  const copyToClipboard = (text: string, type: "key" | "embed") => {
    navigator.clipboard.writeText(text);
    if (type === "key") { setCopied(true); setTimeout(() => setCopied(false), 2000); }
    else { setCopiedEmbed(true); setTimeout(() => setCopiedEmbed(false), 2000); }
  };

  const embedCode = `<script src="https://cdn.cantico.ai/widget.js"\n  data-api-key="${API_KEY}"></script>`;

  const sidebarItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "stats", label: "İstatistikler", icon: <BarChart3 className="h-5 w-5" /> },
    { id: "settings", label: "Ayarlar", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col bg-card/50">
        <div className="p-6 border-b border-border">
          <Link to="/">
            <img src={cantiLogo} alt="CANTI" className="h-10 brightness-0 invert" />
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-foreground border border-purple-500/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
              C
            </div>
            <div>
              <p className="text-sm font-medium">CANTI Store</p>
              <p className="text-xs text-muted-foreground">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl">
          {/* DASHBOARD */}
          {activeSection === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1">Sanal deneme kabini performansınız</p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Bu Ay Deneme", value: "2,847", change: "+12.5%", icon: <Eye className="h-5 w-5" />, color: "from-purple-600 to-purple-400" },
                  { title: "Dönüşüm Oranı", value: "%16.8", change: "+2.1%", icon: <TrendingUp className="h-5 w-5" />, color: "from-pink-600 to-pink-400" },
                  { title: "Aktif Widget", value: "4", change: "Çalışıyor", icon: <Zap className="h-5 w-5" />, color: "from-emerald-600 to-emerald-400" },
                  { title: "Toplam Gelir", value: "₺148,320", change: "+8.3%", icon: <DollarSign className="h-5 w-5" />, color: "from-amber-600 to-amber-400" },
                ].map((m) => (
                  <Card key={m.title} className="border-border/50 bg-card/80">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">{m.title}</span>
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${m.color} text-white`}>
                          {m.icon}
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{m.value}</p>
                      <p className="text-xs text-emerald-400 mt-1">{m.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Usage Chart */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg">Son 7 Gün Kullanım</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={usageData}>
                        <defs>
                          <linearGradient id="colorDeneme" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                        <XAxis dataKey="day" stroke="hsl(0, 0%, 65%)" fontSize={12} />
                        <YAxis stroke="hsl(0, 0%, 65%)" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(0, 0%, 10%)",
                            border: "1px solid hsl(0, 0%, 18%)",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="deneme"
                          stroke="hsl(270, 70%, 50%)"
                          strokeWidth={2}
                          fill="url(#colorDeneme)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* STATS */}
          {activeSection === "stats" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">İstatistikler</h1>
                  <p className="text-muted-foreground text-sm mt-1">En çok denenen ürünler</p>
                </div>
                <div className="flex gap-1 bg-secondary/50 rounded-lg p-1">
                  {(["daily", "weekly", "monthly"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setStatFilter(f)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        statFilter === f
                          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f === "daily" ? "Günlük" : f === "weekly" ? "Haftalık" : "Aylık"}
                    </button>
                  ))}
                </div>
              </div>

              <Card className="border-border/50 bg-card/80">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead className="pl-6">#</TableHead>
                        <TableHead>Ürün Adı</TableHead>
                        <TableHead className="text-right">Deneme Sayısı</TableHead>
                        <TableHead className="text-right pr-6">Dönüşüm</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productStats.map((p, i) => (
                        <TableRow key={p.name} className="border-border/50">
                          <TableCell className="pl-6 font-medium text-muted-foreground">{i + 1}</TableCell>
                          <TableCell className="font-medium">{p.name}</TableCell>
                          <TableCell className="text-right">{p.deneme.toLocaleString()}</TableCell>
                          <TableCell className="text-right pr-6">
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                              {p.donusum}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* SETTINGS */}
          {activeSection === "settings" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold">Ayarlar</h1>
                <p className="text-muted-foreground text-sm mt-1">Mağaza ve entegrasyon ayarları</p>
              </div>

              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-secondary/50 border border-border/50">
                  <TabsTrigger value="general">Genel</TabsTrigger>
                  <TabsTrigger value="api">API & Entegrasyon</TabsTrigger>
                  <TabsTrigger value="billing">Fatura</TabsTrigger>
                </TabsList>

                {/* General */}
                <TabsContent value="general">
                  <Card className="border-border/50 bg-card/80">
                    <CardContent className="p-6 space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">Mağaza Adı</label>
                          <div className="px-4 py-3 rounded-xl bg-secondary/30 border border-border text-foreground">CANTI Store</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">E-posta</label>
                          <div className="px-4 py-3 rounded-xl bg-secondary/30 border border-border text-foreground">info@cantistore.com</div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">Plan</label>
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0 px-4 py-1.5 text-sm">
                          Pro Plan
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* API */}
                <TabsContent value="api">
                  <Card className="border-border/50 bg-card/80">
                    <CardContent className="p-6 space-y-8">
                      {/* API Key */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">API Anahtarınız</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 px-4 py-3 rounded-xl bg-secondary/30 border border-border font-mono text-sm tracking-wider">
                            {showKey ? API_KEY : MASKED_KEY}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowKey(!showKey)}
                            className="rounded-xl border-border h-12 w-12"
                          >
                            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(API_KEY, "key")}
                            className="rounded-xl border-border h-12 w-12"
                          >
                            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      {/* Embed Code */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Sitenize Ekleyin</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Aşağıdaki kodu sitenizin <code className="text-purple-400">&lt;head&gt;</code> etiketinin içine ekleyin.
                        </p>
                        <div className="relative">
                          <pre className="px-5 py-4 rounded-xl bg-secondary/30 border border-border text-sm font-mono text-purple-300 overflow-x-auto whitespace-pre-wrap">
                            {embedCode}
                          </pre>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(embedCode, "embed")}
                            className="absolute top-3 right-3 rounded-lg border-border text-xs gap-1.5"
                          >
                            {copiedEmbed ? <><Check className="h-3 w-3 text-emerald-400" /> Kopyalandı</> : <><Copy className="h-3 w-3" /> Kopyala</>}
                          </Button>
                        </div>
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-3 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Nasıl Kurulur?
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Billing */}
                <TabsContent value="billing">
                  <Card className="border-border/50 bg-card/80">
                    <CardContent className="p-6 space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">Mevcut Plan</label>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0 px-4 py-1.5 text-sm">
                              Pro Plan
                            </Badge>
                            <span className="text-sm text-muted-foreground">₺299/ay</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">Yenileme Tarihi</label>
                          <div className="px-4 py-3 rounded-xl bg-secondary/30 border border-border text-foreground">15 Mayıs 2026</div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">Ödeme Yöntemi</label>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/30 border border-border">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <span className="font-mono text-sm">•••• •••• •••• 4242</span>
                          <span className="text-xs text-muted-foreground ml-auto">Visa</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
