# Billardklubben Frem - Streaming - React
Klik på [link til bord streaming](https://bk-frem.dk/streaming) for at se det i produktion.

## Beskrivelse
Dette er en single page application skrevet i React, og styled med Tailwindcss.\
Anvendes til at se live streaming af billard borde i Billardklubben Frem i Kolding.

### `Features`
- [x] Stream et billard bord
- [x] Fejl besked ved inaktivt bord
- [ ] Visning af flere borde
- [ ] Visning af kamp data via fx. json filer pr. kamp på backend
- [ ] TV skærm mode

### `Vejledning`
Disse settings sættes i config.js:
Sæt Wowza streaming og webserver adresse ved at redigere `wowzaServer`.\
Sæt din JWPlayer library fil ved at redigere  `jwtplayerLib`.\
Indsæt de forskellige muligheder borde ved at redigere variablen `tables`.
