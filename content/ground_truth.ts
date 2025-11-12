export type Brand = {
  visuals: 'traditional corporate' | 'strict professionalism' | 'reliable' | 'red-dominated authority' | string;
  fonts: { primary: string };
  tone: Array<'Professional' | 'Reassuring' | 'Trustworthy' | string>;
};

export type AboutContent = {
  hakkimizda: string[]; // paragraphs
  tarihce: string[]; // paragraphs
  misyonVizyon: string[]; // paragraphs
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
  altBanner: string; // ALT BANNER text
};

export type GroundTruth = {
  brand: Brand;
  about: AboutContent;
  services: ServicesContent;
  contact: ContactContent;
  footer: FooterContent;
};

// TODO: Replace all placeholder strings below with exact texts from Ham Site Metinleri.pdf and business.json.
export const groundTruth: GroundTruth = {
  brand: {
    visuals: 'red-dominated authority',
    fonts: { primary: 'Poppins' },
    tone: ['Professional', 'Reassuring', 'Trustworthy'],
  },
  about: {
    hakkimizda: [
      // Paste EXACT "HAKKIMIZDA" paragraphs here...
    ],
    tarihce: [
      // Paste EXACT "TARİHÇE" paragraphs here...
    ],
    misyonVizyon: [
      // Paste EXACT "MİSYON ve VİZYON" paragraphs here...
    ],
  },
  services: {
    urunlerimiz: [
      { title: 'İş Yeri Sigortası' },
      { title: 'Kasko Sigortası' },
      { title: 'Özel Sağlık Sigortası' },
      // Add the full ÜRÜNLERİMİZ list here with exact titles and optional descriptions...
    ],
  },
  contact: {
    info: {
      phone: [
        // e.g., '+90 5xx xxx xx xx'
      ],
      email: [
        // e.g., 'info@domain.tld'
      ],
      address: [
        // Paste exact address lines here...
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
    altBanner: 'ALT BANNER – Lütfen buraya Ham Site Metinleri.pdf içindeki tam metni ekleyin.',
  },
};
