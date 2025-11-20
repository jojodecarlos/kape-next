
import "./globals.css";
import AuthListener from "@/components/AuthListener";

export const metadata = {
  title: "Kapé — Specialty Coffee",
  description: "Specialty coffee from the Philippines, roasted in Orlando, FL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts (same as your static site) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>

        <header>
          <nav className="nav container" aria-label="Main">
            <div className="nav-left">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/brews">Brew Guides</a>
            </div>
            <a className="brand" href="/" aria-label="Kapé brand">Kapé</a>
            <div className="nav-right">
              <a href="/register">Register</a>
            </div>
          </nav>
        </header>

        {/* Auth state sync (keeps session across pages/refresh) */}
        <AuthListener />

        {/* Page content */}
        {children}


        <footer>
          <div className="container foot-grid">
            <div>
              <h3 className="bigbrand">Kapé</h3>
            </div>
            <div className="foot-cols">
              <div className="foot">
                <h4>Location</h4>
                <p className="address">1234 Orange Ave<br />Orlando, FL 32801</p>
              </div>
              <div className="foot">
                <p>
                  <a href="/">Home</a><br />
                  <a href="/about">About</a><br />
                  <a href="/brews">Brew guide</a><br />
                  <a href="/signin">Sign in</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
