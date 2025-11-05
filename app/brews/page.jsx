export default function BrewsPage() {
  return (
    <main className="page-brews">
      {/* Photo hero */}
      <section className="hero" style={{ minHeight: "40vh" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h1>Brew Guides</h1>
          <p>Dial in great flavor at home — from pour-over to espresso.</p>
        </div>
      </section>

      {/* Recipe cards */}
      <section className="band">
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="cards">
            {/* V60 / Pour-over */}
            <article className="card recipe">
              <h3>V60 Pour-over</h3>

              <p className="kv"><strong>Ratio:</strong> 1:16 (20g coffee : 320g water)</p>
              <p className="kv"><strong>Grind:</strong> Medium-fine (table salt)</p>
              <p className="kv"><strong>Time:</strong> ~3:00</p>

              <ol className="steps">
                <li>Rinse filter and preheat funnel. Add grounds and bloom with 40g water (~45s).</li>
                <li>Pour in just-off-boiling water in slow circles to 200g, then to 320g by 2:00.</li>
                <li>Swirl gently, let drawdown finish around 3:00.</li>
              </ol>
            </article>

            {/* French Press */}
            <article className="card recipe">
              <h3>French Press</h3>

              <p className="kv"><strong>Ratio:</strong> 1:15 (30g : 450g)</p>
              <p className="kv"><strong>Grind:</strong> Coarse</p>
              <p className="kv"><strong>Time:</strong> 4:00</p>

              <ol className="steps">
                <li>Add coffee and hot water, stir, and place lid on top.</li>
                <li>At 4:00, break crust, skim foam, and press plunger down slowly.</li>
                <li>Serve immediately.</li>
              </ol>
            </article>

            {/* Espresso (baseline) */}
            <article className="card recipe">
              <h3>Espresso (baseline)</h3>

              <p className="kv"><strong>Ratio:</strong> 1:2 (18g in → 36g out)</p>
              <p className="kv"><strong>Grind:</strong> Fine</p>
              <p className="kv"><strong>Time:</strong> 27–32s</p>

              <ol className="steps">
                <li>Grind fine, distribute, tamp level.</li>
                <li>Pull shot; adjust grind for time window. Too fast? Finer. Too slow? Coarser.</li>
                <li>Tastes sour? Lower dose slightly. Too bitter? Increase dose slightly.</li>
              </ol>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
