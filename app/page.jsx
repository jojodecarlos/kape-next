export default function HomePage() {
  return (
    <main>
      {/* === HERO === */}
      <section className="hero" id="home">
        <div className="container container--narrow">
          <h1>
            Specialty coffee sourced from the Philippines,<br /> roasted in Orlando, FL.
          </h1>
          <p>Learn more about us</p>
          <a className="btn" href="/about">Our Story</a>
        </div>
      </section>

      {/* === PRODUCT BAND === */}
      <section className="band" id="products">
        <div className="container band-grid">
          <div className="lead">
            <h2>Limited selection, <br />unlimited flavor.</h2>
            <p>
              We believe that drinks can be more than just drinks, but representations of culture, lineage and <em>pamilya</em> in a cup.
            </p>
          </div>

          {/* keep id=products-grid so we can data-drive later if desired */}
          <div id="products-grid" className="cards">
            <article className="card">
              <div className="bag" aria-hidden="true">
                <img src="/Images/kape%20bag-final.png" alt="" />
              </div>
              <h3>Bayani Blend</h3>
              <p className="notes">Milk Chocolate · Candied Walnuts · Biscoff Cookies</p>
              <ul className="specs">
                <li className="option on"><span className="dot" aria-hidden="true"></span> Benguet, Philippines</li>
                <li className="option on"><span className="dot" aria-hidden="true"></span> Medium Roast</li>
              </ul>
              <a className="btn cta" href="/register">Get Notified</a>
            </article>

            <article className="card">
              <div className="bag" aria-hidden="true">
                <img src="/Images/kape%20bag-final.png" alt="" />
              </div>
              <h3>Maganda Blend</h3>
              <p className="notes">Mangosteen · Lychee · Juicy &amp; Citrus Finish</p>
              <ul className="specs">
                <li className="option on"><span className="dot" aria-hidden="true"></span> Sagada, Philippines</li>
                <li className="option on"><span className="dot" aria-hidden="true"></span> Light Roast</li>
              </ul>
              <a className="btn cta" href="/register">Get Notified</a>
            </article>
          </div>
        </div>
      </section>

      {/* === CTA BAND === */}
      <section className="cta-band" id="our-story">
        <div className="container">
          <h2>Let us help you brew the Sarap way</h2>
          <p className="cta-actions"><a className="btn" href="/brews">Learn more</a></p>
        </div>
      </section>
    </main>
  );
}
