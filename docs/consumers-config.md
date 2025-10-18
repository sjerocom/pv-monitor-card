# Consumers Configuration

Complete guide to monitoring and controlling individual power consumers with the consumers feature.

---

## Table of Contents

- [Overview](#overview)
- [Basic Configuration](#basic-configuration)
- [Adding Consumers](#adding-consumers)
- [Sorting & Filtering](#sorting--filtering)
- [Switch Control](#switch-control)
- [Tap Actions](#tap-actions)
- [Display Options](#display-options)
- [Styling](#styling)
- [Complete Examples](#complete-examples)

---

## Overview

The Consumers feature displays a list of individual devices with their current power consumption, allowing you to:

- Monitor up to **unlimited** devices
- Sort by power consumption or alphabetically
- Filter by threshold (hide low-power devices)
- Control devices with switches
- Customize appearance per device
- Configure tap actions for each consumer

<!-- TODO: Screenshot - Consumers list with multiple devices -->

---

## Basic Configuration

### Enable Consumers

```yaml
consumers:
  show: true
  position: bottom                    # Only position available currently
  sort_mode: highest_first            # Sorting method
  threshold: 10                       # Global threshold (W)
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show` | boolean | `false` | Enable/disable consumers |
| `position` | string | `bottom` | Position on card |
| `sort_mode` | string | `highest_first` | Sort method |
| `threshold` | number | `0` | Global power threshold (W) |
| `items` | array | `[]` | List of consumer devices |

---

## Adding Consumers

### Basic Consumer

Minimal configuration for a consumer:

```yaml
consumers:
  items:
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
```

<!-- TODO: Screenshot - Single consumer item -->

### Consumer with Threshold

Set individual threshold (overrides global):

```yaml
consumers:
  threshold: 10                       # Global threshold
  
  items:
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
      threshold: 5                    # Individual threshold for this device
```

**Behavior:**
- Device only shows when power > 5W (not the global 10W)
- Individual threshold overrides global for that device

### Consumer with Auto-Color

Automatic color indication based on state:

```yaml
consumers:
  items:
    - entity: sensor.coffee_machine_power
      icon: mdi:coffee
      label: 'Coffee Machine'
      auto_color: true                # Green when active, gray when off
      threshold: 5
```

**Colors:**
- **Active** (power > threshold): 🟢 Green
- **Inactive** (power ≤ threshold): ⚪ Gray/Dimmed

<!-- TODO: Screenshot - Consumer with auto-color on/off comparison -->

---

## Sorting & Filtering

### Sort Modes

Control how consumers are ordered in the list:

```yaml
consumers:
  sort_mode: highest_first            # Choose sort method
```

**Available Modes:**

| Mode | Description | Best For |
|------|-------------|----------|
| `highest_first` | Highest power first (descending) | Finding biggest consumers |
| `lowest_first` | Lowest power first (ascending) | Checking standby loads |
| `none` | No sorting (config order) | Custom arrangement |
| `alpha_asc` | Alphabetical A-Z | Organized lists |
| `alpha_desc` | Alphabetical Z-A | Reverse organization |

<!-- TODO: Screenshot - Sort mode comparison showing different orders -->

### Threshold Filtering

Only show consumers above a certain power level:

```yaml
consumers:
  threshold: 10                       # Hide consumers < 10W
  
  items:
    - entity: sensor.ev_charger_power
      label: 'EV Charger'
      threshold: 50                   # This device: hide if < 50W
    
    - entity: sensor.heat_pump_power
      label: 'Heat Pump'              # Uses global 10W threshold
    
    - entity: sensor.router_power
      label: 'Router'
      threshold: 0                    # Always show (even at 0W)
```

**Example Scenario:**
```
EV Charger: 0 W        → Hidden (< 50W)
Heat Pump: 850 W       → Shown (> 10W)
Router: 8 W            → Shown (threshold: 0)
Dishwasher: 1500 W     → Shown (> 10W)
```

---

## Switch Control

Add switch control to toggle devices directly from the card.

### Basic Switch

```yaml
consumers:
  items:
    - entity: sensor.heater_power
      icon: mdi:radiator
      label: 'Heater'
      switch_entity: switch.heater    # Add switch control
```

**Behavior:**
- Tap on card → Opens more-info dialog
- Tap on icon → Toggles switch

<!-- TODO: Screenshot - Consumer with switch icon highlighted -->

### Switch with Custom Actions

Combine switch with custom tap actions:

```yaml
consumers:
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      switch_entity: switch.ev_charger
      
      tap_action_target: custom_action  # Use custom action instead
      tap_action:
        action: navigate
        navigation_path: /lovelace/ev-charging
```

**Action Targets:**

| Target | Description |
|--------|-------------|
| `none` | No action |
| `entity` | Toggle entity (default behavior) |
| `custom_entity` | Toggle different entity |
| `custom_action` | Execute custom action |

---

## Tap Actions

Configure interactive behavior for each consumer.

### Action Target Types

```yaml
consumers:
  items:
    - entity: sensor.ev_charger_power
      label: 'EV Charger'
      
      # Choose action target
      tap_action_target: custom_action        # none | entity | custom_entity | custom_action
      double_tap_action_target: entity
      hold_action_target: custom_action
```

### Custom Entity Toggle

Toggle a different entity on tap:

```yaml
consumers:
  items:
    - entity: sensor.pool_pump_power
      icon: mdi:pump
      label: 'Pool Pump'
      
      tap_action_target: custom_entity
      tap_action_custom_entity: switch.pool_pump    # Entity to toggle
```

### Custom Actions

Execute specific actions:

```yaml
consumers:
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      
      # Tap action
      tap_action_target: custom_action
      tap_action:
        action: navigate
        navigation_path: /lovelace/ev-details
      
      # Double tap action
      double_tap_action_target: custom_action
      double_tap_action:
        action: call-service
        service: notify.mobile_app
        service_data:
          message: 'EV Charger tapped'
      
      # Hold action
      hold_action_target: custom_action
      hold_action:
        action: more-info
```

**Available Actions:**
- `none` – No action
- `more-info` – Open entity dialog
- `navigate` – Go to dashboard
- `url` – Open URL
- `call-service` – Call Home Assistant service

<!-- TODO: Screenshot - Consumer tap action demonstration -->

---

## Display Options

### Additional Text Lines

Show extra information below the power value:

```yaml
consumers:
  items:
    - entity: sensor.washing_machine_power
      icon: mdi:washing-machine
      label: 'Washing Machine'
      
      # Primary line control
      show_primary: true                          # Show power value
      primary_entity: ''                          # Empty = use main entity
      primary_text: ''                            # Optional prefix
      
      # Secondary line (additional info)
      show_secondary: true
      secondary_entity: sensor.washing_machine_energy_daily
      secondary_text: 'Today'
```

**Result:**
```
1500 W                    ← Primary (power)
Today: 2.5 kWh           ← Secondary (daily energy)
```

<!-- TODO: Screenshot - Consumer with secondary text -->

### Hide/Show Lines

```yaml
consumers:
  items:
    - entity: sensor.dishwasher_power
      label: 'Dishwasher'
      
      show_primary: true              # Show power value
      show_secondary: false           # Hide secondary line
```

---

## Styling

### Global Consumer Styling

Styles that apply to all consumers:

```yaml
consumers:
  style:
    gap: '6px'                        # Spacing between consumers
    
    # Container styling
    item_background_color: 'rgba(21, 20, 27, 1)'
    item_border_color: 'rgba(255, 255, 255, 0.1)'
    item_border_radius: '12px'
    item_padding: '8px'
    item_margin: '0'
    item_box_shadow: '0 2px 4px rgba(0,0,0,0.1)'
    
    # Icon styling
    icon_size: '1.5em'
    icon_opacity: '1'
    
    # Primary text (power value)
    primary_size: '1em'
    primary_font_weight: 'bold'
    primary_opacity: '1'
    primary_color: 'white'
    primary_line_height: '1.2'
    
    # Secondary text (label/additional info)
    secondary_size: '0.8em'
    secondary_font_weight: 'normal'
    secondary_opacity: '0.7'
    secondary_color: 'white'
    secondary_line_height: '1.2'
```

<!-- TODO: Screenshot - Globally styled consumers -->

### Individual Consumer Styling

Each consumer can override global styles:

```yaml
consumers:
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      
      style:
        # Custom colors
        icon_size: '2em'
        icon_color: '#4CAF50'
        icon_opacity: '1'
        
        primary_color: '#4CAF50'
        primary_size: '1.2em'
        primary_font_weight: 'bold'
        
        secondary_color: '#8BC34A'
        secondary_size: '0.9em'
        
        # Custom container
        background_color: 'rgba(76, 175, 80, 0.1)'
        border_color: 'rgba(76, 175, 80, 0.3)'
        border_radius: '16px'
        padding: '12px'
        box_shadow: '0 4px 8px rgba(76, 175, 80, 0.2)'
```

<!-- TODO: Screenshot - Individually styled consumer -->

### Auto-Color Styling

When using `auto_color: true`:

```yaml
consumers:
  items:
    - entity: sensor.coffee_machine_power
      icon: mdi:coffee
      label: 'Coffee Machine'
      auto_color: true
      threshold: 5
      
      # Colors are automatic based on state
      # Active (> threshold): Green
      # Inactive (≤ threshold): Gray/dimmed
```

To disable auto-color and use custom colors:

```yaml
consumers:
  items:
    - entity: sensor.aquarium_power
      icon: mdi:fishbowl
      label: 'Aquarium'
      auto_color: false
      
      style:
        icon_color: '#00BCD4'         # Always cyan
        primary_color: '#00BCD4'
```

---

## Complete Examples

### Basic Consumer List

```yaml
type: custom:pv-monitor-card

entities:
  house_consumption: sensor.house_power

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
    
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Heat Pump'
```

<!-- TODO: Screenshot - Basic consumer list -->

### Consumers with Switches

```yaml
type: custom:pv-monitor-card

consumers:
  show: true
  sort_mode: highest_first
  threshold: 10
  
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      switch_entity: switch.ev_charger
      threshold: 50
      auto_color: true
    
    - entity: sensor.pool_pump_power
      icon: mdi:pump
      label: 'Pool Pump'
      switch_entity: switch.pool_pump
      auto_color: true
    
    - entity: sensor.heater_power
      icon: mdi:radiator
      label: 'Heater'
      switch_entity: switch.heater
```

<!-- TODO: Screenshot - Consumers with switches -->

### Consumers with Additional Info

```yaml
type: custom:pv-monitor-card

consumers:
  show: true
  sort_mode: highest_first
  threshold: 10
  
  items:
    - entity: sensor.washing_machine_power
      icon: mdi:washing-machine
      label: 'Washing Machine'
      auto_color: true
      
      # Show daily energy
      show_secondary: true
      secondary_entity: sensor.washing_machine_energy_daily
      secondary_text: 'Today'
    
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Heat Pump'
      threshold: 20
      
      # Show COP (Coefficient of Performance)
      show_secondary: true
      secondary_entity: sensor.heat_pump_cop
      secondary_text: 'COP'
```

<!-- TODO: Screenshot - Consumers with additional info -->

### Fully Customized Consumers

```yaml
type: custom:pv-monitor-card

consumers:
  show: true
  sort_mode: highest_first
  threshold: 10
  
  # Global styling
  style:
    gap: '8px'
    item_background_color: 'rgba(21, 20, 27, 1)'
    item_border_radius: '12px'
    icon_size: '1.5em'
  
  items:
    # EV Charger - Custom green styling
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      switch_entity: switch.ev_charger
      threshold: 50
      auto_color: false
      
      show_secondary: true
      secondary_entity: sensor.ev_charger_energy_session
      secondary_text: 'Session'
      
      style:
        icon_color: '#4CAF50'
        icon_size: '2em'
        primary_color: '#4CAF50'
        secondary_color: '#8BC34A'
        background_color: 'rgba(76, 175, 80, 0.1)'
        border_color: 'rgba(76, 175, 80, 0.3)'
        border_radius: '16px'
        padding: '12px'
      
      tap_action_target: custom_action
      tap_action:
        action: navigate
        navigation_path: /lovelace/ev-charging
    
    # Heat Pump - Custom orange styling
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Heat Pump'
      threshold: 20
      auto_color: false
      
      show_secondary: true
      secondary_entity: sensor.heat_pump_cop
      secondary_text: 'COP'
      
      style:
        icon_color: '#FF9800'
        primary_color: '#FF9800'
        secondary_color: '#FFB74D'
        background_color: 'rgba(255, 152, 0, 0.1)'
        border_color: 'rgba(255, 152, 0, 0.3)'
    
    # Dishwasher - Auto color
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
      threshold: 5
      auto_color: true
      
      tap_action_target: entity
```

<!-- TODO: Screenshot - Fully customized consumers -->

### Consumers with House Card Integration

```yaml
type: custom:pv-monitor-card

entities:
  house_consumption: sensor.house_power

haus:
  show: true
  show_consumer_total: true           # Show sum in house card

consumers:
  show: true
  sort_mode: highest_first
  threshold: 10
  
  items:
    - entity: sensor.ev_charger_power
      icon: mdi:ev-station
      label: 'EV Charger'
      threshold: 50
    
    - entity: sensor.heat_pump_power
      icon: mdi:heat-pump
      label: 'Heat Pump'
      threshold: 20
    
    - entity: sensor.dishwasher_power
      icon: mdi:dishwasher
      label: 'Dishwasher'
```

**Result:**
```
House Card:
  House: 3450 W
  Consumers: 2100 W      ← Sum of active consumers

Consumer List:
  EV Charger: 1500 W
  Heat Pump: 600 W
  Dishwasher: 0 W (hidden, < 10W)
```

<!-- TODO: Screenshot - Consumers with house integration -->

---

## Tips & Best Practices

### 💡 Threshold Strategy

Set thresholds to filter out noise:

```yaml
consumers:
  threshold: 10                       # Global: Hide standby < 10W
  
  items:
    - entity: sensor.ev_charger_power
      threshold: 50                   # High-power device: Hide < 50W
    
    - entity: sensor.router_power
      threshold: 0                    # Always-on device: Always show
```

### 💡 Sorting for Different Use Cases

**Find biggest consumers:**
```yaml
sort_mode: highest_first              # Shows high-power devices first
```

**Check standby loads:**
```yaml
sort_mode: lowest_first               # Shows low-power devices first
threshold: 0                          # Show all devices
```

**Organized display:**
```yaml
sort_mode: alpha_asc                  # Alphabetical order
```

### 💡 Secondary Text Ideas

Show useful additional information:

```yaml
# Daily energy consumption
secondary_entity: sensor.device_energy_daily
secondary_text: 'Today'

# Runtime/uptime
secondary_entity: sensor.device_runtime
secondary_text: 'Runtime'

# Temperature
secondary_entity: sensor.device_temperature
secondary_text: 'Temp'

# State
secondary_entity: sensor.device_state
secondary_text: ''                    # No prefix
```

### 💡 Creating Power Sensors

If you have switch-only devices, create power sensors:

```yaml
# configuration.yaml
template:
  - binary_sensor:
      - name: "Heater Power Estimate"
        unit_of_measurement: 'W'
        device_class: power
        state: >
          {% if is_state('switch.heater', 'on') %}
            2000
          {% else %}
            0
          {% endif %}
```

### 💡 Consumer Sum Accuracy

For accurate consumer sum in house card:
1. Add all significant power consumers
2. Use consistent threshold filtering
3. Ensure power sensors return Watts (not kW)

---

## Troubleshooting

### Consumer Not Showing

**Problem:** Consumer doesn't appear in list  
**Solution:**
- Check entity name is correct and exists
- Verify power value is above threshold
- Check `show: true` is set
- Ensure entity provides numeric state (not 'unavailable')

### Wrong Sort Order

**Problem:** Consumers not sorting as expected  
**Solution:**
- Verify `sort_mode` spelling is correct
- Check that power values are numeric
- Ensure entities return values in Watts (not kW)

### Consumer Sum Wrong

**Problem:** Sum in house card doesn't match  
**Solution:**
- Check that all consumers use same units (W)
- Verify thresholds are configured correctly
- Ensure `show_consumer_total: true` in house config
- Check that entities provide valid numeric values

### Switch Not Working

**Problem:** Tap on icon doesn't toggle switch  
**Solution:**
- Verify `switch_entity` is configured
- Check switch entity name is correct
- Ensure switch entity is actually a switch/input_boolean
- Verify no `tap_action_target` override is set

### Auto-Color Not Working

**Problem:** Auto-color doesn't change  
**Solution:**
- Verify `auto_color: true` is set
- Check threshold is configured
- Ensure power value crosses threshold
- Verify custom colors aren't overriding auto-color

---

## Advanced Features

### Dynamic Consumers with Automation

Show/hide consumers based on time of day:

```yaml
# automation.yaml
automation:
  - alias: "Show EV Charger in Evening"
    trigger:
      - platform: time
        at: "18:00:00"
    action:
      - service: input_boolean.turn_on
        target:
          entity_id: input_boolean.show_ev_charger
```

### Consumer Groups

Group similar consumers:

```yaml
consumers:
  items:
    # Kitchen appliances
    - entity: sensor.dishwasher_power
      label: '🍴 Dishwasher'
    - entity: sensor.oven_power
      label: '🍴 Oven'
    
    # Entertainment
    - entity: sensor.tv_power
      label: '📺 TV'
    - entity: sensor.sound_system_power
      label: '📺 Sound System'
```

---

[⬅️ Back to Main README](../README.md)
