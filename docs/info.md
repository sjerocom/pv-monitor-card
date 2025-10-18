# PV Monitor Card - Info & FAQ

Quick reference guide with frequently asked questions, tips, and troubleshooting.

---

## 📖 Quick Links

- **[Main Documentation](../README.md)** – Getting started & overview
- **[Installation Guide](../README.md#-installation)** – HACS & manual installation
- **[Configuration Examples](../README.md#-complete-configuration-example)** – Full examples

### Feature Guides

- **[PV System](pv-config.md)** – Solar production & multiple systems
- **[Battery](battery-config.md)** – Battery storage & multiple batteries
- **[House](house-config.md)** – Consumption & consumer integration  
- **[Grid](grid-config.md)** – Feed-in & grid consumption
- **[Info Bar](infobar-config.md)** – Calculations & custom metrics
- **[Consumers](consumers-config.md)** – Device monitoring & control
- **[Styling](styling-config.md)** – Themes & customization

---

## ⚡ Quick Start

### Minimum Requirements

Only **3 sensors** needed for basic functionality:

```yaml
type: custom:pv-monitor-card
entities:
  pv_production: sensor.pv_power          # PV power (W)
  house_consumption: sensor.house_power   # House consumption (W)
  grid_power: sensor.grid_power           # Grid power (W)
```

### Recommended Setup

With battery for full features:

```yaml
type: custom:pv-monitor-card
entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

pv_max_power: 10000
battery_capacity: 10000
```

---

## ❓ Frequently Asked Questions

### General Questions

<details>
<summary><b>Q: Which inverters are supported?</b></summary>

**A:** The card works with any inverter that provides sensors in Home Assistant. Successfully tested with:
- Fronius (Symo, Gen24)
- SolarEdge
- Huawei (Sun2000)
- SMA (Sunny Boy, Tripower)
- Kostal (Plenticore, PIKO)
- Goodwe
- Solis
- Victron (Venus OS)
- And many more...

The card uses standard Home Assistant sensors, so any integration that provides power sensors will work.
</details>

<details>
<summary><b>Q: Do I need a battery?</b></summary>

**A:** No, the battery is optional. The card works perfectly with just PV, house, and grid sensors. Battery features (SoC display, charge/discharge tracking, runtime calculations) are only active when battery sensors are configured.
</details>

<details>
<summary><b>Q: Can I use multiple PV systems?</b></summary>

**A:** Yes! Use the PV Bar feature to track up to 5 individual PV systems:

```yaml
pv_bar:
  show: true
  entities:
    - entity: sensor.pv_south_power
      name: 'South Roof'
    - entity: sensor.pv_east_power
      name: 'East Roof'
```

See [PV Configuration](pv-config.md#multiple-pv-systems-pv-bar) for details.
</details>

<details>
<summary><b>Q: Can I track multiple batteries?</b></summary>

**A:** Yes! Use the Battery Bar feature to monitor up to 5 batteries:

```yaml
battery_bar:
  show: true
  entities:
    - entity: sensor.battery1_soc
      name: 'Main Battery'
      capacity: 10000
    - entity: sensor.battery2_soc
      name: 'Backup Battery'
      capacity: 5000
```

See [Battery Configuration](battery-config.md#multiple-batteries-battery-bar) for details.
</details>

<details>
<summary><b>Q: How many consumers can I add?</b></summary>

**A:** Unlimited! The card supports as many consumers as you want. Use sorting and thresholds to keep the display manageable:

```yaml
consumers:
  show: true
  sort_mode: highest_first
  threshold: 10
  items:
    # Add as many as you need
```
</details>

### Configuration Questions

<details>
<summary><b>Q: What does the grid power sign mean?</b></summary>

**A:** Grid power follows this convention:
- **Positive (+)** → Importing from grid (consuming)
- **Negative (-)** → Exporting to grid (feed-in)

If your sensor is reversed, create a template sensor:

```yaml
template:
  - sensor:
      - name: "Grid Power Corrected"
        unit_of_measurement: 'W'
        state: "{{ states('sensor.grid_power') | float * -1 }}"
```
</details>

<details>
<summary><b>Q: Why is my autonomy showing over 100%?</b></summary>

**A:** This happens during strong feed-in. The calculation is:
```
Autonomy = (House - Grid) / House × 100%
```

When exporting (negative grid), the numerator becomes larger than denominator, resulting in >100%. The card automatically limits display to 100%.
</details>

<details>
<summary><b>Q: Why doesn't battery runtime show?</b></summary>

**A:** Battery runtime requires:
1. `battery_capacity` configured in root config
2. Battery SoC sensor (0-100%)
3. Battery discharge sensor (W) with value > 0
4. `calculate_battery_times: true` in info_bar

Check all requirements are met.
</details>

<details>
<summary><b>Q: How do I change the language?</b></summary>

**A:** The card automatically detects Home Assistant's language. To override:

```yaml
language: de    # de | en | fr | it | es
```

Supported: German, English, French, Italian, Spanish
</details>

### Troubleshooting

<details>
<summary><b>Q: Card not showing after installation</b></summary>

**A:** Try these steps:
1. Clear browser cache (Ctrl+F5 / Cmd+Shift+R)
2. Verify resource is added (Settings → Dashboards → Resources)
3. Check browser console for errors (F12)
4. Restart Home Assistant
5. Check that card type is `custom:pv-monitor-card`
</details>

<details>
<summary><b>Q: Animations not working</b></summary>

**A:** Check:
1. `animation: true` is set on the card
2. `pv_max_power` or `battery_capacity` is configured (required for animations)
3. Entity values are > 0
4. Browser supports CSS animations
</details>

<details>
<summary><b>Q: Consumer sum doesn't match house consumption</b></summary>

**A:** This is normal! The consumer sum only includes tracked devices above threshold. Untracked loads (lighting, always-on devices, etc.) explain the difference:

```
House: 3450 W          ← Total consumption
Consumers: 2100 W      ← Tracked devices
Untracked: 1350 W      ← Lighting, base load, etc.
```
</details>

<details>
<summary><b>Q: Threshold not working</b></summary>

**A:** Check:
1. Threshold is configured (`threshold: 10` for grid/consumers)
2. Value is appropriate for your system (try increasing)
3. Entity provides numeric values
4. Units are in Watts (not kW)
</details>

---

## 💡 Tips & Best Practices

### Sensor Configuration

**✅ Use Watts (W) for all power sensors**
```yaml
# Good
entities:
  pv_production: sensor.pv_power          # Returns: 5000 W

# Avoid
entities:
  pv_production: sensor.pv_power_kw       # Returns: 5 kW
```

**✅ Battery SoC should be 0-100 (not 0-1)**
```yaml
# Good
battery_soc: sensor.battery_soc           # Returns: 75 (%)

# Bad
battery_soc: sensor.battery_soc_decimal   # Returns: 0.75
```

**✅ Grid power sign convention**
```yaml
# Correct convention:
# +1000 W = Importing from grid
# -1000 W = Exporting to grid
entities:
  grid_power: sensor.grid_power
```

### Performance Optimization

**Limit Consumer Count**
```yaml
consumers:
  threshold: 10                   # Hide low-power devices
  sort_mode: highest_first        # Show important ones first
```

**Use Template Sensors for Complex Calculations**
```yaml
# Instead of frequent recalculation, create template sensor:
template:
  - sensor:
      - name: "Total PV Power"
        state: >
          {{ states('sensor.pv1_power')|float + states('sensor.pv2_power')|float }}
```

### Visual Clarity

**Start with a Theme**
```yaml
theme: modern-dark              # Use pre-built theme as base
```

**Use Consistent Colors**
```yaml
# Pick a color scheme and stick to it
pv:
  style:
    primary_color: '#FFD700'    # Gold for PV
    icon_color: '#FFD700'

batterie:
  style:
    primary_color: '#4CAF50'    # Green for battery
```

**Test Readability**
- Check in both day and night lighting
- Ensure sufficient contrast
- Test on mobile devices

---

## 🔧 Common Customizations

### Show Daily Energy Statistics

```yaml
pv:
  secondary_entity: sensor.pv_daily_yield
  secondary_text: 'Today'

haus:
  secondary_entity: sensor.house_daily_energy
  secondary_text: 'Today'
```

### Add Electricity Cost Tracking

```yaml
# Create cost sensor
template:
  - sensor:
      - name: "Electricity Cost Today"
        unit_of_measurement: '€'
        state: >
          {% set import_kwh = states('sensor.grid_daily_import')|float %}
          {% set export_kwh = states('sensor.grid_daily_export')|float %}
          {{ ((import_kwh * 0.30) - (export_kwh * 0.08))|round(2) }}

# Show in info bar
info_bar:
  item3:
    entity: sensor.electricity_cost_today
    icon: mdi:currency-eur
    label: 'Cost Today'
```

### Customize Card Order

```yaml
layout_order:
  - header
  - info_bar
  - pv_bar
  - cards
  - battery_bar
  - consumers
```

### Create Custom Threshold Sensor

```yaml
template:
  - binary_sensor:
      - name: "High House Consumption"
        state: >
          {{ states('sensor.house_power')|float > 3000 }}

# Use in automation
automation:
  - alias: "Alert High Consumption"
    trigger:
      - platform: state
        entity_id: binary_sensor.high_house_consumption
        to: 'on'
    action:
      - service: notify.mobile_app
        data:
          message: "House consumption above 3kW!"
```

---

## 📊 Understanding Calculations

### Autonomy (Self-Sufficiency)

```
Autonomy = (House Consumption - Grid Import) / House Consumption × 100%
```

**What it means:**  
Percentage of your consumption covered by own generation (PV + Battery)

**Example:**
- House: 3000 W
- Grid Import: 500 W
- **Autonomy: 83.3%**

You're covering 83.3% of consumption from PV + Battery.

### Self-Consumption (Self-Use)

```
Self-Consumption = (PV Production - Grid Export) / PV Production × 100%
```

**What it means:**  
Percentage of PV production you use directly (not exported)

**Example:**
- PV: 5000 W
- Grid Export: 1000 W
- **Self-Consumption: 80%**

You're using 80% of PV production directly.

### Battery Runtime

```
Runtime = (Battery SoC × Capacity) / Discharge Power
```

**What it means:**  
Estimated time battery can power house at current rate

**Example:**
- SoC: 80%
- Capacity: 10 kWh
- Discharge: 2000 W
- **Runtime: 4 hours**

### Battery Charge Time

```
Charge Time = ((100 - Battery SoC) × Capacity) / Charge Power
```

**What it means:**  
Estimated time to full charge at current rate

**Example:**
- SoC: 40%
- Capacity: 10 kWh
- Charge: 3000 W
- **Charge Time: 2 hours**

---

## 🎨 Theme Previews

The card includes 6 pre-built themes:

| Theme | Description | Best For |
|-------|-------------|----------|
| `modern-dark` | Dark background, modern accents | Default, general use |
| `blue-energy` | Blue tones, cool aesthetic | Energy-focused dashboards |
| `minimalist` | Clean, reduced colors | Minimalist interfaces |
| `solar-bright` | Yellow-orange, sunny colors | Solar-themed dashboards |
| `nature-green` | Natural green colors | Eco-friendly emphasis |
| `high-contrast` | High contrast colors | Accessibility, visibility |

```yaml
theme: modern-dark              # Just set the theme name
```

---

## 🆘 Getting Help

### Before Asking for Help

1. **Check documentation** – Most questions are answered here
2. **Check browser console** – Press F12, look for errors
3. **Verify configuration** – Use YAML validation
4. **Test with minimal config** – Strip down to basics
5. **Check entity IDs** – Verify they exist and have values

### How to Report Issues

When reporting issues on [GitHub](https://github.com/sjerocom/pv-monitor-card/issues), include:

1. **Home Assistant version**
2. **Card version** (check HACS or release)
3. **Browser** (Chrome, Firefox, Safari, etc.)
4. **Minimal configuration** that reproduces the issue
5. **Browser console errors** (F12 → Console)
6. **Screenshots** if visual issue

**Good Issue Report Example:**
```
**Version:** Home Assistant 2024.10, PV Monitor Card 2.0.0
**Browser:** Chrome 120
**Problem:** Battery icon not changing with SoC

**Configuration:**
```yaml
type: custom:pv-monitor-card
entities:
  battery_soc: sensor.battery_soc
batterie:
  show: true
  icon: ''
```

**Console Error:** None

**Additional Info:** Battery SoC shows 75% but icon stays at mdi:battery-outline
```

### Support Channels

- 🐛 **[GitHub Issues](https://github.com/sjerocom/pv-monitor-card/issues)** – Bug reports & feature requests
- 💬 **[GitHub Discussions](https://github.com/sjerocom/pv-monitor-card/discussions)** – Questions & community help
- 📖 **[Documentation](https://github.com/sjerocom/pv-monitor-card/tree/main/docs)** – Detailed guides

---

## 🔄 Updating

### HACS Update

1. Go to **HACS** → **Frontend**
2. Find **PV Monitor Card**
3. Click **Update** if available
4. **Refresh browser** (Ctrl+F5)

### Manual Update

1. Download latest `pv-monitor-card.js` from [releases](https://github.com/sjerocom/pv-monitor-card/releases)
2. Replace existing file in `/config/www/community/pv-monitor-card/`
3. **Refresh browser** (Ctrl+F5)
4. May need to clear cache

### Breaking Changes

Check [Release Notes](https://github.com/sjerocom/pv-monitor-card/releases) for breaking changes. Major version updates (e.g., 1.x → 2.x) may require configuration updates.

---

## 🌟 Contributing

Want to help improve the card?

- 📝 **Improve documentation** – Fix typos, add examples
- 🐛 **Report bugs** – Detailed issue reports help a lot
- ✨ **Suggest features** – Share your ideas
- 🌍 **Add translations** – Help translate to more languages
- 💻 **Submit code** – Pull requests welcome!

See [Contributing Guide](../CONTRIBUTING.md) for details.

---

## 📄 License & Credits

- **License:** MIT License
- **Author:** sjerocom
- **Repository:** [github.com/sjerocom/pv-monitor-card](https://github.com/sjerocom/pv-monitor-card)

Built with ❤️ for the Home Assistant community.

---

[⬅️ Back to Main README](../README.md)
