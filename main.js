// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger for grid children
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((el, index) => {
  // Add staggered delay for siblings
  const parent = el.parentElement;
  const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
  const sibIndex = siblings.indexOf(el);
  el.dataset.delay = sibIndex * 80;
  revealObserver.observe(el);
});

// ===========================
// WHATSAPP – HIDRÁULICA
// ===========================
function enviarHidraulica(e) {
  e.preventDefault();
  const nome = document.getElementById('h-nome').value.trim();
  const tel = document.getElementById('h-tel').value.trim();
  const veiculo = document.getElementById('h-veiculo').value.trim();
  const servico = document.getElementById('h-servico').value;
  const problema = document.getElementById('h-problema').value.trim();

  const msg = `Olá, preciso de um orçamento para manutenção da caixa de direção ou bomba hidráulica.

*Nome:* ${nome}
*Telefone:* ${tel}
*Veículo:* ${veiculo}
*Serviço:* ${servico}
*Problema:* ${problema}`;

  const url = `https://wa.me/554736356506?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ===========================
// WHATSAPP – ELÉTRICA
// ===========================
function enviarEletrica(e) {
  e.preventDefault();
  const nome = document.getElementById('e-nome').value.trim();
  const tel = document.getElementById('e-tel').value.trim();
  const modelo = document.getElementById('e-modelo').value.trim();
  const ano = document.getElementById('e-ano').value.trim();
  const problema = document.getElementById('e-problema').value.trim();
  const luzes = document.querySelector('input[name="luzes"]:checked')?.value || 'Não informado';

  const msg = `Olá, desejo agendar um serviço de direção elétrica para o meu veículo.

*Nome:* ${nome}
*Telefone:* ${tel}
*Veículo:* ${modelo} (${ano})
*Problema:* ${problema}
*Luz no painel:* ${luzes}`;

  const url = `https://wa.me/554792314472?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = duration / 60;
  const increment = target / (duration / (1000 / 60));
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = (target >= 1000 ? (start / 1000).toFixed(0) + 'k' : Math.floor(start)) + suffix;
  }, step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.stat-number');
      const data = [
        { target: 15, suffix: '+' },
        { target: 5000, suffix: '+' },
        { target: 98, suffix: '%' },
        { target: 2, suffix: '' }
      ];
      cards.forEach((card, i) => {
        const d = data[i];
        if (d) animateCounter(card, d.target, d.suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsEl = document.querySelector('.espec-stats');
if (statsEl) statsObserver.observe(statsEl);
