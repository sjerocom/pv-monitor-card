# 🌞 PV Monitor Card

Eine moderne, animierte Lovelace-Karte für [Home Assistant](https://www.home-assistant.io/) zur übersichtlichen Darstellung deiner Photovoltaik-Anlage mit Echtzeit-Animationen und intelligentem Monitoring.

[![GitHub Release](https://img.shields.io/github/release/sjerocom/pv-monitor-card.svg?style=flat-square)](https://github.com/sjerocom/pv-monitor-card/releases)
[![License](https://img.shields.io/github/license/sjerocom/pv-monitor-card.svg?style=flat-square)](LICENSE)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-blue.svg?style=flat-square)](https://www.home-assistant.io/)

---

## ✨ Features

### 📊 Intelligente Anzeige
- **4 dedizierte Bereiche**: Netz, PV-Anlage, Batterie und Hausverbrauch
- **Automatische Formatierung**: Werte < 1000W in Watt, ≥ 1000W in Kilowatt
- **Dynamische Icons**: Batterie-Symbol passt sich dem Ladezustand an (10%-Schritte)
- **Statusbasierte Farbcodierung**: Icons ändern Farbe je nach Leistung und Zustand

### 🎨 Beeindruckende Animationen
- **Rotierende Border-Effekte**: Animierter Farbverlauf zeigt aktive Energieflüsse
- **Leistungsabhängige Geschwindigkeit**: Je höher die Leistung, desto schneller die Animation
- **Individuelle Farbschemata** für jeden Bereich:
    - **Netz**: Gelb→Grün (Einspeisung) | Gelb→Rot→Lila (Bezug)
    - **PV**: Lila→Rot→Orange→Gelb→Weiß (steigend mit Leistung)
    - **Batterie**: Gelb→Grün (Laden) | Gelb→Rot→Lila (Entladen)
    - **Haus**: Gelb→Orange→Rot→Rosa→Lila (steigender Verbrauch)

### 🎯 Interaktivität
- **Tap Actions**: Definiere individuelle Aktionen für jede Karte
- **Navigation**: Springe zu detaillierten Dashboards
- **Service-Aufrufe**: Steuere Geräte direkt aus der Karte
- **Flexible Texte**: Passe alle Beschriftungen nach deinen Wünschen an

---

## 📦 Installation

### Methode 1: Manuelle Installation

1. **Datei herunterladen**  
   Lade `pv-monitor-card.js` aus dem [neuesten Release](https://github.com/sjerocom/pv-monitor-card/releases) herunter

2. **Nach Home Assistant kopieren**  
   Speichere die Datei unter `/config/www/pv-monitor-card.js`

3. **Ressource registrieren**  
   Gehe zu **Einstellungen** → **Dashboards** → **Ressourcen** (oben rechts ⋮) und füge hinzu:
   ```yaml
   URL: /local/pv-monitor-card.js?v=1.0.0
   Ressourcentyp: JavaScript-Modul
   ```

4. **Dashboard neu laden**  
   Drücke `Strg + F5` oder leere den Browser-Cache

### Methode 2: HACS *(geplant)*

Die Integration in HACS ist in Vorbereitung.

---

## 🚀 Schnellstart

### Minimale Konfiguration

Füge diese Karte zu deinem Lovelace Dashboard hinzu:

```yaml
type: custom:pv-monitor-card
netz_entity: sensor.grid_power          # Deine Netzleistung
pv_entity: sensor.solar_power           # Deine PV-Leistung
batterie_entity: sensor.battery_soc     # Batterie-Ladezustand in %
haus_entity: sensor.house_consumption   # Hausverbrauch
```

Das war's! Die Karte zeigt nun alle vier Bereiche mit Standard-Animationen an.

---

## ⚙️ Konfiguration

### Globale Einstellungen

Passe das Erscheinungsbild der gesamten Karte an:

```yaml
type: custom:pv-monitor-card

# Titel & Icons
show_title: false                    # Titel ausblenden
title: "Mein Energie-Monitor"        # Eigener Titel
show_icons: true                     # Icons anzeigen

# Größen anpassen (optional)
icon_size: "2.5em"                   # Icon-Größe (Standard: 2em)
primary_size: "1.4em"                # Haupttext-Größe (Standard: 1.2em)
secondary_size: "1em"                # Nebentext-Größe (Standard: 0.9em)
card_padding: "16px"                 # Innenabstand (Standard: 12px)

# Entities
netz_entity: sensor.grid_power
pv_entity: sensor.solar_power
batterie_entity: sensor.battery_soc
haus_entity: sensor.house_consumption
```

---

### 🔌 Netz-Konfiguration

```yaml
netz_entity: sensor.grid_power
netz_animation: true                         # Animation aktivieren
netz_show_name: true                         # "Netz" unter der Karte anzeigen
netz_icon: mdi:transmission-tower           # Eigenes Icon
netz_threshold: 50                          # Schwellwert für Status (Standard: 10W)

# Statusbeschriftungen anpassen
netz_text_einspeisen: "⚡ Einspeisen"      # Bei negativen Werten
netz_text_neutral: "⚖️ Ausgeglichen"       # Zwischen -threshold und +threshold
netz_text_bezug: "🔌 Netzbezug"            # Bei positiven Werten

# Interaktion
netz_tap_action:
  action: navigate
  navigation_path: /lovelace/energy
```

**Hinweis:** Der `threshold` bestimmt, ab welcher Leistung (in Watt) der Status von "Neutral" zu "Einspeisung" oder "Bezug" wechselt.

---

### ☀️ PV-Konfiguration

```yaml
pv_entity: sensor.solar_power
pv_animation: true
pv_show_name: true
pv_icon: mdi:solar-power-variant          # Alternatives Icon

# Zweite Zeile mit zusätzlicher Info
pv_secondary_text: "Produktion läuft"     # Fixer Text
# ODER dynamisch von anderem Sensor:
pv_secondary_entity: sensor.solar_daily_yield
# Zeigt z.B.: "12.5 kWh"

pv_tap_action:
  action: navigate
  navigation_path: /lovelace/solar
```

**Spezial-Feature:** Das PV-Icon rotiert abhängig von der Leistung – höhere Leistung = schnellere Rotation!

---

### 🔋 Batterie-Konfiguration

```yaml
batterie_entity: sensor.battery_soc              # Ladezustand (0-100%)
batterie_animation: true
batterie_show_name: true

# Leistungswerte für Animation & Anzeige
batterie_ladung_entity: sensor.battery_charging_power
batterie_entladung_entity: sensor.battery_discharging_power

batterie_tap_action:
  action: call-service
  service: switch.toggle
  service_data:
    entity_id: switch.battery_mode
```

**Automatische Statusanzeige:**
- Bei Ladung > 1W: `"+ 1.2 kW"` (grüne Animation)
- Bei Entladung > 1W: `"- 850 W"` (rote Animation)
- Sonst: `"Inaktiv"` (keine Animation)

**Icon & Farbe:**
- Icon ändert sich in 10%-Schritten (battery-10, battery-20, ... battery-100)
- Farbe: Rot (0%) → Orange (25%) → Gelb (50%) → Grün (100%)

---

### 🏠 Haus-Konfiguration

```yaml
haus_entity: sensor.house_consumption
haus_animation: true
haus_show_name: true
haus_icon: mdi:home-lightning-bolt           # Alternatives Icon

# Zweite Zeile
haus_secondary_text: "4 Geräte aktiv"
# ODER:
haus_secondary_entity: sensor.active_devices

haus_tap_action:
  action: navigate
  navigation_path: /lovelace/verbrauch
```

---

## 🎯 Tap Actions im Detail

Jede Karte kann auf Klicks reagieren:

### Navigation zu einer Seite
```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/details
```

### Service aufrufen
```yaml
tap_action:
  action: call-service
  service: light.toggle
  service_data:
    entity_id: light.wohnzimmer
```

### More-Info Dialog öffnen
```yaml
tap_action:
  action: more-info
  target:
    entity_id: sensor.detailed_stats
```

### Keine Aktion
```yaml
tap_action:
  action: none
```

---

## 📋 Vollständiges Beispiel

```yaml
type: custom:pv-monitor-card

# Globale Einstellungen
show_title: false
show_icons: true
icon_size: "2.2em"
primary_size: "1.3em"
secondary_size: "0.95em"

# Netz
netz_entity: sensor.grid_power
netz_animation: true
netz_show_name: false
netz_threshold: 50
netz_text_einspeisen: "Einspeisung"
netz_text_neutral: "~0 W"
netz_text_bezug: "Bezug"
netz_tap_action:
  action: navigate
  navigation_path: /lovelace/energy

# PV
pv_entity: sensor.solar_power
pv_animation: true
pv_show_name: false
pv_secondary_entity: sensor.solar_daily_yield
pv_tap_action:
  action: navigate
  navigation_path: /lovelace/solar

# Batterie
batterie_entity: sensor.battery_soc
batterie_animation: true
batterie_show_name: false
batterie_ladung_entity: sensor.battery_charging
batterie_entladung_entity: sensor.battery_discharging
batterie_tap_action:
  action: call-service
  service: script.battery_optimization
  service_data: {}

# Haus
haus_entity: sensor.house_consumption
haus_animation: true
haus_show_name: false
haus_secondary_entity: sensor.active_power_devices
haus_tap_action:
  action: navigate
  navigation_path: /lovelace/consumption
```

---

## 🔧 Entwicklung

### Voraussetzungen
- Node.js ≥ 20
- npm oder yarn

### Setup & Build

```bash
# Repository klonen
git clone https://github.com/sjerocom/pv-monitor-card.git
cd pv-monitor-card

# Abhängigkeiten installieren
npm install

# Production Build
npm run build

# Development mit Watch-Modus
npm run dev
```

Die fertige Datei liegt unter `dist/pv-monitor-card.js`

### Technologie-Stack
- **Framework**: [Lit](https://lit.dev/) – Moderne Web Components
- **Sprache**: TypeScript
- **Build-Tool**: Vite
- **Styling**: CSS-in-JS mit Lit

---

## 📚 Projektstruktur

```
pv-monitor-card/
├── src/
│   ├── pv-monitor-card.ts        # Hauptkomponente
│   └── pv-monitor-utils.ts       # Hilfsfunktionen & Berechnungen
├── dist/
│   └── pv-monitor-card.js        # Kompilierte Ausgabe
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🗺️ Roadmap

- [x] Grundlegende 4-Bereiche-Anzeige
- [x] Animierte Border-Effekte mit Farbverläufen
- [x] Tap Actions (Navigation, Services)
- [x] Dynamische Batterie-Icons mit Farbcodierung
- [x] PV-Icon-Rotation bei Produktion
- [x] Sekundäre Textzeilen & Sensor-Integration
- [ ] HACS-Integration
- [ ] Visual Editor für Lovelace UI
- [ ] Mehrsprachigkeit (i18n)
- [ ] Zusätzliche Themes (Dark/Light/Auto)
- [ ] Erweiterte Statistiken-Ansicht
- [ ] Anpassbare Animationsgeschwindigkeiten

---

## 🐛 Probleme & Support

Bei Fragen, Bugs oder Feature-Wünschen:
- [Issue erstellen](https://github.com/sjerocom/pv-monitor-card/issues)
- [Diskussionen](https://github.com/sjerocom/pv-monitor-card/discussions)

---

## 🤝 Contributing

Beiträge sind willkommen! Bitte:
1. Forke das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/amazing-feature`)
3. Committe deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

---

## 📄 Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

---

## 💚 Credits

- Inspiriert von den [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom)
- Dank an die [Home Assistant Community](https://community.home-assistant.io/)
- Icons von [Material Design Icons](https://materialdesignicons.com/)

---

## ⭐ Star History

Wenn dir dieses Projekt gefällt, gib ihm einen Stern auf GitHub!

[![Star History](https://api.star-history.com/svg?repos=sjerocom/pv-monitor-card&type=Date)](https://star-history.com/#sjerocom/pv-monitor-card&Date)

---

**Erstellt mit ❤️ für die Home Assistant Community**