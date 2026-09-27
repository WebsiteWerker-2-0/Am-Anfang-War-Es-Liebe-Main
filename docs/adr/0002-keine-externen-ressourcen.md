# Keine Ressourcen von fremden Servern

Der Browser einer Besucherin stellt beim Besuch der Website keine einzige Anfrage an einen fremden Host: keine Google Fonts, kein CDN, keine Embeds, keine Karten, kein Tracking. Grund ist der Schutz der Besucherinnen, deren Besuch sonst bei Dritten sichtbar würde, und die Datenschutzvorgabe des AG (Regel 1 der Design-Doku). Schriften kommen deshalb über `next/font`, das sie beim Build lädt und selbst ausliefert. Ausnahmen sind nur das Ziel des Notausgangs und redaktionelle Links, denen die Besucherin selbst folgt.

**Status:** angenommen, 27.09.2026

## Folgen

- Neue Abhängigkeiten, Komponenten oder CMS-Funktionen vor dem Einbau im Netzwerk-Tab prüfen: 0 Anfragen an fremde Hosts.
- Vercel blendet auf Preview-Deployments eine eigene Toolbar ein. Das betrifft nur die Vorschau, nicht die Produktion auf Hostinger.
