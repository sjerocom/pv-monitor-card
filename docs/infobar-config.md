# Info Bar Configuration

Complete guide to the Info Bar feature with automatic calculations for autonomy, self-consumption, and battery times.

---

## Table of Contents

- [Overview](#overview)
- [Basic Configuration](#basic-configuration)
- [Automatic Calculations](#automatic-calculations)
- [Manual Entity Configuration](#manual-entity-configuration)
- [Individual Item Calculation](#individual-item-calculation)
- [Styling](#styling)
- [Tap Actions](#tap-actions)
- [Complete Examples](#complete-examples)

---

## Overview

The Info Bar displays up to **3 configurable items** with powerful automatic calculations:

1. **Item 1** – Autonomy or Self-Consumption (automatic calculation)
2. **Item 2** – Battery Runtime (automatic calculation)
3. **Item 3** – Battery Charge Time (automatic calculation)

Each item shows an icon, label, value, and unit.

<!-- TODO: Screenshot - Info Bar with all 3 items showing -->

---

## Basic Configuration

### Enable Info Bar

```yaml
info_bar:
  show: true
  position: top                       # top | bottom
```

### Position Options

| Position | Description |
|----------|-------------|
| `top` | Between header and main cards (default) |
| `bottom` | Below main cards, above consumers |

<!-- TODO: Screenshot - Info bar position comparison -->

---

## Automatic Calculations

The Info Bar's main power is its automatic calculation of key energy metrics.

### Quick Setup with Calculations

```yaml
info_bar:
  show: true
  position: top
  calculation_mode: autarky           # autarky | self_consumption
  calculate_battery_times: true      # Enable battery calculations
```

This configuration automatically calculates:
- **Item 1:** Autonomy (or Self-Consumption)
- **Item 2:** Battery Runtime
- **Item 3:** Battery Charge Time

<!-- TODO: Screenshot - Info bar with automatic calculations -->

---

## Item 1: Autonomy vs Self-Consumption

Choose which metric to calculate for Item 1.

### Autonomy (Self-Sufficiency)

Shows what percentage of your consumption is covered by your own generation.

**Formula:**
```
Autonomy = (House Consumption - Grid Import) / House Consumption × 100%
```

**Configuration:**
```yaml
info_bar:
  calculation_mode: autarky
  
  item1:
    icon: mdi:home-lightning-bolt
    label: 'Autonomy'
    unit: '%'
```

**Example Calculation:**
- House Consumption: 3000 W
- Grid Import: 500 W
- **Autonomy: 83.3%** ✅

This means 83.3% of your current consumption is covered by PV + Battery.

<!-- TODO: Screenshot - Autonomy display in info bar -->

### Self-Consumption (Self-Use)

Shows what percentage of your PV production you use yourself (not exported).

**Formula:**
```
Self-Consumption = (PV Production - Grid Export) / PV Production × 100%
```

**Configuration:**
```yaml
info_bar:
  calculation_mode: self_consumption
  
  item1:
    icon: mdi:solar-power
    label: 'Self-Consumption'
    unit: '%'
```

**Example Calculation:**
- PV Production: 5000 W
- Grid Export: 1000 W
- **Self-Consumption: 80%** ✅

This means you're using 80% of your PV production directly.

<!-- TODO: Screenshot - Self-consumption display in info bar -->

### Special Cases

**During Feed-in (Export):**
- Autonomy can exceed 100% (limited to 100% in display)
- Self-Consumption calculation remains valid

**At Night (No PV):**
- Self-Consumption shows "0%" or "N/A"
- Autonomy depends on battery discharge

---

## Item 2 & 3: Battery Times

Automatic calculation of remaining runtime and charge time.

### Enable Battery Time Calculations

```yaml
info_bar:
  calculate_battery_times: true      # Enables items 2 & 3

battery_capacity: 10000              # Required (Wh)
```

<!-- TODO: Screenshot - Battery runtime and charge time in info bar -->

### Item 2: Battery Runtime (Discharge)

Estimates how long the battery can power your house at current discharge rate.

**Formula:**
```
Runtime = (Battery SoC × Capacity) / Discharge Power
```

**Configuration:**
```yaml
info_bar:
  calculate_battery_times: true
  
  item2:
    icon: mdi:battery-clock
    label: 'Runtime'
    # No entity needed - automatic calculation
```

**Example Calculation:**
- SoC: 80%
- Capacity: 10 kWh
- Discharge: 2000 W
- **Runtime: 4 hours** ✅

**Display Format:**
- `X hrs Y min` (when > 1 hour)
- `X minutes` (when < 1 hour)
- `Not available` (when not discharging)

### Item 3: Battery Charge Time

Estimates time until battery is fully charged at current charge rate.

**Formula:**
```
Charge Time = ((100 - Battery SoC) × Capacity) / Charge Power
```

**Configuration:**
```yaml
info_bar:
  calculate_battery_times: true
  
  item3:
    icon: mdi:battery-charging
    label: 'Charge Time'
    # No entity needed - automatic calculation
```

**Example Calculation:**
- SoC: 40%
- Capacity: 10 kWh
- Charge: 3000 W
- **Charge Time: 2 hours** ✅

**Display Format:**
- `X hrs Y min` (when > 1 hour)
- `X minutes` (when < 1 hour)
- `Full` (when SoC = 100%)
- `Not available` (when not charging)

---

## Manual Entity Configuration

Override automatic calculations with custom entities for any item.

### Using Custom Entities

```yaml
info_bar:
  show: true
  
  # Item 1: Solar forecast instead of autonomy
  item1:
    entity: sensor.solar_forecast_today
    icon: mdi:weather-sunny
    label: 'Forecast Today'
    unit: 'kWh'
  
  # Item 2: Electricity price
  item2:
    entity: sensor.electricity_price_current
    icon: mdi:currency-eur
    label: 'Price'
    unit: 'ct/kWh'
  
  # Item 3: CO2 savings
  item3:
    entity: sensor.co2_savings_today
    icon: mdi:leaf
    label: 'CO₂ Saved'
    unit: 'kg'
```

When an `entity` is specified, automatic calculations are disabled for that item.

<!-- TODO: Screenshot - Info bar with custom entities -->

---

## Individual Item Calculation

Fine-tune calculations per item without using `calculation_mode` or `calculate_battery_times`.

### Item-Level Calculation Types

```yaml
info_bar:
  show: true
  
  # Set calculation type per item
  item1_calc_type: autarky            # autarky | self_consumption | runtime | chargetime | entity
  item2_calc_type: runtime
  item3_calc_type: chargetime
```

### Calculation Type Options

| Type | Description | Requirements |
|------|-------------|--------------|
| `autarky` | Autonomy percentage | house_consumption, grid_power |
| `self_consumption` | Self-consumption percentage | pv_production, grid_power |
| `runtime` | Battery runtime | battery_soc, battery_discharge, capacity |
| `chargetime` | Battery charge time | battery_soc, battery_charge, capacity |
| `entity` | Use specified entity | item.entity |

### Mixing Calculation Types

```yaml
info_bar:
  show: true
  
  # Mix automatic calculations with custom entity
  item1_calc_type: autarky
  item1:
    icon: mdi:home-lightning-bolt
    label: 'Autonomy'
    unit: '%'
  
  item2_calc_type: entity
  item2:
    entity: sensor.electricity_price
    icon: mdi:currency-eur
    label: 'Price'
    unit: 'ct/kWh'
  
  item3_calc_type: chargetime
  item3:
    icon: mdi:battery-charging
    label: 'Charge Time'
```

This gives maximum flexibility while avoiding the need for `calculation_mode` or `calculate_battery_times`.

---

## Styling

### Global Info Bar Styling

```yaml
info_bar:
  style:
    # Container
    background_color: 'rgba(33, 150, 243, 0.1)'
    border_color: 'rgba(33, 150, 243, 0.3)'
    border_radius: '12px'
    padding: '8px'
    gap: '16px'                       # Spacing between items
    box_shadow: '0 2px 4px rgba(0,0,0,0.1)'
```

<!-- TODO: Screenshot - Styled info bar -->

### Icon Styling

```yaml
info_bar:
  style:
    icon_size: '1.5em'
    icon_color: '#2196F3'
    icon_opacity: '1'
```

### Label Styling

```yaml
info_bar:
  style:
    label_size: '0.8em'
    label_color: 'rgba(255, 255, 255, 0.7)'
    label_font_weight: 'normal'
    label_line_height: '1.2'
    label_opacity: '0.8'
```

### Value Styling

```yaml
info_bar:
  style:
    value_size: '1.2em'
    value_color: 'white'
    value_font_weight: 'bold'
    value_line_height: '1.2'
    value_opacity: '1'
```

### Complete Styling Example

```yaml
info_bar:
  show: true
  
  style:
    # Container
    background_color: 'rgba(33, 150, 243, 0.1)'
    border_color: 'rgba(33, 150, 243, 0.3)'
    border_radius: '16px'
    padding: '12px'
    gap: '20px'
    box_shadow: '0 4px 8px rgba(0,0,0,0.2)'
    
    # Icons
    icon_size: '2em'
    icon_color: '#2196F3'
    
    # Labels
    label_size: '0.9em'
    label_color: '#90CAF9'
    label_font_weight: '500'
    
    # Values
    value_size: '1.4em'
    value_color: '#2196F3'
    value_font_weight: 'bold'
```

---

## Tap Actions

Configure interactive behavior when clicking the Info Bar.

### Basic Actions

```yaml
info_bar:
  tap_action:
    action: navigate
    navigation_path: /lovelace/energy-details
  
  double_tap_action:
    action: more-info
  
  hold_action:
    action: call-service
    service: script.energy_report
```

### Advanced Actions

```yaml
info_bar:
  tap_action:
    action: navigate
    navigation_path: /lovelace/energy-dashboard
  
  double_tap_action:
    action: call-service
    service: notify.mobile_app
    service_data:
      title: 'Energy Stats'
      message: >
        Autonomy: {{ states('sensor.autonomy') }}%
        Runtime: {{ states('sensor.battery_runtime') }}
  
  hold_action:
    action: url
    url_path: https://pvoutput.org
```

---

## Complete Examples

### Simple Autonomy Display

```yaml
type: custom:pv-monitor-card

entities:
  pv_production: sensor.pv_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

info_bar:
  show: true
  position: top
  calculation_mode: autarky
  
  item1:
    icon: mdi:home-lightning-bolt
    label: 'Autonomy'
```

<!-- TODO: Screenshot - Simple autonomy info bar -->

### Full Battery Monitoring

```yaml
type: custom:pv-monitor-card

entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

battery_capacity: 10000

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
    label: 'Runtime'
  
  item3:
    icon: mdi:battery-charging
    label: 'Charge Time'
  
  tap_action:
    action: navigate
    navigation_path: /lovelace/energy
```

<!-- TODO: Screenshot - Full battery monitoring info bar -->

### Mixed Calculations and Entities

```yaml
type: custom:pv-monitor-card

entities:
  pv_production: sensor.pv_power
  battery_soc: sensor.battery_soc
  battery_discharge: sensor.battery_discharge_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

battery_capacity: 10000

info_bar:
  show: true
  position: top
  
  # Mix automatic calculations with custom entities
  item1_calc_type: autarky
  item1:
    icon: mdi:home-lightning-bolt
    label: 'Autonomy'
    unit: '%'
  
  item2_calc_type: runtime
  item2:
    icon: mdi:battery-clock
    label: 'Runtime'
  
  item3_calc_type: entity
  item3:
    entity: sensor.solar_forecast_remaining
    icon: mdi:weather-sunny
    label: 'Forecast'
    unit: 'kWh'
  
  style:
    background_color: 'rgba(33, 150, 243, 0.1)'
    border_color: 'rgba(33, 150, 243, 0.3)'
    icon_color: '#2196F3'
    value_color: '#2196F3'
```

<!-- TODO: Screenshot - Mixed calculations info bar -->

### Custom Entities Only

```yaml
type: custom:pv-monitor-card

info_bar:
  show: true
  position: top
  
  # All custom entities - no automatic calculations
  item1:
    entity: sensor.solar_forecast_today
    icon: mdi:weather-sunny
    label: 'Forecast Today'
    unit: 'kWh'
  
  item2:
    entity: sensor.electricity_price_current
    icon: mdi:currency-eur
    label: 'Current Price'
    unit: 'ct/kWh'
  
  item3:
    entity: sensor.co2_savings_today
    icon: mdi:leaf
    label: 'CO₂ Saved'
    unit: 'kg'
  
  style:
    background_color: 'rgba(76, 175, 80, 0.1)'
    border_color: 'rgba(76, 175, 80, 0.3)'
    icon_color: '#4CAF50'
```

<!-- TODO: Screenshot - Custom entities only info bar -->

---

## Tips & Best Practices

### 💡 Choosing Autonomy vs Self-Consumption

**Use Autonomy when:**
- You want to know how self-sufficient you are
- Focus is on reducing grid dependency
- Metric for battery system effectiveness

**Use Self-Consumption when:**
- You want to maximize direct PV usage
- Focus is on reducing grid export
- Metric for system sizing optimization

### 💡 Battery Capacity Accuracy

For accurate runtime/charge time calculations, set `battery_capacity` to your **usable capacity**:

```yaml
# Example: 10 kWh battery with 90% usable capacity
battery_capacity: 9000              # 9 kWh usable
```

### 💡 Handling Missing Data

Automatic calculations gracefully handle missing sensors:
- **Missing PV sensor:** Calculations assume PV = 0
- **Missing battery sensors:** Battery times show "Not available"
- **Missing grid sensor:** Calculations may be inaccurate

### 💡 Custom Calculation Sensors

Create template sensors for complex calculations:

```yaml
# configuration.yaml
template:
  - sensor:
      - name: "Energy Cost Today"
        unit_of_measurement: '€'
        state: >
          {% set import_kwh = states('sensor.grid_daily_import') | float %}
          {% set export_kwh = states('sensor.grid_daily_export') | float %}
          {{ ((import_kwh * 0.30) - (export_kwh * 0.08)) | round(2) }}
      
      - name: "Autonomy Level"
        unit_of_measurement: '%'
        state: >
          {% set house = states('sensor.house_power') | float %}
          {% set grid = states('sensor.grid_power') | float %}
          {% if house > 0 %}
            {{ (((house - grid) / house) * 100) | round(1) }}
          {% else %}
            0
          {% endif %}
```

Then use in Info Bar:

```yaml
info_bar:
  item3:
    entity: sensor.energy_cost_today
    icon: mdi:currency-eur
    label: 'Cost Today'
```

---

## Troubleshooting

### Calculations Show Wrong Values

**Problem:** Autonomy or self-consumption shows unexpected values  
**Solution:**
- Verify all required entities are configured and working
- Check grid_power sign convention (+ = import, - = export)
- Ensure house_consumption is total consumption (not just consumers)
- Check for sensor units (should be W, not kW)

### Battery Times Not Calculating

**Problem:** Runtime/charge time show "Not available"  
**Solution:**
- Set `battery_capacity` in root config
- Verify battery_soc is 0-100 (not 0-1)
- Check battery_charge/discharge entities exist and have values > 0
- Ensure `calculate_battery_times: true` is set

### Info Bar Not Showing

**Problem:** Info Bar doesn't appear  
**Solution:**
- Verify `info_bar.show: true`
- Check position setting is valid
- Ensure at least one item is configured
- Verify required entities for calculations exist

### Icons Not Displaying

**Problem:** Icons don't show in Info Bar items  
**Solution:**
- Check icon names are valid MDI icons (format: `mdi:icon-name`)
- Verify icon names don't have typos
- Ensure icons are specified in item config

---

## Advanced Usage

### Dynamic Item Configuration

Use automation to show different info based on time of day:

```yaml
# automation.yaml
automation:
  - alias: "Info Bar Day Mode"
    trigger:
      - platform: sun
        event: sunrise
    action:
      - service: browser_mod.lovelace_reload
  
  - alias: "Info Bar Night Mode"
    trigger:
      - platform: sun
        event: sunset
    action:
      - service: browser_mod.lovelace_reload
```

### Conditional Display

Show battery times only when battery is installed:

```yaml
info_bar:
  show: true
  calculate_battery_times: >
    {{ states('sensor.battery_soc') != 'unavailable' }}
```

---

[⬅️ Back to Main README](../README.md)
