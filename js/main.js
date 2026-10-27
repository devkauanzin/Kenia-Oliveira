/* ===== Clínica Kênia Oliveira — interações ===== */

// Configurações centrais: altere aqui e todos os links do site são atualizados.
const CONFIG = {
  whatsapp: '5537999677573', // DDI + DDD + número, só dígitos
  bookingUrl: 'https://keniaoliveira.jareservei.com/',
  greeting: 'Olá! Vim pelo site da Clínica Kênia Oliveira e gostaria de saber mais sobre o tratamento de melasma.'
};

function waUrl(text) {
  return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text);
}

document.addEventListener('DOMContentLoaded', () => {
  // Links de agendamento e WhatsApp
  document.querySelectorAll('[data-booking]').forEach((a) => { a.href = CONFIG.bookingUrl; });
  document.querySelectorAll('[data-whatsapp]').forEach((a) => { a.href = waUrl(CONFIG.greeting); });

  // Ano do rodapé
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Menu móvel
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('menu-movel');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileNav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Dúvidas: mantém só uma resposta aberta por vez
  const faqs = document.querySelectorAll('.faq details');
  faqs.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));

  // Entrada suave das seções
  const reveals = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  // Formulário → WhatsApp
  const form = document.getElementById('lead-form');
  const success = document.getElementById('lead-success');
  const nome = document.getElementById('f-nome');
  const tel = document.getElementById('f-tel');
  const motivo = document.getElementById('f-motivo');
  const lgpd = document.getElementById('f-lgpd');

  const showError = (input, errId, invalid) => {
    input.setAttribute('aria-invalid', String(invalid));
    document.getElementById(errId).hidden = !invalid;
  };

  // Máscara simples de telefone: (37) 99999-9999
  tel.addEventListener('input', () => {
    const d = tel.value.replace(/\D/g, '').slice(0, 11);
    let out = d;
    if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 7) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
    tel.value = out;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const digits = tel.value.replace(/\D/g, '');
    const errName = nome.value.trim().length < 2;
    const errPhone = digits.length < 10 || digits.length > 11;
    const errConsent = !lgpd.checked;

    showError(nome, 'f-nome-err', errName);
    showError(tel, 'f-tel-err', errPhone);
    showError(lgpd, 'f-lgpd-err', errConsent);

    if (errName) return nome.focus();
    if (errPhone) return tel.focus();
    if (errConsent) return lgpd.focus();

    const firstName = nome.value.trim();
    const message = 'Olá! Sou ' + firstName + ' e vim pelo site da Clínica Kênia Oliveira. ' +
      'Assunto: ' + motivo.value + '. Gostaria de saber como agendar minha avaliação. ' +
      'Meu WhatsApp: ' + tel.value;
    const link = waUrl(message);

    document.getElementById('success-title').textContent = 'Tudo pronto, ' + firstName + '.';
    document.getElementById('success-link').href = link;
    form.hidden = true;
    success.hidden = false;
    success.querySelector('h3').focus?.();

    window.open(link, '_blank', 'noopener');
  });

  document.getElementById('success-edit').addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
    nome.focus();
  });
});
