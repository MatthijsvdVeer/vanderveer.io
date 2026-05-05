#!/usr/bin/env bash
# Refresh _data/sessionize.yml from the live Sessionize speaker API.
# Usage (from repo root): ./jekyll/scripts/fetch-sessionize.sh
# Recommended: wire into a GitHub Actions Pages workflow so every build pulls fresh data.

set -euo pipefail
SPEAKER_ID="${SPEAKER_ID:-32v3odtbr8}"
URL="https://sessionize.com/api/speaker/json/${SPEAKER_ID}"
OUT="_data/sessionize.yml"

curl -fsSL "$URL" | python3 -c "
import json, sys, datetime, re
data = json.load(sys.stdin)

events = []
for e in data.get('events', []):
    events.append({
        'id': e.get('id'),
        'name': e.get('name'),
        'start': (e.get('eventStartDate') or '')[:10],
        'end':   (e.get('eventEndDate')   or '')[:10],
        'location': e.get('location'),
        'website':  e.get('website') or '',
    })

def split_short_full(desc):
    if not desc: return ('', '')
    desc = desc.replace('\r\n','\n').strip()
    paragraphs = [p.strip() for p in re.split(r'\n\s*\n', desc) if p.strip()]
    if not paragraphs: return ('', '')
    short = paragraphs[0]
    if len(short) > 220:
        short = short[:217].rsplit(' ',1)[0] + '…'
    full = '\n\n'.join(paragraphs)
    return (short, full)

sessions = []
for s in data.get('sessions', []):
    short, full = split_short_full(s.get('description') or '')
    sessions.append({
        'title': s.get('name') or s.get('title'),
        'short': short,
        'full':  full,
        'url':   s.get('sessionUrl'),
        'isWorkshop': bool(s.get('isWorkshop') or 'workshop' in (s.get('name') or '').lower()),
    })

def y(v):
    if v is None or v == '': return '\"\"'
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, int): return str(v)
    return '\"' + str(v).replace('\\\\','\\\\\\\\').replace('\"','\\\\\"') + '\"'

print('# Snapshot of', '$URL')
print('# Refreshed', datetime.date.today().isoformat())
print()
print('events:')
for e in events:
    print('  - id:', y(e['id']))
    for k in ('name','start','end','location','website'):
        print('   ', k+':', y(e[k]))
print()
print('sessions:')
for s in sessions:
    print('  - title:', y(s['title']))
    print('    url:',   y(s['url']))
    if s['isWorkshop']: print('    isWorkshop: true')
    print('    short:', y(s['short']))
    # Use YAML literal block for multi-paragraph full text
    print('    full: |')
    for line in (s['full'] or '').split('\n'):
        print('     ', line)
" > "$OUT"

echo \"Wrote $OUT\"
