# PV Monitor Card

Eine benutzerdefinierte Lovelace-Karte für [Home Assistant](https://www.home-assistant.io/),
um Photovoltaik- und Energiesensoren mit animierten Effekten übersichtlich darzustellen.

## Features

### Anzeige
- **4 Bereiche**: Netz, PV, Batterie, Hausverbrauch
- **Intelligente Formatierung**: Automatische Umrechnung (< 1000W → W, ≥ 1000W → kW mit 2 Dezimalstellen)
- **Dynamische Icons**: Batterie-Icon ändert sich je nach Ladezustand in 10%-Schritten
- **Farbcodierung**: Icons ändern ihre Farbe basierend auf Zustand und Leistung

### Animationen
- **Border-Animationen**: Rotierender Farbverlauf bei aktiver Leistung
- **Geschwindigkeit**: Animationsgeschwindigkeit abhängig von der Leistung
- **Farbschemata**:
    - Netz: Gelb→Grün (Einspeisung), Gelb→Rot→Lila (Bezug)
    - PV: Lila→Rot→Orange→Gelb→Weiß (je nach Leistung)
    - Batterie: Gelb→Grün (Laden), Gelb→Rot→Lila (Entladen)
    - Haus: Gelb→Orange→Rot→Rosa→Lila (Verbrauch)

### Interaktivität
- **Tap Actions**: Individuelle Aktionen pro Karte (Navigation, Service-Aufrufe)
- **Anpassbare Texte**: Eigene Beschriftungen für alle Bereiche
- **Sekundäre Anzeigen**: Zusätzliche Informationen oder Sensor-Werte

## Installation

### Manuelle Installation
1. Datei `dist/pv-monitor-card.js` nach `/config/www/pv-monitor-card.js` in Home Assistant kopieren
2. Ressource in Home Assistant hinzufügen (Einstellungen → Dashboards → Ressourcen):
   ```yaml
   url: /local/pv-monitor-card.js?v=0.1.0
   type: module
   ```

### HACS Installation
_(In Planung)_

## Konfiguration

### Minimale Konfiguration
```yaml
type: custom:pv-monitor-card
netz_entity: sensor.netzleistung
pv_entity: sensor.pv_leistung
batterie_entity: sensor.batterie_ladezustand
haus_entity: sensor.hausverbrauch
```

### Vollständige Konfiguration
```yaml
type: custom:pv-monitor-card

# Allgemein
show_title: false              # Titel anzeigen (Standard: true)
title: "Energie Monitor"       # Titel-Text
show_icons: true               # Icons anzeigen (Standard: true)

# Netz
netz_entity: sensor.netzleistung
netz_animation: true           # Animation aktivieren (Standard: true)
netz_show_name: false          # Name "Netz" anzeigen (Standard: true)
netz_icon: mdi:transmission-tower
netz_threshold: 10             # Schwellwert für Status-Text (Standard: 10W)
netz_text_einspeisen: "Einspeisung"  # Text bei negativen Werten
netz_text_neutral: "Neutral"         # Text zwischen -threshold und +threshold
netz_text_bezug: "Netzbezug"         # Text bei positiven Werten
netz_tap_action:
  action: navigate
  navigation_path: /lovelace/energy

# PV
pv_entity: sensor.pv_leistung
pv_animation: true
pv_show_name: false
pv_icon: mdi:solar-power
pv_secondary_text: "Inaktiv"   # Fixer Text in zweiter Zeile
# Alternativ: Sensor-Wert anzeigen
# pv_secondary_entity: sensor.pv_tagesertrag
pv_tap_action:
  action: navigate
  navigation_path: /lovelace/solar

# Batterie
batterie_entity: sensor.batterie_soc              # Ladezustand in %
batterie_animation: true
batterie_show_name: false
batterie_ladung_entity: sensor.batterie_ladung    # Für Animation & Berechnung
batterie_entladung_entity: sensor.batterie_entladung
# Zweite Zeile zeigt automatisch Lade-/Entladewert:
# Ladung > 1W: "460 W"
# Entladung > 1W: "-460 W"
# Sonst: "Inaktiv"
batterie_tap_action:
  action: call-service
  service: input_boolean.toggle
  service_data:
    entity_id: input_boolean.battery_mode

# Haus
haus_entity: sensor.hausverbrauch
haus_animation: true
haus_show_name: false
haus_icon: mdi:home
haus_secondary_text: "Geräte aktiv"
# Alternativ: Sensor-Wert
# haus_secondary_entity: sensor.aktive_geraete
haus_tap_action:
  action: none
```

## Konfigurationsoptionen

### Globale Optionen
| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `show_title` | boolean | `true` | Titel der Karte anzeigen |
| `title` | string | `"PV Monitor"` | Titel-Text |
| `show_icons` | boolean | `true` | Alle Icons ein-/ausblenden |

### Pro Bereich (netz/pv/batterie/haus)
| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `{bereich}_entity` | string | - | **Erforderlich**: Entity-ID des Sensors |
| `{bereich}_animation` | boolean | `true` | Border-Animation aktivieren |
| `{bereich}_show_name` | boolean | `true` | Bereichs-Namen anzeigen |
| `{bereich}_icon` | string | (Standard-Icon) | MDI-Icon (außer Batterie) |
| `{bereich}_tap_action` | object | - | Aktion beim Klick |
| `{bereich}_secondary_text` | string | - | Fixer Text für zweite Zeile |
| `{bereich}_secondary_entity` | string | - | Sensor für zweite Zeile |

### Spezielle Optionen

#### Netz
| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `netz_threshold` | number | `10` | Schwellwert in Watt für Statustext |
| `netz_text_einspeisen` | string | `"Einspeisung"` | Text bei Wert < -threshold |
| `netz_text_neutral` | string | `"Neutral"` | Text bei -threshold bis +threshold |
| `netz_text_bezug` | string | `"Netzbezug"` | Text bei Wert > +threshold |

#### Batterie
| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `batterie_ladung_entity` | string | - | Sensor für Ladeleistung |
| `batterie_entladung_entity` | string | - | Sensor für Entladeleistung |

**Hinweis**: Icon und Farbe ändern sich automatisch:
- Icon: 10%-Schritte (mdi:battery-10 bis mdi:battery)
- Farbe: Grün (100%) bis Rot (0%)
- Animation: Basierend auf Lade-/Entladestatus

### Tap Actions
| Action | Parameter | Beschreibung |
|--------|-----------|--------------|
| `navigate` | `navigation_path` | Zu einer Seite navigieren |
| `call-service` | `service`, `service_data` | Home Assistant Service aufrufen |
| `none` | - | Keine Aktion |

Beispiele:
```yaml
# Navigation
tap_action:
  action: navigate
  navigation_path: /lovelace/energy

# Service aufrufen
tap_action:
  action: call-service
  service: light.toggle
  service_data:
    entity_id: light.wohnzimmer

# Keine Aktion
tap_action:
  action: none
```

## Projektstruktur
```
pv-monitor-card/
├── src/               # Quellcode (TypeScript/Lit)
├── dist/              # Build-Ausgabe
├── package.json       # npm-Paketdefinition
├── vite.config.ts     # Build-Konfiguration
├── tsconfig.json      # TypeScript-Konfiguration
└── README.md          # Dokumentation
```

## Entwicklung

### Voraussetzungen
- Node.js >= 20

### Setup
```bash
git clone https://github.com/sjerocom/pv-monitor-card.git
cd pv-monitor-card
npm install
npm run build
```

Die kompilierte Datei befindet sich unter `dist/pv-monitor-card.js`

### Build-Befehle
- `npm run build` - Production Build
- `npm run dev` - Development Build mit Watch-Modus

## Technologie-Stack
- **Framework**: [Lit](https://lit.dev/) - Moderne Web Components
- **Sprache**: TypeScript
- **Build**: Vite
- **Styling**: CSS-in-JS mit Lit

## Roadmap
- [x] Grundlegende Anzeige von 4 Bereichen
- [x] Animationen und Farbschemata
- [x] Tap Actions
- [x] Batterie-Icon-Status
- [x] Sekundäre Textzeilen
- [ ] HACS-Integration
- [ ] Konfigurations-UI im Dashboard
- [ ] Mehrsprachigkeit (i18n)
- [ ] Zusätzliche Themes

## Support
Bei Problemen oder Fragen bitte ein [Issue erstellen](https://github.com/sjerocom/pv-monitor-card/issues).

## Lizenz
Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

## Credits
Inspiriert von den Mushroom Cards und der Home Assistant Community.