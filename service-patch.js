(() => {
  // Keep the existing button 4 behavior unchanged.
  const cards = document.querySelectorAll('.rgrid .svc');
  if (cards.length >= 4) {
    const image4 = cards[3].querySelector('.svc-logo');
    if (image4) {
      image4.src = 'https://funvaluetours-acbhdt2xg-konyaalti-tours.vercel.app/assets/button-04-user-image.jpg?v=20260822-2005';
      image4.style.objectFit = 'cover';
      image4.style.objectPosition = 'center';
      image4.style.display = 'block';
    }
  }

  const APARTMENTS_SRC = 'https://funvaluetours-acbhdt2xg-konyaalti-tours.vercel.app/assets/button5-apartments.webp?v=20260822-2210';
  const HAJJ_UMRAH_SRC = 'https://funvaluetours-acbhdt2xg-konyaalti-tours.vercel.app/assets/button12-hajj-umrah.webp?v=20260822-2237';

  function normalizedText(card) {
    return (card?.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function isApartments(card) {
    const text = normalizedText(card);
    return text.includes('الشقق السياحية') || text.includes('apartments') || text.includes('apartment');
  }

  function isVisasResidence(card) {
    const text = normalizedText(card);
    return (
      (text.includes('التأشيرات') && text.includes('الإقامة')) ||
      (text.includes('visa') && text.includes('residen'))
    );
  }

  function isHajjUmrahOrConsultations(card) {
    const text = normalizedText(card);
    return (
      text.includes('الاستشارات') ||
      text.includes('الحج والعمرة') ||
      text.includes('consult') ||
      (text.includes('hajj') && text.includes('umrah'))
    );
  }

  function swapCards(a, b) {
    if (!a || !b || a === b || a.parentNode !== b.parentNode) return false;
    const parent = a.parentNode;
    const marker = document.createTextNode('');
    parent.insertBefore(marker, a);
    parent.insertBefore(a, b);
    parent.insertBefore(b, marker);
    marker.remove();
    return true;
  }

  function swapApartmentsAndVisas() {
    const grid = document.querySelector('.rgrid');
    if (!grid || grid.dataset.apartmentsVisasSwapped === '1') return;

    const serviceCards = [...grid.querySelectorAll('.svc')];
    const apartmentsCard = serviceCards.find(isApartments);
    const visasCard = serviceCards.find(isVisasResidence);
    if (!apartmentsCard || !visasCard) return;

    grid.dataset.apartmentsVisasSwapped = '1';
    swapCards(apartmentsCard, visasCard);
  }

  function setApartmentImage(card) {
    if (!card) return;
    const image = card.querySelector('.svc-logo') || card.querySelector('img');
    if (!image) return;
    if (image.getAttribute('src') === APARTMENTS_SRC) return;
    image.removeAttribute('srcset');
    image.src = APARTMENTS_SRC;
    image.style.objectFit = 'cover';
    image.style.objectPosition = 'center';
    image.style.display = 'block';
  }

  function fixApartments() {
    const serviceCards = [...document.querySelectorAll('.rgrid .svc')];
    for (const card of serviceCards) {
      if (isApartments(card)) setApartmentImage(card);
    }
  }

  function fixHajjUmrah() {
    const serviceCards = [...document.querySelectorAll('.rgrid .svc')];
    const card = serviceCards.find(isHajjUmrahOrConsultations);
    if (!card) return;

    const label = card.querySelector('b');
    if (label && label.textContent.trim() !== 'الحج والعمرة') {
      label.textContent = 'الحج والعمرة';
    }

    const image = card.querySelector('.svc-logo') || card.querySelector('img');
    if (image && image.getAttribute('src') !== HAJJ_UMRAH_SRC) {
      image.removeAttribute('srcset');
      image.src = HAJJ_UMRAH_SRC;
      image.style.objectFit = 'cover';
      image.style.objectPosition = 'center';
      image.style.display = 'block';
    }
  }

  function applyServiceFixes() {
    swapApartmentsAndVisas();
    fixApartments();
    fixHajjUmrah();
  }

  applyServiceFixes();
  setTimeout(applyServiceFixes, 100);
  setTimeout(applyServiceFixes, 500);
  setTimeout(applyServiceFixes, 1500);

  if (document.body) {
    new MutationObserver(applyServiceFixes).observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true
    });
  }
})();
