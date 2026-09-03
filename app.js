// 1. VERİ DEPOSU
const islemler = [];

// 2. HESAPLAMA FONKSİYONU
function bakiyeGuncelle() {
  let toplamGiden = 0;
  let toplamGelen = 0;

  islemler.forEach(function(islem) {
    // Mantık Değişimi: Miktar sıfırdan büyükse gelir, küçükse giderdir.
    if (islem.miktar > 0) {
      toplamGelen += islem.miktar;
    } else {
      toplamGiden += islem.miktar;
    }
  });

  const toplamBakiye = toplamGelen + toplamGiden;

  // Yeni HTML ID'lerine göre verileri ekrana bas
  document.getElementById("bakiye").textContent = toplamBakiye;
  document.getElementById("gelen-miktar").textContent = "+" + toplamGelen + " TL";
  document.getElementById("gider-miktar").textContent = toplamGiden + " TL";
}

// 3. LİSTELEME FONKSİYONU
function listeyiGuncelle() {
  const listeAlan = document.getElementById("islemler");
  listeAlan.innerHTML = ""; 

  islemler.forEach(function(islem) {
    // Miktarın pozitif veya negatif olmasına göre CSS sınıfını (rengi) belirliyoruz
    const islemTuru = islem.miktar > 0 ? "gelir" : "gider";
    
    // Yeni HTML listeleme formatına uygun yapı
    listeAlan.innerHTML += `
      <li class="${islemTuru}">
        <span>${islem.islemAdi}</span>
        <span>${islem.miktar}</span>
        <button class="sil-btn">X</button>
      </li>
    `;
  });
}

// 4. FORM İŞLEMLERİ (Tetikleyici)
const form = document.getElementById("form");

form.addEventListener("submit", function(olay) {
  olay.preventDefault(); 

  // İşte senin doldurman gereken kısım tam olarak buydu: Yeni ID'ler!
  const yeniIslem = {
    id: Math.random().toString(), 
    islemAdi: document.getElementById("islem_adi").value,
    miktar: parseFloat(document.getElementById("miktar").value) || 0 
  };

  // Basit bir güvenlik önlemi: Boş veya sıfır girilirse uyar ve durdur
  if (yeniIslem.islemAdi.trim() === "" || yeniIslem.miktar === 0) {
    alert("Lütfen geçerli bir işlem adı ve miktar giriniz!");
    return;
  }

  // Veriyi listeye ekle
  islemler.push(yeniIslem);

  // Görevleri çalıştır
  bakiyeGuncelle();
  listeyiGuncelle();

  // Formu temizle
  form.reset(); 
});