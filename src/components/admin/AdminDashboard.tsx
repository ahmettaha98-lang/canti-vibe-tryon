import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, TrendingUp, Zap, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const metrics = [
  { label: "Bu Ay Deneme", value: "2.847", icon: FlaskConical, change: "+18%" },
  { label: "Dönüşüm Oranı", value: "%12.4", icon: TrendingUp, change: "+2.1%" },
  { label: "Aktif Widget", value: "3", icon: Zap, change: "Stabil" },
  { label: "Toplam Gelir", value: "₺48.600", icon: DollarSign, change: "+23%" },
];

const usageData = [
  { day: "Pzt", deneme: 380 },
  { day: "Sal", deneme: 420 },
  { day: "Çar", deneme: 510 },
  { day: "Per", deneme: 390 },
  { day: "Cum", deneme: 620 },
  { day: "Cmt", deneme: 580 },
  { day: "Paz", deneme: 450 },
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
              <p className="text-xs text-green-500 mt-1">{m.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Son 7 Gün — Widget Kullanımı</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" />
              <XAxis dataKey="day" stroke="hsl(0 0% 65%)" fontSize={12} />
              <YAxis stroke="hsl(0 0% 65%)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 18%)", borderRadius: 8, color: "#fff" }}
              />
              <Line type="monotone" dataKey="deneme" stroke="hsl(270 70% 50%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(270 70% 50%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
