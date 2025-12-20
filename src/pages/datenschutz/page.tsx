import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import CookieBanner from '../../components/feature/CookieBanner';

export default function Datenschutz() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--page-bg)', color: 'var(--page-fg)' }}
    >
      <Header />
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20 md:pt-36 md:pb-28">
        <div
          className="rounded-[28px] md:rounded-[32px] backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.14)] p-6 sm:p-8 lg:p-10"
          style={{ background: 'var(--section-glass)' }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Datenschutzerklärung
          </h1>

          <div
            className="prose prose-lg max-w-none"
            style={{ color: 'var(--page-fg)' }}
          >
            <h2 className="text-2xl font-semibold mb-4 mt-8">
              1. Datenschutz auf einen Blick
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Allgemeine Hinweise
            </h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was
              mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
              besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
              persönlich identifiziert werden können. Ausführliche Informationen
              zum Thema Datenschutz entnehmen Sie dieser Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Datenerfassung auf dieser Website
            </h3>
            <p className="mb-4">
              <strong>
                Wer ist verantwortlich für die Datenerfassung auf dieser
                Website?
              </strong>
              <br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
              „Hinweis zur verantwortlichen Stelle“ in dieser
              Datenschutzerklärung entnehmen.
            </p>
            <p className="mb-4">
              <strong>Wie erfassen wir Ihre Daten?</strong>
              <br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in
              ein Kontaktformular eingeben.
            </p>
            <p className="mb-4">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim
              Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
              allem technische Daten (z. B. Internetbrowser, Betriebssystem oder
              Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
              automatisch, sobald Sie diese Website betreten.
            </p>
            <p className="mb-4">
              <strong>Wofür nutzen wir Ihre Daten?</strong>
              <br />
              Ein Teil der Daten wird erhoben, um eine fehlerfreie
              Bereitstellung der Website zu gewährleisten. Andere Daten können
              zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
            <p className="mb-4">
              <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
              <br />
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über
              Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen
              Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
              oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung
              zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung
              jederzeit für die Zukunft widerrufen. Außerdem haben Sie das
              Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung
              Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen
              ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
            <p className="mb-4">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie
              sich jederzeit an uns wenden.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">2. Hosting</h2>
            <p className="mb-4">
              Unsere Website wird bei einem externen Dienstleister gehostet. Die
              personenbezogenen Daten, die auf dieser Website erfasst werden,
              werden auf den Servern dieses Dienstleisters gespeichert. Hierbei
              kann es sich insbesondere um IP-Adressen, Kontaktanfragen, Meta-
              und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen,
              Websitezugriffe und sonstige Daten, die über eine Website generiert
              werden, handeln.
            </p>
            <p className="mb-4">
              Das Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber
              unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b
              DSGVO) und im Interesse einer sicheren, schnellen und effizienten
              Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f
              DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde,
              erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6
              Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung
              die Speicherung von Cookies oder den Zugriff auf Informationen im
              Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des
              TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              3. Allgemeine Hinweise und Pflichtinformationen
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">Datenschutz</h3>
            <p className="mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="mb-4">
              Wenn Sie diese Website benutzen, werden verschiedene
              personenbezogene Daten erhoben. Personenbezogene Daten sind Daten,
              mit denen Sie persönlich identifiziert werden können. Die
              vorliegende Datenschutzerklärung erläutert, welche Daten wir
              erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu
              welchem Zweck das geschieht.
            </p>
            <p className="mb-4">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B.
              bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann.
              Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
              nicht möglich.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Hinweis zur verantwortlichen Stelle
            </h3>
            <p className="mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </p>
            <p className="mb-4">
              <strong>Slicker</strong>
              <br />
              Verantwortliche Stelle im Sinne der DSGVO.
              <br />
              Kontaktdaten: siehe Impressum dieser Website.
            </p>
            <p className="mb-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person,
              die allein oder gemeinsam mit anderen über die Zwecke und Mittel
              der Verarbeitung von personenbezogenen Daten (z. B. Namen,
              E-Mail-Adressen o. Ä.) entscheidet.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Speicherdauer
            </h3>
            <p className="mb-4">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere
              Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
              Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
              Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine
              Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
              gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für
              die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer-
              oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten
              Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Allgemeine Hinweise zu den Rechtsgrundlagen der
              Datenverarbeitung auf dieser Website
            </h3>
            <p className="mb-4">
              Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten
              wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1
              lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere
              Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im
              Falle einer ausdrücklichen Einwilligung in die Übertragung
              personenbezogener Daten in Drittstaaten erfolgt die
              Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a
              DSGVO. Sofern Sie in die Speicherung von Cookies oder in den
              Zugriff auf Informationen in Ihr Endgerät (z. B. via
              Device-Fingerprinting) eingewilligt haben, erfolgt die
              Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG.
              Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
              Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen
              erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6
              Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten,
              sofern diese zur Erfüllung einer rechtlichen Verpflichtung
              erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die
              Datenverarbeitung kann ferner auf Grundlage unseres berechtigten
              Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die
              jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den
              folgenden Absätzen dieser Datenschutzerklärung informiert.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Empfänger von personenbezogenen Daten
            </h3>
            <p className="mb-4">
              Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen
              externen Stellen zusammen. Dabei ist teilweise auch eine
              Übermittlung von personenbezogenen Daten an diese externen Stellen
              erforderlich. Wir geben personenbezogene Daten nur dann an externe
              Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung
              erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z.
              B. Weitergabe von Daten an Steuerbehörden), wenn wir ein
              berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der
              Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die
              Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern
              geben wir personenbezogene Daten unserer Kunden nur auf Grundlage
              eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle
              einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame
              Verarbeitung geschlossen.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Widerruf Ihrer Einwilligung zur Datenverarbeitung
            </h3>
            <p className="mb-4">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
              Einwilligung möglich. Sie können eine bereits erteilte Einwilligung
              jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
              erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen
              sowie gegen Direktwerbung (Art. 21 DSGVO)
            </h3>
            <p className="mb-4 font-semibold">
              WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E
              ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN,
              DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE
              VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN;
              DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING.
              DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT,
              ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH
              EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT
              MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE
              GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE
              UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER
              GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN
              (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
            </p>
            <p className="mb-4 font-semibold">
              WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU
              BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE
              VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
              DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING,
              SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
              WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND
              NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH
              ART. 21 ABS. 2 DSGVO).
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Beschwerderecht bei der zuständigen Aufsichtsbehörde
            </h3>
            <p className="mb-4">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
              Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem
              Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
              oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht
              besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
              gerichtlicher Rechtsbehelfe.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Recht auf Datenübertragbarkeit
            </h3>
            <p className="mb-4">
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
              Einwilligung oder in Erfüllung eines Vertrags automatisiert
              verarbeiten, an sich oder an einen Dritten in einem gängigen,
              maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die
              direkte Übertragung der Daten an einen anderen Verantwortlichen
              verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Auskunft, Berichtigung und Löschung
            </h3>
            <p className="mb-4">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
              jederzeit das Recht auf unentgeltliche Auskunft über Ihre
              gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger
              und den Zweck der Datenverarbeitung und ggf. ein Recht auf
              Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren
              Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an
              uns wenden.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Recht auf Einschränkung der Verarbeitung
            </h3>
            <p className="mb-4">
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen. Hierzu können Sie sich
              jederzeit an uns wenden. Das Recht auf Einschränkung der
              Verarbeitung besteht in folgenden Fällen:
            </p>
            <ul className="mb-4 list-disc pl-6">
              <li className="mb-2">
                Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
                personenbezogenen Daten bestreiten, benötigen wir in der Regel
                Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie
                das Recht, die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen.
              </li>
              <li className="mb-2">
                Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig
                geschah/geschieht, können Sie statt der Löschung die
                Einschränkung der Datenverarbeitung verlangen.
              </li>
              <li className="mb-2">
                Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie
                sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von
                Rechtsansprüchen benötigen, haben Sie das Recht, statt der
                Löschung die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen.
              </li>
              <li>
                Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt
                haben, muss eine Abwägung zwischen Ihren und unseren Interessen
                vorgenommen werden. Solange noch nicht feststeht, wessen
                Interessen überwiegen, haben Sie das Recht, die Einschränkung der
                Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
            </ul>
            <p className="mb-4">
              Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt
              haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur
              mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder
              Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer
              anderen natürlichen oder juristischen Person oder aus Gründen eines
              wichtigen öffentlichen Interesses der Europäischen Union oder eines
              Mitgliedstaats verarbeitet werden.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              4. Datenerfassung auf dieser Website
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Server-Log-Dateien
            </h3>
            <p className="mb-4">
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in so genannten Server-Log-Dateien, die Ihr Browser
              automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="mb-4 list-disc pl-6">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="mb-4">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
              nicht vorgenommen.
            </p>
            <p className="mb-4">
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
              lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse
              an der technisch fehlerfreien Darstellung und der Optimierung
              seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Cookies & Consent-Management
            </h3>
            <p className="mb-4">
              Diese Website verwendet ein Cookie- und Consent-Management-Tool
              (Cookie-Banner), mit dem Sie beim ersten Aufruf der Seite und
              jederzeit über die „Cookie-Einstellungen“ im Footer festlegen
              können, welche Kategorien von Cookies bzw. Diensten eingesetzt
              werden dürfen. Wir unterscheiden im Wesentlichen zwischen:
            </p>
            <ul className="mb-4 list-disc pl-6">
              <li className="mb-2">
                <strong>Technisch notwendige Cookies & Funktionen:</strong>{' '}
                z. B. ein Cookie, das Ihre Auswahl im Banner speichert, sowie
                technisch erforderliche Funktionen für Navigation, Icons und
                Benutzeroberfläche. Ohne diese ist ein stabiler Betrieb der
                Website nicht möglich.
              </li>
              <li>
                <strong>Analyse- und Marketing-Cookies:</strong> z. B. Google
                Analytics oder Google Ads Conversion-Tracking, die nur nach
                ausdrücklicher Einwilligung gesetzt werden.
              </li>
            </ul>
            <p className="mb-4">
              Details zu den konkret eingesetzten Cookies, Speicherdauern und
              Widerrufsmöglichkeiten finden Sie in den Cookie-Einstellungen und
              auf der separaten Cookie-Seite dieser Website.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Kontaktformular</h3>
            <p className="mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den
              Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
              nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mb-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
              Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f
              DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO),
              sofern diese abgefragt wurde; die Einwilligung ist jederzeit
              widerrufbar.
            </p>
            <p className="mb-4">
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei
              uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur
              Speicherung widerrufen oder der Zweck für die Datenspeicherung
              entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage).
              Zwingende gesetzliche Bestimmungen – insbesondere
              Aufbewahrungsfristen – bleiben unberührt.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Anfrage per E-Mail, Telefon oder Telefax
            </h3>
            <p className="mb-4">
              Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird
              Ihre Anfrage inklusive aller daraus hervorgehenden
              personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung
              Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten
              geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mb-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
              Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f
              DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
              sofern diese abgefragt wurde; die Einwilligung ist jederzeit
              widerrufbar.
            </p>
            <p className="mb-4">
              Die von Ihnen an uns per Kontaktanfragen übersandten Daten
              verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre
              Einwilligung zur Speicherung widerrufen oder der Zweck für die
              Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
              Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere
              gesetzliche Aufbewahrungsfristen – bleiben unberührt.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Kommunikation via WhatsApp
            </h3>
            <p className="mb-4">
              Für die Kommunikation mit unseren Kunden und sonstigen Dritten
              nutzen wir unter anderem den Instant-Messaging-Dienst WhatsApp.
              Anbieter ist die WhatsApp Ireland Limited, 4 Grand Canal Square,
              Grand Canal Harbour, Dublin 2, Irland.
            </p>
            <p className="mb-4">
              Die Kommunikation erfolgt über eine Ende-zu-Ende-Verschlüsselung
              (Peer-to-Peer), die verhindert, dass WhatsApp oder sonstige Dritte
              Zugriff auf die Kommunikationsinhalte erlangen können. WhatsApp
              erhält jedoch Zugriff auf Metadaten, die im Zuge des
              Kommunikationsvorgangs entstehen (z. B. Absender, Empfänger und
              Zeitpunkt). Wir weisen ferner darauf hin, dass WhatsApp nach
              eigener Aussage personenbezogene Daten seiner Nutzer mit seiner in
              den USA ansässigen Konzernmutter Meta teilt. Weitere Details zur
              Datenverarbeitung finden Sie in der Datenschutzrichtlinie von
              WhatsApp unter{' '}
              <a
                href="https://www.whatsapp.com/legal/#privacy-policy"
                target="_blank"
                rel="noreferrer"
              >
                https://www.whatsapp.com/legal/#privacy-policy
              </a>
              .
            </p>
            <p className="mb-4">
              Der Einsatz von WhatsApp erfolgt auf Grundlage unseres
              berechtigten Interesses an einer möglichst schnellen und effektiven
              Kommunikation mit Kunden, Interessenten und sonstigen Geschäfts-
              und Vertragspartnern (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine
              entsprechende Einwilligung abgefragt wurde, erfolgt die
              Datenverarbeitung ausschließlich auf Grundlage der Einwilligung;
              diese ist jederzeit mit Wirkung für die Zukunft widerrufbar.
            </p>
            <p className="mb-4">
              Die zwischen Ihnen und uns auf WhatsApp ausgetauschten
              Kommunikationsinhalte verbleiben bei uns, bis Sie uns zur Löschung
              auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der
              Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener
              Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen –
              insbesondere Aufbewahrungsfristen – bleiben unberührt.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              5. Analyse-Tools und Werbung
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Google Tag Manager
            </h3>
            <p className="mb-4">
              Wir setzen den Google Tag Manager ein. Anbieter ist die Google
              Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p className="mb-4">
              Der Google Tag Manager ist ein Tool, mit dessen Hilfe wir
              Tracking- oder Statistik-Tools und andere Technologien auf unserer
              Website einbinden können. Der Google Tag Manager selbst erstellt
              keine Nutzerprofile, speichert keine Cookies und nimmt keine
              eigenständigen Analysen vor. Er dient lediglich der Verwaltung und
              Ausspielung der über ihn eingebundenen Tools. Der Google Tag
              Manager erfasst jedoch Ihre IP-Adresse, die auch an das
              Mutterunternehmen von Google in die Vereinigten Staaten übertragen
              werden kann.
            </p>
            <p className="mb-4">
              Der Einsatz des Google Tag Managers erfolgt auf Grundlage von Art.
              6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes
              Interesse an einer schnellen und unkomplizierten Einbindung und
              Verwaltung verschiedener Tools auf seiner Website. Sofern eine
              entsprechende Einwilligung abgefragt wurde, erfolgt die
              Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a
              DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die
              Speicherung von Cookies oder den Zugriff auf Informationen im
              Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des
              TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Google Analytics
            </h3>
            <p className="mb-4">
              Diese Website nutzt Funktionen des Webanalysedienstes Google
              Analytics. Anbieter ist die Google Ireland Limited, Gordon House,
              Barrow Street, Dublin 4, Irland.
            </p>
            <p className="mb-4">
              Google Analytics ermöglicht es uns, das Verhalten der Besucher
              unserer Website auszuwerten. Hierbei erhalten wir u. a. Auskünfte
              über Seitenaufrufe, Verweildauer, verwendete Endgeräte und
              Herkunft der Nutzer. Diese Daten werden in der Regel einem
              pseudonymen Nutzerprofil zugeordnet und nicht mit Ihrem Klarnamen
              zusammengeführt.
            </p>
            <p className="mb-4">
              Google Analytics verwendet Technologien wie Cookies oder
              vergleichbare Wiedererkennungstechnologien, um Nutzerverhalten zu
              analysieren. Die durch Google erfassten Informationen über die
              Nutzung dieser Website werden in der Regel an einen Server von
              Google in den USA übertragen und dort gespeichert.
            </p>
            <p className="mb-4">
              Die Nutzung dieses Dienstes erfolgt ausschließlich auf Grundlage
              Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1
              TDDDG, soweit die Einwilligung die Speicherung von Cookies oder
              den Zugriff auf Informationen im Endgerät des Nutzers umfasst. Die
              Einwilligung ist jederzeit widerrufbar über das Cookie-Banner bzw.
              die Cookie-Einstellungen.
            </p>
            <p className="mb-4">
              Die Datenübertragung in die USA wird auf die
              Standardvertragsklauseln der EU-Kommission gestützt. Weitere
              Informationen zu Google Analytics und den Datenschutzbestimmungen
              von Google finden Sie unter{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                https://policies.google.com/privacy
              </a>{' '}
              und unter{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noreferrer"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Google Ads (Conversion-Tracking)
            </h3>
            <p className="mb-4">
              Der Websitebetreiber verwendet Google Ads. Google Ads ist ein
              Online-Werbeprogramm der Google Ireland Limited („Google“), Gordon
              House, Barrow Street, Dublin 4, Irland.
            </p>
            <p className="mb-4">
              Google Ads ermöglicht es uns, Werbeanzeigen in der
              Google-Suchmaschine oder auf Drittwebseiten auszuspielen, wenn der
              Nutzer bestimmte Suchbegriffe bei Google eingibt
              (Keyword-Targeting). Ferner können zielgerichtete Werbeanzeigen
              anhand der bei Google vorhandenen Nutzerdaten (z. B. Standortdaten
              und Interessen) ausgespielt werden (Zielgruppen-Targeting). Wir
              als Websitebetreiber können diese Daten quantitativ auswerten,
              indem wir beispielsweise analysieren, welche Suchbegriffe zur
              Ausspielung unserer Werbeanzeigen geführt haben und wie viele
              Anzeigen zu entsprechenden Klicks geführt haben. Darüber hinaus
              setzen wir das Google-Ads-Conversion-Tracking ein, um zu messen,
              ob Nutzer nach einem Klick auf eine Anzeige bestimmte Aktionen auf
              unserer Website ausführen (z. B. Absenden des Kontaktformulars).
            </p>
            <p className="mb-4">
              Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer
              Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1
              TDDDG. Die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="mb-4">
              Die Datenübertragung in die USA wird auf die
              Standardvertragsklauseln der EU-Kommission gestützt. Details
              finden Sie hier:{' '}
              <a
                href="https://policies.google.com/privacy/frameworks"
                target="_blank"
                rel="noreferrer"
              >
                https://policies.google.com/privacy/frameworks
              </a>{' '}
              und{' '}
              <a
                href="https://business.safety.google/controllerterms/"
                target="_blank"
                rel="noreferrer"
              >
                https://business.safety.google/controllerterms/
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              6. Plugins, Schriftarten & Icon-Fonts
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Systemschriften
            </h3>
            <p className="mb-4">
              Auf dieser Website werden vorwiegend Systemschriften (z. B.
              „system-ui“, „-apple-system“, „Segoe UI“ oder vergleichbare
              Standardschriften des Betriebssystems) eingesetzt. Diese werden
              lokal über Ihr Endgerät bereitgestellt. Eine Verbindung zu
              externen Schrift-Servern findet hierfür nicht statt.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Icon-Fonts und UI-Icons
            </h3>
            <p className="mb-4">
              Für Navigationselemente, Buttons und grafische Hinweise setzen wir
              Icon-Fonts bzw. Icon-Bibliotheken (z. B. Font Awesome, Remix Icon
              oder vergleichbare Lösungen) ein. Diese Icons sind für die
              verständliche Darstellung der Benutzeroberfläche erforderlich
              (z. B. Menü-, Kontakt- oder Social-Media-Symbole).
            </p>
            <p className="mb-4">
              Je nach Konfiguration werden die entsprechenden Icon-Dateien lokal
              oder über Content-Delivery-Netzwerke (CDNs) geladen. Dabei ist
              technisch bedingt die Verarbeitung Ihrer IP-Adresse und weiterer
              Verbindungsdaten erforderlich, damit die Inhalte an Ihren Browser
              ausgeliefert werden können. Eine weitergehende Auswertung dieser
              Daten durch uns findet nicht statt; insbesondere setzen wir in
              diesem Zusammenhang keine zusätzlichen Tracking-Cookies zu
              Werbe- oder Analysezwecken.
            </p>
            <p className="mb-4">
              Die Nutzung der Icons erfolgt auf Grundlage von Art. 6 Abs. 1
              lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer
              einheitlichen und funktionalen Darstellung der Website, damit
              Navigation und zentrale Funktionen (z. B. Kontakt, Social-Links,
              Burger-Menü) überhaupt sinnvoll nutzbar sind. Die Icons werden
              daher als technisch erforderlicher Bestandteil der Website
              eingesetzt und können – je nach Konfiguration – auch dann geladen
              werden, wenn Sie im Cookie-Banner nur „technisch notwendige“
              Funktionen zulassen.
            </p>
            <p className="mb-4">
              Details zu den konkret eingesetzten Diensten und etwaigen
              Drittanbietern entnehmen Sie bitte den Cookie-Einstellungen
              sowie der Cookie-Seite dieser Website.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              7. Keine Abmahnung ohne vorherigen Kontakt
            </h2>
            <p className="mb-4">
              Sollte der Inhalt oder die Gestaltung dieser Website Rechte Dritter
              oder gesetzliche Bestimmungen verletzen, bitten wir um eine
              entsprechende Nachricht ohne Kostennote. Wir sichern zu, die zu
              Recht beanstandeten Passagen unverzüglich zu prüfen und ggf. zu
              entfernen bzw. anzupassen, ohne dass die Einschaltung eines
              Rechtsbeistands von Ihrer Seite erforderlich ist.
            </p>
            <p className="mb-4">
              Kosten, die ohne vorherige Kontaktaufnahme mit uns ausgelöst
              werden, werden im Sinne der Schadensminderungspflicht als
              unbegründet zurückgewiesen. Wir behalten uns vor, gegebenenfalls
              Gegenmaßnahmen zu ergreifen, falls dennoch eine kostenpflichtige
              Abmahnung ohne vorherige Kontaktaufnahme erfolgt.
            </p>

            <div
              className="mt-12 pt-8 border-t-2"
              style={{ borderColor: 'rgba(148, 163, 184, 0.45)' }}
            >
              <p className="text-sm opacity-70">Stand: Dezember 2025</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
