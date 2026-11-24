const container = document.querySelector('.scroll-container');
const title = document.querySelector('.title');
const bread = document.querySelector('.bread-img');
const labels = document.querySelectorAll('.label');

window.addEventListener('scroll', () => {
  // Obliczamy postęp scrollowania wewnątrz sekcji (od 0 do 1)
  const rect = container.getBoundingClientRect();
  const maxScroll = rect.height - window.innerHeight;
  const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);

  // Faza 1 (0.0 -> 0.65): Tytuł znika, chleb jedzie z dołu (42vh) na środek (0vh)
  const moveProgress = Math.min(progress / 0.65, 1);
  bread.style.transform = `translateY(${42 * (1 - moveProgress)}vh)`;
  
  title.style.opacity = 1 - (moveProgress * 1.5);
  title.style.transform = `translateY(${-moveProgress * 40}px)`;

  // Faza 2 (0.65 -> 1.0): Pojawiają się napisy dookoła
  const textProgress = Math.max((progress - 0.65) / 0.35, 0);
  labels.forEach((label, index) => {
    // Lekkie opóźnienie dla każdego kolejnego napisu
    const delay = index * 0.15;
    const opacity = Math.min(Math.max((textProgress - delay) / 0.4, 0), 1);
    label.style.opacity = opacity;
  });
});