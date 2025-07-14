export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const burger = document.querySelector('.navbar__burger');
  if (!navbar || !burger) return;

  burger.addEventListener('click', () => {
    navbar.classList.toggle('navbar--mobile-open');
  });

  // При клике вне меню — закрывать
  document.addEventListener('click', (e) => {
    if (
      navbar.classList.contains('navbar--mobile-open') &&
      !navbar.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      navbar.classList.remove('navbar--mobile-open');
    }
  });
} 