import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Menu, MessageCircle, Search, ShoppingBag, Sparkles, Star, Truck, Gift, Palette, Gem, CircleUserRound, MapPin, Phone, Mail } from 'lucide-react';
import './styles.css';

// ============================================================
// IMAGE PLACEHOLDERS
// Replace ONLY the paths below with your real images.
// Keep the same file names if you want the quickest setup.
// All image files should be placed inside: public/images/
// ============================================================
const IMG = {
  hero1: '/images/hero-1.png',
  hero2: '/images/hero-2.png',
  hero3: '/images/hero-3.png',

  brass: '/images/collection-brass.jpg',
  buddha: '/images/collection-buddha.jpeg',
  murugar: '/images/collection-murugar.jpeg',
  gomatha: '/images/gomatha.jpg',
  kubera: '/images/collection-kubera.jpeg',
  crystals: '/images/collection-crystals.jpeg',
  pooja: '/images/collection-pooja-box.jpeg',
  bangles: '/images/collection-bangles.jpeg',
  returnGifts: '/images/collection-return-gifts.jpeg',
  decor: '/images/collection-home-decor.jpeg',

  product1: '/images/product-buddha.jpeg',
  product2: '/images/product-murugar.jpeg',
  product3: '/images/product-lakshmi-kuber.jpeg',
  product4: '/images/product-kamadhenu.jpeg',
  product5: '/images/product-rose-quartz.jpeg',
  product6: '/images/product-amethyst.jpeg',

  spiritual: '/images/spiritual-banner.jpg',
  crystalBanner: '/images/crystal-banner.jpeg',
  returnGiftBanner: '/images/return-gifts-banner.jpeg',
  customBanner: '/images/custom-orders-banner.jpg',
  rasiBanner: '/images/rasi-palan-banner.jpg',
  instagram1: '/images/instagram-1.jpeg',
  instagram2: '/images/instagram-2.jpeg',
  instagram3: '/images/instagram-3.jpeg',
  instagram4: '/images/instagram-4.jpeg',
  instagram5: '/images/instagram-5.jpeg',
  instagram6: '/images/instagram-6.jpeg',
  event: '/images/stall-event.jpeg',
  about: '/images/about-nivraa.jpeg',
  logo: '/images/nivraa-logo.png'
};

const collections = [
  ['Brass Collection', IMG.brass], ['Buddha Collection', IMG.buddha], ['Murugar Collection', IMG.murugar],
  ['Gomatha Collection', IMG.gomatha], ['Gubera Collection', IMG.kubera], ['Healing Crystals', IMG.crystals],
  ['Pooja Boxes', IMG.pooja], ['Bangles', IMG.bangles], ['Return Gifts', IMG.returnGifts], ['Home Décor', IMG.decor]
];

const products = [
  ['Brass Buddha Statue', '₹5,500', IMG.product1],
  ['Brass Murugar Statue', '₹10,000', IMG.product2],
  ['Lakshmi Kuber Statue', '₹8,000', IMG.product3],
  ['Brass Kamadhenu', '₹5,400', IMG.product4],
  ['Rose Quartz Bracelet', '₹1,800', IMG.product5],
  ['Amethyst Crystal Bracelet', '₹1,800', IMG.product6]
];

const rasis = ['Mesham', 'Rishabam', 'Mithunam', 'Kadagam', 'Simmam', 'Kanni', 'Thulam', 'Viruchigam', 'Dhanusu', 'Magaram', 'Kumbam', 'Meenam'];

