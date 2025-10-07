# PV Monitor Card

A modern, fully customizable Home Assistant Lovelace Card for monitoring PV systems, battery storage, energy flows, and consumers.

![Version](https://img.shields.io/github/v/release/sjerocom/pv-monitor-card)
![License](https://img.shields.io/github/license/sjerocom/pv-monitor-card)
![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)

---

## 📖 Table of Contents

- [Why This Card?](#-why-this-card)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Required Sensors](#-required-sensors)
- [Configuration](#-configuration)
    - [Central Settings](#central-settings)
    - [PV System](#pv-system)
    - [Battery](#battery)
    - [House Consumption](#house-consumption)
    - [Grid](#grid)
    - [Info Bar](#info-bar)
    - [Consumers](#consumers)
    - [Themes](#themes)
    - [Styling & Layout](#styling--layout)
    - [Tap Actions](#tap-actions)
- [Calculations](#-calculations)
- [Languages](#-languages)
- [Examples](#-examples)
- [Development](#-development)
- [Support](#-support)

---

## 💡 Why This Card?

When I started monitoring my PV system in Home Assistant, I was looking for a solution that would give me a clear and appealing overview of all important information. I found a great overview in a third-party app that I wanted to replicate in Home Assistant.

My first approach was to recreate this view using YAML and existing Lovelace cards. While it worked, it had several issues:
- **Complex to configure** – many nested cards and complex YAML structures
- **Not flexible enough** – every customization required deep YAML changes
- **Not 100% customizable to my needs** – design and functionality were limited

Since I wanted to learn more about custom card development anyway, I decided to **build this card myself**. The result is a card that:
- ✨ **Fully configurable through a visual editor**
- 🎨 **Almost 100% customizable** – from colors to animations to layouts
- 🌍 **Multilingual** (German, English, French, Italian, Spanish)
- 🎭 **Pre-built themes** for quick setup
- 📊 **Intelligent calculations** for autonomy, self-consumption, and battery times

---

## ✨ Features

### 🌞 **PV System Monitoring**
- Real-time display of PV production (in Watts or Kilowatts)
- Icon rotation based on power output (optional)
- 3 different animation styles (Rotating Dots, Particle Field, Electric Arc)
- Additional text lines for daily yield, total yield, etc.
- Fully customizable colors and sizes

### 🔋 **Battery Management**
- Automatic icon selection based on charge level
- Color coding (green > 60%, yellow 30-60%, red < 30%)
- Display of charge/discharge power
- Automatic calculation of remaining runtime and charge time
- Support for additional information (temperature, cycles, etc.)

### 🏠 **House Consumption**
- Display of current total consumption
- Optional: Sum of all configured consumers
- Animations for active consumption
- Individual styling options

### ⚡ **Grid**
- Status display: Feed-in, Neutral, or Grid consumption
- Configurable threshold for "Neutral" status
- Customizable texts for each status
- Animations based on energy flow

### 📊 **Info Bar**
- Up to 3 configurable items
- Automatic calculations:
    - **Autonomy** (independence from grid)
    - **Self-consumption** (self-usage rate)
    - **Battery remaining runtime** (during discharge)
    - **Battery remaining charge time** (during charging)
- Positioning at top or bottom
- Custom sensors or calculated values

### 🔌 **Consumers**
- Unlimited number of individual consumers
- Automatic color coding based on status (on/off)
- Sorting: By power, alphabetically, or manual
- Threshold for display (only consumers above X watts)
- Switch integration for on/off control
- Tap actions for interactivity
- Completely custom styling per consumer possible

### 🎨 **Design & Customization**
- **Pre-built themes**: Modern Dark, Blue Energy, Minimalist, Solar Bright, Nature Green, High Contrast
- **Theme editor**: All colors centrally customizable
- **Card-specific styling**: Each card individually designable
- Responsive grid layout with configurable spacing
- Animated glow effects with 3 styles
- Full control over font sizes, colors, spacing

### 🌍 **Multilingual**
- German 🇩🇪
- English 🇬🇧
- French 🇫🇷
- Italian 🇮🇹
- Spanish 🇪🇸
- Automatic language detection based on Home Assistant settings

### 🖱️ **Interactivity**
- Tap, Double-Tap, and Hold Actions for all cards
- Navigation to other views
- Calling services
- Opening URLs
- More-info dialogs

---

## 📸 Screenshots

_Screenshots of the card in various configurations can be inserted here_

---

## 📦 Installation

### HACS (Recommended)

1. Open **HACS** in Home Assistant
2. Go to **Frontend**
3. Click the **three dots** in the top right
4. Select **"Custom repositories"**
5. Add this URL: `https://github.com/sjerocom/pv-monitor-card`
6. Category: **"Lovelace"**
7. Click **"Add"**
8. Search for **"PV Monitor Card"**
9. Click **"Download"**
10. **Restart Home Assistant**

### Manual Installation

1. Download the latest `pv-monitor-card.js` from [Releases](https://github.com/sjerocom/pv-monitor-card/releases)
2. Copy the file to `/config/www/community/pv-monitor-card/`
3. Add the resource in Home Assistant:
    - Go to **Settings → Dashboards → Resources**
    - Click **"+ Add Resource"**
    - URL: `/local/community/pv-monitor-card/pv-monitor-card.js`
    - Type: **JavaScript Module**
4. **Restart Home Assistant**

### Verification

After installation, you can add the card to your dashboard:
1. Go to **edit mode** of your dashboard
2. Click **"+ Add Card"**
3. Search for **"PV Monitor Card"** or manually enter:
   ```yaml
   type: custom:pv-monitor-card
   ```

---

## 🚀 Quick Start

### Minimal Configuration

The absolute minimal configuration requires only 3 entities:

```yaml
type: custom:pv-monitor-card
entities:
  pv_production: sensor.pv_power          # PV power in W
  house_consumption: sensor.house_power   # House consumption in W
  grid_power: sensor.grid_power           # Grid in W (+ = consumption, - = feed-in)
```

### Recommended Basic Configuration

For full functionality including battery:

```yaml
type: custom:pv-monitor-card
title: Energy Monitor
subtitle: Live Overview

# Central Entities
entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

# Central Configuration
pv_max_power: 10000        # 10 kW PV system
battery_capacity: 10000    # 10 kWh battery storage
grid_threshold: 10         # ±10W as "Neutral"

# Enable Info Bar
info_bar:
  show: true
  calculate_battery_times: true
```

---

## 📡 Required Sensors

### Mandatory Sensors (Minimal)

| Sensor | Entity Type | Unit | Description |
|--------|-----------|------|-------------|
| **PV Production** | `sensor.*` | W | Current PV power (positive values only) |
| **House Consumption** | `sensor.*` | W | Total household consumption |
| **Grid** | `sensor.*` | W | Grid consumption/feed-in (positive = consumption, negative = feed-in) |

### Optional for Full Functionality

| Sensor | Entity Type | Unit | Description |
|--------|-----------|------|-------------|
| **Battery State of Charge** | `sensor.*` | % | State of Charge (0-100%) |
| **Battery Charge Power** | `sensor.*` | W | Current charging power (positive) |
| **Battery Discharge Power** | `sensor.*` | W | Current discharge power (positive) |
| **PV Daily Yield** | `sensor.*` | kWh | Yield of current day |
| **PV Total Yield** | `sensor.*` | kWh/MWh | Lifetime yield of PV system |
| **Autonomy** | `sensor.*` | % | Independence from grid (optional, can be calculated) |
| **Self-consumption** | `sensor.*` | % | Self-usage of PV production (optional) |

### Consumer Sensors

| Sensor | Entity Type | Unit | Description |
|--------|-----------|------|-------------|
| **Consumer Power** | `sensor.*` | W | Current power consumption of the consumer |
| **Consumer Switch** | `switch.*` or `input_boolean.*` | - | Optional: For on/off control |

> **💡 Tip**: Most inverters and energy meters in Home Assistant already provide these sensors. With Fronius, SolarEdge, Huawei, etc., these are often automatically available.

---

## ⚙️ Configuration

### Central Settings

These settings are configured in the **"General"** tab → **"Central Entities"**:

```yaml
entities:
  pv_production: sensor.pv_power              # Required
  battery_soc: sensor.battery_soc             # Optional
  battery_charge: sensor.battery_charge       # Optional
  battery_discharge: sensor.battery_discharge # Optional
  house_consumption: sensor.house_power       # Required
  grid_power: sensor.grid_power               # Required
```

**Central Configuration** (Tab "General" → "Central Configuration"):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pv_max_power` | number | `10000` | Maximum PV power in Watts (for animations and icon rotation) |
| `battery_capacity` | number | `10000` | Battery capacity in Watt-hours (e.g., 10000 = 10 kWh) |
| `grid_threshold` | number | `10` | Threshold in Watts for "Neutral" status (±X Watts) |

**Card Visibility** (Tab "General" → "Card Visibility"):

```yaml
pv:
  show: true          # Show PV card
batterie:
  show: true          # Show battery card
haus:
  show: true          # Show house card
netz:
  show: true          # Show grid card
```

**Header** (Tab "General" → "Card Header"):

```yaml
title: Energy Monitor       # Main title
subtitle: Live Overview     # Subtitle
icon: mdi:solar-power       # Icon next to title
```

---

### PV System

The PV card displays the current solar production.

#### Basic Configuration

```yaml
pv:
  show: true                          # Show card
  icon: mdi:white-balance-sunny       # Custom icon
  animation: true                     # Enable animation
  animation_style: rotating-dots      # rotating-dots | particle-field | electric-arc
  icon_rotation: true                 # Icon rotates with power
```

#### Additional Texts

```yaml
pv:
  # Second line (e.g., daily yield)
  secondary_entity: sensor.pv_daily_yield
  secondary_text: "Today"             # Static text before value
  
  # Third line (e.g., total yield)
  tertiary_entity: sensor.pv_total_yield
  tertiary_text: "Total"
```

#### Styling

```yaml
pv:
  style:
    background_color: 'rgba(21, 20, 27, 1)'
    border_color: 'rgba(255, 255, 255, 0.1)'
    primary_color: '#FFD700'        # Color for main value
    secondary_color: '#FFA500'      # Color for secondary text
    icon_color: '#FFD700'           # Icon color
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

**Available Actions:**
- `none` – No action
- `more-info` – Opens more-info dialog
- `navigate` – Navigation to a dashboard (requires `navigation_path`)
- `url` – Opens URL (requires `url_path`)
- `call-service` – Calls service (requires `service` and optionally `service_data`)

---

### Battery

The battery card shows the charge level and charge/discharge power.

#### Basic Configuration

```yaml
batterie:
  show: true
  icon: ''                    # Empty = automatic (based on SoC)
  animation: true
  animation_style: electric-arc
```

**Automatic Icon Selection:**
- SoC > 90% → `mdi:battery`
- SoC > 70% → `mdi:battery-80`
- SoC > 50% → `mdi:battery-60`
- SoC > 30% → `mdi:battery-40`
- SoC > 10% → `mdi:battery-20`
- SoC ≤ 10% → `mdi:battery-alert`

When charging, `-charging` is appended (e.g., `mdi:battery-60-charging`)

#### Color Coding

The battery is automatically color-coded:
- **Green** (SoC > 60%)
- **Yellow** (SoC 30-60%)
- **Red** (SoC < 30%)

#### Additional Texts

```yaml
batterie:
  secondary_entity: sensor.battery_temperature
  secondary_text: "Temperature"
  
  tertiary_entity: sensor.battery_cycles
  tertiary_text: "Cycles"
```

---

### House Consumption

The house card displays the current total consumption.

#### Basic Configuration

```yaml
haus:
  show: true
  icon: mdi:home
  animation: true
  animation_style: particle-field
  show_consumer_total: false    # Show sum of all consumers
```

**Consumer Sum:**
If `show_consumer_total: true` and consumers are configured, the sum of all active consumers is displayed in the second line:
```
House: 3450 W
Consumers: 2100 W  ← Sum of all configured consumers
```

#### Additional Texts

```yaml
haus:
  secondary_entity: sensor.house_daily_consumption
  secondary_text: "Today"
```

---

### Grid

The grid card shows feed-in, grid consumption, or neutral status.

#### Basic Configuration

```yaml
netz:
  show: true
  icon: mdi:transmission-tower
  animation: true
  animation_style: rotating-dots
```

#### Status Texts

```yaml
netz:
  text_einspeisen: "Feed-in"        # For negative values
  text_neutral: "Neutral"           # For ±threshold
  text_bezug: "Grid Consumption"    # For positive values
```

**Status Logic:**
- `grid_power < -threshold` → Feed-in (green)
- `-threshold ≤ grid_power ≤ threshold` → Neutral (gray)
- `grid_power > threshold` → Grid consumption (red)

#### Additional Texts

```yaml
netz:
  secondary_entity: sensor.grid_daily_export
  secondary_text: "Feed-in today"
  
  tertiary_entity: sensor.grid_daily_import
  tertiary_text: "Consumption today"
```

---

### Info Bar

The info bar displays up to 3 configurable values.

#### Basic Configuration

```yaml
info_bar:
  show: true
  position: top                    # top | bottom
  calculation_mode: autarky        # autarky | self_consumption
  calculate_battery_times: true   # Calculate battery times
```

#### Calculation Modes

**Autarky (Autonomy):**
```
Autonomy = (House Consumption - Grid Consumption) / House Consumption × 100
```

**Meaning:**  
Indicates what percentage of house consumption is covered by own generation (PV + Battery).

**Example:**
- House Consumption: 3000 W
- Grid Consumption: 500 W
- Autonomy = ((3000 - 500) / 3000) × 100 = 83.3%

**Characteristics:**
- During feed-in (negative grid consumption) autonomy can be > 100%
- Limited to 100% in display

**Self Consumption:**
```
Self-consumption = (PV Production - Grid Feed-in) / PV Production × 100
```

**Meaning:**  
Indicates what percentage of PV production is self-consumed (not fed in).

**Example:**
- PV Production: 5000 W
- Feed-in: 1000 W
- Self-consumption = ((5000 - 1000) / 5000) × 100 = 80%

#### Configuring Items

**Item 1 – Autonomy/Self-consumption (automatic):**
```yaml
info_bar:
  item1:
    entity: ''                          # Empty = automatically calculated
    icon: mdi:home-lightning-bolt
    label: 'Autonomy'                   # or 'Self-consumption'
    unit: '%'
```

**Item 2 – Remaining Runtime (automatic with `calculate_battery_times: true`):**
```yaml
info_bar:
  item2:
    entity: ''                          # Empty = automatically calculated
    icon: mdi:battery-clock
    label: 'Remaining Runtime'
    unit: ''                            # Unit is set automatically
```

**Item 3 – Remaining Charge Time (automatic with `calculate_battery_times: true`):**
```yaml
info_bar:
  item3:
    entity: ''                          # Empty = automatically calculated
    icon: mdi:battery-charging
    label: 'Remaining Charge Time'
    unit: ''
```

**Using Custom Entities:**
```yaml
info_bar:
  item1:
    entity: sensor.solar_forecast_today
    icon: mdi:weather-sunny
    label: 'Forecast'
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

### Consumers

The consumers section shows individual power consumers with their current power.

#### Activation

```yaml
consumers:
  show: true
  position: bottom                  # Currently only 'bottom'
  sort_mode: highest_first          # highest_first | lowest_first | none | alpha_asc | alpha_desc
  threshold: 10                     # Only show consumers > X Watts
```

**Sort Modes:**
- `highest_first` – Highest consumption first
- `lowest_first` – Lowest consumption first
- `none` – No sorting (order as configured)
- `alpha_asc` – Alphabetically A-Z
- `alpha_desc` – Alphabetically Z-A

#### Adding Consumers

```yaml
consumers:
  items:
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
      threshold: 5                  # Individual threshold
      auto_color: true              # Automatic color for on/off
      
      # Optional: Additional texts
      show_primary: true            # Show main value
      primary_entity: ''            # Empty = entity value
      primary_text: ''
      
      show_secondary: true
      secondary_entity: sensor.dishwasher_energy_daily
      secondary_text: 'Today'
      
      # Optional: Switch for on/off control
      switch_entity: switch.dishwasher
      
      # Optional: Tap Actions
      tap_action:
        action: more-info
      
      # Optional: Individual Styling
      style:
        icon_color: '#2196F3'
        background_color: 'rgba(33, 150, 243, 0.1)'
```

#### Auto-Color

When `auto_color: true`:
- **Consumer active** (> threshold): Green color
- **Consumer inactive** (≤ threshold): Gray/dimmed color

#### Switch Integration

With `switch_entity`, an icon button is displayed:
- **Tap** on icon → Toggles the switch
- **Tap** on rest of card → Tap action (e.g., more-info)

#### Styling (Global)

Global styles for all consumers:

```yaml
consumers:
  style:
    gap: '6px'                          # Spacing between consumers
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

#### Styling (Per Consumer)

Each consumer can be styled individually:

```yaml
consumers:
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charging Station'
      style:
        icon_size: '2em'
        icon_color: '#4CAF50'
        primary_color: '#4CAF50'
        background_color: 'rgba(76, 175, 80, 0.1)'
        border_color: 'rgba(76, 175, 80, 0.3)'
```

#### Consumer Sum

The sum of all consumers can be displayed in the house card:
```yaml
haus:
  show_consumer_total: true
```

Then automatically calculated:
```
Sum = Σ(all consumers with power > threshold)
```

---

### Themes

The card offers pre-built themes for quick setup.

#### Available Themes

1. **Modern Dark** (Default)
    - Dark background, modern color accents
    - Blue-violet highlights

2. **Blue Energy**
    - Blue energy colors
    - Cool, technical aesthetic

3. **Minimalist**
    - Reduced colors
    - Clean, minimalist lines

4. **Solar Bright**
    - Bright, sunny colors
    - Yellow-orange accents

5. **Nature Green**
    - Green, natural colors
    - Organic color scheme

6. **High Contrast**
    - High contrasts for better readability
    - Accessible design

#### Applying a Theme

```yaml
theme: modern-dark    # or blue-energy, minimalist, etc.
```

Themes can be selected in the visual editor in the **"Styling"** tab → **"Theme"**.

#### Customizing a Theme

After selecting a theme, all colors can be customized in the **Theme Editor**:

```yaml
theme: modern-dark
style:
  card_background_color: 'rgba(21, 20, 27, 1)'
  card_border_color: 'rgba(255, 255, 255, 0.1)'
  card_text_color: 'white'
  # ... all other theme colors
```

**Important:** Theme styles do **not** override card-specific styles (PV, Battery, House, Grid). These must be adjusted separately in the respective card tabs.

---

### Styling & Layout

#### Global Layout

```yaml
grid_gap: '6px'                 # Spacing between main cards

style:
  header_margin_bottom: '12px'  # Spacing from header to cards
  infobar_gap: '6px'           # Spacing between info bar items
  
  title_align: center           # left | center | right
  subtitle_align: center
  
  card_cursor: pointer          # Cursor on hover
```

#### Header Styling

```yaml
style:
  # Title
  title_color: 'white'
  title_size: '1.5em'
  title_font_weight: 'bold'
  
  # Subtitle
  subtitle_color: 'rgba(255, 255, 255, 0.7)'
  subtitle_size: '1em'
  subtitle_font_weight: 'normal'
```

#### Global Icon Styling

```yaml
style:
  icon_size: '2em'
  icon_opacity: '1'
  icon_margin: '6px'
```

#### Global Text Styling

```yaml
style:
  # Primary text (main value)
  primary_color: 'white'
  primary_size: '1.2em'
  primary_font_opacity: '1'
  primary_font_weight: 'normal'
  
  # Secondary text
  secondary_color: 'white'
  secondary_size: '0.9em'
  secondary_font_opacity: '0.7'
  secondary_font_weight: 'normal'
  
  # Tertiary text
  tertiary_color: 'white'
  tertiary_size: '0.9em'
  tertiary_font_opacity: '0.7'
  tertiary_font_weight: 'normal'
```

#### Card Styling

```yaml
style:
  card_background_color: 'rgba(21, 20, 27, 1)'
  card_border_color: 'rgba(255, 255, 255, 0.1)'
  card_border_radius: '16px'
  card_padding: '12px'
```

> **💡 Tip**: All colors can be specified as `rgba()`, `rgb()`, `hex` (#FFFFFF), or CSS color names.

---

### Tap Actions

Tap actions can be configured for the following cards:
- PV System
- Battery
- House Consumption
- Grid
- Info Bar
- Each individual consumer

#### Action Types

**1. None (No Action)**
```yaml
tap_action:
  action: none
```

**2. More Info**
```yaml
tap_action:
  action: more-info
```
Opens the more-info dialog of the entity.

**3. Navigate**
```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/energy
```
Navigates to another dashboard/view.

**4. URL**
```yaml
tap_action:
  action: url
  url_path: https://example.com
```
Opens an external URL (in new tab).

**5. Call Service**
```yaml
tap_action:
  action: call-service
  service: light.turn_on
  service_data:
    entity_id: light.living_room
    brightness: 255
```
Calls a Home Assistant service.

#### Multi-Action Support

Each card supports 3 different actions:

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

## 🧮 Calculations

The card automatically performs various calculations.

### Autonomy

**Formula:**
```
Autonomy = ((House Consumption - Grid Consumption) / House Consumption) × 100
```

**Meaning:**  
Indicates what percentage of house consumption is covered by own generation (PV + Battery).

**Example:**
- House Consumption: 3000 W
- Grid Consumption: 500 W
- Autonomy = ((3000 - 500) / 3000) × 100 = 83.3%

**Characteristics:**
- During feed-in (negative grid consumption), autonomy can be > 100%
- Limited to 100% in display

### Self-Consumption

**Formula:**
```
Self-consumption = ((PV Production - Grid Feed-in) / PV Production) × 100
```

**Meaning:**  
Indicates what percentage of PV production is self-consumed (not fed in).

**Example:**
- PV Production: 5000 W
- Feed-in: 1000 W
- Self-consumption = ((5000 - 1000) / 5000) × 100 = 80%

### Battery Remaining Runtime

**Formula:**
```
Remaining Runtime = (Battery Charge × Battery Capacity) / Discharge Power
```

**Example:**
- Battery Charge: 60% (0.6)
- Battery Capacity: 10000 Wh
- Discharge Power: 1500 W
- Remaining Runtime = (0.6 × 10000) / 1500 = 4 hours

**Display:**
- Over 1 hour: "X hrs Y min"
- Under 1 hour: "X minutes"
- No discharge: "Not available"

### Battery Remaining Charge Time

**Formula:**
```
Remaining Charge Time = ((100 - Battery Charge) × Battery Capacity) / Charge Power
```

**Example:**
- Battery Charge: 40% (0.4)
- Battery Capacity: 10000 Wh
- Charge Power: 3000 W
- Remaining Charge Time = ((1 - 0.4) × 10000) / 3000 = 2 hours

**Display:**
- Over 1 hour: "X hrs Y min"
- Under 1 hour: "X minutes"
- No charging: "Not available"
- Fully charged: "Full"

### Consumer Sum

**Formula:**
```
Sum = Σ(Consumers with Power > threshold)
```

All consumers whose power is above the configured threshold are summed.

**Example:**
- Dishwasher: 1200 W (> 10 W threshold)
- Washing Machine: 400 W (> 10 W threshold)
- TV: 5 W (< 10 W threshold, not counted)
- **Sum: 1600 W**

---

## 🌍 Languages

The card supports 5 languages and automatically detects the Home Assistant language.

### Supported Languages

- 🇩🇪 **German** (`de`)
- 🇬🇧 **English** (`en`)
- 🇫🇷 **French** (`fr`)
- 🇮🇹 **Italian** (`it`)
- 🇪🇸 **Spanish** (`es`)

### Setting Language

**Automatic (recommended):**
The card automatically detects the language from Home Assistant settings.

**Manual:**
```yaml
language: en    # de | en | fr | it | es
```

### Translated Elements

- All editor labels and descriptions
- Status texts (feed-in, grid consumption, etc.)
- Info bar labels (autonomy, remaining runtime, etc.)
- Time units (hours, minutes, etc.)

---

## 📋 Examples

### Example 1: Minimal Setup Without Battery

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

### Example 2: Full-Featured With Everything

```yaml
type: custom:pv-monitor-card
title: Energy Monitor
subtitle: Real-time Overview
icon: mdi:solar-power

language: en
theme: modern-dark

# Central Entities
entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

# Central Configuration
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
    label: 'Autonomy'
  item2:
    icon: mdi:battery-clock
    label: 'Remaining Runtime'
  item3:
    icon: mdi:battery-charging
    label: 'Charge Time'

# PV
pv:
  show: true
  animation: true
  animation_style: particle-field
  icon_rotation: true
  secondary_entity: sensor.pv_daily_yield
  secondary_text: 'Today'
  tertiary_entity: sensor.pv_total_yield
  tertiary_text: 'Total'

# Battery
batterie:
  show: true
  animation: true
  animation_style: electric-arc
  secondary_entity: sensor.battery_temperature
  secondary_text: 'Temperature'

# House
haus:
  show: true
  animation: true
  show_consumer_total: true
  secondary_entity: sensor.house_daily_consumption
  secondary_text: 'Today'

# Grid
netz:
  show: true
  animation: true
  secondary_entity: sensor.grid_daily_export
  secondary_text: 'Feed-in'
  tertiary_entity: sensor.grid_daily_import
  tertiary_text: 'Consumption'

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
      auto_color: true
      
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Heat Pump'
      auto_color: true
      
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
      threshold: 5
      secondary_entity: sensor.dishwasher_energy_daily
      secondary_text: 'Today'
```

### Example 3: Custom Theme

```yaml
type: custom:pv-monitor-card

# Base theme as starting point
theme: solar-bright

# Theme customizations
style:
  card_background_color: 'rgba(255, 248, 220, 1)'
  card_text_color: '#333333'
  primary_color: '#FF8C00'
  
  # Card-specific
  card_border_radius: '20px'
  icon_size: '2.5em'

# PV with custom styling
pv:
  style:
    background_color: 'rgba(255, 215, 0, 0.2)'
    icon_color: '#FFD700'
    primary_color: '#FF8C00'
```

### Example 4: Consumers With Actions

```yaml
consumers:
  show: true
  items:
    - entity: sensor.washing_machine_power
      icon: mdi:washing-machine
      label: 'Washing Machine'
      switch_entity: switch.washing_machine
      tap_action:
        action: more-info
      double_tap_action:
        action: call-service
        service: notify.mobile_app
        service_data:
          message: 'Washing machine was manually tapped'
      hold_action:
        action: navigate
        navigation_path: /lovelace/laundry
      style:
        icon_color: '#2196F3'
        background_color: 'rgba(33, 150, 243, 0.1)'
```

---

## 🛠️ Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

```bash
# Clone repository
git clone https://github.com/sjerocom/pv-monitor-card.git
cd pv-monitor-card

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5000 in browser
```

### Build

```bash
# Create production build
npm run build

# Output in: dist/pv-monitor-card.js
```

### Project Structure

```
pv-monitor-card/
├── src/
│   ├── pv-monitor-card.ts           # Main component
│   ├── pv-monitor-card-editor.ts    # Visual editor
│   ├── pv-monitor-card-types.ts     # TypeScript types
│   ├── pv-monitor-card-i18n.ts      # Translations
│   └── pv-monitor-card-themes.ts    # Theme definitions
├── dist/                            # Build output
├── hacs.json                        # HACS manifest
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💬 Support

### Bug Reports & Feature Requests

Please use [GitHub Issues](https://github.com/sjerocom/pv-monitor-card/issues) for:
- 🐛 **Bug Reports** – Describe the problem with logs and config
- 💡 **Feature Requests** – Suggest new features
- 📖 **Documentation** – Errors or improvement suggestions

### Community

- ⭐ **GitHub Stars** help the project
- 🗨️ **Discussions** in GitHub Discussions
- 📣 **Share** the card in the Home Assistant community

### Common Issues

**Problem: Card is not displayed**
- Check if resource was added correctly
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors

**Problem: Animations don't work**
- Check if `animation: true` is set
- Make sure entity provides values > 0

**Problem: Calculations are wrong**
- Check correct entities in central configuration
- Make sure `pv_max_power` and `battery_capacity` are correct
- Verify sensor units (W, %, etc.)

---

## 📄 License

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

Developed with ❤️ for the Home Assistant Community.

**Special thanks to:**
- The Home Assistant community for inspiration and feedback
- All contributors who report issues and suggest features
- Everyone who uses and recommends this card

---

**Have fun with the PV Monitor Card! ☀️🔋**