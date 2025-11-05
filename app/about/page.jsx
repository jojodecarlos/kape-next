export default function AboutPage() {
  return (
    <main className="page-about">
      {/* Keep the photo hero for continuity, but no overlay heading */}
      <section className="hero" style={{ minHeight: "22vh" }}>
        <div className="container" />
      </section>

      {/* Tan band with large title + centered copy */}
      <section className="band">
        <div className="container about-copy">
          <h1>Our Story</h1>

          <p>
            Kapé celebrates Philippine coffee; Grown in the high altitude regions of Cordillera,
            Mindanao, and from the provinces in the Visayas, roasted freshly in Orlando, FL. Our
            mission is to help our customers not only taste the amazing profiles and flavors of our
            coffee, but also taste the culture, the heritage, and the sense of Pamilya in every cup.
          </p>

          <p>
            We partner closely with farmers and cooperatives, sourcing bean lots that highlight
            regional characteristics while supporting sustainable practices. By roasting in small
            batches, we dial in sweetness, balance, and clarity so each origin can shine.
          </p>

          <p>
            Whether you’re new to specialty coffee or a seasoned home brewer, our goal is simple:
            make every cup welcoming, consistent, and delicious—something you’ll be proud to share
            with friends and family.
          </p>
        </div>
      </section>
    </main>
  );
}
