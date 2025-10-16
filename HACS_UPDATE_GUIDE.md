# HACS Update Force

## Problem
HACS erkennt neue Releases erst nach bis zu 24 Stunden aufgrund von Caching.

## Lösung für Benutzer

### Variante 1: Manueller HACS Reload (Empfohlen)
1. Home Assistant öffnen
2. **Einstellungen** → **Geräte & Dienste** → **Integrationen**
3. **HACS** finden → **⋮** (3 Punkte) → **Integration neu laden**
4. HACS neu öffnen und nach Updates suchen

### Variante 2: HACS Cache löschen
1. Home Assistant → **Entwicklerwerkzeuge** → **Dienste**
2. Dienst: `hacs.repository_update`
3. YAML:
```yaml
repository: sjerocom/pv-monitor-card
```
4. **Dienst aufrufen**

### Variante 3: Home Assistant neu starten
- Erzwingt kompletten HACS Reload
- Dauert am längsten

## Automatische Lösung (für Entwickler)

Das Repository nutzt GitHub Actions die bei jedem Release:
1. ✅ Automatisch ein Tag erstellen
2. ✅ Die `.js` Datei als Asset hochladen
3. ✅ HACS via repository dispatch benachrichtigen

**Wichtig**: Nach dem Erstellen des Draft-Releases in GitHub:
1. Release-Notizen bearbeiten
2. Von **Draft** auf **Publish release** umstellen
3. Workflow `hacs-notify.yml` wird automatisch getriggert

## Troubleshooting

### Release wird nicht erkannt
- [ ] Release ist **published** (nicht draft)?
- [ ] Tag folgt semantic versioning (z.B. `0.0.118`)?
- [ ] Asset `pv-monitor-card.js` ist vorhanden?
- [ ] 24h gewartet oder HACS manuell neu geladen?

### Checken ob Asset korrekt ist
```bash
gh release view v0.0.118 --json assets --jq '.assets[].name'
```

Sollte ausgeben: `pv-monitor-card.js`
