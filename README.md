# PV Monitor Card

Eine moderne Home Assistant Lovelace Card zur Überwachung von PV-Anlagen, Batterien und Energieflüssen.

![Version](https://img.shields.io/github/v/release/sjerocom/pv-monitor-card)
![License](https://img.shields.io/github/license/sjerocom/pv-monitor-card)
![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)

## Features

- 🌞 **PV-Anlage** mit Icon-Rotation und dynamischer Animation
- 🔋 **Batterie** mit automatischem Icon und Farbcodierung
- 🏠 **Hausverbrauch** Monitoring
- ⚡ **Netz** (Einspeisung/Bezug) Anzeige
- 📊 **Info Bar** mit bis zu 3 konfigurierbaren Items
- ⏱️ **Automatische Berechnung** von Batterie-Restlauf- und Ladezeit
- 🎨 **Vollständig anpassbar** - Farben, Größen, Animationen
- 📱 **Responsive Design** mit Grid-Layout
- 🌈 **Animierte Glow-Effekte** basierend auf Leistung

## Installation

### HACS (empfohlen)

1. Öffne HACS in Home Assistant
2. Gehe zu "Frontend"
3. Klicke auf die drei Punkte oben rechts und wähle "Custom repositories"
4. Füge `https://github.com/sjerocom/pv-monitor-card` als Repository hinzu
5. Kategorie: "Lovelace"
6. Suche nach "PV Monitor Card"
7. Klicke auf "Download"
8. Starte Home Assistant neu

### Manuelle Installation

1. Lade die neueste `pv-monitor-card.js` aus den [Releases](https://github.com/sjerocom/pv-monitor-card/releases) herunter
2. Kopiere die Datei nach `/config/www/`
3. Füge die Ressource in Home Assistant hinzu:
    - Gehe zu Einstellungen → Dashboards → Ressourcen
    - Füge `/local/pv-monitor-card.js` als JavaScript-Modul hinzu
4. Starte Home Assistant neu

## Schnellstart

```yaml
type: custom:pv-monitor-card
title: PV Monitor
subtitle: Energieübersicht

pv:
  entity: sensor.pv_power
  max_power: 10000
  animation: true
  icon_rotation: true

batterie:
  entity: sensor.battery_soc
  ladung_entity: sensor.battery_charge_power
  entladung_entity: sensor.battery_discharge_power
  battery_capacity: 10000
  animation: true

haus:
  entity: sensor.house_consumption
  animation: true

netz:
  entity: sensor.grid_power
  threshold: 10
  animation: true
```

## Konfiguration

### Basis-Optionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `title` | string | - | Titel der Card |
| `subtitle` | string | - | Untertitel |
| `icon` | string | - | Icon für Header (nur mit Titel) |
| `grid_gap` | string | `6px` | Abstand zwischen Karten |

### PV-Anlage

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `entity` | string | **erforderlich** | Entity für PV-Leistung (W) |
| `animation` | boolean | `true` | Glow-Animation aktivieren |
| `icon_rotation` | boolean | `false` | Icon dreht sich je nach Leistung |
| `max_power` | number | `10000` | Max. PV-Leistung für Animation/Rotation |
| `icon` | string | `mdi:white-balance-sunny` | Custom Icon |
| `secondary_entity` | string | - | Entity für 2. Zeile |
| `secondary_text` | string | - | Statischer Text für 2. Zeile |
| `tertiary_entity` | string | - | Entity für 3. Zeile |
| `tertiary_text` | string | - | Statischer Text für 3. Zeile |

### Batterie

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `entity` | string | **erforderlich** | Entity für Batteriestand (%) |
| `ladung_entity` | string | - | Entity für Ladeleistung (W) |
| `entladung_entity` | string | - | Entity für Entladeleistung (W) |
| `battery_capacity` | number | `10000` | Kapazität in Wh (z.B. 10000 = 10 kWh) |
| `calculate_runtime` | boolean | `false` | Rest-/Ladezeit für Info Bar berechnen |
| `animation` | boolean | `true` | Glow-Animation aktivieren |
| `icon` | string | auto | Custom Icon (leer = automatisch) |

### Haus

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `entity` | string | **erforderlich** | Entity für Hausverbrauch (W) |
| `animation` | boolean | `true` | Glow-Animation aktivieren |
| `icon` | string | `mdi:home` | Custom Icon |

### Netz

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `entity` | string | **erforderlich** | Entity für Netz (W, positiv=Bezug, negativ=Einspeisung) |
| `threshold` | number | `10` | Schwellwert für "Neutral" Status |
| `animation` | boolean | `true` | Glow-Animation aktivieren |
| `icon` | string | `mdi:transmission-tower` | Custom Icon |
| `text_einspeisen` | string | `Einspeisung` | Text bei Einspeisung |
| `text_neutral` | string | `Neutral` | Text bei neutralem Status |
| `text_bezug` | string | `Netzbezug` | Text bei Bezug |

### Info Bar

```yaml
info_bar:
  show: true
  item1:
    entity: sensor.autarkie
    icon: mdi:home-lightning-bolt
    label: Autarkie
    unit: '%'
  item2:
    # Automatisch berechnet wenn calculate_runtime: true
    icon: mdi:battery-clock
    label: Restlaufzeit
  item3:
    # Automatisch berechnet wenn calculate_runtime: true
    icon: mdi:battery-charging
    label: Restladezeit
```

### Styling

Alle Farben, Größen und Abstände sind über den visuellen Editor konfigurierbar oder per YAML:

```yaml
style:
  card_background_color: 'rgba(21, 20, 27, 1)'
  card_border_color: 'rgba(255, 255, 255, 0.1)'
  card_border_radius: '16px'
  icon_size: '2em'
  primary_size: '1.2em'
  secondary_size: '0.9em'
  # ... viele weitere Optionen
```

## Beispiele

### Minimal-Konfiguration

```yaml
type: custom:pv-monitor-card
pv:
  entity: sensor.pv_power
batterie:
  entity: sensor.battery_soc
haus:
  entity: sensor.house_consumption
netz:
  entity: sensor.grid_power
```

### Erweiterte Konfiguration mit Info Bar

```yaml
type: custom:pv-monitor-card
title: Energie-Monitor
subtitle: Live-Übersicht

info_bar:
  show: true
  item1:
    entity: sensor.autarkie
    icon: mdi:home-lightning-bolt
    label: Autarkie
  item2:
    icon: mdi:battery-clock
    label: Restlaufzeit
  item3:
    icon: mdi:battery-charging
    label: Restladezeit

pv:
  entity: sensor.pv_power
  max_power: 14000
  animation: true
  icon_rotation: true

batterie:
  entity: sensor.battery_soc
  ladung_entity: sensor.battery_charge
  entladung_entity: sensor.battery_discharge
  battery_capacity: 10000
  calculate_runtime: true
  animation: true

haus:
  entity: sensor.house_power
  animation: true

netz:
  entity: sensor.grid_power
  threshold: 10
  animation: true
```

## Screenshots

_Füge hier Screenshots deiner Card ein_

## Unterstützung

- 🐛 **Bugs** bitte als [Issue](https://github.com/sjerocom/pv-monitor-card/issues) melden
- 💡 **Feature-Requests** sind willkommen
- ⭐ **Sterne** auf GitHub helfen dem Projekt

## Entwicklung

```bash
# Dependencies installieren
npm install

# Development-Server starten
npm run dev

# Production Build
npm run build
```

## Lizenz

MIT License - siehe [LICENSE](LICENSE) Datei

## Credits

Entwickelt mit ❤️ für die Home Assistant Community