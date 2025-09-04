// ...existing code...
// Small utilities
// const $ = (sel, scope = document) => scope.querySelector(sel)
// const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel))

const PAGE_SIZE = 6
const DATA_URL = "/json/processed_data.json"

async function fetchCourses() {
  const res = await fetch(DATA_URL)
  if (!res.ok) throw new Error("Failed to load courses.json")
  return await res.json()
}

// Navbar mobile toggle
function initNav() {
  const toggle = document.querySelector(".nav__toggle")
  const menu = document.querySelector(".nav__menu")
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("show"))
  }
}

// ---------- Courses Page ----------
async function initCoursesPage() {
  initNav()
  const courses = await fetchCourses()
  let currentPage = 1
  const grid = document.querySelector("#courses-grid")
  const pager = document.querySelector("#pagination")

  function renderPage(page) {
    currentPage = page
    const start = (page - 1) * PAGE_SIZE
    const slice = courses.slice(start, start + PAGE_SIZE)
    grid.innerHTML = ""
    slice.forEach((course, idx) => {
      grid.appendChild(buildCourseCard(course, start + idx))
    })
    renderPagination()
  }

  function renderPagination() {
    const totalPages = Math.ceil(courses.length / PAGE_SIZE)
    pager.innerHTML = ""

    const prev = document.createElement("button")
    prev.textContent = "Prev"
    prev.className = "page-btn"
    prev.disabled = currentPage === 1
    prev.addEventListener("click", () => renderPage(Math.max(1, currentPage - 1)))
    pager.appendChild(prev)

    for (let p = 1; p <= totalPages; p++) {
      const btn = document.createElement("button")
      btn.textContent = String(p)
      btn.className = "page-btn" + (p === currentPage ? " active" : "")
      btn.addEventListener("click", () => renderPage(p))
      pager.appendChild(btn)
    }

    const next = document.createElement("button")
    next.textContent = "Next"
    next.className = "page-btn"
    next.disabled = currentPage === totalPages
    next.addEventListener("click", () => renderPage(Math.min(totalPages, currentPage + 1)))
    pager.appendChild(next)
  }

  renderPage(1)
}

function buildCourseCard(course, globalIndex) {
  const lessons = course.playlist?.length || 0
  const thumb = course.playlist?.[0]?.video_thumbnail || "/course-thumbnail.png"
  const title = course["Course Name"] || "Course Title"
  const institute = course["Offering Institute"] || "Institute"
  const card = document.createElement("article")
  card.className = "card"
  card.tabIndex = 0
  card.innerHTML = `
    <div class="card__media">
      <img src="${thumb}" alt="${title} thumbnail">
      <span class="badge">Technology</span>
    </div>
    <div class="card__body">
      <h3 class="card__title">${title}</h3>
      <div class="meta">
        <span class="chip">
          <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="currentColor"/></svg>
          ${lessons} Lessons
        </span>
        <span class="chip">
          <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm.8 5h-1.6v6l5 3 .8-1.3-4.2-2.5V7z" fill="currentColor"/></svg>
          3h 15m
        </span>
      </div>
      <div class="muted">Offering Institute: ${institute}</div>
    </div>
    <div class="card__footer">
      <div class="price">$55.00</div>
      <div class="teacher">
        <span class="avatar" aria-hidden="true">W</span>
        <span>Willimes Ronim</span>
        <span class="rating" title="Rating 4.9">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 7-6.3-3.3L5.7 21 7 14l-5-5 7-1L12 2z" fill="currentColor"/></svg>
          4.9
        </span>
      </div>
    </div>
  `
  // click handler to open modules page
  card.addEventListener("click", () => {
    try {
      localStorage.setItem("selectedCourse", JSON.stringify(course))
    } catch (e) {
      /* ignore */
    }
    const nameParam = encodeURIComponent(title)
    window.location.href = `modules.html?name=${nameParam}`
  })
  return card
}

// ---------- Modules Page ----------
async function initModulesPage() {
  initNav()

  const qs = new URLSearchParams(window.location.search)
  const nameParam = qs.get("name")
  /** try localStorage first */
  let selected = null
  try {
    selected = JSON.parse(localStorage.getItem("selectedCourse") || "null")
  } catch (e) {
    selected = null
  }

  if (!selected || (nameParam && selected["Course Name"] !== decodeURIComponent(nameParam))) {
    // fallback: find by name from file
    const list = await fetchCourses()
    selected = list.find((c) => c["Course Name"] === decodeURIComponent(nameParam)) || list[0]
  }

  if (!selected) return

  // Set hero text
  document.querySelector("#course-title").textContent = selected["Course Name"]
  document.querySelector("#course-subtitle").textContent = `Offering Institute: ${selected["Offering Institute"] || "—"}`
  document.querySelector("#crumb-course").textContent = selected["Course Name"]

  const first = selected.playlist?.[0]
  const preview = document.querySelector("#video-preview")
  if (first) {
    preview.innerHTML = `<iframe title="${first.video_title}" src="${toEmbedUrl(first.video_url)}" allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"></iframe>`
  } else {
    preview.innerHTML = `<div style="padding:24px">No videos available.</div>`
  }

  // render playlist
  const wrap = document.querySelector("#playlist")
  wrap.innerHTML = ""
  ;(selected.playlist || []).forEach((item, index) => {
    const v = document.createElement("article")
    v.className = "vcard"
    v.dataset.videoIndex = index

    let iconSvg = ''
    if (item.video_type === 'video') {
      iconSvg = `<svg class="ico vcard-icon--video" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 2.5v19l15-9.5L4 2.5z"/></svg>`;
    } else if (item.video_type === 'reading') {
      iconSvg = `<svg class="ico vcard-icon--reading" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 22H5a3 3 0 01-3-3V5a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3zM14 9h-4V7h4v2zm-4 4h4v-2h-4v2zm4 4h-4v-2h4v2z"/></svg>`;
    } else if (item.video_type === 'discussion') {
      iconSvg = `<svg class="ico vcard-icon--discussion" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a5 5 0 1110 0 5 5 0 01-10 0z"/></svg>`;
    }

    v.innerHTML = `
      <div class="vcard-header">
        ${iconSvg}
        <h3 class="vtitle">${item.video_title}</h3>
      </div>
      <p class="vdesc">${item.video_type}</p>
    `;
    
    v.addEventListener("click", () => {
      const videoTitleElement = document.querySelector('.video-title');
      videoTitleElement.textContent = item.video_title;
      const currentActive = document.querySelector('.vcard.active');
      if (currentActive) {
        currentActive.classList.remove('active');
      }
      v.classList.add('active');
      
      document.querySelector("#video-preview").innerHTML = `<iframe title="${item.video_title}" src="${toEmbedUrl(item.video_url)}" allowfullscreen></iframe>`;
      window.scrollTo({ top: document.querySelector(".module-main").offsetTop - 80, behavior: "smooth" });
    });
    wrap.appendChild(v);
  });
}

function toEmbedUrl(url) {
  try {
    const u = new URL(url)
    const id = u.searchParams.get("v")
    if (id) return `https://www.youtube.com/embed/${id}`
  } catch (e) {}
  return url
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  const page =
    document.documentElement.getAttribute("lang") === "en" && document.body?.dataset?.page
      ? document.body.dataset.page
      : document.documentElement.getAttribute("data-page") || document.body.getAttribute("data-page")

  // Our HTML sets page on <html> tag
  const which = document.documentElement.getAttribute("data-page")

  if (which === "courses") initCoursesPage().catch(console.error)
  if (which === "modules") initModulesPage().catch(console.error)
})
// ...existing code...