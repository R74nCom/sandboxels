function getRandomSize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeall() {
  const elements = document.querySelectorAll('*');

  elements.forEach(element => {
    const randomFontSize = getRandomSize(1, 150);
    element.style.fontSize = `${randomFontSize}px`;

    if (element.offsetWidth > 0 && element.offsetHeight > 0) {
      const randomWidth = getRandomSize(1, 500);
      const randomHeight = getRandomSize(1, 500);
      element.style.width = `${randomWidth}px`;
      element.style.height = `${randomHeight}px`;
    }

    if (window.getComputedStyle(element).position === 'absolute' || window.getComputedStyle(element).position === 'relative') {
      const randomTop = getRandomSize(1, window.innerHeight - 1);
      const randomLeft = getRandomSize(1, window.innerWidth - 1);
      element.style.position = 'absolute';
      element.style.top = `${randomTop}px`;
      element.style.left = `${randomLeft}px`;
    }

    const randomRotation = getRandomSize(-360, 360);
    element.style.transform = `rotate(${randomRotation}deg)`;
  });
}

setTimeout(randomizeall, 15000);