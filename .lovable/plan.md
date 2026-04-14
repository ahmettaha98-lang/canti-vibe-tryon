

# CANTI Sokak Modası Butiği — Prototip Planı

## Özet
B2B SaaS "Sanal Kabin" widget'ı için demo ortamı olarak kullanılacak, 3 sayfalık modern sokak modası butiği prototipi.

## Logo
Yüklenen CANTI logosu `src/assets/` klasörüne kopyalanıp Navbar'da kullanılacak.

## Genel Tasarım
- **Arka plan:** #0f0f0f (koyu), beyaz metin, mor-pembe degrade aksanlar
- **Tüm geçişlerde** `transition-all duration-300`
- **Mobil uyumlu** responsive tasarım

## Navbar (tüm sayfalarda sabit)
- Sol: CANTI logosu (yüklenen görsel)
- Orta: Vitrin, Koleksiyonlar, Hakkımızda linkleri
- Sağ: Sepet + Kullanıcı ikonları
- Arka plan: #0f0f0f, sabit (sticky)

## Sayfa 1 — ProductsPage (`/`)
- Hero alanı: "Yeni Sezon" mor etiketi, "Sokağın Ruhu, Sende." büyük başlık, kısa alt yazı
- 6 ürün kartı grid'i (3 kolon, mobilde 1-2 kolon)
- Her kart: placeholder görsel (props ile değiştirilebilir), ürün adı, fiyat
- Hover'da animasyonlu ikonlar: 🛒 Sepete Ekle (kırmızı) ve ✨ Sanal Kabin (mor degrade → modal açar)

## Sayfa 2 — ProductDetailPage (`/product/canti-oversize`)
- İki kolonlu layout (mobilde tek kolon)
- Sol: büyük görsel + 3 thumbnail
- Sağ: marka etiketi, ürün adı, ₺649 fiyat, 4.8 yıldız (124 yorum), açıklama, beden seçici (XS-XL), iki buton (Sepete Ekle + Sanal Kabinde Dene ✨)
- "Sanal Kabinde Dene" butonu mor degrade, VirtualTryOnModal açar

## VirtualTryOnModal (ortak bileşen)
- Backdrop blur + koyu overlay
- Header: "Sanal Kabin ✨" + kapatma butonu
- Sol kolon: fotoğraf yükleme alanı (drag & drop + click), yüklenince preview
- Sağ kolon: sonuç placeholder, işlem sırasında skeleton loading
- Footer: "Yapay Zeka ile Üzerimde Gör 🚀" butonu (mor degrade)
- 3 saniyelik simüle API çağrısı + TODO yorumları gerçek API entegrasyonu için

## Sayfa 3 — AdminDashboardPage (`/admin`)
- "Admin paneli yakında" placeholder

## Dosya Yapısı
- `src/components/Navbar.tsx`
- `src/components/ProductCard.tsx`
- `src/components/VirtualTryOnModal.tsx`
- `src/pages/ProductsPage.tsx`
- `src/pages/ProductDetailPage.tsx`
- `src/pages/AdminDashboardPage.tsx`
- Logo: `src/assets/canti-logo.png`

