export type Brand = {
  visuals: string;
  fonts: { primary: string };
  tone: string[];
};

export type AboutContent = {
  hakkimizda: string[];
  tarihce: string[];
  misyonVizyon: string[];
};

export type ServiceItem = { title: string; description?: string };

export type ServicesContent = {
  urunlerimiz: ServiceItem[];
};

export type ContactContent = {
  info: {
    phone?: string[];
    email?: string[];
    address?: string[];
  };
  form: {
    fields: Array<{ name: 'name' | 'email' | 'phone' | 'message' | string; label: string; type: 'text' | 'email' | 'tel' | 'textarea' }>; 
  };
};

export type FooterContent = {
  altBanner: string;
};

export type HomeContent = {
  hero: { title: string; subtitle?: string };
  featured: Array<{ title: string; description?: string }>;
  stats: Array<{ label: string; value: string }>; // Rakamlarla Altınel Sigorta
};

export type GroundTruth = {
  brand: Brand;
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  contact: ContactContent;
  footer: FooterContent;
};

export const groundTruth: GroundTruth = { 
  brand: {
    visuals: 'red-dominated authority',
    fonts: { primary: 'Poppins' },
    tone: ['Professional', 'Reassuring', 'Trustworthy'],
  },
  home: {
    hero: {
      title: 'Altınel Sigorta',
      subtitle: "1995'den beri, iyi günde kötü günde — A kalite sigortacılık hep yanınızda.",
    },
    featured: [
      { title: 'Zorunlu Trafik Sigortası', description: "Yasal zorunluluk olan Trafik Sigortası ile, kaza sonucunda diğer araç veya üçüncü şahıslara verebileceğiniz zararlar için sizi güvence altına alan bir sigorta ürünüdür." },
      { title: 'Kasko Sigortası', description: "Araçların kaza, çalınma ve darp edilmesine yönelik hazırlanan kasko poliçeleri, aynı zamanda farklı ek teminatlar ile kapsamı genişletilerek daha da kullanışlı ve ihtiyaca yönelik hale getirilebilir." },
      { title: 'Özel Sağlık Sigortası', description: "Sağlığınızda meydana gelebilecek hastalıkların tedavisini ve çeşitli farklı hizmetlerden yararlanmanızı sağlayan sigortadır. A + hastaneler dahil olmak üzere, tüm özel hastanelerden yararlanabilirsiniz." },
    ],
    stats: [
      { label: 'Toplam POLİÇE', value: '47817' },
      { label: 'Toplam Kasko POLİÇESİ', value: '7406' },
      { label: 'Toplam Sağlık POLİÇESİ', value: '3970' },
      { label: 'Toplam Konut POLİÇESİ', value: '2919' },
    ],
  },
  about: {
    hakkimizda: [
      "Kurucusu Abdülkadir Altınel. Abdülkadir Altınel Sigorta Aracılık Hizmetleri Ltd.Şti, merkezi, Şişli, Mecidiyeköy, Şehit Ahmet Sokak, Mecidiyeköy İş Merkezi, No 4/61'de bulunan, 5684 sayılı acenteler yasası gereğince, minimum sermayesini 25.000 TL olarak İstanbul Ticaret Odasın' a tescil ettirilmiş, 1999 yılında Abdülkadir Altınel tarafından kurulmuştur.",
    ],
    tarihce: [
      "Kurucu Abdülkadir Altınel (1969), Ocak 1995 te Avrupa Amerika Holding e bağlı Emek Hayat Sigorta A.Ş.nin direkt satış ofisinde müşteri temsilcisi olarak sigorta sektörüne girmiştir. (Mart 1996) Nisan 1996 da satış şefi görevinden istifa ederek Emir Sigorta Acenteliği'nde satış müdürlüğü yapmaya başlamıştır. (Aralık 1997) Ocak 1998 de Yeşilköy Aracılık Hizmetleri Ltd. Şti kurucu ortağı olarak, Emek Hayat Sigorta ve Kapital Sigorta acentelikleri yapmak suretiyle, aracılık faaliyetlerine hissedar sıfatıyla devam etmiştir. (Mayıs 1999) Aralık 1999 da Altınel Sigorta Aracılık Hizmetleri - Abdülkadir Altınel(şahıs firması) firmasını kurmuş, Koç Allianz ile münhasır acentelik sözleşmesi imzalamış, birkaç ay içersinde Koç Allianz Hayat Sigorta acenteliği ile ürün gamını genişletmiştir. Mart 2009'da çoklu acentelik yaparak müşterilerine daha geniş bir ürün yelpazesi sunmak amacıyla, Allianz Sigorta ile yaptığı sözleşmeye son vermiş, Axa Sigorta ve Axa Hayat Sigorta ile acentelik tesis etmiştir. Eylül 2009 da Ergo İsviçre Sigorta (2010), Kasım 2009 da HDI Sigorta, Haziran 2010 da Ray Sigorta(2013), Ocak 2013 de Liberty Sigorta, Ağustos 2013 de Mapfre Genel Sigorta, Unico Sigorta, Ak Sigorta ile işbirliği kurmuştur. Bugün, 6 sigorta şirketi temsilciliğine devam etmektedir. Aralık 2014 itibariyle şahıs şirketini, ticaret sicil numarasını değiştirmeyerek, yeni bir hissedar olmaksızın limited şirkete çevirmiştir. Yeni ticari ünvan; Abdülkadir Altınel Sigorta Aracılık Hizmetleri Limited Şirketi dir. Bugün, Ak Sigorta, Allianz Sigorta, Axa Sigorta, Axa Hayat ve Emeklilik, Corpus Sigorta, HDI Sigorta, Mapfre Sigorta, Mapfre Yaşam Sigorta acentelikleri ile yola devam ediyoruz.",
    ],
    misyonVizyon: [
      "'Zamanında ve eksiksiz risk değerlendirmesi yaparak sigortalılarımızla uzun süreli işbirliğini sağlamak', 'Sunduğumuz poliçeler ile piyasa şartlarında rekabetçi olabilmek', 'Teminatlar kapsamındaki zararların hızlı ve tam olarak karşılanması sağlamak ', 'Tüm hizmetlerimizle müşteri memnuniyeti maksimize etmektir'.",
    ],
  },
  services: {
    urunlerimiz: [
      { title: "İş Yeri Sigortası", description: "İşyeri Sigortası ile, işyerinizi ve isteğe bağlı olarak işyerindeki muhteviyatınızı yangın, hırsızlık, sel ve su baskınından; iş durması ve kira kaybına kadar birçok riske karşı güvence altına alabilirsiniz." },
      { title: "Zorunlu Trafik Sigortası", description: "Yasal zorunluluk olan Trafik Sigortası ile, kaza sonucunda diğer araç veya üçüncü şahıslara verebileceğiniz zararlar için sizi güvence altına alan bir sigorta ürünüdür." },
      { title: "Kasko Sigortası", description: "Araçların kaza, çalınma ve darp edilmesine yönelik hazırlanan kasko poliçeleri, aynı zamanda farklı ek teminatlar ile kapsamı genişletilerek daha da kullanışlı ve ihtiyaca yönelik hale getirilebilir." },
      { title: "Özel Sağlık Sigortası", description: "Sağlığınızda meydana gelebilecek hastalıkların tedavisini ve çeşitli farklı hizmetlerden yararlanmanızı sağlayan sigortadır. A + hastaneler dahil olmak üzere, tüm özel hastanelerden yararlanabilirsiniz." },
      { title: "Tamamlayıcı Sağlık Sigortası", description: "SGK anlaşmalı özel hastanelerde ihtiyacınız olan yüksek kalitedeki sağlık hizmetlerinden fark ödemeden faydalanabilirsiniz. SGK'lı olmanız yeterlidir." },
      { title: "Konut Sigortası", description: "Evinizde karşılaşabileceğiniz hasarlara karşı güvence sağlar. İster ev sahibi olun ister kiracı, evinizi ve dilerseniz eşyalarınızı yangından hırsızlığa, depremden tesisat arızasına kadar korur." },
      { title: "DASK (Zorunlu Deprem Sigortası)", description: "Deprem durumunda oluşabilecek bina yıkımı, patlama, yer kayması, yangın gibi afetlerin mülkünüzde bıraktığı hasarları tazmin edebilmeniz amacıyla düzenlenen bir sigortadır." },
      { title: "Seyahat Sağlık Sigortası", description: "Yurt içine, yurt dışına veya yurt dışından ülkemize seyahat edenleri, seyahatleri esnasında karşılaşabilecekleri ani rahatsızlık ve hastalıklarda koruma altına alır." },
      { title: "Pati Sigortası", description: "Kedi veya köpeğinizin başına gelebilecek tüm acil durumların yanı sıra ayakta & yatarak tedavi imkanı ile dostunuza özel hizmet ve avantajlar sağlar." },
      { title: "Tekne Sigortası", description: "Gemi, tekne gibi deniz ve göl araçlarınızı maruz kalabileceği rizikolara karşı güvence altına alabilirsiniz." }
    ],
  },
  contact: {
    info: {
      phone: [
        "+90 212 272 66 57",
        "Whatsapp: +90 544 572 66 57",
        "Fax: +90 212 272 66 58",
      ],
      email: [
        "altinelsigorta@gmail.com",
        "acente@abdulkadiraltinel.com.tr",
      ],
      address: [
        "Şehit Ahmet Sokak Mecidiyeköy İş Merkezi 4 / 61 Mecidiyeköy 80310 Şişli / İSTANBUL",
      ],
    },
    form: {
      fields: [
        { name: 'name', label: 'Ad Soyad', type: 'text' },
        { name: 'email', label: 'E‑posta', type: 'email' },
        { name: 'phone', label: 'Telefon', type: 'tel' },
        { name: 'message', label: 'Mesajınız', type: 'textarea' },
      ],
    },
  },
  footer: {
    altBanner: [
      "ABDÜLKADİR ALTINEL SİGORTA ARACILIK HİZMETLERİ LTD. ŞTİ. - 1995",
      "1995'den beri, iyi günde kötü günde",
      "A kalite sigortacılık hep yanınızda.",
      "İletişim: +90 212 272 66 57 • Whatsapp: +90 544 572 66 57 • Fax: +90 212 272 66 58 • E‑posta: altinelsigorta@gmail.com, acente@abdulkadiraltinel.com.tr • Adres: Şehit Ahmet Sokak Mecidiyeköy İş Merkezi 4 / 61 Mecidiyeköy 80310 Şişli / İSTANBUL",
    ].join(' • '),
  },
};
