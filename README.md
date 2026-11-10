# vanderveer.io

Personal blog of Matthijs van der Veer, built with Jekyll and hosted on GitHub Pages.

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000` to preview the site.

## How the site is put together

- `_layouts/home.html`: the homepage with four sections: Writing, Reading, Speaking and Contact.
- `writing.html`: the full archive at `/writing/`, grouped by year.
- `_layouts/post.html`: a single post. Optional front matter: `die` (`d4`, `d6`, `d8`, `d10`, `d12` or `d20`) picks the die in the header, `code` adds a "Code on GitHub" link, `read_time` overrides the calculated reading time.
- `_books/`: one Markdown file per book. Anything below the front matter is shown as your note; leave it empty for books without one.
- `assets/css/site.css`: all styles, plain CSS. Colours for both themes are the custom properties at the top.
- `assets/js/site.js`: theme switch, book shelf, copy buttons on code and image captions (an image's title becomes its caption). The site works without it.
- `assets/fonts/`: self-hosted Space Grotesk, Inter and JetBrains Mono (SIL Open Font License, licences included).

To show a chat transcript in a post, wrap it like the example in the AutoGen post: a `<div class="transcript">` with one `<div class="msg">` per message.

## Keeping Sessionize data fresh

Speaking reads from `_data/sessionize.yml`, a snapshot of
`https://sessionize.com/api/speaker/json/32v3odtbr8`.

The Pages workflow refreshes it before every build and also runs once a day, so finished events move from "Next up" to "Past stages" on their own. If Sessionize can't be reached, the build uses the committed snapshot.

To refresh it by hand, from the repo root:

```bash
./scripts/fetch-sessionize.sh
```
