# PV Monitor Card

## Features

This card provides a beautiful and intuitive interface for monitoring your photovoltaic system in Home Assistant.

### What you get:
- 🌞 **Real-time monitoring** of solar production
- 🔋 **Battery status** with charge level
- ⚡ **Energy flow** visualization
- 📊 **Detailed statistics** at a glance
- 🎨 **Customizable** appearance to match your dashboard

## Quick Start

After installation through HACS:

1. Add the card to your dashboard
2. Configure your entity IDs
3. Customize the appearance to your liking

## Example Configuration

```yaml
type: custom:pv-monitor-card
entities:
  solar_power: sensor.solar_power
  grid_power: sensor.grid_power
  battery_power: sensor.battery_power
  battery_soc: sensor.battery_state_of_charge
```

## Support

For questions, bug reports, or feature requests, please visit our [GitHub repository](https://github.com/sjerocom/pv-monitor-card).