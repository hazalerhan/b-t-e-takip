// 1. VERİ DEPOSU (Tarayıcının hafızasından varsa eski verileri çekiyoruz, yoksa boş dizi başlatıyoruz)
const islemler = JSON.parse(localStorage.getItem("islemler")) || [];

// 2. HESAPLAMA FONKSİYONU
function bakiyeGuncelle() {
  let toplamGiden = 0;
  let toplamGelen = 0;

  islemler.forEach(function(islem) {
    if (islem.miktar > 0) {
      toplamGelen += islem.miktar;
    } else {
      toplamGiden += islem.miktar;
    }
  });

  const toplamBakiye = toplamGelen + toplamGiden;

  document.getElementById("bakiye").textContent = toplamBakiye;
  document.getElementById("gelen-miktar").textContent = "+" + toplamGelen + " TL";
  document.getElementById("gider-miktar").textContent = toplamGiden + " TL";
}

// 3. LİSTELEME FONKSİYONU
function listeyiGuncelle() {
  const listeAlan = document.getElementById("islemler");
  listeAlan.innerHTML = ""; 

  islemler.forEach(function(islem, index) {
    const islemTuru = islem.miktar > 0 ? "gelir" : "gider";
    
    listeAlan.innerHTML += `
      <li class="${islemTuru}">
        <span>${islem.islemAdi}</span>
        <span>${islem.miktar}</span>
        <button class="sil-btn" onclick="islemSil(${index})">X</button>
      </li>
    `;
  });
}

// 4. HAFIZAYI GÜNCELLEME VE KAYDETME YARDIMCISI
function verileriKaydetVeGuncelle() {
  localStorage.setItem("islemler", JSON.stringify(islemler));
  bakiyeGuncelle();
  listeyiGuncelle();
}

// 5. İŞLEM SİLME FONKSİYONU
function islemSil(index) {
  islemler.splice(index, 1);
  verileriKaydetVeGuncelle();
}

// 6. FORM İŞLEMLERİ (Tetikleyici)
const form = document.getElementById("form");

form.addEventListener("submit", function(olay) {
  olay.preventDefault(); 

  const yeniIslem = {
    id: Math.random().toString(), 
    islemAdi: document.getElementById("islem_adi").value,
    miktar: parseFloat(document.getElementById("miktar").value) || 0 
  };

  if (yeniIslem.islemAdi.trim() === "" || yeniIslem.miktar === 0) {
    alert("Lütfen geçerli bir işlem adı ve miktar giriniz!");
    return;
  }

  islemler.push(yeniIslem);

  verileriKaydetVeGuncelle();

  form.reset(); 
});

// Sayfa ilk açıldığında verileri ekrana yükle
bakiyeGuncelle();
listeyiGuncelle();