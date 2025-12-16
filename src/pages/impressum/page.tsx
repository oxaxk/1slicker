import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import CookieBanner from '../../components/feature/CookieBanner';

export default function Impressum() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)', color: 'var(--page-fg)' }}>
      <Header />
      <main className="max-w-4xl mx-auto px-6 pt-28 pb-16 md:pt-32">
        <div
          className="rounded-[28px] md:rounded-[32px] backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.14)] p-8 lg:p-12"
          style={{ background: 'var(--section-glass)' }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Impressum
          </h1>
          
          <div
            className="prose prose-lg max-w-none"
            style={{
              color: 'var(--page-fg)'
            }}
          >
            <h2
              className="text-2xl font-semibold mb-4"
            >
              Angaben gemäß § 5 TMG (Telemediengesetz)
            </h2>

            <div className="mb-8">
              <p className="mb-2">
                <strong>Slicker Agency</strong>
                <br />
                Inhaber: Onur Arda Küçük
                <br />
                Saalmannstraße 9
                <br />
                13403 Berlin
                <br />
                Deutschland
                <br />
                Telefon:{' '}
                <a href="tel:+4915511207431" className="text-[#0891b2] dark:text-[#22d3ee] hover:underline">
                  +49 155 11207431
                </a>
                <br />
                E-Mail:{' '}
                <a href="mailto:info@slicker.agency" className="text-[#0891b2] dark:text-[#22d3ee] hover:underline">
                  info@slicker.agency
                </a>
                <br />
                Website:{' '}
                <a href="https://slicker.agency" className="text-[#0891b2] dark:text-[#22d3ee] hover:underline">
                  https://slicker.agency
                </a>
              </p>
            </div>

            <h2
              className="text-2xl font-semibold mb-4 mt-8"
            >
              Inhaltlich verantwortlich gemäß § 18 Abs. 2 MStV
            </h2>
            <p className="mb-8">
              Inhaltlich verantwortlich gemäß § 18 Abs. 2 MStV:
              <br />
              Onur Arda Küçük (Anschrift wie oben)
            </p>

            <h2
              className="text-2xl font-semibold mb-4 mt-8"
            >
              Umsatzsteuer-ID gemäß § 27a UStG
            </h2>
            <p className="mb-8">
              Wird nach Zuteilung ergänzt.
              <br />
              (Derzeit keine Umsatzsteuer-Identifikationsnummer vorhanden – Kleinunternehmer gemäß § 19 UStG.)
            </p>

            <h2
              className="text-2xl font-semibold mb-4 mt-8"
            >
              Alternative Streitbeilegung
            </h2>
            <p className="mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0891b2] dark:text-[#22d3ee] hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>{' '}
              finden.
            </p>
            <p className="mb-8">
              Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2
              className="text-2xl font-semibold mb-4 mt-8"
            >
              Haftungsausschluss
            </h2>
            <p className="mb-4">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für externe Links. Für den Inhalt
              der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Haftung für Inhalte</h2>
            <p className="mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
              forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mb-4">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
              bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis
              einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden
              wir diese Inhalte umgehend entfernen.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Haftung für Links</h2>
            <p className="mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mb-4">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
              Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
              umgehend entfernen.
            </p>

            <h2
              className="text-2xl font-semibold mb-4 mt-8"
            >
              Urheberrecht
            </h2>
            <p className="mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mb-4">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
              beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
              von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>

            <h2
              className="text-2xl font-semibold mb-4 mt-8"
            >
              Datenschutz
            </h2>
            <p className="mb-4">
              Weitere Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten finden Sie in unserer{' '}
              <a href="/datenschutz" className="text-[#0891b2] dark:text-[#22d3ee] hover:underline">
                Datenschutzerklärung
              </a>
              .
            </p>

            <h2
              className="text-2xl font-semibold mb-4 mt-8"
            >
              Bildernachweise
            </h2>
            <p className="mb-4">
              Wir verwenden Grafiken, Bilder und Videos aus der Canva Pro-Bibliothek. Diese Inhalte sind durch die
              Lizenzen von Canva abgedeckt und dürfen im Rahmen unserer Onlinepräsenz genutzt werden.
            </p>

            <p className="mb-4">
              © 2025 Slicker Agency – Alle Rechte vorbehalten.
            </p>

            <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(15,23,42,0.14)' }}>
              <p className="text-sm opacity-70">Stand: 01.02.2025</p>
            </div>
          </div>
        </div>
      </main>
      <CookieBanner />
      <Footer />
    </div>
  );
}