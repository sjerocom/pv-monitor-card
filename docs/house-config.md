# House Consumption Configuration

Complete guide to configuring house consumption monitoring and consumer integration.

---

## Table of Contents

- [Basic Configuration](#basic-configuration)
- [Consumer Sum Display](#consumer-sum-display)
- [Additional Text Lines](#additional-text-lines)
- [Animations](#animations)
- [Styling](#styling)
- [Tap Actions](#tap-actions)
- [Complete Examples](#complete-examples)

---

## Basic Configuration

The house card displays your total household power consumption in real-time.

<!-- TODO: Screenshot - House card showing consumption -->

### Essential Setup

```yaml
haus:
  show: true                          # Show the house card
  icon: mdi:home                      # Custom icon (optional)
  animation: true                     # Enable animated effects
  animation_style: rotating-dots      # Animation type
```

### Required Entity

Configure the house consumption entity in the root configuration:

```yaml
entities:
  house_consumption: sensor.house_power    # Total house consumption in Watts
```

---

## Consumer Sum Display

Display the sum of all active consumers as a secondary line in the house card.

<!-- TODO: Screenshot - House card with consumer sum -->

### Enable Consumer Sum

```yaml
haus:
  show_consumer_total: true           # Show sum of all consumers

consumers:
  show: true
  threshold: 10                       # Only include consumers > 10W
  items:
    - entity: sensor.dishwasher_power
    - entity: sensor.ev_charger_power
    - entity: sensor.heat_pump_power
```

### Display Format

When enabled, the house card shows:

```
House: 3450 W          ← Total consumption
Consumers: 2100 W      ← Sum of all active consumers (above threshold)
```

**Calculation:**
- Only consumers **above their threshold** are included in the sum
- If a consumer has no individual threshold, the global threshold applies
- Consumers with `0 W` or below threshold are excluded

### Example Scenario

```yaml
haus:
  show_consumer_total: true

consumers:
  threshold: 10                       # Global threshold
  items:
    - entity: sensor.dishwasher_power      # 1500 W ✅ Included
    - entity: sensor.ev_charger_power      # 0 W ❌ Excluded (< 10W)
      threshold: 50                         
    - entity: sensor.heat_pump_power       # 600 W ✅ Included
    - entity: sensor.router_power          # 8 W ❌ Excluded (< 10W)
```

**Result:**
```
House: 3450 W
Consumers: 2100 W      ← (1500 + 600 = 2100 W)
```

---

## Additional Text Lines

Display extra information below the main consumption value.

<!-- TODO: Screenshot - House card with daily and monthly consumption -->

### Secondary Line (e.g., Daily Consumption)

```yaml
haus:
  secondary_entity: sensor.house_daily_energy
  secondary_text: 'Today'            # Optional prefix text
```

**Result:**
```
3.45 kW            ← Primary (current consumption)
Today: 42.5 kWh    ← Secondary (daily total)
```

### Tertiary Line (e.g., Monthly Consumption)

```yaml
haus:
  tertiary_entity: sensor.house_monthly_energy
  tertiary_text: 'This Month'
```

**Result:**
```
3.45 kW               ← Primary (current consumption)
Today: 42.5 kWh       ← Secondary (daily total)
This Month: 875 kWh   ← Tertiary (monthly total)
```

### Visibility Control

```yaml
haus:
  show_primary: true                 # Show main power value
  show_secondary: true               # Show secondary line
  show_tertiary: true                # Show tertiary line
```

---

## Animations

Visualize house consumption with animated effects.

### Animation Styles

#### 1. Rotating Dots (Default)

```yaml
haus:
  animation: true
  animation_style: rotating-dots
```

Circular dots rotate around the icon, speed increases with consumption.

<!-- TODO: Screenshot/GIF - Rotating dots on house card -->

#### 2. Particle Field

```yaml
haus:
  animation: true
  animation_style: particle-field
```

Animated particles move across the card.

<!-- TODO: Screenshot/GIF - Particle field on house card -->

#### 3. Electric Arc

```yaml
haus:
  animation: true
  animation_style: electric-arc
```

Electric arcs pulse around the icon.

<!-- TODO: Screenshot/GIF - Electric arc on house card -->

### Disable Animations

```yaml
haus:
  animation: false                   # No animations
```

---

## Styling

### Card Appearance

```yaml
haus:
  style:
    # Container
    background_color: 'rgba(255, 152, 0, 0.1)'    # Orange tint
    border_color: 'rgba(255, 152, 0, 0.3)'         # Orange border
    border_radius: '16px'
    padding: '12px'
    box_shadow: '0 2px 8px rgba(0,0,0,0.3)'
    cursor: 'pointer'
```

<!-- TODO: Screenshot - Styled house card -->

### Colors

```yaml
haus:
  style:
    # Icon
    icon_color: '#FF9800'                          # Orange icon
    icon_size: '2.5em'
    icon_opacity: '1'
    icon_margin: '6px'
    
    # Primary text (power value)
    primary_color: '#FF9800'                       # Orange text
    primary_size: '1.5em'
    primary_font_weight: 'bold'
    primary_opacity: '1'
    primary_line_height: '1.2'
    
    # Secondary text (e.g., daily consumption)
    secondary_color: '#FFB74D'                     # Light orange
    secondary_size: '1em'
    secondary_font_weight: 'normal'
    secondary_opacity: '0.8'
    secondary_line_height: '1.2'
    
    # Tertiary text (e.g., monthly consumption)
    tertiary_color: '#FFB74D'
    tertiary_size: '0.9em'
    tertiary_opacity: '0.7'
    tertiary_line_height: '1.2'
```

### Consumer Sum Styling

The consumer sum line uses the secondary text styling:

```yaml
haus:
  show_consumer_total: true
  
  style:
    # Consumer sum will use these settings
    secondary_color: '#FFA726'
    secondary_size: '0.95em'
    secondary_font_weight: 'normal'
```

---

## Tap Actions

Configure interactive behavior when clicking the house card.

### Action Types

| Action | Description | Required Parameters |
|--------|-------------|---------------------|
| `more-info` | Opens entity details dialog | None |
| `navigate` | Navigate to dashboard | `navigation_path` |
| `url` | Open URL | `url_path` |
| `call-service` | Call Home Assistant service | `service`, `service_data` |
| `none` | No action | None |

### Basic Actions

```yaml
haus:
  tap_action:
    action: more-info                              # Single tap = entity details
  
  double_tap_action:
    action: navigate
    navigation_path: /lovelace/energy-usage       # Double tap = go to usage page
  
  hold_action:
    action: call-service                          # Hold = call service
    service: script.house_energy_report
```

### Advanced Actions

```yaml
haus:
  tap_action:
    action: navigate
    navigation_path: /lovelace/house-consumption
  
  double_tap_action:
    action: call-service
    service: notify.mobile_app
    service_data:
      title: 'House Consumption'
      message: 'Current: {{ states("sensor.house_power") }} W'
  
  hold_action:
    action: url
    url_path: https://your-energy-monitoring-dashboard.com
```

---

## Complete Examples

### Basic House Card

```yaml
type: custom:pv-monitor-card

entities:
  house_consumption: sensor.house_power

haus:
  show: true
  animation: true
  animation_style: rotating-dots
  
  tap_action:
    action: more-info
```

<!-- TODO: Screenshot - Basic house card result -->

### House with Consumer Sum

```yaml
type: custom:pv-monitor-card

entities:
  house_consumption: sensor.house_power

haus:
  show: true
  show_consumer_total: true           # Show consumer sum
  animation: true
  animation_style: particle-field
  
  style:
    background_color: 'rgba(255, 152, 0, 0.1)'
    border_color: 'rgba(255, 152, 0, 0.3)'
    primary_color: '#FF9800'
    secondary_color: '#FFB74D'
    icon_color: '#FF9800'

consumers:
  show: true
  threshold: 10
  items:
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
    
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      threshold: 50
    
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Heat Pump'
```

<!-- TODO: Screenshot - House card with consumer sum -->

### House with Daily/Monthly Stats

```yaml
type: custom:pv-monitor-card

entities:
  house_consumption: sensor.house_power

haus:
  show: true
  animation: true
  icon: mdi:home-lightning-bolt
  
  # Additional statistics
  secondary_entity: sensor.house_daily_energy
  secondary_text: 'Today'
  
  tertiary_entity: sensor.house_monthly_energy
  tertiary_text: 'Month'
  
  # Styling
  style:
    background_color: 'rgba(255, 152, 0, 0.1)'
    border_color: 'rgba(255, 152, 0, 0.3)'
    primary_color: '#FF9800'
    secondary_color: '#FFB74D'
    tertiary_color: '#FFB74D'
    icon_color: '#FF9800'
  
  # Actions
  tap_action:
    action: navigate
    navigation_path: /lovelace/energy-usage
  
  double_tap_action:
    action: more-info
```

<!-- TODO: Screenshot - House card with daily/monthly stats -->

### Full Featured House Card

```yaml
type: custom:pv-monitor-card

entities:
  house_consumption: sensor.house_power

haus:
  show: true
  show_consumer_total: true
  animation: true
  animation_style: electric-arc
  icon: mdi:home-lightning-bolt-outline
  
  # Statistics
  secondary_entity: sensor.house_daily_energy
  secondary_text: 'Today'
  
  tertiary_entity: sensor.house_cost_today
  tertiary_text: 'Cost'
  
  # Full styling
  style:
    background_color: 'rgba(255, 152, 0, 0.1)'
    border_color: 'rgba(255, 152, 0, 0.3)'
    border_radius: '20px'
    padding: '16px'
    
    icon_color: '#FF9800'
    icon_size: '3em'
    
    primary_color: '#FF9800'
    primary_size: '1.8em'
    primary_font_weight: 'bold'
    
    secondary_color: '#FFB74D'
    secondary_size: '1.1em'
    
    tertiary_color: '#FFB74D'
    tertiary_size: '1em'
  
  # Actions
  tap_action:
    action: navigate
    navigation_path: /lovelace/house-details
  
  double_tap_action:
    action: call-service
    service: script.generate_energy_report
  
  hold_action:
    action: more-info

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
    
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
    
    - entity: sensor.washing_machine_power
      icon: mdi:washing-machine
      label: 'Washing Machine'
```

<!-- TODO: Screenshot - Full featured house card -->

---

## Tips & Best Practices

### 💡 Consumer Sum Accuracy

For accurate consumer sum display:
1. Ensure all major consumers are configured
2. Set appropriate thresholds to filter standby power
3. Use consistent power units (Watts) for all sensors

```yaml
haus:
  show_consumer_total: true

consumers:
  threshold: 10                       # Filter out small standby loads
  items:
    # Add all significant power consumers
    - entity: sensor.major_appliance1_power
    - entity: sensor.major_appliance2_power
```

### 💡 Daily Energy Tracking

For kWh display in secondary/tertiary lines, use energy sensors (not power):

```yaml
haus:
  secondary_entity: sensor.house_daily_energy     # kWh sensor
  tertiary_entity: sensor.house_monthly_energy    # kWh sensor
```

If you only have power sensors (W), create template sensors:

```yaml
# configuration.yaml
template:
  - sensor:
      - name: "House Daily Energy"
        unit_of_measurement: 'kWh'
        device_class: energy
        state_class: total_increasing
        state: "{{ states('sensor.house_power') | float }}"
```

Or use the built-in [Riemann Sum integration](https://www.home-assistant.io/integrations/integration/).

### 💡 Understanding Consumer Sum

The displayed consumer sum may not equal total house consumption because:
1. Not all consumers are monitored individually
2. Some base load is not tracked (lighting, always-on devices)
3. Consumers below threshold are excluded

**Example:**
```
House: 3450 W          ← Total measured consumption
Consumers: 2100 W      ← Sum of tracked devices
Untracked: 1350 W      ← Lighting, base load, etc.
```

### 💡 Cost Tracking

Display electricity cost as tertiary text:

```yaml
haus:
  tertiary_entity: sensor.electricity_cost_today
  tertiary_text: 'Cost Today'
  
  style:
    tertiary_color: '#FF5722'         # Red for cost visibility
```

Create a cost sensor:

```yaml
# configuration.yaml
template:
  - sensor:
      - name: "Electricity Cost Today"
        unit_of_measurement: '€'
        state: >
          {{ (states('sensor.house_daily_energy') | float * 0.30) | round(2) }}
```

---

## Troubleshooting

### Consumer Sum Not Showing

**Problem:** Consumer sum doesn't appear  
**Solution:**
- Verify `show_consumer_total: true` in house config
- Check that `consumers.show: true`
- Ensure at least one consumer is above threshold
- Verify consumer entities provide valid numeric values

### Wrong Consumer Sum

**Problem:** Consumer sum doesn't match expected value  
**Solution:**
- Check individual consumer thresholds
- Verify all consumers use Watts (not kW)
- Ensure consumers entities return numeric states
- Check that consumers are actually consuming power

### Animation Not Working

**Problem:** House animation doesn't display  
**Solution:**
- Ensure `animation: true` is set
- Verify house_consumption entity provides valid values
- Check that consumption is > 0 for animation to trigger

### Secondary/Tertiary Text Not Showing

**Problem:** Additional text lines don't appear  
**Solution:**
- Verify entities are configured and exist
- Check entity names are correct
- Ensure entities provide valid states
- Confirm entities have proper units (e.g., kWh for energy)

---

## Integration with Other Features

### With Info Bar

Show autonomy calculation based on house consumption:

```yaml
haus:
  show: true

info_bar:
  show: true
  calculation_mode: autarky           # Uses house_consumption for calculation
```

### With Consumers

Track individual devices and show their sum:

```yaml
haus:
  show: true
  show_consumer_total: true

consumers:
  show: true
  sort_mode: highest_first
  threshold: 10
  items:
    # Add all major consumers here
```

### With Grid Card

House consumption affects grid calculations:

```yaml
entities:
  house_consumption: sensor.house_power
  pv_production: sensor.pv_power
  grid_power: sensor.grid_power

# Grid power = House - PV (simplified)
# Actual: Grid = House - PV - Battery_Charge + Battery_Discharge
```

---

[⬅️ Back to Main README](../README.md)
