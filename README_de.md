# PV Monitor Card

Eine moderne, vollständig anpassbare Home Assistant Lovelace Card zur Überwachung von PV-Anlagen, Batteriespeichern, Energieflüssen und Verbrauchern.

![Version](https://img.shields.io/github/v/release/sjerocom/pv-monitor-card)
![License](https://img.shields.io/github/license/sjerocom/pv-monitor-card)
![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)

---

## 📖 Inhaltsverzeichnis

- [Warum diese Card?](#-warum-diese-card)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Schnellstart](#-schnellstart)
- [Benötigte Sensoren](#-benötigte-sensoren)
- [Konfiguration](#-konfiguration)
    - [Zentrale Einstellungen](#zentrale-einstellungen)
    - [PV-Anlage](#pv-anlage)
    - [Batterie](#batterie)
    - [Hausverbrauch](#hausverbrauch)
    - [Netz](#netz)
    - [Info Bar](#info-bar)
    - [Verbraucher](#verbraucher)
    - [Themes](#themes)
    - [Styling & Layout](#styling--layout)
    - [Tap Actions](#tap-actions)
- [Berechnungen](#-berechnungen)
- [Sprachen](#-sprachen)
- [Beispiele](#-beispiele)
- [Entwicklung](#-entwicklung)
- [Support](#-support)

---

## 💡 Warum diese Card?

Als ich begann, meine PV-Anlage in Home Assistant zu überwachen, suchte ich nach einer Lösung, die mir eine übersichtliche und ansprechende Darstellung aller wichtigen Informationen bietet. In einer Drittanbieter-App fand ich eine Übersicht, die mir sehr gut gefiel, und wollte diese unbedingt auch in Home Assistant haben.

Mein erster Ansatz war, diese Ansicht mit YAML und bestehenden Lovelace-Cards nachzubauen. Das Ergebnis funktionierte zwar, war aber:
- **Kompliziert zu konfigurieren** – viele verschachtelte Cards und komplexe YAML-Strukturen
- **Nicht flexibel genug** – jede Anpassung erforderte tiefgreifende YAML-Änderungen
- **Nicht zu 100% an meine Bedürfnisse anpassbar** – Design und Funktionalität waren limitiert

Da ich mich schon länger mit der Entwicklung von Custom Cards auseinandersetzen wollte, entschied ich mich, **diese Card selbst zu programmieren**. Das Ergebnis ist eine Card, die:
- ✨ **Vollständig über einen visuellen Editor konfigurierbar** ist
- 🎨 **Fast 100% anpassbar** ist – von Farben über Animationen bis hin zu Layouts
- 🌍 **Mehrsprachig** ist (Deutsch, Englisch, Französisch, Italienisch, Spanisch)
- 🎭 **Vorgefertigte Themes** bietet für schnellen Einstieg
- 📊 **Intelligente Berechnungen** für Autarkie, Eigenverbrauch und Batteriezeiten durchführt

---

## ✨ Features

### 🌞 **PV-Anlage Monitoring**
- Echtzeit-Anzeige der PV-Produktion (in Watt oder Kilowatt)
- Icon-Rotation basierend auf Leistung (optional)
- 3 verschiedene Animationsstile (Rotating Dots, Particle Field, Electric Arc)
- Zusätzliche Textzeilen für Tagesertrag, Gesamtertrag, etc.
- Vollständig anpassbare Farben und Größen

### 🔋 **Batterie Management**
- Automatische Icon-Auswahl basierend auf Ladestand
- Farbcodierung (grün > 60%, gelb 30-60%, rot < 30%)
- Anzeige von Lade-/Entladeleistung
- Automatische Berechnung von Restlaufzeit und Restladezeit
- Unterstützung für zusätzliche Informationen (Temperatur, Zyklen, etc.)

### 🏠 **Hausverbrauch**
- Anzeige des aktuellen Gesamtverbrauchs
- Optional: Summe aller konfigurierten Verbraucher
- Animationen für aktiven Verbrauch
- Individuelle Styling-Optionen

### ⚡ **Netz (Grid)**
- Status-Anzeige: Einspeisung, Neutral oder Netzbezug
- Konfigurierbarer Schwellwert für "Neutral"-Status
- Anpassbare Texte für jeden Status
- Animationen basierend auf Energiefluss

### 📊 **Info Bar**
- Bis zu 3 konfigurierbare Items
- Automatische Berechnungen:
    - **Autarkie** (Unabhängigkeit vom Netz)
    - **Eigenverbrauch** (Selbstnutzungsquote)
    - **Batterie-Restlaufzeit** (bei Entladung)
    - **Batterie-Restladezeit** (bei Ladung)
- Positionierung oben oder unten
- Eigene Sensoren oder berechnete Werte

### 🔌 **Verbraucher (Consumers)**
- Unbegrenzte Anzahl an individuellen Verbrauchern
- Automatische Farbcodierung basierend auf Status (on/off)
- Sortierung: Nach Leistung, alphabetisch oder manuell
- Schwellwert für Anzeige (nur Verbraucher über X Watt)
- Switch-Integration zum Ein-/Ausschalten
- Tap Actions für Interaktivität
- Komplett eigenes Styling pro Verbraucher möglich

### 🎨 **Design & Anpassung**
- **Vorgefertigte Themes**: Modern Dark, Blue Energy, Minimalist, Solar Bright, Nature Green, High Contrast
- **Theme-Editor**: Alle Farben zentral anpassbar
- **Kartenspezifisches Styling**: Jede Karte individuell gestaltbar
- Responsive Grid-Layout mit konfigurierbaren Abständen
- Animierte Glow-Effekte mit 3 Stilen
- Vollständige Kontrolle über Schriftgrößen, Farben, Abstände

### 🌍 **Mehrsprachigkeit**
- Deutsch 🇩🇪
- Englisch 🇬🇧
- Französisch 🇫🇷
- Italienisch 🇮🇹
- Spanisch 🇪🇸
- Automatische Spracherkennung basierend auf Home Assistant Einstellungen

### 🖱️ **Interaktivität**
- Tap, Double-Tap und Hold Actions für alle Karten
- Navigation zu anderen Views
- Aufrufen von Services
- Öffnen von URLs
- More-Info Dialoge

---

## 📸 Screenshots

_Hier können Screenshots der Card in verschiedenen Konfigurationen eingefügt werden_

---

## 📦 Installation

### HACS (Empfohlen)

1. Öffne **HACS** in Home Assistant
2. Gehe zu **Frontend**
3. Klicke auf die **drei Punkte** oben rechts
4. Wähle **"Custom repositories"**
5. Füge diese URL hinzu: `https://github.com/sjerocom/pv-monitor-card`
6. Kategorie: **"Lovelace"**
7. Klicke auf **"Add"**
8. Suche nach **"PV Monitor Card"**
9. Klicke auf **"Download"**
10. **Starte Home Assistant neu**

### Manuelle Installation

1. Lade die neueste `pv-monitor-card.js` aus den [Releases](https://github.com/sjerocom/pv-monitor-card/releases) herunter
2. Kopiere die Datei nach `/config/www/community/pv-monitor-card/`
3. Füge die Ressource in Home Assistant hinzu:
    - Gehe zu **Einstellungen → Dashboards → Ressourcen**
    - Klicke auf **"+ Ressource hinzufügen"**
    - URL: `/local/community/pv-monitor-card/pv-monitor-card.js`
    - Typ: **JavaScript-Modul**
4. **Starte Home Assistant neu**

### Verifizierung

Nach der Installation kannst du die Card zu deinem Dashboard hinzufügen:
1. Gehe in den **Edit-Modus** deines Dashboards
2. Klicke auf **"+ Karte hinzufügen"**
3. Suche nach **"PV Monitor Card"** oder gib manuell ein:
   ```yaml
   type: custom:pv-monitor-card
   ```

---

## 🚀 Schnellstart

### Minimal-Konfiguration

Die absolut minimale Konfiguration benötigt nur 3 Entities:

```yaml
type: custom:pv-monitor-card
entities:
  pv_production: sensor.pv_power          # PV-Leistung in W
  house_consumption: sensor.house_power   # Hausverbrauch in W
  grid_power: sensor.grid_power           # Netz in W (+ = Bezug, - = Einspeisung)
```

### Empfohlene Basis-Konfiguration

Für den vollen Funktionsumfang inkl. Batterie:

```yaml
type: custom:pv-monitor-card
title: Energie-Monitor
subtitle: Live-Übersicht

# Zentrale Entities
entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

# Zentrale Konfiguration
pv_max_power: 10000        # 10 kW PV-Anlage
battery_capacity: 10000    # 10 kWh Batteriespeicher
grid_threshold: 10         # ±10W als "Neutral"

# Info Bar aktivieren
info_bar:
  show: true
  calculate_battery_times: true
```

---

## 📡 Benötigte Sensoren

### Pflicht-Sensoren (Minimal)

| Sensor | Entity Typ | Einheit | Beschreibung |
|--------|-----------|---------|--------------|
| **PV-Produktion** | `sensor.*` | W | Aktuelle PV-Leistung (nur positive Werte) |
| **Hausverbrauch** | `sensor.*` | W | Gesamtverbrauch des Haushalts |
| **Netz** | `sensor.*` | W | Netzbezug/Einspeisung (positiv = Bezug, negativ = Einspeisung) |

### Optional für volle Funktionalität

| Sensor | Entity Typ | Einheit | Beschreibung |
|--------|-----------|---------|--------------|
| **Batterie-Ladestand** | `sensor.*` | % | State of Charge (0-100%) |
| **Batterie-Ladeleistung** | `sensor.*` | W | Aktuelle Ladeleistung (positiv) |
| **Batterie-Entladeleistung** | `sensor.*` | W | Aktuelle Entladeleistung (positiv) |
| **Tagesertrag PV** | `sensor.*` | kWh | Ertrag des aktuellen Tages |
| **Gesamtertrag PV** | `sensor.*` | kWh/MWh | Lifetime-Ertrag der PV-Anlage |
| **Autarkie** | `sensor.*` | % | Unabhängigkeit vom Netz (optional, kann berechnet werden) |
| **Eigenverbrauch** | `sensor.*` | % | Selbstnutzung der PV-Produktion (optional) |

### Verbraucher-Sensoren

| Sensor | Entity Typ | Einheit | Beschreibung |
|--------|-----------|---------|--------------|
| **Verbraucher Leistung** | `sensor.*` | W | Aktuelle Leistungsaufnahme des Verbrauchers |
| **Verbraucher Switch** | `switch.*` oder `input_boolean.*` | - | Optional: Zum Ein-/Ausschalten |

> **💡 Tipp**: Die meisten Wechselrichter und Energiezähler in Home Assistant liefern diese Sensoren bereits. Bei Fronius, SolarEdge, Huawei, etc. sind diese oft automatisch verfügbar.

---

## ⚙️ Konfiguration

### Zentrale Einstellungen

Diese Einstellungen werden im Tab **"Allgemein"** → **"Zentrale Entities"** konfiguriert:

```yaml
entities:
  pv_production: sensor.pv_power              # Pflicht
  battery_soc: sensor.battery_soc             # Optional
  battery_charge: sensor.battery_charge       # Optional
  battery_discharge: sensor.battery_discharge # Optional
  house_consumption: sensor.house_power       # Pflicht
  grid_power: sensor.grid_power               # Pflicht
```

**Zentrale Konfiguration** (Tab "Allgemein" → "Zentrale Konfiguration"):

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `pv_max_power` | number | `10000` | Maximale PV-Leistung in Watt (für Animationen und Icon-Rotation) |
| `battery_capacity` | number | `10000` | Batteriekapazität in Wattstunden (z.B. 10000 = 10 kWh) |
| `grid_threshold` | number | `10` | Schwellwert in Watt für "Neutral"-Status (±X Watt) |

**Sichtbarkeit der Karten** (Tab "Allgemein" → "Karten-Sichtbarkeit"):

```yaml
pv:
  show: true          # PV-Karte anzeigen
batterie:
  show: true          # Batterie-Karte anzeigen
haus:
  show: true          # Haus-Karte anzeigen
netz:
  show: true          # Netz-Karte anzeigen
```

**Header** (Tab "Allgemein" → "Karten-Header"):

```yaml
title: Energie-Monitor      # Haupttitel
subtitle: Live-Übersicht    # Untertitel
icon: mdi:solar-power       # Icon neben dem Titel
```

---

### PV-Anlage

Die PV-Karte zeigt die aktuelle Solarproduktion.

#### Basis-Konfiguration

```yaml
pv:
  show: true                          # Karte anzeigen
  icon: mdi:white-balance-sunny       # Custom Icon
  animation: true                     # Animation aktivieren
  animation_style: rotating-dots      # rotating-dots | particle-field | electric-arc
  icon_rotation: true                 # Icon dreht sich mit Leistung
```

#### Zusätzliche Texte

```yaml
pv:
  # Zweite Zeile (z.B. Tagesertrag)
  secondary_entity: sensor.pv_daily_yield
  secondary_text: "Heute"             # Statischer Text vor dem Wert
  
  # Dritte Zeile (z.B. Gesamtertrag)
  tertiary_entity: sensor.pv_total_yield
  tertiary_text: "Gesamt"
```

#### Styling

```yaml
pv:
  style:
    background_color: 'rgba(21, 20, 27, 1)'
    border_color: 'rgba(255, 255, 255, 0.1)'
    primary_color: '#FFD700'        # Farbe für Hauptwert
    secondary_color: '#FFA500'      # Farbe für Sekundärtext
    icon_color: '#FFD700'           # Icon-Farbe
```

#### Tap Actions

```yaml
pv:
  tap_action:
    action: more-info
  double_tap_action:
    action: navigate
    navigation_path: /lovelace/energy
  hold_action:
    action: call-service
    service: script.pv_reset
```

**Mögliche Actions:**
- `none` – Keine Aktion
- `more-info` – Öffnet More-Info Dialog
- `navigate` – Navigation zu einem Dashboard (benötigt `navigation_path`)
- `url` – Öffnet URL (benötigt `url_path`)
- `call-service` – Ruft Service auf (benötigt `service` und optional `service_data`)

---

### Batterie

Die Batterie-Karte zeigt den Ladestand und die Lade-/Entladeleistung.

#### Basis-Konfiguration

```yaml
batterie:
  show: true
  icon: ''                    # Leer = automatisch (basierend auf SoC)
  animation: true
  animation_style: electric-arc
```

**Automatische Icon-Auswahl:**
- SoC > 90% → `mdi:battery`
- SoC > 70% → `mdi:battery-80`
- SoC > 50% → `mdi:battery-60`
- SoC > 30% → `mdi:battery-40`
- SoC > 10% → `mdi:battery-20`
- SoC ≤ 10% → `mdi:battery-alert`

Bei Ladung wird `-charging` angehängt (z.B. `mdi:battery-60-charging`)

#### Farbcodierung

Die Batterie wird automatisch farbcodiert:
- **Grün** (SoC > 60%)
- **Gelb** (SoC 30-60%)
- **Rot** (SoC < 30%)

#### Zusätzliche Texte

```yaml
batterie:
  secondary_entity: sensor.battery_temperature
  secondary_text: "Temperatur"
  
  tertiary_entity: sensor.battery_cycles
  tertiary_text: "Zyklen"
```

---

### Hausverbrauch

Die Haus-Karte zeigt den aktuellen Gesamtverbrauch.

#### Basis-Konfiguration

```yaml
haus:
  show: true
  icon: mdi:home
  animation: true
  animation_style: particle-field
  show_consumer_total: false    # Summe aller Verbraucher anzeigen
```

**Verbraucher-Summe:**
Wenn `show_consumer_total: true` und Verbraucher konfiguriert sind, wird in der zweiten Zeile die Summe aller aktiven Verbraucher angezeigt:
```
Haus: 3450 W
Verbraucher: 2100 W  ← Summe aller konfig. Verbraucher
```

#### Zusätzliche Texte

```yaml
haus:
  secondary_entity: sensor.house_daily_consumption
  secondary_text: "Heute"
```

---

### Netz

Die Netz-Karte zeigt Einspeisung, Netzbezug oder neutralen Status.

#### Basis-Konfiguration

```yaml
netz:
  show: true
  icon: mdi:transmission-tower
  animation: true
  animation_style: rotating-dots
```

#### Status-Texte

```yaml
netz:
  text_einspeisen: "Einspeisung"    # Bei negativen Werten
  text_neutral: "Neutral"           # Bei ±threshold
  text_bezug: "Netzbezug"          # Bei positiven Werten
```

**Status-Logik:**
- `grid_power < -threshold` → Einspeisung (grün)
- `-threshold ≤ grid_power ≤ threshold` → Neutral (grau)
- `grid_power > threshold` → Netzbezug (rot)

#### Zusätzliche Texte

```yaml
netz:
  secondary_entity: sensor.grid_daily_export
  secondary_text: "Einspeisung heute"
  
  tertiary_entity: sensor.grid_daily_import
  tertiary_text: "Bezug heute"
```

---

### Info Bar

Die Info Bar zeigt bis zu 3 konfigurierbare Werte an.

#### Basis-Konfiguration

```yaml
info_bar:
  show: true
  position: top                    # top | bottom
  calculation_mode: autarky        # autarky | self_consumption
  calculate_battery_times: true   # Batterie-Zeiten berechnen
```

#### Berechnungsmodi

**Autarky (Autarkie):**
```
Autarkie = (Hausverbrauch - Netzbezug) / Hausverbrauch * 100
```
Gibt an, wie viel % des Verbrauchs selbst erzeugt wurden.

**Self Consumption (Eigenverbrauch):**
```
Eigenverbrauch = (PV-Produktion - Netz-Einspeisung) / PV-Produktion * 100
```
Gibt an, wie viel % der PV-Produktion selbst genutzt wurden.

#### Items konfigurieren

**Item 1 – Autarkie/Eigenverbrauch (automatisch):**
```yaml
info_bar:
  item1:
    entity: ''                          # Leer = automatisch berechnet
    icon: mdi:home-lightning-bolt
    label: 'Autarkie'                  # oder 'Eigenverbrauch'
    unit: '%'
```

**Item 2 – Restlaufzeit (automatisch bei `calculate_battery_times: true`):**
```yaml
info_bar:
  item2:
    entity: ''                          # Leer = automatisch berechnet
    icon: mdi:battery-clock
    label: 'Restlaufzeit'
    unit: ''                            # Einheit wird automatisch gesetzt
```

**Item 3 – Restladezeit (automatisch bei `calculate_battery_times: true`):**
```yaml
info_bar:
  item3:
    entity: ''                          # Leer = automatisch berechnet
    icon: mdi:battery-charging
    label: 'Restladezeit'
    unit: ''
```

**Eigene Entities verwenden:**
```yaml
info_bar:
  item1:
    entity: sensor.solar_forecast_today
    icon: mdi:weather-sunny
    label: 'Prognose'
    unit: 'kWh'
```

#### Tap Actions

```yaml
info_bar:
  tap_action:
    action: navigate
    navigation_path: /lovelace/energy-details
```

---

### Verbraucher

Die Verbraucher-Section zeigt einzelne Stromverbraucher mit deren aktueller Leistung.

#### Aktivierung

```yaml
consumers:
  show: true
  position: bottom                  # Derzeit nur 'bottom'
  sort_mode: highest_first          # highest_first | lowest_first | none | alpha_asc | alpha_desc
  threshold: 10                     # Nur Verbraucher > X Watt anzeigen
```

**Sort-Modi:**
- `highest_first` – Höchster Verbrauch zuerst
- `lowest_first` – Niedrigster Verbrauch zuerst
- `none` – Keine Sortierung (Reihenfolge wie konfiguriert)
- `alpha_asc` – Alphabetisch A-Z
- `alpha_desc` – Alphabetisch Z-A

#### Verbraucher hinzufügen

```yaml
consumers:
  items:
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Geschirrspüler'
      threshold: 5                  # Individueller Schwellwert
      auto_color: true              # Automatische Farbe bei on/off
      
      # Optional: Zusätzliche Texte
      show_primary: true            # Hauptwert anzeigen
      primary_entity: ''            # Leer = entity-Wert
      primary_text: ''
      
      show_secondary: true
      secondary_entity: sensor.dishwasher_energy_daily
      secondary_text: 'Heute'
      
      # Optional: Switch zum Ein-/Ausschalten
      switch_entity: switch.dishwasher
      
      # Optional: Tap Actions
      tap_action:
        action: more-info
      
      # Optional: Individuelles Styling
      style:
        icon_color: '#2196F3'
        background_color: 'rgba(33, 150, 243, 0.1)'
```

#### Auto-Color

Wenn `auto_color: true`:
- **Verbraucher aktiv** (> threshold): Grüne Farbe
- **Verbraucher inaktiv** (≤ threshold): Graue/gedimmte Farbe

#### Switch-Integration

Mit `switch_entity` wird ein Icon-Button angezeigt:
- **Tap** auf Icon → Schaltet den Switch um
- **Tap** auf Rest der Karte → Tap Action (z.B. more-info)

#### Styling (Global)

Globale Styles für alle Verbraucher:

```yaml
consumers:
  style:
    gap: '6px'                          # Abstand zwischen Verbrauchern
    item_background_color: 'rgba(21, 20, 27, 1)'
    item_border_color: 'rgba(255, 255, 255, 0.1)'
    item_border_radius: '12px'
    item_padding: '8px'
    icon_size: '1.5em'
    icon_opacity: '1'
    primary_size: '1em'
    primary_font_weight: 'bold'
    primary_opacity: '1'
    secondary_size: '0.8em'
    secondary_font_weight: 'normal'
    secondary_opacity: '0.7'
```

#### Styling (Pro Verbraucher)

Jeder Verbraucher kann individuell gestylt werden:

```yaml
consumers:
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'E-Auto Ladestation'
      style:
        icon_size: '2em'
        icon_color: '#4CAF50'
        primary_color: '#4CAF50'
        background_color: 'rgba(76, 175, 80, 0.1)'
        border_color: 'rgba(76, 175, 80, 0.3)'
```

#### Summe der Verbraucher

Die Summe aller Verbraucher kann in der Haus-Karte angezeigt werden:
```yaml
haus:
  show_consumer_total: true
```

Dann wird automatisch berechnet:
```
Summe = Σ(alle Verbraucher mit power > threshold)
```

---

### Themes

Die Card bietet vorgefertigte Themes für schnellen Einstieg.

#### Verfügbare Themes

1. **Modern Dark** (Standard)
    - Dunkler Hintergrund, moderne Farbakzente
    - Blau-violette Highlights

2. **Blue Energy**
    - Blaue Energiefarben
    - Kühle, technische Ästhetik

3. **Minimalist**
    - Reduzierte Farben
    - Klare, minimalistische Linien

4. **Solar Bright**
    - Helle, sonnige Farben
    - Gelb-orange Akzente

5. **Nature Green**
    - Grüne, natürliche Farben
    - Organische Farbgebung

6. **High Contrast**
    - Hohe Kontraste für bessere Lesbarkeit
    - Barrierefreies Design

#### Theme anwenden

```yaml
theme: modern-dark    # oder blue-energy, minimalist, etc.
```

Themes können im visuellen Editor im Tab **"Styling"** → **"Theme"** ausgewählt werden.

#### Theme anpassen

Nach Auswahl eines Themes können alle Farben im **Theme Editor** angepasst werden:

```yaml
theme: modern-dark
style:
  card_background_color: 'rgba(21, 20, 27, 1)'
  card_border_color: 'rgba(255, 255, 255, 0.1)'
  card_text_color: 'white'
  # ... alle weiteren Theme-Farben
```

**Wichtig:** Theme-Styles überschreiben **nicht** die kartenspezifischen Styles (PV, Batterie, Haus, Netz). Diese müssen separat in den jeweiligen Karten-Tabs angepasst werden.

---

### Styling & Layout

#### Globales Layout

```yaml
grid_gap: '6px'                 # Abstand zwischen den Hauptkarten

style:
  header_margin_bottom: '12px'  # Abstand Header zu Karten
  infobar_gap: '6px'           # Abstand zwischen Info-Bar Items
  
  title_align: center           # left | center | right
  subtitle_align: center
  
  card_cursor: pointer          # Cursor beim Hover
```

#### Header Styling

```yaml
style:
  # Titel
  title_color: 'white'
  title_size: '1.5em'
  title_font_weight: 'bold'
  
  # Untertitel
  subtitle_color: 'rgba(255, 255, 255, 0.7)'
  subtitle_size: '1em'
  subtitle_font_weight: 'normal'
```

#### Globales Icon Styling

```yaml
style:
  icon_size: '2em'
  icon_opacity: '1'
  icon_margin: '6px'
```

#### Globales Text Styling

```yaml
style:
  # Primärer Text (Hauptwert)
  primary_color: 'white'
  primary_size: '1.2em'
  primary_font_opacity: '1'
  primary_font_weight: 'normal'
  
  # Sekundärer Text
  secondary_color: 'white'
  secondary_size: '0.9em'
  secondary_font_opacity: '0.7'
  secondary_font_weight: 'normal'
  
  # Tertiärer Text
  tertiary_color: 'white'
  tertiary_size: '0.9em'
  tertiary_font_opacity: '0.7'
  tertiary_font_weight: 'normal'
```

#### Karten Styling

```yaml
style:
  card_background_color: 'rgba(21, 20, 27, 1)'
  card_border_color: 'rgba(255, 255, 255, 0.1)'
  card_border_radius: '16px'
  card_padding: '12px'
```

> **💡 Tipp**: Alle Farben können als `rgba()`, `rgb()`, `hex` (#FFFFFF) oder CSS-Farbnamen angegeben werden.

---

### Tap Actions

Tap Actions können für folgende Karten konfiguriert werden:
- PV-Anlage
- Batterie
- Hausverbrauch
- Netz
- Info Bar
- Jeder einzelne Verbraucher

#### Action-Typen

**1. None (Keine Aktion)**
```yaml
tap_action:
  action: none
```

**2. More Info**
```yaml
tap_action:
  action: more-info
```
Öffnet den More-Info Dialog der Entity.

**3. Navigate**
```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/energy
```
Navigiert zu einem anderen Dashboard/View.

**4. URL**
```yaml
tap_action:
  action: url
  url_path: https://example.com
```
Öffnet eine externe URL (in neuem Tab).

**5. Call Service**
```yaml
tap_action:
  action: call-service
  service: light.turn_on
  service_data:
    entity_id: light.living_room
    brightness: 255
```
Ruft einen Home Assistant Service auf.

#### Multi-Action Support

Jede Karte unterstützt 3 verschiedene Actions:

```yaml
pv:
  tap_action:
    action: more-info
  double_tap_action:
    action: navigate
    navigation_path: /lovelace/solar
  hold_action:
    action: call-service
    service: script.pv_maintenance_mode
```

---

## 🧮 Berechnungen

Die Card führt automatisch verschiedene Berechnungen durch.

### Autarkie (Autonomy)

**Formel:**
```
Autarkie = ((Hausverbrauch - Netzbezug) / Hausverbrauch) × 100
```

**Bedeutung:**  
Gibt an, welcher Prozentsatz des Hausverbrauchs durch eigene Erzeugung (PV + Batterie) gedeckt wird.

**Beispiel:**
- Hausverbrauch: 3000 W
- Netzbezug: 500 W
- Autarkie = ((3000 - 500) / 3000) × 100 = 83,3%

**Besonderheiten:**
- Bei Einspeisung (negativer Netzbezug) kann Autarkie > 100% sein
- Wird auf 100% begrenzt in der Anzeige

### Eigenverbrauch (Self Consumption)

**Formel:**
```
Eigenverbrauch = ((PV-Produktion - Einspeisung) / PV-Produktion) × 100
```

**Bedeutung:**  
Gibt an, welcher Prozentsatz der PV-Produktion selbst verbraucht wird (nicht eingespeist).

**Beispiel:**
- PV-Produktion: 5000 W
- Einspeisung: 1000 W
- Eigenverbrauch = ((5000 - 1000) / 5000) × 100 = 80%

### Batterie-Restlaufzeit

**Formel:**
```
Restlaufzeit = (Batterieladung × Batteriekapazität) / Entladeleistung
```

**Beispiel:**
- Batterieladung: 60% (0.6)
- Batteriekapazität: 10000 Wh
- Entladeleistung: 1500 W
- Restlaufzeit = (0.6 × 10000) / 1500 = 4 Stunden

**Anzeige:**
- Über 1 Stunde: "X Std Y Min"
- Unter 1 Stunde: "X Minuten"
- Keine Entladung: "Nicht verfügbar"

### Batterie-Restladezeit

**Formel:**
```
Restladezeit = ((100 - Batterieladung) × Batteriekapazität) / Ladeleistung
```

**Beispiel:**
- Batterieladung: 40% (0.4)
- Batteriekapazität: 10000 Wh
- Ladeleistung: 3000 W
- Restladezeit = ((1 - 0.4) × 10000) / 3000 = 2 Stunden

**Anzeige:**
- Über 1 Stunde: "X Std Y Min"
- Unter 1 Stunde: "X Minuten"
- Keine Ladung: "Nicht verfügbar"
- Voll geladen: "Voll"

### Verbraucher-Summe

**Formel:**
```
Summe = Σ(Verbraucher mit Leistung > threshold)
```

Alle Verbraucher, deren Leistung über dem konfigurierten Schwellwert liegt, werden summiert.

**Beispiel:**
- Geschirrspüler: 1200 W (> 10 W threshold)
- Waschmaschine: 400 W (> 10 W threshold)
- TV: 5 W (< 10 W threshold, nicht gezählt)
- **Summe: 1600 W**

---

## 🌍 Sprachen

Die Card unterstützt 5 Sprachen und erkennt automatisch die Home Assistant Sprache.

### Unterstützte Sprachen

- 🇩🇪 **Deutsch** (`de`)
- 🇬🇧 **Englisch** (`en`)
- 🇫🇷 **Französisch** (`fr`)
- 🇮🇹 **Italienisch** (`it`)
- 🇪🇸 **Spanisch** (`es`)

### Sprache einstellen

**Automatisch (empfohlen):**
Die Card erkennt automatisch die Sprache aus den Home Assistant Einstellungen.

**Manuell:**
```yaml
language: de    # de | en | fr | it | es
```

### Übersetzte Elemente

- Alle Editor-Labels und Beschreibungen
- Status-Texte (Einspeisung, Netzbezug, etc.)
- Info-Bar Labels (Autarkie, Restlaufzeit, etc.)
- Zeitangaben (Stunden, Minuten, etc.)

---

## 📋 Beispiele

### Beispiel 1: Minimal-Setup ohne Batterie

```yaml
type: custom:pv-monitor-card
entities:
  pv_production: sensor.pv_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

pv_max_power: 8000

batterie:
  show: false
```

### Beispiel 2: Full-Featured mit allem

```yaml
type: custom:pv-monitor-card
title: Energie-Monitor
subtitle: Echtzeit-Übersicht
icon: mdi:solar-power

language: de
theme: modern-dark

# Zentrale Entities
entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

# Zentrale Konfiguration
pv_max_power: 14000
battery_capacity: 15000
grid_threshold: 10

# Info Bar
info_bar:
  show: true
  position: top
  calculation_mode: autarky
  calculate_battery_times: true
  item1:
    icon: mdi:home-lightning-bolt
    label: 'Autarkie'
  item2:
    icon: mdi:battery-clock
    label: 'Restlaufzeit'
  item3:
    icon: mdi:battery-charging
    label: 'Restladezeit'

# PV
pv:
  show: true
  animation: true
  animation_style: particle-field
  icon_rotation: true
  secondary_entity: sensor.pv_daily_yield
  secondary_text: 'Heute'
  tertiary_entity: sensor.pv_total_yield
  tertiary_text: 'Gesamt'

# Batterie
batterie:
  show: true
  animation: true
  animation_style: electric-arc
  secondary_entity: sensor.battery_temperature
  secondary_text: 'Temperatur'

# Haus
haus:
  show: true
  animation: true
  show_consumer_total: true
  secondary_entity: sensor.house_daily_consumption
  secondary_text: 'Heute'

# Netz
netz:
  show: true
  animation: true
  secondary_entity: sensor.grid_daily_export
  secondary_text: 'Einspeisung'
  tertiary_entity: sensor.grid_daily_import
  tertiary_text: 'Bezug'

# Verbraucher
consumers:
  show: true
  position: bottom
  sort_mode: highest_first
  threshold: 10
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'E-Auto'
      switch_entity: switch.ev_charger
      auto_color: true
      
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Wärmepumpe'
      auto_color: true
      
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Geschirrspüler'
      threshold: 5
      secondary_entity: sensor.dishwasher_energy_daily
      secondary_text: 'Heute'
```

### Beispiel 3: Custom Theme

```yaml
type: custom:pv-monitor-card

# Basis-Theme als Ausgangspunkt
theme: solar-bright

# Theme-Anpassungen
style:
  card_background_color: 'rgba(255, 248, 220, 1)'
  card_text_color: '#333333'
  primary_color: '#FF8C00'
  
  # Karten-spezifisch
  card_border_radius: '20px'
  icon_size: '2.5em'

# PV mit eigenem Styling
pv:
  style:
    background_color: 'rgba(255, 215, 0, 0.2)'
    icon_color: '#FFD700'
    primary_color: '#FF8C00'
```

### Beispiel 4: Verbraucher mit Actions

```yaml
consumers:
  show: true
  items:
    - entity: sensor.washing_machine_power
      icon: mdi:washing-machine
      label: 'Waschmaschine'
      switch_entity: switch.washing_machine
      tap_action:
        action: more-info
      double_tap_action:
        action: call-service
        service: notify.mobile_app
        service_data:
          message: 'Waschmaschine wurde manuell angetippt'
      hold_action:
        action: navigate
        navigation_path: /lovelace/laundry
      style:
        icon_color: '#2196F3'
        background_color: 'rgba(33, 150, 243, 0.1)'
```

---

## 🛠️ Entwicklung

### Voraussetzungen

- Node.js (v14 oder höher)
- npm

### Setup

```bash
# Repository klonen
git clone https://github.com/sjerocom/pv-monitor-card.git
cd pv-monitor-card

# Dependencies installieren
npm install
```

### Development

```bash
# Development-Server starten
npm run dev

# Öffne http://localhost:5000 im Browser
```

### Build

```bash
# Production Build erstellen
npm run build

# Ausgabe in: dist/pv-monitor-card.js
```

### Projekt-Struktur

```
pv-monitor-card/
├── src/
│   ├── pv-monitor-card.ts           # Hauptkomponente
│   ├── pv-monitor-card-editor.ts    # Visueller Editor
│   ├── pv-monitor-card-types.ts     # TypeScript Typen
│   ├── pv-monitor-card-i18n.ts      # Übersetzungen
│   └── pv-monitor-card-themes.ts    # Theme-Definitionen
├── dist/                            # Build-Ausgabe
├── hacs.json                        # HACS Manifest
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💬 Support

### Bug Reports & Feature Requests

Bitte nutze die [GitHub Issues](https://github.com/sjerocom/pv-monitor-card/issues) für:
- 🐛 **Bug Reports** – Beschreibe das Problem mit Logs und Config
- 💡 **Feature Requests** – Schlage neue Features vor
- 📖 **Dokumentation** – Fehler oder Verbesserungsvorschläge

### Community

- ⭐ **GitHub Stars** helfen dem Projekt
- 🗨️ **Diskussionen** im GitHub Discussions Bereich
- 📣 **Teile** die Card in der Home Assistant Community

### Häufige Probleme

**Problem: Card wird nicht angezeigt**
- Prüfe, ob die Ressource korrekt hinzugefügt wurde
- Leere den Browser-Cache (Strg+Shift+R)
- Prüfe die Browser-Konsole auf Fehler

**Problem: Animationen funktionieren nicht**
- Prüfe, ob `animation: true` gesetzt ist
- Stelle sicher, dass die Entity Werte > 0 liefert

**Problem: Berechnungen sind falsch**
- Prüfe die korrekten Entities in der Zentral-Konfiguration
- Stelle sicher, dass `pv_max_power` und `battery_capacity` korrekt sind
- Überprüfe die Einheiten der Sensoren (W, %, etc.)

---

## 📄 Lizenz

MIT License

Copyright (c) 2024 sjerocom

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🙏 Credits

Entwickelt mit ❤️ für die Home Assistant Community.

**Besonderer Dank an:**
- Die Home Assistant Community für Inspiration und Feedback
- Alle Mitwirkenden, die Issues melden und Features vorschlagen
- Alle, die diese Card nutzen und weiterempfehlen

---

**Viel Spaß mit der PV Monitor Card! ☀️🔋**