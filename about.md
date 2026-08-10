---
layout: default
title: About
permalink: /about/
---

{%- comment -%}
  Pulls upcoming + past events and current sessions from _data/sessionize.yml,
  which is a snapshot of https://sessionize.com/api/speaker/json/32v3odtbr8.
  See README for the suggested CI step to keep it fresh on every build.
{%- endcomment -%}
{%- assign today = site.time | date: "%Y-%m-%d" -%}
{%- assign all_events = site.data.sessionize.events | sort: "start" -%}
{%- assign upcoming = "" | split: "" -%}
{%- assign past = "" | split: "" -%}
{%- for ev in all_events -%}
  {%- if ev.end >= today -%}
    {%- assign upcoming = upcoming | push: ev -%}
  {%- else -%}
    {%- assign past = past | push: ev -%}
  {%- endif -%}
{%- endfor -%}
{%- assign past = past | reverse -%}

<section class="about">
  <div>
    <div class="about__eyebrow">About · Me</div>
    <h1 class="about__name">Hi, I'm <em>Matthijs.</em></h1>
    <p class="about__role">{{ site.author_bio | split: '.' | first }}.</p>

    <p>{{ site.author_bio }}</p>

    {%- if upcoming.size > 0 -%}
    <div class="post__divider">{% include feather.html %}<hr /></div>
    <h2 class="about__section-title">Upcoming events</h2>
    <p class="about__hint">Where you can catch me next.</p>
    <div class="talks">
      {%- for ev in upcoming -%}
        <a class="talk" href="{{ ev.website }}" target="_blank" rel="noopener">
          <div class="talk__year">{{ ev.start | date: "%b %d" }}{% if ev.end != ev.start %}–{{ ev.end | date: "%d" }}{% endif %}<br/><span class="talk__sub">{{ ev.start | date: "%Y" }}</span></div>
          <div>
            <div class="talk__title">{{ ev.name }}</div>
            <div class="talk__venue">{{ ev.location }}</div>
          </div>
          <div class="talk__city">↗</div>
        </a>
      {%- endfor -%}
    </div>
    {%- endif -%}

    {%- if site.data.sessionize.sessions.size > 0 -%}
    <div class="post__divider">{% include feather.html %}<hr /></div>
    <h2 class="about__section-title">Currently speaking on</h2>
    <p class="about__hint">Sessions I'm offering this season — click to expand.</p>
    <div class="sessions">
      {%- for s in site.data.sessionize.sessions -%}
        <details class="session">
          <summary>
            <div class="session__head">
              <div class="session__title">{{ s.title }}{% if s.isWorkshop %} <span class="session__badge">Workshop</span>{% endif %}</div>
              <div class="session__chevron" aria-hidden="true"></div>
            </div>
            {%- if s.short -%}<div class="session__short">{{ s.short }}</div>{%- endif -%}
          </summary>
          <div class="session__full">
            {%- assign paragraphs = s.full | split: "

" -%}
            {%- for p in paragraphs -%}<p>{{ p }}</p>{%- endfor -%}
            <a class="session__link" href="{{ s.url }}" target="_blank" rel="noopener">View on Sessionize ↗</a>
          </div>
        </details>
      {%- endfor -%}
    </div>
    {%- endif -%}

    {%- if past.size > 0 -%}
    <div class="post__divider">{% include feather.html %}<hr /></div>
    <h2 class="about__section-title">Past events</h2>
    <p class="about__hint">A trail of stages.</p>
    <div class="talks talks--compact">
      {%- for ev in past -%}
        <a class="talk" href="{{ ev.website }}" target="_blank" rel="noopener">
          <div class="talk__year">{{ ev.start | date: "%Y" }}</div>
          <div>
            <div class="talk__title">{{ ev.name }}</div>
            <div class="talk__venue">{{ ev.location }}</div>
          </div>
          <div class="talk__city">{{ ev.start | date: "%b" }}</div>
        </a>
      {%- endfor -%}
    </div>
    {%- endif -%}
  </div>

  <aside>
    <div class="about__portrait">
      {% if site.author_photo %}
        <img src="{{ site.author_photo | relative_url }}" alt="{{ site.author }}" />
      {% else %}
        <img src="{{ '/assets/profile.png' | relative_url }}" alt="{{ site.author }}" />
      {% endif %}
    </div>

    <div class="about__eyebrow">Find me here</div>
    <div class="socials">
      <a href="{{ site.social.github }}"><span class="social__name">GitHub</span><span class="social__handle">@MatthijsvdVeer</span></a>
      <a href="{{ site.social.linkedin }}"><span class="social__name">LinkedIn</span><span class="social__handle">matthijsvanderveer</span></a>
      <a href="https://sessionize.com/matthijs-van-der-veer"><span class="social__name">Sessionize</span><span class="social__handle">book a talk</span></a>
    </div>

    <div class="about__currently">
      <div class="label">Currently</div>
      <div>Moving away from technical <em>How To AI</em> presentations. I'd rather teach the general public to understand generative AI and its many challenges. Let's break through some myths together!</div>
    </div>
  </aside>
</section>
