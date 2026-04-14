import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminSettings = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Ayarlar</h1>

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
            <label className="text-sm font-medium mb-1.5 block">Telefon</label>
            <Input defaultValue="+90 555 123 4567" />
          </div>
          <Button>Kaydet</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
