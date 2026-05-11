# Reusable HTML snippets

When you add a new page, copy these blocks. They keep nav + footer consistent.

## Nav (from root pages: index.html, about.html, contact.html)

```html
<header class="nav">
  <div class="container nav__inner">
    <a href="index.html" class="logo"><span class="logo__dot">T</span> Travel Trips</a>
    <nav>
      <ul class="nav__links">
        <li class="has-dropdown">
          <a href="index.html#services">Services ▾</a>
          <ul class="dropdown">
            <li><a href="services/erasmus-programme.html">Erasmus Programme</a></li>
            <li><a href="services/internships.html">Internships</a></li>
            <li><a href="services/accommodations.html">Accommodations</a></li>
            <li><a href="services/airport-transfers.html">Airport Transfers</a></li>
            <li><a href="services/english-classes.html">English Classes</a></li>
            <li><a href="services/sightseeing-tours.html">Sightseeing Tours</a></li>
            <li><a href="services/school-visits.html">School Visits</a></li>
            <li><a href="services/training-programs.html">Training Programs</a></li>
            <li><a href="services/coworking-space.html">Co-working Space</a></li>
          </ul>
        </li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <a href="contact.html" class="btn btn--primary nav__cta nav__cta--desktop">Get in touch <span class="arrow">→</span></a>
    <button class="nav__burger" aria-label="Menu"><span></span></button>
    <aside class="nav__drawer">
      <div class="nav__drawer-list">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <div class="group-label">Services</div>
        <a href="services/erasmus-programme.html">Erasmus Programme</a>
        <a href="services/internships.html">Internships</a>
        <a href="services/accommodations.html">Accommodations</a>
        <a href="services/airport-transfers.html">Airport Transfers</a>
        <a href="services/english-classes.html">English Classes</a>
        <a href="services/sightseeing-tours.html">Sightseeing Tours</a>
        <a href="services/school-visits.html">School Visits</a>
        <a href="services/training-programs.html">Training Programs</a>
        <a href="services/coworking-space.html">Co-working Space</a>
      </div>
      <a href="contact.html" class="btn btn--primary">Get in touch <span class="arrow">→</span></a>
    </aside>
  </div>
</header>
```

## Nav (from service pages, inside `services/`)

Same as above but with `../` in front of every link to a page outside `services/`, and no prefix for siblings. See any `services/*.html` for the working version.

## Footer (root pages)

```html
<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <a href="index.html" class="logo"><span class="logo__dot">T</span> Travel Trips</a>
        <p>End-to-end Erasmus services in Dublin and Budapest. Internships, host-family accommodation, tours and 24/7 support.</p>
      </div>
      <div class="footer__col"><h4>Services</h4><ul>
        <li><a href="services/erasmus-programme.html">Erasmus Programme</a></li>
        <li><a href="services/internships.html">Internships</a></li>
        <li><a href="services/accommodations.html">Accommodations</a></li>
        <li><a href="services/airport-transfers.html">Airport Transfers</a></li>
        <li><a href="services/english-classes.html">English Classes</a></li>
      </ul></div>
      <div class="footer__col"><h4>More</h4><ul>
        <li><a href="services/sightseeing-tours.html">Sightseeing Tours</a></li>
        <li><a href="services/school-visits.html">School Visits</a></li>
        <li><a href="services/training-programs.html">Training Programs</a></li>
        <li><a href="services/coworking-space.html">Co-working Space</a></li>
      </ul></div>
      <div class="footer__col"><h4>Company</h4><ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="contact.html">Dublin office</a></li>
        <li><a href="contact.html">Budapest office</a></li>
      </ul></div>
    </div>
    <div class="footer__bottom">
      <span>© <span data-year>2026</span> Travel Trips. All rights reserved.</span>
      <div class="footer__socials">
        <a href="#" aria-label="Instagram">Ig</a>
        <a href="#" aria-label="Facebook">Fb</a>
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="#" aria-label="Email">@</a>
      </div>
    </div>
  </div>
</footer>
```

## Head &amp; scripts

Every page should end with these script tags (use `../` from inside `services/`):

```html
<script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="assets/js/main.js"></script>
```
