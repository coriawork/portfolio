/* ─────────────────────────────────────────────────────────
   main.js
   Módulos:
     0. Cursor personalizado
     1. Typewriter  — frases rotativas en el hero
     2. Clock       — hora en tiempo real (UTC-3 La Plata)
     3. ScrollReveal — fade-in + slide-up con IntersectionObserver
     4. Dynamic title — título de pestaña dinámico
    5. GitHub last commit — fecha del último commit público
   ───────────────────────────────────────────────────────── */

'use strict';

/* ══════════════════════════════════════════════════════════   0. CURSOR PERSONALIZADO
   ══════════════════════════════════════════════════════ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Seguir al mouse con requestAnimationFrame para mayor suavidad
  let mouseX = -100, mouseY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function loop() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Animación al hacer click
  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));

  // Agrandar al hover sobre links e interactivos
  const interactives = 'a, button, [role="button"], input, textarea, select';
  document.querySelectorAll(interactives).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // Ocultar cursor al salir de la ventana
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = ''; });
})();


/* ══════════════════════════════════════════════════════   1. TYPEWRITER
   ══════════════════════════════════════════════════════════ */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Del problema\na la solución.',
    'De tu idea\nal código.',
    'Hagamoslo realidad :)',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function renderText(raw) {
    // Convertir saltos de línea en <br> para el título
    el.innerHTML = raw.replace('\n', '<br>');
  }

  function tick() {
    const current = phrases[phraseIndex];

    isDeleting ? charIndex-- : charIndex++;

    renderText(current.slice(0, charIndex));

    let delay = isDeleting ? 38 : 75;

    if (!isDeleting && charIndex === current.length) {
      // Pausa al terminar de escribir
      delay      = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Pausa antes de la siguiente frase
      isDeleting  = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay       = 450;
    }

    setTimeout(tick, delay);
  }

  tick();
})();


/* ══════════════════════════════════════════════════════════
   2. RELOJ — La Plata, Argentina (UTC-3, sin DST)
   ══════════════════════════════════════════════════════════ */
(function initClock() {
  const el = document.getElementById('clock');
  if (!el) return;

  const LA_PLATA_OFFSET_MIN = -3 * 60; // UTC-3

  function getLaPlataTime() {
    const now      = new Date();
    const utcMs    = now.getTime() + now.getTimezoneOffset() * 60_000;
    return new Date(utcMs + LA_PLATA_OFFSET_MIN * 60_000);
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    const t = getLaPlataTime();
    el.textContent = `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
  }

  update();
  setInterval(update, 1000);
})();


/* ══════════════════════════════════════════════════════════
   3. SCROLL REVEAL
   Agrega la clase .visible a cualquier elemento con .reveal
   cuando entra al viewport.
   ══════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Dejar de observar una vez que ya apareció
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ══════════════════════════════════════════════════════════
   4. DYNAMIC TITLE
   - Visible: rota entre títulos descriptivos cada 3s
   - Oculto:  muestra mensaje para atraer de vuelta al usuario
   ══════════════════════════════════════════════════════════ */
(function initDynamicTitle() {
  const titles = [
    '✦ Manuel Coria ✦',
    '✦ Open to Work ✦',
    '✦ De tu idea al CÓDIGO✦',
  ];

  const hiddenTitle = 'Te extraño :(';
  const originalTitle = document.title;

  let index    = 0;
  let interval = null;

  function rotateTitles() {
    document.title = titles[index];
    index = (index + 1) % titles.length;
  }

  function startRotation() {
    rotateTitles();
    interval = setInterval(rotateTitles, 3000);
  }

  function stopRotation() {
    clearInterval(interval);
    interval = null;
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopRotation();
      document.title = hiddenTitle;
    } else {
      document.title = originalTitle;
      startRotation();
    }
  });

  // Arrancar al cargar
  startRotation();
})();


/* ══════════════════════════════════════════════════════════
   5. GITHUB LAST COMMIT
   Muestra fecha y hora del último commit público del usuario.
   ══════════════════════════════════════════════════════════ */
(function initGithubLastCommit() {
  const el = document.getElementById('commit');
  if (!el) return;

  const GITHUB_USERNAME = 'coriawork';
  const eventsUrl = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;

  function formatDate(dateString) {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(d);
  }

  async function loadLastCommit() {
    try {
      const response = await fetch(eventsUrl, {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API status ${response.status}`);
      }

      const events = await response.json();
      const lastPush = events.find((event) => event.type === 'PushEvent');

      if (!lastPush || !lastPush.created_at) {
        el.textContent = 'Sin datos';
        return;
      }

      el.textContent = formatDate(lastPush.created_at);

      const repoName = lastPush.repo?.name || 'repositorio';
      el.title = `Ultimo push en ${repoName}`;
    } catch (error) {
      el.textContent = 'No disponible';
      console.error('No se pudo obtener el ultimo commit publico:', error);
    }
  }

  loadLastCommit();
})();
