# Invitație Nuntă — Clau & Maria 💍

React app pentru invitația digitală, 8 August 2026.

## Setup

```bash
npm install
npm run dev        # development server
npm run build      # build pentru producție → /dist
npm run preview    # previzualizare build
```

## Deploy pe Netlify

1. Rulează `npm run build`
2. Du-te pe **netlify.com/drop**
3. Trage folderul `/dist` (nu fișierul, **folderul întreg**) pe pagină
4. Gata — linkul rămâne același la fiecare update

## Actualizare invitație

1. Modifică fișierele dorite în `/src`
2. `npm run build`
3. Drag & drop `/dist` din nou pe Netlify

## Schimbare poză

Înlocuiește `/src/photo.js` cu o nouă poză:

```bash
# Pe Windows PowerShell:
$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\cale\spre\poza.jpg"))
"const photo = `"data:image/jpeg;base64,$b64`";`nexport default photo;" | Out-File -Encoding utf8 src/photo.js

# Pe Mac/Linux:
echo "const photo = \"data:image/jpeg;base64,$(base64 -i poza.jpg)\";" > src/photo.js
echo "export default photo;" >> src/photo.js
```

## Structură

```
src/
  components/
    PageCover.jsx       — Coperta (foto, nume, verset)
    PageDetails.jsx     — Detalii eveniment + dress code
    PageCountdown.jsx   — Numărătoare inversă + hartă
    PageRSVP.jsx        — Confirmare prezență + modal
    Nav.jsx             — Navigație fixă (butoane + dots)
  hooks/
    useParticles.js     — Sistem de particule canvas (petale, inimi, sparkle auriu)
  App.jsx               — Orchestrare pagini + tranziții cinematice
  photo.js              — Poza cuplului (base64)
```
