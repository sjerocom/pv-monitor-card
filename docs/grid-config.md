# Grid Configuration

Complete guide to configuring grid power monitoring, feed-in, and consumption tracking.

---

## Table of Contents

- [Basic Configuration](#basic-configuration)
- [Grid States](#grid-states)
- [Threshold Configuration](#threshold-configuration)
- [Status Texts](#status-texts)
- [Additional Text Lines](#additional-text-lines)
- [Animations](#animations)
- [Styling](#styling)
- [Tap Actions](#tap-actions)
- [Complete Examples](#complete-examples)

---

## Basic Configuration

The grid card displays real-time grid power, automatically detecting feed-in (export) or consumption (import).

<!-- TODO: Screenshot - Grid card showing feed-in (green) -->
<!-- TODO: Screenshot - Grid card showing consumption (red) -->
<!-- TODO: Screenshot - Grid card showing neutral (gray) -->

### Essential Setup

```yaml
netz:
  show: true                          # Show the grid card
  icon: mdi:transmission-tower        # Custom icon (optional)
  animation: true                     # Enable animated effects
  animation_style: electric-arc       # Animation type
  threshold: 10                       # Neutral zone (±10W)
```

### Required Entity

Configure the grid power entity in the root configuration:

```yaml
entities:
  grid_power: sensor.grid_power       # Grid power in Watts
                                      # Positive = Consumption (import)
                                      # Negative = Feed-in (export)
```

---

## Grid States

The grid card automatically detects three states based on power flow:

### State Detection Logic

| Grid Power | State | Color | Icon | Animation |
|------------|-------|-------|------|-----------|
| < -threshold | **Feed-in** (Export) | 🟢 Green | `mdi:transmission-tower-export` | Green animation |
| Between -threshold and +threshold | **Neutral** | ⚪ Gray | `mdi:transmission-tower-off` | No animation |
| > +threshold | **Consumption** (Import) | 🔴 Red | `mdi:transmission-tower-import` | Red animation |

<!-- TODO: Screenshot - Grid state comparison showing all three states -->

### Example Values

```yaml
threshold: 10                         # ±10W neutral zone

# Examples:
# -2500 W → Feed-in (below -10W)
# -5 W    → Neutral (between -10W and +10W)
# +8 W    → Neutral (between -10W and +10W)
# +1500 W → Consumption (above +10W)
```

---

## Threshold Configuration

The threshold defines the "neutral zone" where the grid is considered balanced.

### Global Threshold

Set in root configuration:

```yaml
grid_threshold: 10                    # Default threshold for grid card
```

### Card-Specific Threshold

Override in grid card config:

```yaml
netz:
  threshold: 20                       # This card uses ±20W neutral zone
```

### Threshold Recommendations

| Scenario | Recommended Threshold |
|----------|----------------------|
| **Precise monitoring** | 5-10 W |
| **Standard home** | 10-20 W |
| **Large system** | 20-50 W |
| **Noisy sensor** | 50-100 W |

### Why Use a Threshold?

Power sensors can fluctuate around zero due to:
- Measurement inaccuracies
- Small baseline loads
- Momentary fluctuations

A threshold prevents constant state changes and provides visual stability.

<!-- TODO: Screenshot - Threshold visualization showing neutral zone -->

---

## Status Texts

Customize the text displayed for each grid state.

### Default Texts

```yaml
netz:
  status_texts:
    feed_in: 'Einspeisung'            # German default
    neutral: 'Neutral'
    consumption: 'Netzbezug'
```

### Custom Texts

```yaml
netz:
  status_texts:
    feed_in: 'Exporting ⚡'           # Custom feed-in text
    neutral: 'Balanced ⚖️'            # Custom neutral text
    consumption: 'Importing 🔌'       # Custom consumption text
```

### Language-Specific Defaults

The card includes built-in translations:

| Language | Feed-in | Neutral | Consumption |
|----------|---------|---------|-------------|
| 🇩🇪 German | Einspeisung | Neutral | Netzbezug |
| 🇬🇧 English | Feed-in | Neutral | Grid Consumption |
| 🇫🇷 French | Injection | Neutre | Consommation |
| 🇮🇹 Italian | Immissione | Neutro | Consumo |
| 🇪🇸 Spanish | Inyección | Neutral | Consumo |

---

## Additional Text Lines

Display extra information below the main power value.

<!-- TODO: Screenshot - Grid card with daily grid stats -->

### Secondary Line (e.g., Daily Feed-in)

```yaml
netz:
  secondary_entity: sensor.grid_daily_export
  secondary_text: 'Exported Today'
```

**Result:**
```
-2.5 kW                    ← Primary (current feed-in)
Exported Today: 35.2 kWh   ← Secondary (daily total)
```

### Tertiary Line (e.g., Daily Import)

```yaml
netz:
  tertiary_entity: sensor.grid_daily_import
  tertiary_text: 'Imported Today'
```

**Result:**
```
-2.5 kW                    ← Primary (current feed-in)
Exported Today: 35.2 kWh   ← Secondary
Imported Today: 5.8 kWh    ← Tertiary
```

### Visibility Control

```yaml
netz:
  show_primary: true                 # Show main power value
  show_secondary: true               # Show secondary line
  show_tertiary: true                # Show tertiary line
```

---

## Animations

Visualize grid power flow with animated effects.

### Animation Styles

#### 1. Electric Arc (Recommended)

```yaml
netz:
  animation: true
  animation_style: electric-arc
```

Electric arcs pulse around the icon, color changes with state.

<!-- TODO: Screenshot/GIF - Electric arc animation on grid card -->

#### 2. Rotating Dots

```yaml
netz:
  animation: true
  animation_style: rotating-dots
```

Dots rotate around the icon, speed based on power level.

<!-- TODO: Screenshot/GIF - Rotating dots animation -->

#### 3. Particle Field

```yaml
netz:
  animation: true
  animation_style: particle-field
```

Particles move across the card.

<!-- TODO: Screenshot/GIF - Particle field animation -->

### Animation Colors

Animations automatically adapt to grid state:
- **Feed-in:** Green animations
- **Consumption:** Red animations  
- **Neutral:** No animation

---

## Styling

### Card Appearance

```yaml
netz:
  style:
    # Container
    background_color: 'rgba(3, 169, 244, 0.1)'    # Blue tint
    border_color: 'rgba(3, 169, 244, 0.3)'         # Blue border
    border_radius: '16px'
    padding: '12px'
    box_shadow: '0 2px 8px rgba(0,0,0,0.3)'
```

<!-- TODO: Screenshot - Styled grid card -->

### State-Based Colors

Colors automatically change with grid state:

```yaml
netz:
  style:
    # Feed-in colors (automatic green)
    # Neutral colors (automatic gray)
    # Consumption colors (automatic red)
    
    # Icon
    icon_size: '2.5em'
    icon_opacity: '1'
    
    # Primary text
    primary_size: '1.5em'
    primary_font_weight: 'bold'
```

### Custom State Colors

Override automatic colors:

```yaml
netz:
  style:
    # Force specific colors (not recommended, loses state indication)
    icon_color: '#03A9F4'
    primary_color: '#03A9F4'
```

### Secondary/Tertiary Text

```yaml
netz:
  style:
    secondary_color: '#4FC3F7'
    secondary_size: '1em'
    secondary_opacity: '0.8'
    
    tertiary_color: '#4FC3F7'
    tertiary_size: '0.9em'
    tertiary_opacity: '0.7'
```

---

## Tap Actions

Configure interactive behavior when clicking the grid card.

### Basic Actions

```yaml
netz:
  tap_action:
    action: more-info                              # Single tap = entity details
  
  double_tap_action:
    action: navigate
    navigation_path: /lovelace/grid-stats         # Double tap = grid stats page
  
  hold_action:
    action: call-service                          # Hold = call service
    service: script.grid_report
```

### Advanced Actions

```yaml
netz:
  tap_action:
    action: navigate
    navigation_path: /lovelace/energy-dashboard
  
  double_tap_action:
    action: call-service
    service: notify.mobile_app
    service_data:
      title: 'Grid Status'
      message: >
        Current: {{ states("sensor.grid_power") }} W
        Today Export: {{ states("sensor.grid_daily_export") }} kWh
        Today Import: {{ states("sensor.grid_daily_import") }} kWh
  
  hold_action:
    action: url
    url_path: https://your-utility-portal.com
```

---

## Complete Examples

### Basic Grid Card

```yaml
type: custom:pv-monitor-card

entities:
  grid_power: sensor.grid_power

grid_threshold: 10

netz:
  show: true
  animation: true
  animation_style: electric-arc
  threshold: 10
  
  tap_action:
    action: more-info
```

<!-- TODO: Screenshot - Basic grid card -->

### Grid with Daily Statistics

```yaml
type: custom:pv-monitor-card

entities:
  grid_power: sensor.grid_power

netz:
  show: true
  animation: true
  animation_style: electric-arc
  threshold: 15
  
  # Daily statistics
  secondary_entity: sensor.grid_daily_export
  secondary_text: 'Exported'
  
  tertiary_entity: sensor.grid_daily_import
  tertiary_text: 'Imported'
  
  # Custom status texts
  status_texts:
    feed_in: '⚡ Exporting'
    neutral: '⚖️ Balanced'
    consumption: '🔌 Importing'
  
  # Styling
  style:
    background_color: 'rgba(3, 169, 244, 0.1)'
    border_color: 'rgba(3, 169, 244, 0.3)'
  
  # Actions
  tap_action:
    action: navigate
    navigation_path: /lovelace/grid-details
  
  double_tap_action:
    action: more-info
```

<!-- TODO: Screenshot - Grid card with statistics -->

### Grid with Custom Styling

```yaml
type: custom:pv-monitor-card

entities:
  grid_power: sensor.grid_power

netz:
  show: true
  animation: true
  animation_style: electric-arc
  icon: mdi:lightning-bolt
  threshold: 20
  
  # Additional information
  secondary_entity: sensor.grid_frequency
  secondary_text: 'Frequency'
  
  tertiary_entity: sensor.grid_voltage
  tertiary_text: 'Voltage'
  
  # Full styling
  style:
    background_color: 'rgba(3, 169, 244, 0.1)'
    border_color: 'rgba(3, 169, 244, 0.3)'
    border_radius: '20px'
    padding: '16px'
    
    icon_size: '3em'
    
    primary_size: '1.8em'
    primary_font_weight: 'bold'
    
    secondary_size: '1.1em'
    secondary_color: '#4FC3F7'
    
    tertiary_size: '1em'
    tertiary_color: '#4FC3F7'
  
  # Actions
  tap_action:
    action: navigate
    navigation_path: /lovelace/grid-monitoring
  
  double_tap_action:
    action: call-service
    service: script.generate_grid_report
  
  hold_action:
    action: url
    url_path: https://grid-monitoring.example.com
```

<!-- TODO: Screenshot - Custom styled grid card -->

---

## Tips & Best Practices

### 💡 Sensor Direction

Ensure your grid sensor follows the correct sign convention:
- **Positive values** → Importing from grid (consumption)
- **Negative values** → Exporting to grid (feed-in)

If your sensor is reversed, create a template sensor:

```yaml
# configuration.yaml
template:
  - sensor:
      - name: "Grid Power Corrected"
        unit_of_measurement: 'W'
        device_class: power
        state: "{{ states('sensor.grid_power') | float * -1 }}"
```

### 💡 Threshold Tuning

Adjust threshold based on observation:
1. Start with 10W
2. Monitor state changes
3. If flickering between states → increase threshold
4. If slow to change states → decrease threshold

```yaml
# For stable sensor
threshold: 10

# For noisy sensor
threshold: 25
```

### 💡 Daily Import/Export Tracking

Track daily grid statistics with separate sensors:

```yaml
netz:
  secondary_entity: sensor.grid_daily_export      # kWh exported today
  tertiary_entity: sensor.grid_daily_import       # kWh imported today
```

Create these sensors using [Utility Meter](https://www.home-assistant.io/integrations/utility_meter/):

```yaml
# configuration.yaml
utility_meter:
  grid_daily_export:
    source: sensor.grid_export_total
    cycle: daily
  
  grid_daily_import:
    source: sensor.grid_import_total
    cycle: daily
```

### 💡 Cost Calculation

Display electricity costs:

```yaml
netz:
  tertiary_entity: sensor.grid_cost_today
  tertiary_text: 'Cost'
  
  style:
    tertiary_color: '#FF5722'         # Red for cost visibility
```

Create cost sensor:

```yaml
# configuration.yaml
template:
  - sensor:
      - name: "Grid Cost Today"
        unit_of_measurement: '€'
        state: >
          {% set import_kwh = states('sensor.grid_daily_import') | float %}
          {% set export_kwh = states('sensor.grid_daily_export') | float %}
          {% set import_cost = import_kwh * 0.30 %}
          {% set export_credit = export_kwh * 0.08 %}
          {{ (import_cost - export_credit) | round(2) }}
```

---

## Troubleshooting

### Wrong Grid State

**Problem:** Card shows wrong state (e.g., consumption when exporting)  
**Solution:**
- Check sensor sign convention (positive = import, negative = export)
- Verify grid_power entity is returning correct values
- Create inverted template sensor if needed (multiply by -1)

### State Flickering

**Problem:** Card constantly switches between states  
**Solution:**
- Increase `threshold` value (try 20-50W)
- Check sensor for excessive noise/fluctuation
- Use template sensor with smoothing/averaging

### Threshold Not Working

**Problem:** Neutral zone not working as expected  
**Solution:**
- Verify threshold is set (either global `grid_threshold` or card `threshold`)
- Check that threshold value is appropriate for your system
- Ensure grid entity provides numeric values

### Animation Always On

**Problem:** Animation shows even in neutral state  
**Solution:**
- Check threshold is properly configured
- Verify grid power is actually within threshold range
- Ensure animation colors match states (shouldn't animate in neutral)

### Status Text Not Showing

**Problem:** Custom status texts don't appear  
**Solution:**
- Check spelling of `status_texts` configuration
- Verify all three states are defined (feed_in, neutral, consumption)
- Ensure texts are provided as strings (in quotes)

---

## Integration with Other Features

### With Info Bar

Grid power affects autonomy calculations:

```yaml
entities:
  grid_power: sensor.grid_power       # Used in autonomy calculation

info_bar:
  show: true
  calculation_mode: autarky           # Autonomy = (House - Grid) / House
```

### With Energy Flow

Grid card completes the energy flow picture:

```
PV Production → House Consumption
              ↓
         Battery Storage
              ↓
         Grid (Import/Export)
```

### Understanding Power Balance

The basic power balance equation:

```
Grid = House Consumption - PV Production - Battery Discharge + Battery Charge
```

**Examples:**

**Scenario 1: Feed-in**
- PV: 8000 W
- House: 3000 W
- Battery: Charging at 2000 W
- Grid: -3000 W (exporting)

**Scenario 2: Import**
- PV: 1000 W
- House: 4000 W
- Battery: Discharging at 1500 W
- Grid: +1500 W (importing)

---

[⬅️ Back to Main README](../README.md)
