import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Globe } from "lucide-react";

export default function App() {

  const GA_ID = "G-XXXXXXXXXX";

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `;
    document.head.appendChild(script2);
  }, []);

  const [lang, setLang] = useState("ka");
  const [openCheckout, setOpenCheckout] = useState(false);

  const content = {
    ka: {
      brand: "Lebuki.co",
      tagline: "ხელნაკეთი ელეგანტური ბროშები",
      description: "მინიმალისტური და უნიკალური ბროშები.",
      buy: "ყიდვა",
      footer: "© Lebuki.co — ყველა უფლება დაცულია"
    },
    en: {
      brand: "Lebuki.co",
      tagline: "Handmade Elegant Brooches",
      description: "Minimal and unique handmade brooches.",
      buy: "Buy Now",
      footer: "© Lebuki.co — All rights reserved"
    }
  };

  const t = content[lang];

  const handleBuy = () => {
    if (window.gtag) {
      window.gtag("event", "begin_checkout", { currency: "GEL", value: 30 });
    }
    setOpenCheckout(true);
  };

  const TBC_PAYMENT_URL = "https://pay.tbcbank.ge/example-checkout";

  const startTbcPayment = () => {
    if (window.gtag) {
      window.gtag("event", "purchase_click", { method: "TBC Pay" });
    }
    window.location.href = TBC_PAYMENT_URL;
  };

  return (
    <div style={{fontFamily:"sans-serif"}}>
      <header style={{display:"flex",justifyContent:"space-between",padding:"20px"}}>
        <h1>{t.brand}</h1>
        <button onClick={()=>setLang(lang==="ka"?"en":"ka")}>
          <Globe size={16}/> {lang==="ka"?"EN":"KA"}
        </button>
      </header>

      <section style={{textAlign:"center",padding:"60px"}}>
        <motion.h2 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
          {t.tagline}
        </motion.h2>
        <p>{t.description}</p>
        <button onClick={handleBuy}>
          <ShoppingBag size={16}/> {t.buy}
        </button>
      </section>

      {openCheckout && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",padding:"30px",borderRadius:"12px"}}>
            <h3>{lang==="ka"?"შეკვეთა":"Checkout"}</h3>
            <button onClick={startTbcPayment}>
              💳 {lang==="ka"?"TBC გადახდა":"Pay with TBC"}
            </button>
          </div>
        </div>
      )}

      <footer style={{textAlign:"center",padding:"40px"}}>
        {t.footer}
      </footer>
    </div>
  );
}

