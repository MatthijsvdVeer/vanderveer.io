# vanderveer.io

Personal blog of Matthijs van der Veer, built with Jekyll and hosted on GitHub Pages.

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000` to preview the site.

## Keeping Sessionize data fresh

The about page reads from `_data/sessionize.yml`, which is a snapshot of:
`https://sessionize.com/api/speaker/json/32v3odtbr8`

Two ways to refresh it:

**Manual.** From the repo root:

```bash
./jekyll/scripts/fetch-sessionize.sh
```

Commits the updated YAML; next build picks it up.

**Automatic (recommended).** Add a step to your GitHub Actions Pages workflow before the Jekyll build:

```yaml
- name: Refresh Sessionize data
  run: ./jekyll/scripts/fetch-sessionize.sh
```

Every deploy then pulls fresh sessions + events. Note: GitHub Pages' default build doesn't run custom steps; you'll need a `pages.yml` workflow that does `actions/configure-pages` → fetch script → `jekyll build` → `actions/deploy-pages`.

The about page splits events into **Upcoming** (end-date ≥ today) and **Past** (end-date < today) automatically, using `site.time` — so you never need to manually move an event between sections.

## Preview

Open `Vertical Descent.html` (sibling to this folder) for a static preview rendered with your real post titles and dates.
