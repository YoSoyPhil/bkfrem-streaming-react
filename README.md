# Billardklubben Frem - Streaming - React
Klik på [link til bord streaming](https://bk-frem.dk/streaming) for at se det i produktion.

## Beskrivelse
Dette er en single page application skrevet i React, og styled med Tailwindcss.\
Anvendes til at se live streaming af billard borde i Billardklubben Frem i Kolding.

### `Features`
- [x] Stream et billard bord
- [x] Fejl besked ved inaktivt bord
- [x] Visning af flere borde
- [x] Fuldskærm / TV skærm mode
- [ ] Visning af kamp data via fx. json filer pr. kamp på backend

### `Vejledning`
Disse settings sættes i config.js:\
Sæt Wowza streaming og webserver adresse ved at redigere `wowzaServer`.\
Indsæt de forskellige muligheder borde ved at redigere variablen `tables`.

Her er et eksempel på config.js:
```javascript
module.exports = {
  wowzaServer: "videoserver.domæne.dk",
  tables: [1, 2, 5, 6, 10],
  noStreamsVideo: 'https://example.com/video.mp4'
}
```