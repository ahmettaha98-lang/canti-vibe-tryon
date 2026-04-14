import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Package, TrendingUp } from "lucide-react";

const metrics = [
  { label: "Toplam Sipariş", value: "1.284", icon: ShoppingCart, change: "+12%" },
  { label: "Aktif Müşteri", value: "3.752", icon: Users, change: "+8%" },
  { label: "Ürün Sayısı", value: "48", icon: Package, change: "+2" },
  { label: "Aylık Gelir", value: "₺186.400", icon: TrendingUp, change: "+23%" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{m.label}</CardTitle>
              <m.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
              <p className="text-xs text-green-500 mt-1">{m.change} bu ay</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Son Siparişler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: "#1284", customer: "Ahmet Y.", product: "Adidas Eşofman", amount: "₺1.400", status: "Tamamlandı" },
              { id: "#1283", customer: "Elif K.", product: "Şalvar Elbise", amount: "₺899", status: "Kargoda" },
              { id: "#1282", customer: "Mehmet S.", product: "Örgü Süveter", amount: "₺700", status: "Hazırlanıyor" },
              { id: "#1281", customer: "Zeynep A.", product: "Kemerli Çan Etek", amount: "₺649", status: "Tamamlandı" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-muted-foreground">{order.id}</span>
                  <div>
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.amount}</p>
                  <p className={`text-xs ${order.status === "Tamamlandı" ? "text-green-500" : order.status === "Kargoda" ? "text-blue-400" : "text-yellow-500"}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