function Image({ src, alt, className = '', ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      {...props}
      onError={(e) => {
        e.currentTarget.classList.add('img-missing');
        e.currentTarget.alt = `Add image: ${src.split('/').pop()}`;
      }}
    />
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hero, setHero] = useState(0);
  const [collectionStart, setCollectionStart] = useState(0);
  const heroImages = [IMG.hero1, IMG.hero2, IMG.hero3];

  useEffect(() => {
    const id = setInterval(() => setHero((v) => (v + 1) % heroImages.length), 5000);

    const revealItems = document.querySelectorAll(
      'main section, .trust-strip, .footer-grid > div'
    );

    revealItems.forEach((el) => el.classList.add('scroll-reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((el) => observer.observe(el));

    return () => {
      clearInterval(id);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const whatsapp = (text = 'Hi Nivraa, I would like to know more about your products.') => {
    window.open(`https://wa.me/919092920211?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="site">
      <header className="header">
        <div className="container nav-wrap">
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><Menu size={22}/></button>
          <button className="brand" onClick={() => scrollTo('home')}>
            <Image src={IMG.logo} alt="Nivraa World of Art logo" />
            <span><b>NIVRAA</b><small>WORLD OF ART</small></span>
          </button>
          <nav className={menuOpen ? 'nav open' : 'nav'}>
            <button className="active" onClick={() => scrollTo('home')}>Home</button>
            <button onClick={() => scrollTo('collections')}>Collections</button>
            <button onClick={() => scrollTo('return-gifts')}>Return Gifts</button>
            <button onClick={() => scrollTo('rasi')}>Rasi Palan</button>
            <button onClick={() => scrollTo('custom')}>Custom Orders</button>
            <button onClick={() => scrollTo('about')}>About</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
          <div className="nav-actions">
            <button aria-label="Search"><Search size={18}/></button>
            <button aria-label="Wishlist"><Heart size={18}/></button>
            <button aria-label="Bag"><ShoppingBag size={18}/></button>
            <button className="whatsapp-top" onClick={() => whatsapp()}>WhatsApp Us</button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          {heroImages.map((img, i) => (
            <Image key={img} src={img} alt={`Nivraa hero ${i + 1}`} className={`hero-image ${i === hero ? 'show' : ''}`} />
          ))}
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow">HANDCRAFTED ARTS & CRAFTS</p>
            <h1>Art That Speaks.<br/><em>Traditions That Inspire.</em></h1>
            <p className="hero-copy">Discover handcrafted décor, spiritual products, crystal healing stones, return gifts and more.</p>
            <div className="hero-buttons">
              <button className="btn primary" onClick={() => scrollTo('collections')}>Explore Collections <ArrowRight size={17}/></button>
              <button className="btn light" onClick={() => whatsapp()}> <MessageCircle size={17}/> Chat on WhatsApp</button>
            </div>
            <div className="hero-dots">
              {heroImages.map((_, i) => <button key={i} className={i === hero ? 'dot active' : 'dot'} onClick={() => setHero(i)} aria-label={`Slide ${i+1}`} />)}
            </div>
          </div>
          <div className="hero-note">Tradition<br/><span>in every detail</span></div>
        </section>

        <section id="collections" className="section cream">
          <div className="container">
            <div className="section-head"><div><p className="eyebrow">EXPLORE</p><h2>Shop by Collection</h2><p>Discover a world of art, culture and craftsmanship.</p></div><button className="text-btn">View All Collections <ArrowRight size={16}/></button></div>
            <div className="collection-slider">
              <button className="circle-btn" onClick={() => setCollectionStart(Math.max(0, collectionStart - 1))}><ChevronLeft/></button>
              <div className="collection-grid">
                {collections.slice(collectionStart, collectionStart + 5).map(([name, img]) => (
                  <button className="collection-card" key={name} onClick={() => whatsapp(`Hi Nivraa, I am interested in the ${name}.`)}>
                    <Image src={img} alt={name}/><span>{name}</span><ArrowRight size={15}/>
                  </button>
                ))}
              </div>
              <button className="circle-btn" onClick={() => setCollectionStart(Math.min(collections.length - 5, collectionStart + 1))}><ChevronRight/></button>
            </div>
          </div>
        </section>

        <section className="section products-section">
          <div className="container">
            <div className="section-head"><div><p className="eyebrow">HANDPICKED FAVOURITES</p><h2>Featured Products</h2><p>Beautiful pieces selected from Nivraa's collections.</p></div><button className="text-btn">View All Products <ArrowRight size={16}/></button></div>
            <div className="product-grid">
              {products.map(([name, price, img]) => (
                <article className="product-card" key={name}>
                  <div className="product-image"><Image src={img} alt={name}/><button className="heart"><Heart size={17}/></button></div>
                  <div className="product-info"><h3>{name}</h3><strong>{price}</strong><div><button className="small-btn" onClick={() => whatsapp(`Hi Nivraa, I am interested in ${name} (${price}).`)}>View Details</button><button className="wa-icon" onClick={() => whatsapp(`Hi Nivraa, I am interested in ${name} (${price}).`)}><MessageCircle size={16}/></button></div></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="spiritual">
          <Image src={IMG.spiritual} alt="Spiritual collection" />
          <div className="spiritual-overlay" />
          <div className="container spiritual-content">
            <div><p className="eyebrow light-eyebrow">TRADITION & DEVOTION</p><h2>Spiritual Collections</h2><p>Connect with timeless symbols and handcrafted art.</p></div>
            <div className="spiritual-links">{[['Buddha','🪷'],['Murugar','🛕'],['Gomatha','🐄'],['Gubera','💰'],['Pooja','🪔']].map(([n, e]) => <button key={n} onClick={() => whatsapp(`Hi Nivraa, I am interested in the ${n} Collection.`)}><span>{e}</span>{n}</button>)}</div>
            <button className="btn outline-light" onClick={() => scrollTo('collections')}>Explore All <ArrowRight size={16}/></button>
          </div>
        </section>

        <section className="section cream">
          <div className="container crystal-layout">
            <Image src={IMG.crystalBanner} alt="Healing crystals" className="feature-image" />
            <div className="feature-copy"><p className="eyebrow">CRYSTAL COLLECTION</p><h2>Healing Crystal Collection</h2><p>Explore beautiful crystal pieces rooted in traditional spiritual practices and symbolism.</p><div className="crystal-tags">{['Rose Quartz','Black Tourmaline','Tiger Eye','Amethyst','Seven Chakra','Citrine'].map(n => <span key={n}><Gem size={14}/>{n}</span>)}</div><button className="btn primary" onClick={() => whatsapp('Hi Nivraa, I would like to explore the Healing Crystal Collection.')}>Explore Crystals <ArrowRight size={17}/></button></div>
          </div>
        </section>

        <section className="section promo-section">
          <div className="container promo-grid">
            <div id="return-gifts" className="promo-card"><Image src={IMG.returnGiftBanner} alt="Return gifts"/><div><p className="eyebrow">FOR EVERY CELEBRATION</p><h2>Return Gifts</h2><p>Thoughtfully curated gifts for weddings, baby showers, birthdays, housewarmings and more.</p><button className="btn primary" onClick={() => whatsapp('Hi Nivraa, I am looking for return gifts.')}>Get Custom Quote <ArrowRight size={16}/></button></div></div>
            <div id="custom" className="promo-card"><Image src={IMG.customBanner} alt="Custom orders"/><div><p className="eyebrow">MADE FOR YOU</p><h2>Custom Orders</h2><p>Personalised gifts, bulk orders, custom designs and event-specific pieces.</p><button className="btn primary" onClick={() => whatsapp('Hi Nivraa, I would like to discuss a custom order.')}>Request Custom Order <ArrowRight size={16}/></button></div></div>
          </div>
        </section>

        <section id="rasi" className="rasi-section">
          <Image src={IMG.rasiBanner} alt="Rasi Palan" />
          <div className="rasi-overlay" />
          <div className="container rasi-content">
            <div className="rasi-intro"><p className="eyebrow light-eyebrow">TRADITIONAL ASTROLOGY</p><h2>Rasi Palan</h2><h3>Know Your Rasi. Explore Your Path.</h3><p>Explore Nivraa's traditional rasi palan content and astrology services.</p><button className="btn outline-light" onClick={() => whatsapp('Hi Nivraa, I would like to know today\'s Rasi Palan.')}>View Today's Rasi Palan <ArrowRight size={16}/></button></div>
            <div className="rasi-picker"><p>Select Your Rasi</p><div className="rasi-grid">{rasis.map((r, i) => <button key={r} onClick={() => whatsapp(`Hi Nivraa, I would like to know the Rasi Palan for ${r}.`)}><span>{['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'][i]}</span>{r}</button>)}</div></div>
            <div className="consult-card"><Sparkles size={27}/><h3>Need Personal Guidance?</h3><p>Connect with Nivraa for detailed astrology consultation.</p><button className="btn green" onClick={() => whatsapp('Hi Nivraa, I would like to enquire about astrology consultation.')}>Consult on WhatsApp <ArrowRight size={16}/></button></div>
          </div>
        </section>

        <section id="about" className="section cream">
          <div className="container about-grid"><Image src={IMG.about} alt="About Nivraa" className="about-image"/><div><p className="eyebrow">ABOUT NIVRAA</p><h2>Connecting Art Lovers</h2><p>Nivraa – World of Art brings together handcrafted décor, meaningful gifts, spiritual collections and unique artistic pieces. This section is ready for the brand's own story and milestones.</p><div className="about-points"><span><Palette size={19}/>Handcrafted Products</span><span><Gift size={19}/>Unique Return Gifts</span><span><Truck size={19}/>Pan-India Delivery</span><span><Heart size={19}/>Personalised Service</span></div></div></div>
        </section>

        <section className="section social-section">
          <div className="container social-grid">
            <div><span className="social-icon" aria-label="Instagram">◎</span><p className="eyebrow">FOLLOW NIVRAA</p><h2>On Instagram</h2><p>Discover new products, reels, events and behind-the-scenes moments.</p><button className="btn primary" onClick={() => window.open('https://instagram.com/nivraa_world_of_art', '_blank')}>Follow @nivraa_world_of_art <ArrowRight size={16}/></button><div className="insta-grid">{[IMG.instagram1,IMG.instagram2,IMG.instagram3,IMG.instagram4,IMG.instagram5,IMG.instagram6].map((img,i)=><Image key={img} src={img} alt={`Instagram post ${i+1}`}/>)}</div></div>
            <div className="testimonial"><p className="eyebrow">CUSTOMER LOVE</p><h2>What Our Customers Say</h2><div className="quote">“Beautiful collection and excellent customer service. The return gifts made our celebration extra special.”</div><div className="stars">★★★★★</div><p className="reviewer">Priya S. · Chennai</p></div>
            <div className="event-card"><Image src={IMG.event} alt="Nivraa stall event"/><div><p className="eyebrow">STALLS & EVENTS</p><h2>Meet Nivraa Offline</h2><p>Catch Nivraa at exhibitions, events and curated stalls.</p><button className="btn primary" onClick={() => whatsapp('Hi Nivraa, please share your upcoming stall/event details.')}>View Events <ArrowRight size={16}/></button></div></div>
          </div>
        </section>

        <section className="trust-strip"><div><Sparkles/> Handcrafted Products</div><div><Truck/> Pan-India Delivery</div><div><Gift/> Custom Orders</div><div><MessageCircle/> WhatsApp Support</div></section>
      </main>

      <footer id="contact" className="footer">
        <div className="container footer-grid">
          <div><div className="footer-brand"><Image src={IMG.logo} alt="Nivraa logo"/><span><b>NIVRAA</b><small>WORLD OF ART</small></span></div><p>Connecting Art Lovers · Handcrafted Décor & Gifts</p></div>
          <div><h4>Quick Links</h4><button onClick={() => scrollTo('home')}>Home</button><button onClick={() => scrollTo('collections')}>Collections</button><button onClick={() => scrollTo('return-gifts')}>Return Gifts</button><button onClick={() => scrollTo('custom')}>Custom Orders</button><button onClick={() => scrollTo('about')}>About</button></div>
          <div><h4>Collections</h4><button>Brass Collection</button><button>Crystal Collection</button><button>Buddha Collection</button><button>Murugar Collection</button><button>Gomatha Collection</button></div>
          <div><h4>Contact Us</h4><p><MapPin size={15}/> Tiruppur</p><p><Phone size={15}/> +91 90929 20211</p><p><Phone size={15}/> +91 80988 22121</p><p><Mail size={15}/> nivraa.world.of.art@gmail.com</p></div>
          <div><h4>Follow Us</h4><div className="footer-social"><button onClick={() => window.open('https://instagram.com/nivraa_world_of_art','_blank')}><span aria-hidden="true">◎</span></button><button onClick={() => window.open('https://www.facebook.com/p/Nivraa-Tirupur-61574586036702/','_blank')}>f</button></div><button className="whatsapp-footer" onClick={() => whatsapp()}><MessageCircle/> WhatsApp Us</button></div>
        </div>
        <div className="container copyright"><span>© 2025 Nivraa World Of Art. All rights reserved.</span><span>Privacy Policy &nbsp; | &nbsp; Terms & Conditions</span></div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
