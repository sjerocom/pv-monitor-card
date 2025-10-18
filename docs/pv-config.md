# PV System Configuration

Complete guide to configuring solar production monitoring and multiple PV systems.

---

## Table of Contents

- [Single PV System](#single-pv-system)
- [Multiple PV Systems (PV Bar)](#multiple-pv-systems-pv-bar)
- [Animations](#animations)
- [Additional Text Lines](#additional-text-lines)
- [Styling](#styling)
- [Tap Actions](#tap-actions)
- [Complete Examples](#complete-examples)

---

## Single PV System

The main PV card displays your primary solar production with real-time power values.

<!-- TODO: Screenshot - Single PV card with production -->

### Basic Configuration

```yaml
pv:
  show: true                          # Show the PV card
  icon: mdi:white-balance-sunny       # Custom icon (optional)
  animation: true                     # Enable animated effects
  animation_style: rotating-dots      # Animation type
  icon_rotation: true                 # Icon rotates based on power
```

### Required Entity

Configure the main PV entity in the root configuration:

```yaml
entities:
  pv_production: sensor.pv_power      # Current PV production in Watts
```

---

## Multiple PV Systems (PV Bar)

Track up to **5 individual PV systems** simultaneously with the PV Bar feature.

<!-- TODO: Screenshot - PV Bar with 3 systems showing individual power -->

### Enabling PV Bar

```yaml
pv_bar:
  show: true
  position: above_cards               # above_cards | below_cards | above_consumers | below_consumers
```

### Adding PV Systems

```yaml
pv_bar:
  entities:
    - entity: sensor.pv_south_power
      name: 'South Roof'
      max_power: 6000
      icon: mdi:solar-panel
    
    - entity: sensor.pv_east_power
      name: 'East Roof'
      max_power: 4000
      icon: mdi:solar-panel-large
    
    - entity: sensor.pv_west_power
      name: 'West Roof'
      max_power: 4000
      icon: mdi:solar-panel
```

### PV Bar Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show` | boolean | `false` | Enable/disable PV bar |
| `position` | string | `above_cards` | Bar placement |
| `entities` | array | `[]` | List of PV systems (max 5) |

### PV Entity Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `entity` | string | ✅ Yes | Sensor entity for PV power (W) |
| `name` | string | ❌ No | Display name |
| `max_power` | number | ❌ No | Maximum power for this system (W) |
| `icon` | string | ❌ No | Custom icon |

### Position Options

- `above_cards` – Between header/info bar and main cards
- `below_cards` – Between main cards and consumers
- `above_consumers` – Just above consumer list
- `below_consumers` – Just below consumer list

<!-- TODO: Screenshot - PV Bar position examples -->

---

## Animations

Three animation styles are available to visualize solar production:

### 1. Rotating Dots (Default)

```yaml
pv:
  animation: true
  animation_style: rotating-dots
```

Circular dots rotate around the icon at a speed proportional to power production.

<!-- TODO: Screenshot/GIF - Rotating dots animation -->

### 2. Particle Field

```yaml
pv:
  animation: true
  animation_style: particle-field
```

Animated particles move across the card, simulating energy flow.

<!-- TODO: Screenshot/GIF - Particle field animation -->

### 3. Electric Arc

```yaml
pv:
  animation: true
  animation_style: electric-arc
```

Electric arcs pulse around the icon during production.

<!-- TODO: Screenshot/GIF - Electric arc animation -->

### Icon Rotation

Enable power-based icon rotation:

```yaml
pv:
  icon_rotation: true
  max_power: 10000                   # Required for rotation calculation
```

The icon rotates faster as production increases, providing visual feedback.

---

## Additional Text Lines

Display extra information below the main power value.

<!-- TODO: Screenshot - PV card with secondary and tertiary text -->

### Secondary Line (e.g., Daily Yield)

```yaml
pv:
  secondary_entity: sensor.pv_daily_yield
  secondary_text: 'Today'            # Optional prefix text
```

**Result:**
```
5.2 kW          ← Primary (current production)
Today: 45.3 kWh ← Secondary (daily yield)
```

### Tertiary Line (e.g., Total Yield)

```yaml
pv:
  tertiary_entity: sensor.pv_total_yield
  tertiary_text: 'Total'
```

**Result:**
```
5.2 kW          ← Primary (current production)
Today: 45.3 kWh ← Secondary (daily yield)
Total: 12.5 MWh ← Tertiary (lifetime yield)
```

### Visibility Control

```yaml
pv:
  show_primary: true                 # Show main power value
  show_secondary: true               # Show secondary line
  show_tertiary: true                # Show tertiary line
```

---

## Styling

### Card Appearance

```yaml
pv:
  style:
    # Container
    background_color: 'rgba(255, 215, 0, 0.1)'    # Background with transparency
    border_color: 'rgba(255, 215, 0, 0.3)'         # Border color
    border_radius: '16px'                           # Rounded corners
    padding: '12px'                                 # Internal spacing
    box_shadow: '0 2px 8px rgba(0,0,0,0.3)'        # Shadow effect
    cursor: 'pointer'                               # Mouse cursor style
```

<!-- TODO: Screenshot - Styled PV card with custom colors -->

### Colors

```yaml
pv:
  style:
    # Icon
    icon_color: '#FFD700'                          # Gold icon
    icon_size: '2.5em'
    icon_opacity: '1'
    
    # Primary text (power value)
    primary_color: '#FFD700'                       # Gold text
    primary_size: '1.5em'
    primary_font_weight: 'bold'
    primary_opacity: '1'
    primary_line_height: '1.2'
    
    # Secondary text
    secondary_color: '#FFA500'                     # Orange text
    secondary_size: '1em'
    secondary_font_weight: 'normal'
    secondary_opacity: '0.8'
    
    # Tertiary text
    tertiary_color: '#FFA500'
    tertiary_size: '0.9em'
    tertiary_opacity: '0.7'
```

### PV Bar Styling

```yaml
pv_bar:
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
    icon_color: '#FFD700'
    
    # Label styling
    label_size: '0.9em'
    label_color: 'rgba(255, 255, 255, 0.8)'
    label_font_weight: 'normal'
    
    # Value styling
    value_size: '1em'
    value_color: '#FFD700'
    value_font_weight: 'bold'
```

---

## Tap Actions

Configure interactive behavior when clicking the PV card.

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
pv:
  tap_action:
    action: more-info                              # Single tap = entity details
  
  double_tap_action:
    action: navigate
    navigation_path: /lovelace/energy             # Double tap = go to energy dashboard
  
  hold_action:
    action: call-service                          # Hold = call service
    service: script.pv_reset
```

### Advanced Actions

```yaml
pv:
  tap_action:
    action: url
    url_path: https://pvoutput.org               # Open external link
  
  double_tap_action:
    action: call-service
    service: notify.mobile_app
    service_data:
      title: 'PV System'
      message: 'Current production: {{ states("sensor.pv_power") }} W'
  
  hold_action:
    action: navigate
    navigation_path: /lovelace-energy/solar-details
```

---

## Complete Examples

### Single System with Full Features

```yaml
type: custom:pv-monitor-card

entities:
  pv_production: sensor.pv_power

pv_max_power: 10000

pv:
  show: true
  animation: true
  animation_style: particle-field
  icon_rotation: true
  icon: mdi:solar-power
  
  # Additional information
  secondary_entity: sensor.pv_daily_yield
  secondary_text: 'Today'
  
  tertiary_entity: sensor.pv_total_yield
  tertiary_text: 'Total'
  
  # Styling
  style:
    background_color: 'rgba(255, 215, 0, 0.1)'
    border_color: 'rgba(255, 215, 0, 0.3)'
    primary_color: '#FFD700'
    secondary_color: '#FFA500'
    icon_color: '#FFD700'
  
  # Actions
  tap_action:
    action: more-info
  
  double_tap_action:
    action: navigate
    navigation_path: /lovelace/solar-details
```

<!-- TODO: Screenshot - Result of above configuration -->

### Multiple Systems with PV Bar

```yaml
type: custom:pv-monitor-card

entities:
  pv_production: sensor.pv_total_power           # Sum of all systems

pv_max_power: 14000

# Main PV card
pv:
  show: true
  animation: true
  animation_style: electric-arc
  icon: mdi:solar-power-variant

# PV Bar with individual systems
pv_bar:
  show: true
  position: below_cards
  
  entities:
    # South roof - 6 kW
    - entity: sensor.pv_south_power
      name: 'South Roof (6kW)'
      max_power: 6000
      icon: mdi:solar-panel
    
    # East roof - 4 kW
    - entity: sensor.pv_east_power
      name: 'East Roof (4kW)'
      max_power: 4000
      icon: mdi:solar-panel
    
    # West roof - 4 kW
    - entity: sensor.pv_west_power
      name: 'West Roof (4kW)'
      max_power: 4000
      icon: mdi:solar-panel
  
  # Bar styling
  style:
    background_color: 'rgba(255, 215, 0, 0.05)'
    border_color: 'rgba(255, 215, 0, 0.2)'
    separator: '•'
    icon_color: '#FFD700'
    value_color: '#FFD700'
```

<!-- TODO: Screenshot - Result with multiple PV systems -->

### Minimal Setup

```yaml
type: custom:pv-monitor-card

entities:
  pv_production: sensor.pv_power
  house_consumption: sensor.house_power
  grid_power: sensor.grid_power

pv:
  show: true
```

<!-- TODO: Screenshot - Minimal PV card -->

---

## Tips & Best Practices

### 💡 Icon Rotation

For smooth icon rotation, ensure `pv_max_power` matches your system's peak capacity:

```yaml
pv_max_power: 10000        # Set to your system's peak Wp

pv:
  icon_rotation: true
```

### 💡 Multiple Systems

When using multiple PV systems:
1. Use `entities.pv_production` for the **total sum**
2. Use `pv_bar.entities` for **individual systems**

```yaml
entities:
  pv_production: sensor.pv_total_power    # Sum of all systems

pv_bar:
  entities:
    - entity: sensor.pv_system1_power     # Individual system 1
    - entity: sensor.pv_system2_power     # Individual system 2
```

### 💡 Daily/Total Yield

For kWh display in secondary/tertiary lines, ensure your sensors return values in kWh:

```yaml
pv:
  secondary_entity: sensor.pv_daily_yield     # Should return kWh
  tertiary_entity: sensor.pv_total_yield      # Should return kWh
```

If your sensors return Wh, create template sensors:

```yaml
# configuration.yaml
template:
  - sensor:
      - name: "PV Daily Yield kWh"
        unit_of_measurement: 'kWh'
        state: "{{ states('sensor.pv_daily_yield_wh') | float / 1000 }}"
```

---

## Troubleshooting

### Animation Not Working

**Problem:** Animations don't display  
**Solution:** 
- Ensure `animation: true` is set
- Check that `pv_max_power` is configured
- Verify PV entity is providing valid numeric values

### Icon Not Rotating

**Problem:** Icon rotation doesn't work  
**Solution:**
- Set `icon_rotation: true`
- Configure `pv_max_power` (required for rotation calculation)
- Ensure PV production is > 0

### PV Bar Not Showing

**Problem:** PV Bar doesn't appear  
**Solution:**
- Verify `pv_bar.show: true`
- Check that at least one PV entity is configured
- Ensure entities exist and provide valid data

---

[⬅️ Back to Main README](../README.md)
