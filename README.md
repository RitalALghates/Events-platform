<div align="center">

# 🎟️ منصة الفعاليات · EventBook

**Discover and book the best events in Saudi Arabia — concerts, festivals, conferences and experiences.**

[**▶ Live demo**](https://ritalalghates.github.io/Events-platform/) · Arabic (RTL) · Responsive · No build step

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-222?logo=github)

<img src="docs/screenshots/home-hero.jpg" alt="EventBook home page" width="92%">

</div>

## ✨ Features

- **Modern dark design** with glass surfaces, gradient accents, the Cairo Arabic font and smooth scroll-reveal animations
- **Live search** by name, venue or date, plus **category filters** (concerts & shows, tech conferences, food festivals, entertainment)
- **Booking flow** – choose the number of tickets, confirm, and get a ticket with a booking code
  (bookings are saved in the browser's `localStorage`)
- **Deep links** – `events.html?cat=tech`, `events.html?q=جدة`, `events.html?book=beach`
- **Hero search** on the home page that jumps to the filtered events list
- **Live clock** in the header (Arabic locale)
- **Fully responsive** – mobile menu, flexible grids, tested down to 375 px
- **Accessible basics** – semantic landmarks, ARIA labels, keyboard support (Esc closes the dialog), reduced-motion support
- **Zero dependencies** – plain HTML, CSS and JavaScript

## 🖼️ Screens

<table>
  <tr>
    <td width="50%"><b>Events with filters</b><br><img src="docs/screenshots/events.jpg" alt="Events page"></td>
    <td width="50%"><b>Category filter (tech conferences)</b><br><img src="docs/screenshots/events-filter.jpg" alt="Filtered events"></td>
  </tr>
  <tr>
    <td><b>Booking dialog</b><br><img src="docs/screenshots/booking.jpg" alt="Booking dialog"></td>
    <td><b>About</b><br><img src="docs/screenshots/about.jpg" alt="About page"></td>
  </tr>
  <tr>
    <td colspan="2"><b>Contact</b><br><img src="docs/screenshots/contact.jpg" alt="Contact page"></td>
  </tr>
</table>

### Home page (full)

<p align="center"><img src="docs/screenshots/home-full.jpg" alt="Full home page" width="80%"></p>

### 📱 On mobile

<p align="center">
  <img src="docs/screenshots/mobile-home.jpg" width="30%" alt="Mobile home">
  <img src="docs/screenshots/mobile-booking.jpg" width="30%" alt="Mobile booking form">
  <img src="docs/screenshots/mobile-ticket.jpg" width="30%" alt="Mobile ticket">
</p>

## 🚀 Run it

No installation needed. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000     # then open http://localhost:8000
```

## 🗂️ Project structure

```text
index.html      Home: hero + search, featured events, banner, how it works, reviews, newsletter
events.html     Events list with search and category filters
about.html      About the platform
contact.html    Contact details and message form (opens your e-mail app)
styles.css      Design system: colours, layout, components, animations
script.js       Events data, rendering, search / filters, booking dialog, toast, clock, menu
images/         Event posters
docs/           README screenshots
```

### Adding or editing events

All events live in the `EVENTS` array at the top of [`script.js`](script.js):

```js
{
  id: "leap",                       // used by ?book=<id>
  city: "الرياض",
  title: "مؤتمر التقنية والابتكار LEAP",
  cat: "tech",                      // music | tech | food | fun
  date: "5 يوليو 2025",
  venue: "مركز المعارض الدولي - الرياض",
  img: "images/leap.png",
  featured: false                   // true = shown on the home page
}
```

## ℹ️ Notes

- This is a front-end demo: there is **no server**. Bookings are stored locally in your browser, the newsletter
  form is a demo, and the contact form opens your e-mail client with a ready-made message to `events@platform.com`.
- Event posters are used for demonstration purposes.
