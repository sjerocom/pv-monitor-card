# PV Monitor Card

Eine moderne, animierte Lovelace-Karte für [Home Assistant](https://www.home-assistant.io/) zur übersichtlichen Darstellung deiner Photovoltaik-Anlage mit Echtzeit-Animationen und intelligentem Monitoring.

[![GitHub Release](https://img.shields.io/github/release/sjerocom/pv-monitor-card.svg?style=flat-square)](https://github.com/sjerocom/pv-monitor-card/releases)
[![License](https://img.shields.io/github/license/sjerocom/pv-monitor-card.svg?style=flat-square)](LICENSE)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-blue.svg?style=flat-square)](https://www.home-assistant.io/)

---

## Features

### Intelligente Anzeige
- **4 dedizierte Bereiche**: Netz, PV-Anlage, Batterie und Hausverbrauch
- **Automatische Formatierung**: Werte < 1000W in Watt, ≥ 1000W in Kilowatt mit 2 Dezimalstellen
- **Dynamische Icons**: Batterie-Symbol passt sich dem Ladezustand an (10%-Schritte)
- **Statusbasierte Farbcodierung**: Icons ändern Farbe je nach Leistung und Zustand
- **Sekundäre Anzeigen**: Zusätzliche Sensor-Werte oder Texte in allen Bereichen

### Beeindruckende Animationen
- **Rotierende Border-Effekte**: Animierter Farbverlauf zeigt aktive Energieflüsse
- **Leistungsabhängige Geschwindigkeit**: Je höher die Leistung, desto schneller die Animation
- **PV Icon-Rotation**: Optionales rotierendes Sonnen-Icon bei Produktion
- **Individuelle Farbschemata** für jeden Bereich:
    - **Netz**: Gelb→Grün (Einspeisung) | Gelb→Rot→Lila (Bezug)
    - **PV**: Lila→Rot→Orange→Gelb→Weiß (steigend mit Leistung)
    - **Batterie**: Gelb→Grün (Laden) | Gelb→Rot→Lila (Entladen)
    - **Haus**: Gelb→Orange→Rot→Rosa→Lila (steigender Verbrauch)

### Interaktivität
- **3 Action-Typen**: Tap, Double-Tap und Hold Actions für jede Karte
- **Navigation**: Springe zu detaillierten Dashboards
- **Service-Aufrufe**: Steuere Geräte direkt aus der Karte
- **More-Info Dialogs**: Zeige Entity-Details bei Bedarf

### Anpassbarkeit
- **Vollständiges Style-Objekt**: Kontrolle über alle visuellen Aspekte
- **Titel & Untertitel**: Optional mit Icon-Unterstützung
- **Flexible Texte**: Eigene Beschriftungen für alle Bereiche
- **Grid-Anpassung**: Konfigurierbarer Abstand zwischen Karten
- **Glasmorphismus-Design**: Moderne, semi-transparente Karten mit Blur-Effekt

---

## Installation

### Manuelle Installation

1. **Datei herunterladen**  
   Lade `pv-monitor-card.js` aus dem [neuesten Release](https://github.com/sjerocom/pv-monitor-card/releases) herunter

2. **Nach Home Assistant kopieren**  
   Speichere die Datei unter `/config/www/pv-monitor-card.js`

3. **Ressource registrieren**  
   Gehe zu **Einstellungen** → **Dashboards** → **Ressourcen** (oben rechts ⋮) und füge hinzu:
   ```yaml
   URL: /local/pv-monitor-card.js?v=2.0.0
   Ressourcentyp: JavaScript-Modul
   ```

4. **Dashboard neu laden**  
   Drücke `Strg + F5` oder leere den Browser-Cache

### HACS Installation (geplant)

Die Integration in HACS ist in Vorbereitung.

---

## Schnellstart

### Minimale Konfiguration

Die empfohlene Struktur mit verschachtelten Objekten:

```yaml
type: custom:pv-monitor-card

netz:
  entity: sensor.grid_power

pv:
  entity: sensor.solar_power

batterie:
  entity: sensor.battery_soc

haus:
  entity: sensor.house_consumption
```

---

## Konfiguration

### Config-Struktur

```yaml
type: custom:pv-monitor-card

style:
  icon_size: "2em"
  primary_size: "1.2em"
  secondary_size: "0.9em"
  card_padding: "12px"

netz:
  entity: sensor.grid_power
  animation: true
  show_name: false
  
pv:
  entity: sensor.solar_power
# ...
```

---

## Globale Optionen

### Titel & Layout

```yaml
type: custom:pv-monitor-card

# Titel-Konfiguration
title: "Energie-Monitor"
show_title: true                    # Standard: true
subtitle: "Live-Übersicht"
show_subtitle: true                 # Standard: true
icon: "mdi:solar-power"
show_icon: true                     # Standard: true

# Grid-Layout
grid_gap: "8px"                     # Abstand zwischen Karten (Standard: 6px)
```

**Beispiel-Titel mit Icon:**
```yaml
title: "Mein Zuhause"
show_title: true
icon: "mdi:home-lightning-bolt"
show_icon: true
subtitle: "Energiefluss in Echtzeit"
show_subtitle: true
```

---

## Style-Objekt

Das `style`-Objekt bietet vollständige Kontrolle über das Aussehen der Karte.

### Karten-Styles

```yaml
style:
  # Karten-Basis
  card_background_color: "rgba(21, 20, 27, 0.6)"
  card_border_color: "rgba(255, 255, 255, 0.1)"
  card_border_radius: "16px"
  card_text_color: "white"
  card_cursor: "pointer"
  card_padding: "12px"
  card_boxshadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
```

### Titel & Untertitel Styles

```yaml
style:
  # Titel
  title_align: "center"              # left, center, right
  title_size: "1.8em"
  title_font_weight: "bold"
  title_color: "#ffd700"
  
  # Untertitel
  subtitle_align: "center"           # left, center, right
  subtitle_size: "1em"
  subtitle_font_weight: "normal"
  subtitle_color: "rgba(255, 255, 255, 0.7)"
```

### Icon Styles

```yaml
style:
  icon_size: "2.5em"
  icon_opacity: "1"
  icon_font_weight: "normal"
  icon_margin: "8px"                 # Abstand unter dem Icon
```

### Text Styles

```yaml
style:
  # Primärer Text (Hauptwert)
  primary_size: "1.4em"
  primary_color: "white"
  primary_font_opacity: "1"
  primary_font_weight: "bold"
  
  # Sekundärer Text (Status/Info)
  secondary_size: "1em"
  secondary_color: "white"
  secondary_font_opacity: "0.7"
  secondary_font_weight: "normal"
```

### Vollständiges Style-Beispiel

```yaml
type: custom:pv-monitor-card

title: "Energie-Dashboard"
show_title: true
grid_gap: "10px"

style:
  # Karten
  card_background_color: "rgba(15, 15, 20, 0.8)"
  card_border_color: "rgba(100, 200, 255, 0.3)"
  card_border_radius: "20px"
  card_padding: "16px"
  
  # Titel
  title_size: "2em"
  title_color: "#00d4ff"
  title_align: "left"
  
  # Icons
  icon_size: "3em"
  icon_margin: "10px"
  
  # Text
  primary_size: "1.6em"
  primary_font_weight: "bold"
  secondary_size: "1.1em"
  secondary_font_opacity: "0.8"
```

---

## Bereichs-Konfiguration

### Netz

```yaml
netz:
  entity: sensor.grid_power
  animation: true                    # Border-Animation (Standard: true)
  show_name: false                   # "Netz" Text anzeigen (Standard: true)
  icon: "mdi:transmission-tower"     # Eigenes Icon
  threshold: 50                      # Schwellwert für Statuswechsel in Watt (Standard: 10)
  
  # Statusbeschriftungen
  text_einspeisen: "Einspeisung"     # Text bei negativen Werten
  text_neutral: "Inaktiv"            # Text zwischen -threshold und +threshold
  text_bezug: "Netzbezug"            # Text bei positiven Werten
  
  # Actions
  tap_action:
    action: navigate
    navigation_path: /lovelace/energy
  double_tap_action:
    action: more-info
    target:
      entity_id: sensor.grid_power
  hold_action:
    action: call-service
    service: script.refresh_energy_data
```

**Threshold-Beispiel:**
- Wert: -150W, Threshold: 50 → Zeigt "Einspeisung"
- Wert: 25W, Threshold: 50 → Zeigt "Inaktiv"
- Wert: 200W, Threshold: 50 → Zeigt "Netzbezug"

---

### PV

```yaml
pv:
  entity: sensor.solar_power
  animation: true                    # Border-Animation (Standard: true)
  icon_animation: true               # Icon-Rotation (Standard: true)
  show_name: false                   # "PV" Text anzeigen (Standard: true)
  icon: "mdi:solar-power"            # Eigenes Icon
  
  # Sekundäre Anzeige (wähle eine)
  secondary_entity: sensor.solar_daily_yield    # Sensor-Wert anzeigen
  # ODER
  secondary_text: "Produktion aktiv"            # Fixer Text
  
  # Actions
  tap_action:
    action: navigate
    navigation_path: /lovelace/solar
  double_tap_action:
    action: more-info
    target:
      entity_id: sensor.solar_power
```

**Icon-Animation:**
Das PV-Icon rotiert basierend auf der Leistung:
- 0W: Keine Rotation
- 500W: Langsame Rotation (22.5°)
- 2000W: Mittlere Rotation (90°)
- 5000W+: Schnelle Rotation (180°)

**Sekundäre Anzeige Beispiele:**
```yaml
# Mit Sensor
secondary_entity: sensor.solar_daily_yield
# Zeigt: "12.5 kWh"

# Mit fixem Text
secondary_text: "Aktuell produzierend"
# Zeigt: "Aktuell produzierend"
```

---

### Batterie

```yaml
batterie:
  entity: sensor.battery_soc              # Ladezustand in % (0-100)
  animation: true                         # Border-Animation (Standard: true)
  show_name: false                        # "Batterie" Text anzeigen (Standard: true)
  icon: "mdi:battery-high"                # Eigenes Icon (überschreibt Auto-Icon)
  
  # Leistungswerte für Animation & Statustext
  ladung_entity: sensor.battery_charging_power
  entladung_entity: sensor.battery_discharging_power
  
  # Actions
  tap_action:
    action: call-service
    service: input_boolean.toggle
    service_data:
      entity_id: input_boolean.battery_mode
  double_tap_action:
    action: more-info
    target:
      entity_id: sensor.battery_soc
```

**Automatische Funktionen:**
- **Icon**: Wechselt automatisch in 10%-Schritten (battery-10 bis battery-100)
- **Icon-Farbe**:
    - 0-20%: Rot (#ef4444)
    - 21-40%: Orange (#f97316)
    - 41-60%: Gelb (#eab308)
    - 61-100%: Grün (#22c55e)
- **Statustext**:
    - Ladung > 1W: "1.2 kW" (mit grüner Animation)
    - Entladung > 1W: "-850 W" (mit roter Animation)
    - Sonst: "Inaktiv" (keine Animation)

**Eigenes Icon:**
```yaml
batterie:
  icon: "mdi:battery-heart"  # Überschreibt automatisches Icon
```

---

### Haus

```yaml
haus:
  entity: sensor.house_consumption
  animation: true                    # Border-Animation (Standard: true)
  show_name: false                   # "Haus" Text anzeigen (Standard: true)
  icon: "mdi:home-lightning-bolt"    # Eigenes Icon
  
  # Sekundäre Anzeige (wähle eine)
  secondary_entity: sensor.active_devices       # Sensor-Wert anzeigen
  # ODER
  secondary_text: "4 Geräte aktiv"              # Fixer Text
  
  # Actions
  tap_action:
    action: navigate
    navigation_path: /lovelace/consumption
  double_tap_action:
    action: more-info
    target:
      entity_id: sensor.house_consumption
```

**Sekundäre Anzeige Beispiele:**
```yaml
# Mit Sensor
secondary_entity: sensor.active_power_consumption
# Zeigt: "2.4 kW" (mit Einheit vom Sensor)

# Mit Zähler-Sensor
secondary_entity: sensor.device_count
# Zeigt: "7" (Anzahl aktiver Geräte)

# Mit fixem Text
secondary_text: "Hoher Verbrauch"
# Zeigt: "Hoher Verbrauch"
```

---

## Tap Actions

Jede Karte unterstützt drei Action-Typen:

### Action-Typen

| Action-Typ | Auslöser | Verwendung |
|------------|----------|------------|
| `tap_action` | Einfacher Klick | Navigation, Hauptaktion |
| `double_tap_action` | Doppelklick | More-Info, alternative Aktion |
| `hold_action` | Langer Druck (Rechtsklick) | Service-Aufrufe, erweiterte Aktionen |

### Navigate - Navigation

```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/energy
```

### Call-Service - Service aufrufen

```yaml
tap_action:
  action: call-service
  service: light.toggle
  service_data:
    entity_id: light.living_room

# Mit mehreren Entities
hold_action:
  action: call-service
  service: switch.turn_on
  service_data:
    entity_id:
      - switch.device_1
      - switch.device_2
```

### More-Info - Details anzeigen

```yaml
double_tap_action:
  action: more-info
  target:
    entity_id: sensor.grid_power
```

### None - Keine Aktion

```yaml
tap_action:
  action: none
```

### Vollständiges Action-Beispiel

```yaml
netz:
  entity: sensor.grid_power
  tap_action:
    action: navigate
    navigation_path: /lovelace/energy
  double_tap_action:
    action: more-info
    target:
      entity_id: sensor.grid_detailed_stats
  hold_action:
    action: call-service
    service: script.update_energy_prices
```

---

## Vollständige Beispiele

### Beispiel 1: Minimalistisch

Ohne Icons, kompakte Darstellung:

```yaml
type: custom:pv-monitor-card

show_title: false
grid_gap: "4px"

style:
  icon_size: "0px"              # Icons ausblenden
  primary_size: "16px"
  secondary_size: "12px"
  card_padding: "10px"

netz:
  entity: sensor.grid_power
  show_name: false
  
pv:
  entity: sensor.solar_power
  show_name: false
  
batterie:
  entity: sensor.battery_soc
  show_name: false
  ladung_entity: sensor.battery_charging
  entladung_entity: sensor.battery_discharging
  
haus:
  entity: sensor.house_consumption
  show_name: false
```

---

### Beispiel 2: Vollständig konfiguriert

Mit allen Features:

```yaml
type: custom:pv-monitor-card

# Header
title: "Energie-Monitor"
show_title: true
subtitle: "Live-Daten"
show_subtitle: true
icon: "mdi:solar-power"
show_icon: true
grid_gap: "8px"

# Styling
style:
  # Karten
  card_background_color: "rgba(21, 20, 27, 0.6)"
  card_border_color: "rgba(255, 255, 255, 0.1)"
  card_border_radius: "16px"
  card_padding: "12px"
  
  # Titel
  title_size: "1.8em"
  title_color: "#ffd700"
  title_align: "center"
  
  # Icons
  icon_size: "2.5em"
  icon_margin: "8px"
  
  # Text
  primary_size: "1.4em"
  primary_font_weight: "bold"
  secondary_size: "1em"

# Netz
netz:
  entity: sensor.grid_power
  animation: true
  show_name: false
  icon: "mdi:transmission-tower"
  threshold: 50
  text_einspeisen: "⚡ Einspeisung"
  text_neutral: "Inaktiv"
  text_bezug: "🔌 Bezug"
  tap_action:
    action: navigate
    navigation_path: /lovelace/energy
  double_tap_action:
    action: more-info
    target:
      entity_id: sensor.grid_power

# PV
pv:
  entity: sensor.solar_power
  animation: true
  icon_animation: true
  show_name: false
  icon: "mdi:white-balance-sunny"
  secondary_entity: sensor.solar_daily_yield
  tap_action:
    action: navigate
    navigation_path: /lovelace/solar
  double_tap_action:
    action: more-info
    target:
      entity_id: sensor.solar_power

# Batterie
batterie:
  entity: sensor.battery_soc
  animation: true
  show_name: false
  ladung_entity: sensor.battery_charging_power
  entladung_entity: sensor.battery_discharging_power
  tap_action:
    action: call-service
    service: input_boolean.toggle
    service_data:
      entity_id: input_boolean.battery_mode
  double_tap_action:
    action: more-info
    target:
      entity_id: sensor.battery_soc

# Haus
haus:
  entity: sensor.house_consumption
  animation: true
  show_name: false
  icon: "mdi:home-lightning-bolt"
  secondary_entity: sensor.active_devices
  tap_action:
    action: navigate
    navigation_path: /lovelace/consumption
  double_tap_action:
    action: more-info
    target:
      entity_id: sensor.house_consumption
```

---

### Beispiel 3: Alte Struktur (Legacy)

Funktioniert weiterhin für Abwärtskompatibilität:

```yaml
type: custom:pv-monitor-card
show_title: false
show_icons: true
icon_size: 2em
primary_size: 1.2em
secondary_size: 0.9em
card_padding: 12px

netz_entity: sensor.grid_power
netz_animation: true
netz_show_name: false
netz_threshold: 10
netz_text_einspeisen: Einspeisung
netz_text_neutral: Inaktiv
netz_text_bezug: Netzbezug
netz_tap_action:
  action: navigate
  navigation_path: /lovelace/energy

pv_entity: sensor.solar_power
pv_animation: true
pv_show_name: false
pv_secondary_entity: sensor.solar_daily_yield

batterie_entity: sensor.battery_soc
batterie_animation: true
batterie_show_name: false
batterie_ladung_entity: sensor.battery_charging
batterie_entladung_entity: sensor.battery_discharging

haus_entity: sensor.house_consumption
haus_animation: true
haus_show_name: false
haus_secondary_entity: sensor.active_devices
```

---

## Migration von alter zu neuer Struktur

Die Karte migriert automatisch alte Configs zur neuen Struktur. Du kannst aber auch manuell migrieren:

### Vorher (Alt)
```yaml
show_icons: true
icon_size: "2em"
primary_size: "1.2em"
netz_entity: sensor.grid_power
netz_animation: true
netz_show_name: false
```

### Nachher (Neu)
```yaml
style:
  icon_size: "2em"
  primary_size: "1.2em"

netz:
  entity: sensor.grid_power
  animation: true
  show_name: false
```

### Migrations-Regeln

| Alte Struktur | Neue Struktur |
|---------------|---------------|
| `icon_size` | `style.icon_size` |
| `primary_size` | `style.primary_size` |
| `secondary_size` | `style.secondary_size` |
| `card_padding` | `style.card_padding` |
| `netz_entity` | `netz.entity` |
| `netz_animation` | `netz.animation` |
| `netz_show_name` | `netz.show_name` |
| `netz_tap_action` | `netz.tap_action` |
| *(entsprechend für pv, batterie, haus)* |

---

## Entwicklung

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

## Projektstruktur

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

## Roadmap

- [x] Grundlegende 4-Bereiche-Anzeige
- [x] Animierte Border-Effekte mit Farbverläufen
- [x] Tap, Double-Tap und Hold Actions
- [x] Dynamische Batterie-Icons mit Farbcodierung
- [x] PV-Icon-Rotation bei Produktion
- [x] Sekundäre Sensor-Integration für alle Bereiche
- [x] Verschachtelte Config-Struktur
- [x] Vollständiges Style-Objekt
- [x] Titel & Untertitel mit Icon-Support
- [x] Grid Gap Konfiguration
- [x] Glasmorphismus-Design
- [ ] HACS-Integration
- [ ] Visual Editor für Lovelace UI
- [ ] Mehrsprachigkeit (i18n)
- [ ] Zusätzliche Themes (Dark/Light/Auto)
- [ ] Erweiterte Statistiken-Ansicht
- [ ] Anpassbare Animationsgeschwindigkeiten
- [ ] Export/Import von Konfigurationen

---

## Probleme & Support

Bei Fragen, Bugs oder Feature-Wünschen:
- [Issue erstellen](https://github.com/sjerocom/pv-monitor-card/issues)
- [Diskussionen](https://github.com/sjerocom/pv-monitor-card/discussions)

---

## Contributing

Beiträge sind willkommen! Bitte:
1. Forke das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/amazing-feature`)
3. Committe deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

---

## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

---

## Credits

- Inspiriert von den [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom)
- Dank an die [Home Assistant Community](https://community.home-assistant.io/)
- Icons von [Material Design Icons](https://materialdesignicons.com/)

---

**Erstellt für die Home Assistant Community**