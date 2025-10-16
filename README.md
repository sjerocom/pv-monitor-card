# PV Monitor Card

> 🧩 A **custom Lovelace card** for [Home Assistant](https://www.home-assistant.io/) - Installable via [HACS](https://hacs.xyz)
>
> Advanced, fully customizable visualization of your solar energy system directly within Home Assistant dashboards.

[![release](https://img.shields.io/github/v/release/sjerocom/pv-monitor-card?color=blue&label=release)](https://github.com/sjerocom/pv-monitor-card/releases)
[![HACS](https://img.shields.io/badge/HACS-Default-blue)](https://github.com/hacs/default)
[![downloads](https://img.shields.io/github/downloads/sjerocom/pv-monitor-card/total?color=brightgreen)](https://github.com/sjerocom/pv-monitor-card/releases)
[![license](https://img.shields.io/github/license/sjerocom/pv-monitor-card?color=green)](https://github.com/sjerocom/pv-monitor-card/blob/main/LICENSE)

---

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=sjerocom&repository=pv-monitor-card)
[![Add Card to Dashboard](https://my.home-assistant.io/badges/lovelace_add_card.svg)](https://my.home-assistant.io/redirect/lovelace_add_card/?type=custom:pv-monitor-card)

---

## 📸 Screenshots

| Dark Theme | Light Theme |
|------------|-------------|
| ![Dark Theme](img/Preview%20-%20Dark%20Theme.png) | ![Light Theme](img/Preview%20-%20Light%20Theme.png) |

| DrWho Theme | Matrix Theme |
|-------------|--------------|
| ![DrWho Theme](img/Preview%20-%20DrWho%20Theme.png) | ![Matrix Theme](img/Preview%20-%20Matrix%20Theme.png) |

| Info Bar | Consumers | Styling |
|----------|-----------|---------|
| ![Info Bar](img/Customizable%20-%20Infobar.png) | ![Consumers](img/Customizable%20-%20Devices.png) | ![Styling](img/Customizable%20-%20Styles.png) |

---

## ✨ Features

🌞 **PV System** – Real-time production with animated icons and effects  
🔋 **Battery** – Automatic icon selection, runtime & charge time calculations  
🏠 **House** – Total consumption with optional consumer sum  
⚡ **Grid** – Feed-in/consumption status with color-coded animations  
📊 **Info Bar** – Autonomy, self-consumption & battery time calculations  
🔌 **Consumers** – Unlimited devices with sorting, thresholds & switch control  
🎨 **Themes** – 6+ pre-built themes + full customization  
🌍 **Languages** – DE 🇩🇪 | EN 🇬🇧 | FR 🇫🇷 | IT 🇮🇹 | ES 🇪🇸

---

## 📦 Installation

### HACS (Recommended)

1. Open **HACS** → **Frontend**
2. Click **⋮** → **Custom repositories**
3. Add: `https://github.com/sjerocom/pv-monitor-card`
4. Category: **Dashboard**
5. Search for **PV Monitor Card** and install
6. **Refresh Home Assistant**

### Manual

1. Download [latest release](https://github.com/sjerocom/pv-monitor-card/releases/latest)
2. Copy `pv-monitor-card.js` to `/config/www/community/pv-monitor-card/`
3. Add resource: `/local/community/pv-monitor-card/pv-monitor-card.js`
4. **Refresh Home Assistant**

---

## 🚀 Quick Start

### Minimal Configuration

Only 3 sensors required:

```yaml
type: custom:pv-monitor-card
entities:
  pv_production: sensor.pv_power          # PV power in W
  house_consumption: sensor.house_power   # House consumption in W
  grid_power: sensor.grid_power           # Grid in W (+ = consumption, - = feed-in)
```

### Recommended Setup

With battery support:

```yaml
type: custom:pv-monitor-card
title: Energy Monitor
subtitle: Live Overview

entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

pv_max_power: 10000        # 10 kW PV system
battery_capacity: 10000    # 10 kWh battery
grid_threshold: 10         # ±10W neutral zone

info_bar:
  show: true
  calculate_battery_times: true
```

---

## 📡 Required Sensors

### Mandatory

| Sensor | Unit | Description |
|--------|------|-------------|
| **PV Production** | W | Current PV power |
| **House Consumption** | W | Total household consumption |
| **Grid** | W | Grid power (+ consumption / - feed-in) |

### Optional (for full features)

| Sensor | Unit | Description |
|--------|------|-------------|
| **Battery SoC** | % | State of Charge (0-100%) |
| **Battery Charge** | W | Current charging power |
| **Battery Discharge** | W | Current discharge power |
| **Consumer Power** | W | Individual device consumption |

> Most inverters (Fronius, SolarEdge, Huawei, etc.) provide these sensors automatically.

---

## ⚙️ Configuration

### 📚 Detailed Documentation

- **[PV System Configuration](docs/pv-config.md)** – Production, animations, icon rotation
- **[Battery Configuration](docs/battery-config.md)** – SoC, charging, runtime calculations
- **[House Configuration](docs/house-config.md)** – Consumption, consumer sum
- **[Grid Configuration](docs/grid-config.md)** – Feed-in, consumption, status
- **[Info Bar Configuration](docs/infobar-config.md)** – Autonomy, calculations, custom values
- **[Consumers Configuration](docs/consumers-config.md)** – Individual devices, sorting, switches
- **[Styling & Layout](docs/styling-config.md)** – Themes, colors, fonts, spacing

### Quick Configuration Examples

<details>
<summary><b>Enable Info Bar with Calculations</b></summary>

```yaml
info_bar:
  show: true
  position: top
  calculation_mode: autarky          # or self_consumption
  calculate_battery_times: true
```
</details>

<details>
<summary><b>Add Consumers</b></summary>

```yaml
consumers:
  show: true
  sort_mode: highest_first
  threshold: 10
  items:
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
    
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      switch_entity: switch.ev_charger
```
</details>

<details>
<summary><b>Apply Theme</b></summary>

```yaml
theme: solar-bright    # modern-dark | blue-energy | minimalist | solar-bright | nature-green | high-contrast
```
</details>

<details>
<summary><b>Customize Card Styling</b></summary>

```yaml
pv:
  style:
    background_color: 'rgba(255, 215, 0, 0.1)'
    border_color: 'rgba(255, 215, 0, 0.3)'
    primary_color: '#FFD700'
    icon_color: '#FFD700'
```
</details>

<details>
<summary><b>Add Tap Actions</b></summary>

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
</details>

---

## 🧮 Calculations

### Autonomy
```
Autonomy = (House Consumption - Grid Consumption) / House Consumption × 100
```
Percentage of consumption covered by own generation (PV + Battery).

### Self-Consumption
```
Self-consumption = (PV Production - Grid Feed-in) / PV Production × 100
```
Percentage of PV production that is self-consumed (not fed in).

### Battery Runtime
```
Runtime = (Battery SoC × Capacity) / Discharge Power
```
Estimated remaining runtime during discharge.

### Battery Charge Time
```
Charge Time = ((100 - Battery SoC) × Capacity) / Charge Power
```
Estimated time until fully charged.

---

## 🌍 Languages

Supported languages with automatic detection:
- 🇩🇪 German
- 🇬🇧 English
- 🇫🇷 French
- 🇮🇹 Italian
- 🇪🇸 Spanish

Manual override:
```yaml
language: en    # de | en | fr | it | es
```

---

## 📋 Complete Example

```yaml
type: custom:pv-monitor-card
title: Energy Monitor
subtitle: Real-time Overview
theme: modern-dark

entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

pv_max_power: 14000
battery_capacity: 15000
grid_threshold: 10

info_bar:
  show: true
  calculation_mode: autarky
  calculate_battery_times: true

pv:
  animation: true
  animation_style: particle-field
  icon_rotation: true

batterie:
  animation: true
  animation_style: electric-arc

haus:
  show_consumer_total: true

consumers:
  show: true
  sort_mode: highest_first
  threshold: 10
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      switch_entity: switch.ev_charger
    
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Heat Pump'
```

---

## 🛠️ Development

```bash
# Clone & install
git clone https://github.com/sjerocom/pv-monitor-card.git
cd pv-monitor-card
npm install

# Development
npm run dev

# Build
npm run build
```

---

## 💬 Support

- 🐛 [Report Issues](https://github.com/sjerocom/pv-monitor-card/issues)
- 💡 [Feature Requests](https://github.com/sjerocom/pv-monitor-card/issues)
- 🗨️ [Discussions](https://github.com/sjerocom/pv-monitor-card/discussions)
- ⭐ Star the project if you like it!

---

## 📄 License

MIT License - Copyright (c) 2024 sjerocom

---

**Enjoy monitoring your solar system! ☀️🔋**
