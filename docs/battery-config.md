# Battery Configuration

Complete guide to configuring battery storage monitoring and multiple battery systems.

---

## Table of Contents

- [Single Battery System](#single-battery-system)
- [Multiple Batteries (Battery Bar)](#multiple-batteries-battery-bar)
- [Automatic Icon Selection](#automatic-icon-selection)
- [Runtime & Charge Time](#runtime--charge-time)
- [Additional Text Lines](#additional-text-lines)
- [Styling](#styling)
- [Tap Actions](#tap-actions)
- [Complete Examples](#complete-examples)

---

## Single Battery System

The main battery card displays charge level (SoC) and current charge/discharge power.

<!-- TODO: Screenshot - Battery card showing 75% SoC charging -->

### Basic Configuration

```yaml
batterie:
  show: true                          # Show the battery card
  icon: ''                            # Empty = automatic icon based on SoC
  animation: true                     # Enable animated effects
  animation_style: electric-arc       # Animation type
```

### Required Entities

Configure battery entities in the root configuration:

```yaml
entities:
  battery_soc: sensor.battery_soc               # State of Charge (%)
  battery_charge: sensor.battery_charge_power   # Charging power (W)
  battery_discharge: sensor.battery_discharge_power  # Discharge power (W)
```

### Battery Capacity

For runtime/charge time calculations:

```yaml
battery_capacity: 10000             # Capacity in Wh (10000 = 10 kWh)
```

---

## Multiple Batteries (Battery Bar)

Track up to **5 individual battery systems** simultaneously with the Battery Bar feature.

<!-- TODO: Screenshot - Battery Bar with 2 batteries showing different SoC levels -->

### Enabling Battery Bar

```yaml
battery_bar:
  show: true
  position: below_cards               # above_cards | below_cards | above_consumers | below_consumers
```

### Adding Battery Systems

```yaml
battery_bar:
  entities:
    - entity: sensor.battery1_soc
      name: 'Main Battery'
      capacity: 10000
      charge_entity: sensor.battery1_charge
      discharge_entity: sensor.battery1_discharge
      icon: ''                        # Empty = automatic
    
    - entity: sensor.battery2_soc
      name: 'Backup Battery'
      capacity: 5000
      charge_entity: sensor.battery2_charge
      discharge_entity: sensor.battery2_discharge
```

### Battery Bar Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show` | boolean | `false` | Enable/disable battery bar |
| `position` | string | `below_cards` | Bar placement |
| `entities` | array | `[]` | List of batteries (max 5) |

### Battery Entity Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `entity` | string | ✅ Yes | Battery SoC sensor (%) |
| `name` | string | ❌ No | Display name |
| `capacity` | number | ❌ No | Capacity in Wh |
| `charge_entity` | string | ❌ No | Charge power sensor (W) |
| `discharge_entity` | string | ❌ No | Discharge power sensor (W) |
| `icon` | string | ❌ No | Custom icon (empty = automatic) |

---

## Automatic Icon Selection

When `icon` is empty or not specified, the card automatically selects an appropriate battery icon based on the State of Charge (SoC):

### Icon Selection Logic

| SoC Range | Discharging Icon | Charging Icon |
|-----------|------------------|---------------|
| > 90% | `mdi:battery` | `mdi:battery-charging` |
| 71-90% | `mdi:battery-80` | `mdi:battery-charging-80` |
| 51-70% | `mdi:battery-60` | `mdi:battery-charging-60` |
| 31-50% | `mdi:battery-40` | `mdi:battery-charging-40` |
| 11-30% | `mdi:battery-20` | `mdi:battery-charging-20` |
| ≤ 10% | `mdi:battery-alert` | `mdi:battery-charging-10` |

<!-- TODO: Screenshot - Battery icon progression from full to empty -->

### Color Coding

The battery automatically changes color based on SoC:

| SoC Range | Color | Description |
|-----------|-------|-------------|
| > 60% | 🟢 Green | Good charge level |
| 30-60% | 🟡 Yellow | Medium charge level |
| < 30% | 🔴 Red | Low charge level |

<!-- TODO: Screenshot - Battery with different color states -->

### Custom Icon

Override automatic selection:

```yaml
batterie:
  icon: mdi:battery-heart              # Always use this icon
```

---

## Runtime & Charge Time

Enable automatic calculation of remaining runtime and charge time.

<!-- TODO: Screenshot - Info bar showing calculated battery times -->

### Automatic Calculation

```yaml
info_bar:
  show: true
  calculate_battery_times: true      # Enables automatic calculations

battery_capacity: 10000              # Required for calculations
```

This automatically populates Info Bar items 2 and 3:
- **Item 2:** Remaining runtime (during discharge)
- **Item 3:** Time until full (during charging)

### Manual Display

Show runtime/charge time as secondary text in battery card:

```yaml
batterie:
  secondary_entity: ''                # Empty = use calculation
  secondary_text: 'Runtime'
  
  tertiary_entity: ''                 # Empty = use calculation
  tertiary_text: 'Charge Time'
```

### Calculation Formulas

**Runtime (Discharge):**
```
Runtime = (Battery SoC × Capacity) / Discharge Power
```

**Example:**
- SoC: 80%
- Capacity: 10 kWh
- Discharge: 2000 W
- **Runtime: 4 hours** ✅

**Charge Time:**
```
Charge Time = ((100 - Battery SoC) × Capacity) / Charge Power
```

**Example:**
- SoC: 40%
- Capacity: 10 kWh
- Charge: 3000 W
- **Charge Time: 2 hours** ✅

---

## Additional Text Lines

Display extra information below the main SoC value.

<!-- TODO: Screenshot - Battery card with temperature and cycles -->

### Secondary Line (e.g., Temperature)

```yaml
batterie:
  secondary_entity: sensor.battery_temperature
  secondary_text: 'Temperature'
```

**Result:**
```
75%             ← Primary (SoC)
Temperature: 24°C ← Secondary
```

### Tertiary Line (e.g., Charge Cycles)

```yaml
batterie:
  tertiary_entity: sensor.battery_cycles
  tertiary_text: 'Cycles'
```

**Result:**
```
75%             ← Primary (SoC)
Temperature: 24°C ← Secondary
Cycles: 342     ← Tertiary
```

---

## Styling

### Card Appearance

```yaml
batterie:
  style:
    # Container
    background_color: 'rgba(76, 175, 80, 0.1)'    # Green tint
    border_color: 'rgba(76, 175, 80, 0.3)'         # Green border
    border_radius: '16px'
    padding: '12px'
    box_shadow: '0 2px 8px rgba(0,0,0,0.3)'
```

<!-- TODO: Screenshot - Styled battery card -->

### Colors

```yaml
batterie:
  style:
    # Icon (empty = automatic based on SoC)
    icon_color: ''                                 # Leave empty for auto
    icon_size: '2.5em'
    icon_opacity: '1'
    
    # Primary text (SoC percentage)
    primary_color: '#4CAF50'                       # Green
    primary_size: '1.5em'
    primary_font_weight: 'bold'
    
    # Secondary text
    secondary_color: '#8BC34A'                     # Light green
    secondary_size: '1em'
    secondary_opacity: '0.8'
    
    # Tertiary text
    tertiary_color: '#8BC34A'
    tertiary_size: '0.9em'
    tertiary_opacity: '0.7'
```

### Battery Bar Styling

```yaml
battery_bar:
  style:
    background_color: 'rgba(21, 20, 27, 1)'
    border_color: 'rgba(255, 255, 255, 0.1)'
    border_radius: '16px'
    padding: '12px'
    
    # Item styling
    separator: '|'                                 # Character between items
    item_gap: '0.5rem'                            # Spacing between items
    
    # Icon styling
    icon_size: '1.5em'
    # icon_color: ''                              # Leave empty for automatic
    
    # Label styling
    label_size: '0.9em'
    label_color: 'rgba(255, 255, 255, 0.8)'
    label_font_weight: 'normal'
    
    # Value styling
    value_size: '1em'
    value_color: 'white'
    value_font_weight: 'bold'
```

---

## Tap Actions

Configure interactive behavior when clicking the battery card.

### Basic Actions

```yaml
batterie:
  tap_action:
    action: more-info                              # Single tap = entity details
  
  double_tap_action:
    action: navigate
    navigation_path: /lovelace/battery-details    # Double tap = go to details page
  
  hold_action:
    action: call-service                          # Hold = call service
    service: script.battery_calibration
```

### Advanced Actions

```yaml
batterie:
  tap_action:
    action: navigate
    navigation_path: /lovelace-energy/battery-stats
  
  double_tap_action:
    action: call-service
    service: notify.mobile_app
    service_data:
      title: 'Battery Status'
      message: >
        SoC: {{ states("sensor.battery_soc") }}%
        Power: {{ states("sensor.battery_charge_power") }}W
  
  hold_action:
    action: url
    url_path: https://your-bms-monitoring-url.com
```

---

## Complete Examples

### Single Battery with Full Features

```yaml
type: custom:pv-monitor-card

entities:
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power

battery_capacity: 10000

batterie:
  show: true
  animation: true
  animation_style: electric-arc
  icon: ''                            # Automatic icon selection
  
  # Additional information
  secondary_entity: sensor.battery_temperature
  secondary_text: 'Temperature'
  
  tertiary_entity: sensor.battery_cycles
  tertiary_text: 'Cycles'
  
  # Styling
  style:
    background_color: 'rgba(76, 175, 80, 0.1)'
    border_color: 'rgba(76, 175, 80, 0.3)'
    primary_color: '#4CAF50'
    secondary_color: '#8BC34A'
    icon_color: ''                    # Automatic
  
  # Actions
  tap_action:
    action: more-info
  
  double_tap_action:
    action: navigate
    navigation_path: /lovelace/battery-details
```

<!-- TODO: Screenshot - Result of above configuration -->

### Multiple Batteries with Battery Bar

```yaml
type: custom:pv-monitor-card

entities:
  battery_soc: sensor.battery_total_soc           # Average of all batteries
  battery_charge: sensor.battery_total_charge
  battery_discharge: sensor.battery_total_discharge

battery_capacity: 15000                           # Total capacity

# Main battery card
batterie:
  show: true
  animation: true
  animation_style: electric-arc
  icon: mdi:battery-charging-high

# Battery Bar with individual systems
battery_bar:
  show: true
  position: below_cards
  
  entities:
    # Main battery - 10 kWh
    - entity: sensor.battery1_soc
      name: 'Main Battery (10kWh)'
      capacity: 10000
      charge_entity: sensor.battery1_charge
      discharge_entity: sensor.battery1_discharge
    
    # Backup battery - 5 kWh
    - entity: sensor.battery2_soc
      name: 'Backup Battery (5kWh)'
      capacity: 5000
      charge_entity: sensor.battery2_charge
      discharge_entity: sensor.battery2_discharge
  
  # Bar styling
  style:
    background_color: 'rgba(76, 175, 80, 0.05)'
    border_color: 'rgba(76, 175, 80, 0.2)'
    separator: '•'
```

<!-- TODO: Screenshot - Result with multiple batteries -->

### Battery with Runtime Display

```yaml
type: custom:pv-monitor-card

entities:
  battery_soc: sensor.battery_soc
  battery_charge: sensor.battery_charge_power
  battery_discharge: sensor.battery_discharge_power

battery_capacity: 10000

# Info bar with calculations
info_bar:
  show: true
  calculate_battery_times: true
  
  item2:
    icon: mdi:battery-clock
    label: 'Remaining Runtime'
  
  item3:
    icon: mdi:battery-charging
    label: 'Charge Time'

# Battery card
batterie:
  show: true
  animation: true
```

<!-- TODO: Screenshot - Battery with runtime in info bar -->

---

## Tips & Best Practices

### 💡 Automatic Icons

For best results, leave `icon` empty or set to `''`:

```yaml
batterie:
  icon: ''                            # Automatic icon based on SoC & charging state
```

This provides visual feedback for:
- Current charge level
- Charging/discharging state
- Low battery warning (red icon at <10%)

### 💡 Battery Capacity

Always configure `battery_capacity` for accurate calculations:

```yaml
battery_capacity: 10000              # 10 kWh = 10000 Wh
```

Without this, runtime and charge time calculations won't work.

### 💡 Multiple Batteries

When using multiple batteries:
1. Configure total/average values in `entities` for the main card
2. Configure individual batteries in `battery_bar.entities`

```yaml
entities:
  battery_soc: sensor.battery_average_soc       # Average of all batteries
  battery_charge: sensor.battery_total_charge   # Sum of all charging
  battery_discharge: sensor.battery_total_discharge  # Sum of all discharge

battery_capacity: 15000                         # Total capacity

battery_bar:
  entities:
    - entity: sensor.battery1_soc               # Individual battery 1
      capacity: 10000
    - entity: sensor.battery2_soc               # Individual battery 2
      capacity: 5000
```

### 💡 Temperature Monitoring

Add battery temperature as secondary text for safety monitoring:

```yaml
batterie:
  secondary_entity: sensor.battery_temperature
  secondary_text: 'Temp'
  
  # Optional: Change color based on temperature
  style:
    secondary_color: >
      {% if states('sensor.battery_temperature')|float > 45 %}
        #FF5722
      {% elif states('sensor.battery_temperature')|float > 35 %}
        #FFC107
      {% else %}
        #4CAF50
      {% endif %}
```

---

## Troubleshooting

### Icon Not Changing

**Problem:** Battery icon doesn't update with SoC  
**Solution:**
- Ensure `icon: ''` (empty string) is set for automatic icons
- Verify `battery_soc` entity provides values 0-100
- Check that charge/discharge entities have valid values

### Runtime Not Calculating

**Problem:** Runtime/charge time shows "Not available"  
**Solution:**
- Set `battery_capacity` in root configuration
- Verify discharge/charge power entities are working
- Check that SoC entity provides valid 0-100 values
- Ensure `calculate_battery_times: true` in info bar config

### Wrong Colors

**Problem:** Battery card shows wrong colors  
**Solution:**
- Don't set `icon_color` if you want automatic colors
- Verify SoC values are in 0-100 range (not 0-1)
- Check that battery entity is recognized correctly

### Battery Bar Not Showing

**Problem:** Battery Bar doesn't appear  
**Solution:**
- Verify `battery_bar.show: true`
- Check that at least one battery entity is configured
- Ensure entities exist and provide valid SoC data

---

[⬅️ Back to Main README](../README.md)
