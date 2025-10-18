# PV Monitor Card

> 🧩 A **highly customizable Lovelace card** for [Home Assistant](https://www.home-assistant.io/)  
> Monitor your complete solar energy system with real-time data, animations, and calculations

[![release](https://img.shields.io/github/v/release/sjerocom/pv-monitor-card?color=blue&label=release)](https://github.com/sjerocom/pv-monitor-card/releases)
[![HACS](https://img.shields.io/badge/HACS-Default-blue)](https://github.com/hacs/default)
[![downloads](https://img.shields.io/github/downloads/sjerocom/pv-monitor-card/total?color=brightgreen)](https://github.com/sjerocom/pv-monitor-card/releases)
[![license](https://img.shields.io/github/license/sjerocom/pv-monitor-card?color=green)](https://github.com/sjerocom/pv-monitor-card/blob/main/LICENSE)

---

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=sjerocom&repository=pv-monitor-card)
[![Add Card to Dashboard](https://my.home-assistant.io/badges/lovelace_add_card.svg)](https://my.home-assistant.io/redirect/lovelace_add_card/?type=custom:pv-monitor-card)

---

## 📸 Screenshots

<!-- TODO: Screenshot - Main Overview Dark Theme -->

<!-- TODO: Screenshot - Main Overview Light Theme -->

**Theme Variations:**

<!-- TODO: Screenshot - DrWho Theme -->
<!-- TODO: Screenshot - Matrix Theme -->
<!-- TODO: Screenshot - Solar Bright Theme -->

**Features in Action:**

<!-- TODO: Screenshot - Info Bar with calculations -->
<!-- TODO: Screenshot - Consumers list with sorting -->
<!-- TODO: Screenshot - Multiple PV systems in bar -->
<!-- TODO: Screenshot - Multiple batteries in bar -->

---

## ✨ Key Features

### 🎯 Core Components
- **🌞 PV System** – Multiple PV systems with individual tracking, animated production indicators
- **🔋 Battery Storage** – Multiple batteries with SoC display, auto-icons, charge/discharge tracking
- **🏠 House Consumption** – Total consumption with optional consumer breakdown
- **⚡ Grid Power** – Real-time feed-in/consumption with status colors

### 📊 Advanced Features
- **Info Bar** – Live calculations (autonomy, self-consumption, battery times)
- **PV Bar** – Track up to 5 individual PV systems with power and daily yield
- **Battery Bar** – Monitor up to 5 batteries with SoC, charge/discharge rates
- **Consumers** – Unlimited devices with power monitoring, sorting, and switch control
- **Layout Control** – Flexible positioning and ordering of all elements

### 🎨 Customization
- **Themes** – 6 pre-built themes (Dark, Light, Solar, Matrix, Nature, High-Contrast)
- **Animations** – 3 animation styles (Rotating Dots, Particle Field, Electric Arc)
- **Styling** – Complete control over colors, sizes, borders, shadows
- **Tap Actions** – Configurable actions (more-info, navigate, call-service, URL)

### 🌍 Multi-Language
- 🇩🇪 German | 🇬🇧 English | 🇫🇷 French | 🇮🇹 Italian | 🇪🇸 Spanish | 🇳🇱 Dutch | 🇵🇹 Portuguese | 🇸🇪 Swedish | 🇫🇮 Finnish | 🇨🇿 Czech | 🇸🇮 Slovenian | 🇸🇰 Slovak | 🇧🇦 Bosnian | 🇷🇸 Serbian
- Automatic language detection based on Home Assistant settings

---

## 📦 Installation

### Method 1: HACS (Recommended)

1. Open **HACS** in Home Assistant
2. Go to **Frontend**
3. Click **⋮** (3 dots) → **Custom repositories**
4. Add repository:
   - **URL:** `https://github.com/sjerocom/pv-monitor-card`
   - **Category:** `Dashboard`
5. Click **Explore & Download Repositories**
6. Search for **"PV Monitor Card"**
7. Click **Download**
8. **Restart Home Assistant**

### Method 2: Manual Installation

1. Download `pv-monitor-card.js` from the [latest release](https://github.com/sjerocom/pv-monitor-card/releases/latest)
2. Copy to `/config/www/community/pv-monitor-card/pv-monitor-card.js`
3. Add resource in Home Assistant:
   - Go to **Settings** → **Dashboards** → **Resources**
   - Click **Add Resource**
   - URL: `/local/community/pv-monitor-card/pv-monitor-card.js`
   - Type: **JavaScript Module**
4. **Refresh browser** (Ctrl+F5)

---

## 🚀 Quick Start

### Minimal Configuration

Only the most essential sensors required:

```yaml
type: custom:pv-monitor-card
entities:
  pv_production: sensor.pv_power          # Current PV production (W)
  house_consumption: sensor.house_power   # House consumption (W)
  grid_power: sensor.grid_power           # Grid power (W, + = draw, - = feed-in)
```

<!-- TODO: Screenshot - Minimal setup result -->

### Recommended Configuration

With battery and basic info bar:

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

pv_max_power: 10000        # 10 kW system
battery_capacity: 10000    # 10 kWh capacity
grid_threshold: 10         # ±10W neutral zone

info_bar:
  show: true
  calculate_battery_times: true
```

<!-- TODO: Screenshot - Recommended setup result -->

---

## 📡 Required Sensors

### Essential Sensors

| Sensor | Unit | Description | Example Entity |
|--------|------|-------------|----------------|
| **PV Production** | W | Current solar production | `sensor.pv_power` |
| **House Consumption** | W | Total house power usage | `sensor.house_power` |
| **Grid Power** | W | Grid import/export<br>*Positive = import, Negative = export* | `sensor.grid_power` |

### Optional Sensors (for extended features)

| Sensor | Unit | Description | Example Entity |
|--------|------|-------------|----------------|
| **Battery SoC** | % | State of Charge (0-100%) | `sensor.battery_soc` |
| **Battery Charge** | W | Charging power | `sensor.battery_charge_power` |
| **Battery Discharge** | W | Discharging power | `sensor.battery_discharge_power` |
| **Consumer Power** | W | Individual device consumption | `sensor.dishwasher_power` |

> **💡 Tip:** Most inverters (Fronius, SolarEdge, Huawei, SMA, etc.) provide these sensors through their Home Assistant integration.

---

## ⚙️ Configuration Guide

### 📚 Detailed Documentation

Comprehensive guides for each feature:

| Topic | Description |
|-------|-------------|
| **[PV System](docs/pv-config.md)** | Multiple PV systems, animations, power tracking |
| **[Battery Storage](docs/battery-config.md)** | Multiple batteries, SoC tracking, charge times |
| **[House Consumption](docs/house-config.md)** | Total consumption, consumer sum display |
| **[Grid Status](docs/grid-config.md)** | Feed-in/consumption, threshold configuration |
| **[Info Bar](docs/infobar-config.md)** | Autonomy, self-consumption, battery calculations |
| **[Consumers](docs/consumers-config.md)** | Device monitoring, sorting, switches, actions |
| **[Styling & Themes](docs/styling-config.md)** | Complete customization guide |

### Quick Configuration Examples

<details>
<summary><b>Multiple PV Systems</b></summary>

Track up to 5 individual PV systems:

```yaml
pv_bar:
  show: true
  position: above_cards
  entities:
    - entity: sensor.pv_south_power
      name: 'South Roof'
      max_power: 6000
      icon: mdi:solar-panel
    
    - entity: sensor.pv_east_power
      name: 'East Roof'
      max_power: 4000
      icon: mdi:solar-panel
```

<!-- TODO: Screenshot - PV Bar with multiple systems -->
</details>

<details>
<summary><b>Multiple Batteries</b></summary>

Monitor up to 5 battery systems:

```yaml
battery_bar:
  show: true
  position: above_cards
  entities:
    - entity: sensor.battery1_soc
      name: 'Main Battery'
      capacity: 10000
      charge_entity: sensor.battery1_charge
      discharge_entity: sensor.battery1_discharge
    
    - entity: sensor.battery2_soc
      name: 'Backup Battery'
      capacity: 5000
      charge_entity: sensor.battery2_charge
      discharge_entity: sensor.battery2_discharge
```

<!-- TODO: Screenshot - Battery Bar with multiple batteries -->
</details>

<details>
<summary><b>Info Bar with Calculations</b></summary>

```yaml
info_bar:
  show: true
  position: top
  calculation_mode: autarky          # or 'self_consumption'
  calculate_battery_times: true     # Auto-calculate runtime & charge time
  
  style:
    background_color: 'rgba(33, 150, 243, 0.1)'
    border_color: 'rgba(33, 150, 243, 0.3)'
    icon_color: '#2196F3'
```

**Calculations:**
- **Item 1:** Autonomy (or Self-Consumption)
- **Item 2:** Battery Runtime (auto)
- **Item 3:** Battery Charge Time (auto)
</details>

<details>
<summary><b>Consumers with Sorting</b></summary>

```yaml
consumers:
  show: true
  position: bottom
  sort_mode: highest_first           # highest_first | lowest_first | alpha_asc | alpha_desc | none
  threshold: 10                      # Hide devices < 10W
  
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      switch_entity: switch.ev_charger
      threshold: 50
    
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Heat Pump'
      threshold: 20
    
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
      auto_color: true
```
</details>

<details>
<summary><b>Apply Pre-built Theme</b></summary>

```yaml
theme: solar-bright

# Available themes:
# - modern-dark (default)
# - blue-energy
# - minimalist
# - solar-bright
# - nature-green
# - high-contrast
```

<!-- TODO: Screenshot - Theme comparison grid -->
</details>

<details>
<summary><b>Custom Styling</b></summary>

```yaml
pv:
  style:
    background_color: 'rgba(255, 215, 0, 0.1)'
    border_color: 'rgba(255, 215, 0, 0.3)'
    primary_color: '#FFD700'
    icon_color: '#FFD700'

batterie:
  style:
    background_color: 'rgba(76, 175, 80, 0.1)'
    border_color: 'rgba(76, 175, 80, 0.3)'
    primary_color: '#4CAF50'
```
</details>

<details>
<summary><b>Tap Actions</b></summary>

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

batterie:
  tap_action:
    action: navigate
    navigation_path: /lovelace/battery-details
```
</details>

---

## 🧮 Automatic Calculations

The card includes powerful built-in calculations:

### Autonomy (Self-Sufficiency)

**Formula:**
```
Autonomy = (House Consumption - Grid Import) / House Consumption × 100%
```

Shows what percentage of your consumption is covered by your own generation (PV + Battery).

**Example:**
- House: 3000 W
- Grid Import: 500 W
- **Autonomy: 83.3%** ✅

---

### Self-Consumption

**Formula:**
```
Self-Consumption = (PV Production - Grid Export) / PV Production × 100%
```

Shows what percentage of your PV production you use yourself (not exported).

**Example:**
- PV Production: 5000 W
- Grid Export: 1000 W
- **Self-Consumption: 80%** ✅

---

### Battery Runtime

**Formula:**
```
Runtime = (Battery SoC × Capacity) / Discharge Power
```

Estimates how long the battery can power your house at current discharge rate.

**Example:**
- SoC: 80%
- Capacity: 10 kWh
- Discharge: 2000 W
- **Runtime: 4 hours** ✅

---

### Battery Charge Time

**Formula:**
```
Charge Time = ((100 - Battery SoC) × Capacity) / Charge Power
```

Estimates time until battery is fully charged at current charge rate.

**Example:**
- SoC: 40%
- Capacity: 10 kWh
- Charge: 3000 W
- **Charge Time: 2 hours** ✅

---

## 🌍 Language Support

The card automatically detects your Home Assistant language setting and displays all text accordingly.

**Supported Languages:**
- 🇩🇪 **German (Deutsch)**
- 🇬🇧 **English**
- 🇫🇷 **French (Français)**
- 🇮🇹 **Italian (Italiano)**
- 🇪🇸 **Spanish (Español)**
- 🇳🇱 **Dutch (Nederlands)**
- 🇵🇹 **Portuguese (Português)**
- 🇸🇪 **Swedish (Svenska)**
- 🇫🇮 **Finnish (Suomi)**
- 🇨🇿 **Czech (Čeština)**
- 🇸🇮 **Slovenian (Slovenščina)**
- 🇸🇰 **Slovak (Slovenčina)**
- 🇧🇦 **Bosnian (Bosanski)**
- 🇷🇸 **Serbian (Српски)**

**Manual Override:**
```yaml
language: de    # de | en | fr | it | es | nl | pt | sv | fi | cs | sl | sk | bs | sr
```

> **💡 Contributing:** Missing a language? Submit translations via [GitHub Issues](https://github.com/sjerocom/pv-monitor-card/issues) or pull request!

---

## 📋 Complete Configuration Example

```yaml
type: custom:pv-monitor-card
title: Energy Dashboard
subtitle: Real-time Solar System Monitor
theme: modern-dark
language: en

# Main entities
entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

# System parameters
pv_max_power: 14000
battery_capacity: 15000
grid_threshold: 10

# Layout
grid_gap: 8px
layout_order:
  - header
  - info_bar
  - pv_bar
  - cards
  - battery_bar
  - consumers

# Info Bar
info_bar:
  show: true
  position: top
  calculation_mode: autarky
  calculate_battery_times: true

# PV Bar (multiple systems)
pv_bar:
  show: true
  position: above_cards
  entities:
    - entity: sensor.pv_south_power
      name: 'South (6 kW)'
      max_power: 6000
    - entity: sensor.pv_east_power
      name: 'East (4 kW)'
      max_power: 4000

# Battery Bar (multiple batteries)
battery_bar:
  show: true
  position: below_cards
  entities:
    - entity: sensor.battery_soc
      name: 'Main Battery'
      capacity: 10000
      charge_entity: sensor.battery_charge
      discharge_entity: sensor.battery_discharge

# Card settings
pv:
  animation: true
  animation_style: particle-field
  icon_rotation: true

batterie:
  animation: true
  animation_style: electric-arc

haus:
  show_consumer_total: true

netz:
  threshold: 10

# Consumers
consumers:
  show: true
  position: bottom
  sort_mode: highest_first
  threshold: 10
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      switch_entity: switch.ev_charger
      threshold: 50
    
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Heat Pump'
      threshold: 20
      secondary_entity: sensor.heat_pump_cop
      secondary_text: 'COP'
    
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
      auto_color: true
```

---

## 🔧 Advanced Features

### Layout Customization

Control the exact order and positioning of all card elements:

```yaml
layout_order:
  - header              # Title & subtitle
  - info_bar            # Calculations bar
  - pv_bar              # Multiple PV systems
  - cards               # Main 4 cards (PV, Battery, House, Grid)
  - battery_bar         # Multiple batteries
  - consumers           # Device list
```

### Flexible Positioning

Each bar element can be positioned independently:

```yaml
info_bar:
  position: top         # above_cards | below_cards

pv_bar:
  position: above_cards # above_cards | below_cards | above_consumers | below_consumers

battery_bar:
  position: below_cards # above_cards | below_cards | above_consumers | below_consumers

consumers:
  position: bottom      # above_consumers | below_consumers
```

<!-- TODO: Screenshot - Layout order visualization -->

---

## 🛠️ Development

Want to contribute or customize the card?

```bash
# Clone repository
git clone https://github.com/sjerocom/pv-monitor-card.git
cd pv-monitor-card

# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

**Project Structure:**
```
src/
├── editor/          # Visual configuration editor
├── components/      # Card UI components
├── core/            # Business logic & calculations
├── i18n/            # Translations
├── styles/          # CSS styling
└── types/           # TypeScript definitions
```

---

## 💬 Support & Community

### Getting Help

- 🐛 **[Report Issues](https://github.com/sjerocom/pv-monitor-card/issues)** – Bug reports and technical problems
- 💡 **[Feature Requests](https://github.com/sjerocom/pv-monitor-card/issues)** – Suggest new features
- 🗨️ **[Discussions](https://github.com/sjerocom/pv-monitor-card/discussions)** – Questions, tips, showcase setups
- 📖 **[Documentation](docs/)** – Detailed configuration guides

### Contributing

Contributions are welcome! Whether it's:
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🌍 Translations

Please check out our [contribution guidelines](CONTRIBUTING.md).

---

## ⭐ Show Your Support

If you find this card useful, please consider:
- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs or suggesting features
- 📣 **Sharing** with the Home Assistant community
- ☕ **[Buying me a coffee](https://buymeacoffee.com/sjerocom)** (optional)

---

## 📄 License

MIT License - Copyright (c) 2024 sjerocom

See [LICENSE](LICENSE) for full details.

---

## 🙏 Acknowledgments

- Built with ❤️ for the [Home Assistant](https://www.home-assistant.io/) community
- Inspired by the amazing Home Assistant energy dashboard
- Thanks to all contributors and users for feedback and suggestions

---

**Enjoy monitoring your solar energy system! ☀️🔋⚡**

*Made with ❤️ for sustainable energy*
