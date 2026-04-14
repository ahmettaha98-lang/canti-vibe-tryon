import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCustomCode } from "@/hooks/use-custom-code";
import { Check, Code, Info } from "lucide-react";
import { toast } from "sonner";

const AdminIntegrations = () => {
  const { headCode, bodyCode, setHeadCode, setBodyCode } = useCustomCode();
  const [localHead, setLocalHead] = useState(headCode);
  const [localBody, setLocalBody] = useState(bodyCode);

  const handleSave = () => {
    setHeadCode(localHead);
    setBodyCode(localBody);
    toast.success("Entegrasyon kodları kaydedildi ve siteye uygulandı.");
  };

  const hasChanges = localHead !== headCode || localBody !== bodyCode;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Entegrasyonlar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Üçüncü parti servislerin entegrasyon kodlarını buraya yapıştırın.
        </p>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
        <Info className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p>
            Satın aldığınız servislerin size sağladığı <code className="text-foreground bg-muted px-1.5 py-0.5 rounded text-xs">&lt;script&gt;</code> kodlarını
            aşağıdaki alanlara yapıştırıp kaydedin. Kodlar otomatik olarak sitenize uygulanacaktır.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Code className="h-4 w-4" />
            Head Kodu
          </CardTitle>
          <CardDescription>
            &lt;head&gt; etiketinin içine eklenir. Analytics, meta tag vb. için kullanın.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            value={localHead}
            onChange={(e) => setLocalHead(e.target.value)}
            placeholder={'<!-- Analytics, meta tags vb. -->\n<script>...</script>'}
            className="w-full h-32 rounded-lg border border-input bg-background px-4 py-3 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            spellCheck={false}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Code className="h-4 w-4" />
            Body Kodu
          </CardTitle>
          <CardDescription>
            &lt;body&gt; etiketinin sonuna eklenir. Widget'lar ve üçüncü parti scriptler için kullanın.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            value={localBody}
            onChange={(e) => setLocalBody(e.target.value)}
            placeholder={'<script>\n  window.CANTICO_KEY = "ctc_xxx";\n</script>\n<script src="https://..."></script>'}
            className="w-full h-40 rounded-lg border border-input bg-background px-4 py-3 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            spellCheck={false}
          />
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={!hasChanges} className="gap-2">
          <Check className="h-4 w-4" />
          Kaydet ve Uygula
        </Button>
        {!hasChanges && (headCode || bodyCode) && (
          <span className="text-xs text-green-500 flex items-center gap-1">
            <Check className="h-3 w-3" /> Güncel
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminIntegrations;
