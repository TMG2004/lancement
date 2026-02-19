
  // ===== TYPED TEXT EFFECT =====
  const words = ['Notre Expertise.', 'Votre Réussite.', 'L\'Innovation.'];
  let wi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typed-text');

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();

  // ===== SCROLL REVEAL =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ===== NAVBAR SCROLL =====
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.padding = window.scrollY > 50 ? '.8rem 6%' : '1.2rem 6%';
  });

  // ===== STAGGER SERVICE CARDS =====
  document.querySelectorAll('.service-card, .offre-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // ===== WHATSAPP INTEGRATION POUR LES OFFRES =====
  const phoneNumber = '237658707119';
  const baseURL = `https://wa.me/${phoneNumber}?text=`;

  function getMessageForPlan(planName) {
    const map = {
      'Pack Académique Essentiel': 'Bonjour, je suis intéressé(e) par le Pack Académique Essentiel (Rapport de stage + Attestation).',
      'Pack Soutenance Complet': 'Bonjour, je suis intéressé(e) par le Pack Soutenance Complet (Rapport + Application).',
      'Pack Application Web/Mobile': 'Bonjour, je suis intéressé(e) par le Pack Application Web/Mobile.',
      'Pack Présentation Pro': 'Bonjour, je suis intéressé(e) par le Pack Présentation Pro (PowerPoint premium).'
    };
    return map[planName] || 'Bonjour, je suis intéressé(e) par une de vos offres. Pouvez-vous me contacter ?';
  }

  document.querySelectorAll('.btn-offre').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.offre-card');
      if (!card) return;

      let planName = card.dataset.plan;
      if (!planName) {
        const nameEl = card.querySelector('.offre-name');
        planName = nameEl ? nameEl.textContent.trim() : '';
      }

      const message = getMessageForPlan(planName);
      const encoded = encodeURIComponent(message);
      window.open(baseURL + encoded, '_blank');
    });
  });

  // ===== GESTION DES LIENS D'ANCRAGE (pour le défilement fluide) =====
  document.querySelectorAll('a[href^="#"]:not(.btn-offre)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
