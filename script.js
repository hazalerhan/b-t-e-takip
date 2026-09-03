// 1. VERİ DEPOSU
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

// 3. LİSTELEME FONKSİYONU (Kategori detaylı)
function listeyiGuncelle() {
  const listeAlan = document.getElementById("islemler");
  listeAlan.innerHTML = ""; 

  islemler.forEach(function(islem, index) {
    const islemTuru = islem.miktar > 0 ? "gelir" : "gider";
    const kategoriAdi = islem.kategori ? islem.kategori : "Genel";
    
    listeAlan.innerHTML += `
      <li class="${islemTuru}">
        <span>${islem.islemAdi} <small style="color: #777; display: block; font-size: 11px;">[${kategoriAdi}]</small></span>
        <span>${islem.miktar} TL</span>
        <button class="sil-btn" onclick="islemSil(${index})">X</button>
      </li>
    `;
  });
}

// 4. HAFIZAYI GÜNCELLEME
function verileriKaydetVeGuncelle() {
  localStorage.setItem("islemler", JSON.stringify(islemler));
  bakiyeGuncelle();
  listeyiGuncelle();
}

// 5. İŞLEM SİLME
function islemSil(index) {
  islemler.splice(index, 1);
  verileriKaydetVeGuncelle();
}

// 6. FORM İŞLEMLERİ
const form = document.getElementById("form");

form.addEventListener("submit", function(olay) {
  olay.preventDefault(); 

  const islemAdi = document.getElementById("islem_adi").value;
  const secilenTur = document.getElementById("islem_turu").value; // "gelir" veya "gider"
  const secilenKategori = document.getElementById("kategori").value;
  let hamMiktar = parseFloat(document.getElementById("miktar").value) || 0;

  if (islemAdi.trim() === "" || hamMiktar <= 0) {
    alert("Lütfen geçerli bir işlem adı ve sıfırdan büyük bir miktar giriniz!");
    return;
  }

  // Eğer kullanıcı gider seçtiyse miktarı otomatik eksi yapıyoruz
  const nihaiMiktar = secilenTur === "gider" ? -Math.abs(hamMiktar) : Math.abs(hamMiktar);

  const yeniIslem = {
    id: Math.random().toString(), 
    islemAdi: islemAdi,
    miktar: nihaiMiktar,
    kategori: secilenKategori
  };

  islemler.push(yeniIslem);
  verileriKaydetVeGuncelle();
  form.reset(); 
});

// Sayfa ilk açılış tetikleyicisi
bakiyeGuncelle();
listeyiGuncelle();