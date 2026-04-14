import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Period = "daily" | "weekly" | "monthly";

const statsData: Record<Period, { product: string; tries: number; conversion: string }[]> = {
  daily: [
    { product: "Adidas Eşofman Takımı", tries: 64, conversion: "%14.2" },
    { product: "Şalvar Elbise", tries: 52, conversion: "%11.8" },
    { product: "Örgü Süveter", tries: 41, conversion: "%9.3" },
    { product: "Kemerli Çan Etek", tries: 38, conversion: "%12.1" },
    { product: "Oversize Blazer", tries: 29, conversion: "%8.7" },
  ],
  weekly: [
    { product: "Adidas Eşofman Takımı", tries: 412, conversion: "%15.1" },
    { product: "Şalvar Elbise", tries: 387, conversion: "%12.4" },
    { product: "Örgü Süveter", tries: 298, conversion: "%10.2" },
    { product: "Kemerli Çan Etek", tries: 245, conversion: "%13.0" },
    { product: "Oversize Blazer", tries: 189, conversion: "%9.5" },
  ],
  monthly: [
    { product: "Adidas Eşofman Takımı", tries: 1684, conversion: "%14.8" },
    { product: "Şalvar Elbise", tries: 1520, conversion: "%12.1" },
    { product: "Örgü Süveter", tries: 1190, conversion: "%10.7" },
    { product: "Kemerli Çan Etek", tries: 1045, conversion: "%12.9" },
    { product: "Oversize Blazer", tries: 812, conversion: "%9.1" },
  ],
};

const periodLabels: Record<Period, string> = { daily: "Günlük", weekly: "Haftalık", monthly: "Aylık" };

const AdminStats = () => {
  const [period, setPeriod] = useState<Period>("weekly");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">İstatistikler</h1>

      <div className="flex gap-2">
        {(Object.keys(periodLabels) as Period[]).map((p) => (
          <Button
            key={p}
            variant={period === p ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod(p)}
          >
            {periodLabels[p]}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">En Çok Denenen Ürünler — {periodLabels[period]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 font-medium">#</th>
                  <th className="text-left py-3 font-medium">Ürün</th>
                  <th className="text-right py-3 font-medium">Deneme</th>
                  <th className="text-right py-3 font-medium">Dönüşüm</th>
                </tr>
              </thead>
              <tbody>
                {statsData[period].map((row, i) => (
                  <tr key={row.product} className="border-b border-border last:border-0">
                    <td className="py-3 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 font-medium">{row.product}</td>
                    <td className="py-3 text-right tabular-nums">{row.tries.toLocaleString()}</td>
                    <td className="py-3 text-right text-green-500 tabular-nums">{row.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
