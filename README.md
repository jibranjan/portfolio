# Portfolio

Personal site of Jibran Jan, frontend engineer.
Live at <https://jibranjan.github.io/portfolio/>

Plain HTML, CSS and one small ES module. There is no build step and nothing to install.

## Layout

```
index.html              the page
assets/css/styles.css   all styles; colours are light-dark() tokens at the top
assets/js/main.js       theme toggle, clock, copy button, nav highlight
assets/fonts/           self-hosted fonts and their licences
assets/img/             photo
resume/resume.html      source of the resume
resume/build.sh         renders the resume to PDF
favicon.svg, favicon.ico, apple-touch-icon.png, og.png
```

## Run it locally

```sh
python3 -m http.server 8765
```

Then open <http://localhost:8765/>.

## Update the resume

Edit `resume/resume.html`, then run:

```sh
sh resume/build.sh
```

It prints the page to `resume/Jibran-Jan-Resume.pdf` with headless Chrome. The resume uses static font
weights so the PDF embeds real TrueType fonts, which resume parsers read reliably. Check the result with
`pdftotext resume/Jibran-Jan-Resume.pdf -` if you change the layout.

## If the repository is renamed

The site uses relative paths, so it keeps working. Four absolute URLs need the new address: `canonical`,
`og:url`, `og:image` and the JSON-LD block in `index.html`, plus the portfolio link in `resume/resume.html`.

## Fonts

Geist, Geist Mono and Instrument Serif, all under the SIL Open Font License 1.1. The licence texts are in
`assets/fonts/`.
