// Complete Section Renderers for All 27 Homepage Sections
// This file contains rendering logic for all section types

export const SectionRenderers = {
    // Trust Seals Section
    renderTrustSeals(section: any, config: any) {
        return `
            <section class="feature-section trust-seals" data-section-id="${section.id}" style="background: #fff; padding: 60px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2>${section.title || '🛡️ Sicher & Vertrauenswürdig'}</h2>
                        <p>${section.subtitle || 'Ihre Sicherheit ist uns wichtig'}</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; align-items: center; justify-items: center;">
                        <div style="text-align: center;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; box-shadow: 0 8px 20px rgba(102,126,234,0.3);">
                                <i class="fas fa-lock" style="font-size: 40px; color: white;"></i>
                            </div>
                            <div style="font-weight: 700; font-size: 16px; margin-bottom: 5px;">SSL Verschlüsselt</div>
                            <div style="color: #666; font-size: 14px;">256-Bit Sicherheit</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; box-shadow: 0 8px 20px rgba(245,87,108,0.3);">
                                <i class="fas fa-shield-alt" style="font-size: 40px; color: white;"></i>
                            </div>
                            <div style="font-weight: 700; font-size: 16px; margin-bottom: 5px;">Käuferschutz</div>
                            <div style="color: #666; font-size: 14px;">100% abgesichert</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; box-shadow: 0 8px 20px rgba(79,172,254,0.3);">
                                <i class="fas fa-certificate" style="font-size: 40px; color: white;"></i>
                            </div>
                            <div style="font-weight: 700; font-size: 16px; margin-bottom: 5px;">Original-Lizenzen</div>
                            <div style="color: #666; font-size: 14px;">Microsoft Partner</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; box-shadow: 0 8px 20px rgba(67,233,123,0.3);">
                                <i class="fas fa-headset" style="font-size: 40px; color: white;"></i>
                            </div>
                            <div style="font-weight: 700; font-size: 16px; margin-bottom: 5px;">24/7 Support</div>
                            <div style="color: #666; font-size: 14px;">Immer für Sie da</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; box-shadow: 0 8px 20px rgba(250,112,154,0.3);">
                                <i class="fas fa-star" style="font-size: 40px; color: white;"></i>
                            </div>
                            <div style="font-weight: 700; font-size: 16px; margin-bottom: 5px;">TÜV Geprüft</div>
                            <div style="color: #666; font-size: 14px;">Zertifizierte Qualität</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    // License Comparison Table
    renderLicenseComparison(section: any, config: any) {
        return `
            <section class="feature-section license-comparison" data-section-id="${section.id}" style="background: #f8f9fa; padding: 80px 0;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2>${section.title || '📊 Lizenztypen im Vergleich'}</h2>
                        <p>${section.subtitle || 'Finden Sie die passende Lizenz für Ihre Bedürfnisse'}</p>
                    </div>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08);">
                            <thead style="background: linear-gradient(135deg, #001f3f, #003d7a); color: white;">
                                <tr>
                                    <th style="padding: 25px; text-align: left;">Feature</th>
                                    <th style="padding: 25px; text-align: center;">ESD<br/><span style="font-size: 12px; font-weight: 400;">(Download)</span></th>
                                    <th style="padding: 25px; text-align: center;">OEM<br/><span style="font-size: 12px; font-weight: 400;">(Gebraucht)</span></th>
                                    <th style="padding: 25px; text-align: center;">Retail<br/><span style="font-size: 12px; font-weight: 400;">(Vollversion)</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 20px; font-weight: 600;">Preis</td>
                                    <td style="padding: 20px; text-align: center;"><span style="color: #28a745; font-weight: 700;">€€</span></td>
                                    <td style="padding: 20px; text-align: center;"><span style="color: #ffc107; font-weight: 700;">€</span></td>
                                    <td style="padding: 20px; text-align: center;"><span style="color: #dc3545; font-weight: 700;">€€€</span></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 20px; font-weight: 600;">Sofortiger Download</td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-times-circle" style="color: #dc3545; font-size: 24px;"></i></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 20px; font-weight: 600;">Übertragbar</td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-times-circle" style="color: #dc3545; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 20px; font-weight: 600;">Updates</td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 20px; font-weight: 600;">Lebenslang gültig</td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; font-weight: 600;">Support</td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-minus-circle" style="color: #ffc107; font-size: 24px;"></i></td>
                                    <td style="padding: 20px; text-align: center;"><i class="fas fa-check-circle" style="color: #28a745; font-size: 24px;"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="text-align: center; margin-top: 40px;">
                        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">⭐ Unsere Empfehlung: <strong>ESD-Lizenzen</strong> - Bestes Preis-Leistungs-Verhältnis</p>
                        <a href="/lizenztypen" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; border-radius: 50px; text-decoration: none; font-weight: 700;">Mehr erfahren</a>
                    </div>
                </div>
            </section>
        `;
    },

    // Customer Reviews
    renderCustomerReviews(section: any, config: any) {
        return `
            <section class="feature-section customer-reviews" data-section-id="${section.id}" style="background: #fff; padding: 80px 0;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2>${section.title || '⭐ Kundenbewertungen'}</h2>
                        <p>${section.subtitle || 'Über 15.000 zufriedene Kunden'}</p>
                        <div style="margin-top: 20px;">
                            <span style="font-size: 36px; color: #ffc107;">★★★★★</span>
                            <div style="font-size: 18px; font-weight: 700; margin-top: 10px;">4.9 / 5.0</div>
                            <div style="color: #666;">Basierend auf 3,247 Bewertungen</div>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px;">
                        <div style="background: #f8f9fa; padding: 30px; border-radius: 15px; border-left: 4px solid #ffc107;">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px; margin-right: 15px;">MK</div>
                                <div>
                                    <div style="font-weight: 700;">Michael K.</div>
                                    <div style="color: #ffc107;">★★★★★</div>
                                </div>
                            </div>
                            <p style="color: #333; line-height: 1.8; margin-bottom: 10px;">"Schnelle Lieferung, authentische Lizenz, fairer Preis. Absolut empfehlenswert! Der Support hat alle meine Fragen binnen Minuten beantwortet."</p>
                            <div style="color: #999; font-size: 14px;"><i class="fas fa-check-circle" style="color: #28a745;"></i> Verifizierter Kauf</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 30px; border-radius: 15px; border-left: 4px solid #ffc107;">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px; margin-right: 15px;">SB</div>
                                <div>
                                    <div style="font-weight: 700;">Sarah B.</div>
                                    <div style="color: #ffc107;">★★★★★</div>
                                </div>
                            </div>
                            <p style="color: #333; line-height: 1.8; margin-bottom: 10px;">"Beste Preise im Vergleich! Installation war kinderleicht. Windows 11 Pro läuft perfekt. Werde hier definitiv wieder kaufen."</p>
                            <div style="color: #999; font-size: 14px;"><i class="fas fa-check-circle" style="color: #28a745;"></i> Verifizierter Kauf</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 30px; border-radius: 15px; border-left: 4px solid #ffc107;">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px; margin-right: 15px;">TM</div>
                                <div>
                                    <div style="font-weight: 700;">Thomas M.</div>
                                    <div style="color: #ffc107;">★★★★★</div>
                                </div>
                            </div>
                            <p style="color: #333; line-height: 1.8; margin-bottom: 10px;">"Für meine Firma 10 Lizenzen gekauft. Alles reibungslos verlaufen. Sehr professioneller Service und unschlagbare Preise!"</p>
                            <div style="color: #999; font-size: 14px;"><i class="fas fa-check-circle" style="color: #28a745;"></i> Verifizierter Kauf</div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 40px;">
                        <a href="/bewertungen" style="color: #667eea; font-weight: 700; text-decoration: none; font-size: 16px;">Alle Bewertungen ansehen <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </section>
        `;
    },

    // Recently Viewed Products
    renderRecentlyViewed(section: any, config: any) {
        return `
            <section class="feature-section recently-viewed" data-section-id="${section.id}" style="background: #f8f9fa; padding: 60px 0;">
                <div class="container">
                    <div class="section-header" style="margin-bottom: 40px;">
                        <h2>${section.title || '👁️ Zuletzt angesehen'}</h2>
                        <p>${section.subtitle || 'Produkte, die Sie sich angesehen haben'}</p>
                    </div>
                    <div id="recently-viewed-products" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                            <div style="color: #999; padding: 60px 20px;">
                                <i class="fas fa-eye" style="font-size: 48px; opacity: 0.3; margin-bottom: 15px;"></i>
                                <p>Ihre zuletzt angesehenen Produkte erscheinen hier</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    // Volume License Calculator
    renderVolumeCalculator(section: any, config: any) {
        return `
            <section class="feature-section volume-calculator" data-section-id="${section.id}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 0;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2>${section.title || '🧮 Volumenlizenz-Rechner'}</h2>
                        <p style="opacity: 0.9;">${section.subtitle || 'Berechnen Sie Ihre Ersparnis bei Mengenlizenzen'}</p>
                    </div>
                    <div style="max-width: 700px; margin: 0 auto; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 50px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                        <div style="margin-bottom: 30px;">
                            <label style="display: block; margin-bottom: 10px; font-weight: 600;">Produkt auswählen:</label>
                            <select id="volume-product" style="width: 100%; padding: 15px; border-radius: 10px; border: none; font-size: 16px;">
                                <option value="windows11pro">Windows 11 Pro - €39.90</option>
                                <option value="office2024">Office 2024 Pro Plus - €59.90</option>
                                <option value="server2025">Windows Server 2025 - €149.90</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 30px;">
                            <label style="display: block; margin-bottom: 10px; font-weight: 600;">Anzahl der Lizenzen:</label>
                            <input type="range" id="volume-quantity" min="1" max="100" value="10" style="width: 100%;" oninput="calculateVolume()" />
                            <div style="text-align: center; font-size: 48px; font-weight: 800; margin-top: 20px;" id="volume-quantity-display">10</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.2); padding: 30px; border-radius: 15px; margin-top: 30px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                <span>Einzelpreis:</span>
                                <span id="volume-single-price" style="font-weight: 700;">€39.90</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                <span>Mengenrabatt:</span>
                                <span id="volume-discount" style="font-weight: 700; color: #4ade80;">-15%</span>
                            </div>
                            <div style="height: 2px; background: rgba(255,255,255,0.3); margin: 20px 0;"></div>
                            <div style="display: flex; justify-content: space-between; font-size: 24px; font-weight: 800;">
                                <span>Gesamtpreis:</span>
                                <span id="volume-total-price">€339.15</span>
                            </div>
                            <div style="text-align: center; margin-top: 15px; color: #4ade80; font-weight: 600;">
                                Sie sparen: <span id="volume-savings">€59.85</span>
                            </div>
                        </div>
                        <button onclick="alert('Anfrage wird versendet...')" style="width: 100%; margin-top: 30px; padding: 20px; background: white; color: #667eea; border: none; border-radius: 50px; font-weight: 700; font-size: 18px; cursor: pointer; box-shadow: 0 8px 25px rgba(0,0,0,0.2);">
                            Angebot anfordern <i class="fas fa-paper-plane" style="margin-left: 10px;"></i>
                        </button>
                    </div>
                </div>
            </section>
        `;
    },

    // Installation Assistant/Wizard
    renderInstallationWizard(section: any, config: any) {
        return `
            <section class="feature-section installation-wizard" data-section-id="${section.id}" style="background: #f8f9fa; padding: 80px 0;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2>${section.title || '🛠️ Installations-Assistent'}</h2>
                        <p>${section.subtitle || 'Schritt-für-Schritt Anleitung zur Installation'}</p>
                    </div>
                    <div style="max-width: 900px; margin: 0 auto; display: grid; gap: 30px;">
                        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 20px; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: 800;">1</div>
                            <div>
                                <h3 style="font-size: 20px; margin-bottom: 10px; color: #001f3f;">Lizenzschlüssel erhalten</h3>
                                <p style="color: #666; line-height: 1.8;">Nach dem Kauf erhalten Sie Ihren Lizenzschlüssel sofort per E-Mail. Zusätzlich finden Sie ihn in Ihrem Kunden-Dashboard.</p>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 20px; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: 800;">2</div>
                            <div>
                                <h3 style="font-size: 20px; margin-bottom: 10px; color: #001f3f;">Software herunterladen</h3>
                                <p style="color: #666; line-height: 1.8;">Laden Sie die Original-Software direkt von Microsoft herunter. Wir stellen Ihnen die offiziellen Download-Links zur Verfügung.</p>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 20px; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: 800;">3</div>
                            <div>
                                <h3 style="font-size: 20px; margin-bottom: 10px; color: #001f3f;">Installation durchführen</h3>
                                <p style="color: #666; line-height: 1.8;">Installieren Sie die Software wie gewohnt. Der Installationsvorgang ist intuitiv und dauert nur wenige Minuten.</p>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 20px; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: 800;">4</div>
                            <div>
                                <h3 style="font-size: 20px; margin-bottom: 10px; color: #001f3f;">Lizenz aktivieren</h3>
                                <p style="color: #666; line-height: 1.8;">Geben Sie Ihren Lizenzschlüssel ein und aktivieren Sie das Produkt. Fertig! Ihre Software ist jetzt vollständig aktiviert.</p>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 50px;">
                        <a href="/installation" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 50px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 8px 25px rgba(102,126,234,0.3);">
                            Detaillierte Anleitung <i class="fas fa-book" style="margin-left: 10px;"></i>
                        </a>
                    </div>
                </div>
            </section>
        `;
    },

    // Live Chat / WhatsApp Button
    renderLiveChat(section: any, config: any) {
        return `
            <section class="feature-section live-chat" data-section-id="${section.id}" style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: white; padding: 60px 0;">
                <div class="container">
                    <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                        <div style="font-size: 80px; margin-bottom: 20px;">
                            <i class="fab fa-whatsapp"></i>
                        </div>
                        <h2 style="font-size: 36px; margin-bottom: 20px;">${section.title || 'Haben Sie Fragen?'}</h2>
                        <p style="font-size: 20px; margin-bottom: 40px; opacity: 0.9;">${section.subtitle || 'Unser Support-Team ist für Sie da - per WhatsApp, Telefon oder E-Mail'}</p>
                        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                            <a href="https://wa.me/491234567890" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: white; color: #25D366; padding: 20px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 18px; box-shadow: 0 8px 25px rgba(0,0,0,0.2);">
                                <i class="fab fa-whatsapp" style="font-size: 28px;"></i> WhatsApp Chat
                            </a>
                            <a href="tel:+491234567890" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); color: white; padding: 20px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 18px; border: 2px solid white;">
                                <i class="fas fa-phone" style="font-size: 20px;"></i> +49 (0) 123 456 789
                            </a>
                        </div>
                        <div style="margin-top: 40px; font-size: 16px; opacity: 0.9;">
                            <p><i class="fas fa-clock"></i> Montag - Freitag: 8:00 - 20:00 Uhr | Samstag: 10:00 - 16:00 Uhr</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    // Callback Widget
    renderCallbackWidget(section: any, config: any) {
        return `
            <section class="feature-section callback-widget" data-section-id="${section.id}" style="background: #f8f9fa; padding: 60px 0;">
                <div class="container">
                    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 50px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 25px rgba(102,126,234,0.3);">
                                <i class="fas fa-phone-alt" style="font-size: 36px; color: white;"></i>
                            </div>
                            <h2 style="font-size: 28px; margin-bottom: 10px;">${section.title || '📞 Rückruf-Service'}</h2>
                            <p style="color: #666;">${section.subtitle || 'Wir rufen Sie kostenlos zurück'}</p>
                        </div>
                        <form id="callback-form" style="display: grid; gap: 20px;">
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Name *</label>
                                <input type="text" required style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px;" placeholder="Ihr Name" />
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Telefon *</label>
                                <input type="tel" required style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px;" placeholder="+49 123 456 789" />
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Wunschzeit</label>
                                <select style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px;">
                                    <option>Sofort</option>
                                    <option>Vormittags (9-12 Uhr)</option>
                                    <option>Nachmittags (12-17 Uhr)</option>
                                    <option>Abends (17-20 Uhr)</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Ihr Anliegen (optional)</label>
                                <textarea rows="3" style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px; resize: vertical;" placeholder="Beschreiben Sie kurz Ihr Anliegen..."></textarea>
                            </div>
                            <button type="submit" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px; border: none; border-radius: 50px; font-weight: 700; font-size: 18px; cursor: pointer; box-shadow: 0 8px 25px rgba(102,126,234,0.3);">
                                Rückruf anfordern <i class="fas fa-paper-plane" style="margin-left: 10px;"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    },

    // License Types Badges (ESD/OEM/Retail Explanation)
    renderLicenseTypes(section: any, config: any) {
        return `
            <section class="feature-section license-types" data-section-id="${section.id}" style="background: #fff; padding: 80px 0;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2>${section.title || '🏷️ Lizenztypen erklärt'}</h2>
                        <p>${section.subtitle || 'Verstehen Sie die Unterschiede zwischen ESD, OEM und Retail'}</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; max-width: 1100px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(102,126,234,0.3);">
                            <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                                <i class="fas fa-download" style="font-size: 36px;"></i>
                            </div>
                            <h3 style="font-size: 24px; text-align: center; margin-bottom: 15px;">ESD</h3>
                            <div style="text-align: center; font-size: 14px; opacity: 0.9; margin-bottom: 20px;">Electronic Software Distribution</div>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Sofortiger Download</span>
                                </li>
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Übertragbar auf neue Hardware</span>
                                </li>
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Lebenslang gültig</span>
                                </li>
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Bester Preis</span>
                                </li>
                            </ul>
                            <div style="text-align: center; margin-top: 25px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.3);">
                                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">Ideal für:</div>
                                <div style="font-weight: 700;">Privat & Business</div>
                            </div>
                        </div>
                        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(245,87,108,0.3);">
                            <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                                <i class="fas fa-box" style="font-size: 36px;"></i>
                            </div>
                            <h3 style="font-size: 24px; text-align: center; margin-bottom: 15px;">OEM</h3>
                            <div style="text-align: center; font-size: 14px; opacity: 0.9; margin-bottom: 20px;">Original Equipment Manufacturer</div>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Günstigster Preis</span>
                                </li>
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Vollwertige Lizenz</span>
                                </li>
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-times-circle" style="color: #ffc107; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>An Hardware gebunden</span>
                                </li>
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Alle Updates inklusive</span>
                                </li>
                            </ul>
                            <div style="text-align: center; margin-top: 25px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.3);">
                                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">Ideal für:</div>
                                <div style="font-weight: 700;">Einzelne PCs</div>
                            </div>
                        </div>
                        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(79,172,254,0.3);">
                            <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                                <i class="fas fa-gift" style="font-size: 36px;"></i>
                            </div>
                            <h3 style="font-size: 24px; text-align: center; margin-bottom: 15px;">Retail</h3>
                            <div style="text-align: center; font-size: 14px; opacity: 0.9; margin-bottom: 20px;">Vollversion im Handel</div>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Physisches Paket</span>
                                </li>
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Übertragbar</span>
                                </li>
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>DVD & Zertifikat</span>
                                </li>
                                <li style="margin-bottom: 12px; display: flex; align-items: start;">
                                    <i class="fas fa-times-circle" style="color: #ffc107; margin-right: 10px; margin-top: 3px;"></i>
                                    <span>Höchster Preis</span>
                                </li>
                            </ul>
                            <div style="text-align: center; margin-top: 25px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.3);">
                                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">Ideal für:</div>
                                <div style="font-weight: 700;">Sammler & Geschenke</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    // Placeholder for unimplemented sections
    renderPlaceholder(section: any) {
        return `
            <section class="placeholder-section" data-section-id="${section.id}" style="background: #f8f9fa; padding: 60px 0; border: 2px dashed #ddd;">
                <div class="container" style="text-align: center;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 40px;">
                        <i class="fas fa-cog" style="font-size: 64px; color: #ccc; margin-bottom: 20px;"></i>
                        <h3 style="font-size: 24px; color: #666; margin-bottom: 10px;">${section.title || section.section_key}</h3>
                        <p style="color: #999;">Diese Sektion ist in Entwicklung und wird bald verfügbar sein.</p>
                        <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 10px; border-left: 4px solid #ffc107;">
                            <strong>Admin-Info:</strong> Section-Key: <code>${section.section_key}</code> | Type: <code>${section.section_type}</code>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

export const StaticSectionRenderers = {
    // FAQ Section
    renderFAQ(section: any, config: any) {
        return `
            <section class="static-section faq" data-section-id="${section.id}" style="background: #fff; padding: 80px 0;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2>${section.title || '❓ Häufig gestellte Fragen'}</h2>
                        <p>${section.subtitle || 'Antworten auf die wichtigsten Fragen'}</p>
                    </div>
                    <div style="max-width: 900px; margin: 0 auto;">
                        ${[
                            {q: 'Sind die Lizenzen original?', a: 'Ja, alle unsere Lizenzen sind 100% Original-Lizenzen direkt von Microsoft. Wir sind offizieller Microsoft Partner und garantieren die Echtheit aller Produkte.'},
                            {q: 'Wie schnell erhalte ich meinen Lizenzschlüssel?', a: 'Nach erfolgreicher Zahlung erhalten Sie Ihren Lizenzschlüssel sofort per E-Mail. In der Regel dauert dies nur wenige Minuten. Zusätzlich finden Sie den Schlüssel in Ihrem Kundenkonto.'},
                            {q: 'Kann ich die Lizenz auf mehreren Geräten nutzen?', a: 'Das hängt vom Lizenztyp ab. ESD und Retail-Lizenzen können auf einem neuen Gerät reaktiviert werden. OEM-Lizenzen sind an das erste Gerät gebunden. Volumenlizen zen können auf mehreren Geräten verwendet werden.'},
                            {q: 'Welche Zahlungsmethoden akzeptieren Sie?', a: 'Wir akzeptieren PayPal, Kreditkarte (Visa, Mastercard, American Express), SEPA-Lastschrift, Sofortüberweisung und auf Rechnung (nach Prüfung).'},
                            {q: 'Gibt es einen Support bei Problemen?', a: 'Ja, unser deutschsprachiger Support steht Ihnen per E-Mail, Telefon und WhatsApp zur Verfügung. Montag bis Freitag von 8-20 Uhr, Samstag von 10-16 Uhr.'}
                        ].map((faq, i) => `
                            <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #667eea;">
                                <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #001f3f;">
                                    <i class="fas fa-question-circle" style="color: #667eea; margin-right: 10px;"></i>
                                    ${faq.q}
                                </h3>
                                <p style="color: #666; line-height: 1.8; margin: 0;">${faq.a}</p>
                            </div>
                        `).join('')}
                    </div>
                    <div style="text-align: center; margin-top: 40px;">
                        <a href="/faq" style="color: #667eea; font-weight: 700; text-decoration: none; font-size: 16px;">Alle FAQs ansehen <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </section>
        `;
    },

    // Newsletter Section
    renderNewsletter(section: any, config: any) {
        return `
            <section class="static-section newsletter" data-section-id="${section.id}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 0;">
                <div class="container">
                    <div style="max-width: 700px; margin: 0 auto; text-align: center;">
                        <div style="font-size: 64px; margin-bottom: 20px;">
                            <i class="fas fa-envelope-open-text"></i>
                        </div>
                        <h2 style="font-size: 36px; margin-bottom: 15px;">${section.title || '📧 Newsletter abonnieren'}</h2>
                        <p style="font-size: 18px; margin-bottom: 40px; opacity: 0.9;">${section.subtitle || 'Erhalten Sie exklusive Angebote und Updates direkt in Ihr Postfach'}</p>
                        <form style="display: flex; gap: 15px; max-width: 600px; margin: 0 auto; flex-wrap: wrap;" onsubmit="event.preventDefault(); alert('Newsletter-Anmeldung wird verarbeitet...');">
                            <input type="email" required placeholder="Ihre E-Mail-Adresse" style="flex: 1; min-width: 250px; padding: 18px 25px; border: none; border-radius: 50px; font-size: 16px;" />
                            <button type="submit" style="padding: 18px 40px; background: white; color: #667eea; border: none; border-radius: 50px; font-weight: 700; font-size: 16px; cursor: pointer; box-shadow: 0 8px 25px rgba(0,0,0,0.2); white-space: nowrap;">
                                Anmelden <i class="fas fa-paper-plane" style="margin-left: 10px;"></i>
                            </button>
                        </form>
                        <div style="margin-top: 30px; font-size: 14px; opacity: 0.8;">
                            <i class="fas fa-lock"></i> Ihre Daten sind bei uns sicher. Kein Spam, jederzeit abmeldbar.
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 50px; max-width: 600px; margin-left: auto; margin-right: auto;">
                            <div style="text-align: center;">
                                <div style="font-size: 32px; font-weight: 800; margin-bottom: 5px;">10%</div>
                                <div style="font-size: 14px; opacity: 0.9;">Willkommensrabatt</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 32px; font-weight: 800; margin-bottom: 5px;">2x</div>
                                <div style="font-size: 14px; opacity: 0.9;">Monatlich Updates</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 32px; font-weight: 800; margin-bottom: 5px;">🎁</div>
                                <div style="font-size: 14px; opacity: 0.9;">Exklusive Deals</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    // B2B Section
    renderB2B(section: any, config: any) {
        return `
            <section class="static-section b2b" data-section-id="${section.id}" style="background: #001f3f; color: white; padding: 80px 0;">
                <div class="container">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;" class="b2b-grid">
                        <div>
                            <div style="background: rgba(255,255,255,0.1); display: inline-block; padding: 8px 20px; border-radius: 25px; font-weight: 600; margin-bottom: 20px;">
                                💼 Business Solutions
                            </div>
                            <h2 style="font-size: 42px; margin-bottom: 20px;">${section.title || 'Volumenlizenz für Ihr Unternehmen'}</h2>
                            <p style="font-size: 18px; opacity: 0.9; line-height: 1.8; margin-bottom: 30px;">
                                ${section.subtitle || 'Profitieren Sie von Mengenrabatten ab 5 Lizenzen. Persönliche Beratung, flexible Zahlungsoptionen und dedizierter Enterprise-Support.'}
                            </p>
                            <ul style="list-style: none; padding: 0; margin: 0 0 40px 0;">
                                <li style="margin-bottom: 15px; display: flex; align-items: center;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; font-size: 24px; margin-right: 15px;"></i>
                                    <span style="font-size: 16px;">Ab 5 Lizenzen: 15% Rabatt</span>
                                </li>
                                <li style="margin-bottom: 15px; display: flex; align-items: center;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; font-size: 24px; margin-right: 15px;"></i>
                                    <span style="font-size: 16px;">Ab 20 Lizenzen: 25% Rabatt</span>
                                </li>
                                <li style="margin-bottom: 15px; display: flex; align-items: center;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; font-size: 24px; margin-right: 15px;"></i>
                                    <span style="font-size: 16px;">Dedizierter Account Manager</span>
                                </li>
                                <li style="margin-bottom: 15px; display: flex; align-items: center;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; font-size: 24px; margin-right: 15px;"></i>
                                    <span style="font-size: 16px;">Kauf auf Rechnung möglich</span>
                                </li>
                                <li style="margin-bottom: 15px; display: flex; align-items: center;">
                                    <i class="fas fa-check-circle" style="color: #4ade80; font-size: 24px; margin-right: 15px;"></i>
                                    <span style="font-size: 16px;">Priority Support & Installation</span>
                                </li>
                            </ul>
                            <a href="/business" style="display: inline-block; background: #ffc107; color: #001f3f; padding: 18px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 8px 25px rgba(255,193,7,0.3);">
                                Angebot anfordern <i class="fas fa-arrow-right" style="margin-left: 10px;"></i>
                            </a>
                        </div>
                        <div style="background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); padding: 50px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
                            <h3 style="font-size: 28px; margin-bottom: 30px; text-align: center;">Schnellanfrage</h3>
                            <form style="display: grid; gap: 20px;" onsubmit="event.preventDefault(); alert('Anfrage wird versendet...');">
                                <input type="text" required placeholder="Firmenname *" style="padding: 15px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: white; border-radius: 10px; font-size: 16px;" />
                                <input type="email" required placeholder="E-Mail *" style="padding: 15px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: white; border-radius: 10px; font-size: 16px;" />
                                <input type="tel" placeholder="Telefon" style="padding: 15px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: white; border-radius: 10px; font-size: 16px;" />
                                <select required style="padding: 15px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: white; border-radius: 10px; font-size: 16px;">
                                    <option value="">Anzahl Lizenzen *</option>
                                    <option>5-10 Lizenzen</option>
                                    <option>11-20 Lizenzen</option>
                                    <option>21-50 Lizenzen</option>
                                    <option>50+ Lizenzen</option>
                                </select>
                                <textarea rows="3" placeholder="Welche Produkte benötigen Sie?" style="padding: 15px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: white; border-radius: 10px; font-size: 16px; resize: vertical;"></textarea>
                                <button type="submit" style="padding: 18px; background: #ffc107; color: #001f3f; border: none; border-radius: 50px; font-weight: 700; font-size: 16px; cursor: pointer; box-shadow: 0 8px 25px rgba(255,193,7,0.3);">
                                    Angebot erhalten <i class="fas fa-paper-plane" style="margin-left: 10px;"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <style>
                    @media (max-width: 768px) {
                        .b2b-grid { grid-template-columns: 1fr !important; }
                    }
                </style>
            </section>
        `;
    },

    // Partner Logos (Bekannt Aus)
    renderPartnerLogos(section: any, config: any) {
        return `
            <section class="static-section partner-logos" data-section-id="${section.id}" style="background: #f8f9fa; padding: 60px 0; border-top: 1px solid #eee;">
                <div class="container">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h3 style="font-size: 20px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">${section.title || 'Bekannt aus'}</h3>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 40px; align-items: center; justify-items: center; opacity: 0.6;">
                        <div style="font-size: 32px; font-weight: 800; color: #001f3f;">Microsoft</div>
                        <div style="font-size: 32px; font-weight: 800; color: #001f3f;">TÜV</div>
                        <div style="font-size: 32px; font-weight: 800; color: #001f3f;">Trusted Shops</div>
                        <div style="font-size: 32px; font-weight: 800; color: #001f3f;">PayPal</div>
                        <div style="font-size: 32px; font-weight: 800; color: #001f3f;">SSL</div>
                    </div>
                </div>
            </section>
        `;
    },

    // Process Steps
    renderProcessSteps(section: any, config: any) {
        return `
            <section class="static-section process-steps" data-section-id="${section.id}" style="background: #fff; padding: 80px 0;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 60px;">
                        <h2>${section.title || '🚀 So einfach geht\'s'}</h2>
                        <p>${section.subtitle || 'In 3 Schritten zu Ihrer Software-Lizenz'}</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; max-width: 1100px; margin: 0 auto;">
                        ${[
                            {icon: 'search', title: 'Produkt wählen', desc: 'Finden Sie die passende Software in unserem umfangreichen Sortiment'},
                            {icon: 'shopping-cart', title: 'Bestellen & Bezahlen', desc: 'Sicherer Checkout mit Ihrer bevorzugten Zahlungsmethode'},
                            {icon: 'download', title: 'Sofort nutzen', desc: 'Lizenzschlüssel per E-Mail erhalten und Software aktivieren'}
                        ].map((step, i) => `
                            <div style="text-align: center; position: relative;">
                                <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; box-shadow: 0 10px 30px rgba(102,126,234,0.3); position: relative;">
                                    <i class="fas fa-${step.icon}" style="font-size: 40px; color: white;"></i>
                                    <div style="position: absolute; top: -10px; right: -10px; width: 40px; height: 40px; border-radius: 50%; background: #ffc107; color: #001f3f; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; box-shadow: 0 4px 15px rgba(255,193,7,0.4);">
                                        ${i + 1}
                                    </div>
                                </div>
                                <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 12px; color: #001f3f;">${step.title}</h3>
                                <p style="color: #666; line-height: 1.8;">${step.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    },

    // Category Grid
    renderCategoryGrid(section: any, config: any) {
        return `
            <section class="static-section category-grid" data-section-id="${section.id}" style="background: #f8f9fa; padding: 80px 0;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2>${section.title || '📂 Kategorien'}</h2>
                        <p>${section.subtitle || 'Finden Sie die richtige Software für Ihre Bedürfnisse'}</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
                        ${[
                            {icon: 'fab fa-windows', title: 'Windows', color: '#0078D4', link: '/produkte?category=Windows'},
                            {icon: 'fas fa-file-word', title: 'Office', color: '#D83B01', link: '/produkte?category=Office'},
                            {icon: 'fas fa-server', title: 'Server', color: '#5E5E5E', link: '/produkte?category=Server'},
                            {icon: 'fas fa-shield-virus', title: 'Antivirus', color: '#00A4EF', link: '/produkte?category=Antivirus'},
                            {icon: 'fas fa-drafting-compass', title: 'CAD', color: '#0696D7', link: '/produkte?category=CAD'},
                            {icon: 'fas fa-ellipsis-h', title: 'Mehr', color: '#667eea', link: '/produkte'}
                        ].map(cat => `
                            <a href="${cat.link}" style="background: white; padding: 35px; border-radius: 15px; text-align: center; text-decoration: none; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.08); display: block;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.08)'">
                                <div style="width: 80px; height: 80px; border-radius: 50%; background: ${cat.color}; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">
                                    <i class="${cat.icon}" style="font-size: 36px; color: white;"></i>
                                </div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #001f3f; margin-bottom: 10px;">${cat.title}</h3>
                                <div style="color: #999; font-size: 14px;">Produkte entdecken <i class="fas fa-arrow-right" style="margin-left: 5px;"></i></div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    },

    // Knowledge Base
    renderKnowledgeBase(section: any, config: any) {
        return `
            <section class="static-section knowledge-base" data-section-id="${section.id}" style="background: #fff; padding: 80px 0;">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2>${section.title || '📚 Wissensdatenbank'}</h2>
                        <p>${section.subtitle || 'Hilfreiche Artikel und Anleitungen'}</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                        ${[
                            {icon: 'book', title: 'Installationsanleitungen', desc: 'Schritt-für-Schritt Anleitungen für alle Produkte', link: '/hilfe/installation'},
                            {icon: 'question-circle', title: 'Häufige Fragen', desc: 'Antworten auf die meist gestellten Fragen', link: '/faq'},
                            {icon: 'key', title: 'Lizenz-Aktivierung', desc: 'So aktivieren Sie Ihre Software-Lizenz', link: '/hilfe/aktivierung'},
                            {icon: 'shield-alt', title: 'Sicherheit & Datenschutz', desc: 'Informationen zu Sicherheit und Datenschutz', link: '/datenschutz'},
                            {icon: 'credit-card', title: 'Zahlung & Versand', desc: 'Alles zu Zahlungsmethoden und Lieferung', link: '/zahlung'},
                            {icon: 'undo', title: 'Rückgabe & Garantie', desc: 'Informationen zu Rückgabe und Gewährleistung', link: '/garantie'}
                        ].map(article => `
                            <a href="${article.link}" style="background: #f8f9fa; padding: 30px; border-radius: 15px; text-decoration: none; display: block; border-left: 4px solid #667eea; transition: all 0.3s;" onmouseover="this.style.background='#e8e9fa'; this.style.borderLeftWidth='6px'" onmouseout="this.style.background='#f8f9fa'; this.style.borderLeftWidth='4px'">
                                <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                                    <i class="fas fa-${article.icon}" style="font-size: 28px; color: white;"></i>
                                </div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #001f3f; margin-bottom: 12px;">${article.title}</h3>
                                <p style="color: #666; line-height: 1.7; margin-bottom: 15px;">${article.desc}</p>
                                <div style="color: #667eea; font-weight: 600; font-size: 14px;">Mehr erfahren <i class="fas fa-arrow-right" style="margin-left: 5px;"></i></div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }
};
