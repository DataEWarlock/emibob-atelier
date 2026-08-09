# Emibob Atelier

A clean, anime-inspired personal website for showcasing AI art, original characters, and prompts.

**Repository:** https://github.com/DataEWarlock/emibob-atelier  
**Live site (after enabling Pages):** https://dataewarlock.github.io/emibob-atelier/

---

## Enable GitHub Pages (one-time setup)

1. Go to the repository: https://github.com/DataEWarlock/emibob-atelier
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Branch: `main`  
   Folder: `/ (root)`
5. Click **Save**

Wait 30–90 seconds. Your site will be live at:  
**https://dataewarlock.github.io/emibob-atelier/**

---

## Customizing the site

### Replace gallery images
1. Put your images inside the `assets/` folder (e.g. `assets/piece01.jpg`)
2. Open `index.html`
3. Find a gallery card and change the placeholder like this:

```html
<!-- Before -->
<div class="gallery-img placeholder">
  <span>01</span>
</div>

<!-- After -->
<div class="gallery-img">
  <img src="assets/piece01.jpg" alt="Description of your art" style="width:100%;height:100%;object-fit:cover;">
</div>
```

### Edit text & prompts
Just open `index.html` in any text editor (or use GitHub’s web editor) and change the text.  
The prompt copy buttons will automatically use the new text if you also update the `data-prompt` attribute.

### Change colors
Open `css/style.css` and edit the variables at the top (`:root`).

---

## Files

```
emibob-atelier/
├── index.html          ← main page
├── css/style.css       ← all styling
├── js/main.js          ← mobile menu + copy buttons
├── assets/             ← put your images here
└── README.md           ← this file
```

Fully static, no build step, free forever on GitHub Pages.
