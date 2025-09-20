const card = document.getElementById("card");
const cardInner = document.getElementById("cardInner");

let girando = true; // true = animação rodando

// Clique pausa ou retoma a animação
card.addEventListener("click", () => {
  if (girando) {
    const computed = getComputedStyle(card).transform;
    card.style.animation = "none";
    card.style.transform =
      computed && computed !== "none"
        ? computed
        : "rotateY(0deg) translateY(0px)";
    girando = false;
  } else {
    card.style.animation = "";
    card.style.transform = "";
    cardInner.style.transform = "";
    girando = true;
  }
});

// Inclinação com o mouse quando parado
document.addEventListener("mousemove", (event) => {
  if (girando) return;

  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const offsetX = (event.clientX - centerX) / 10;
  const offsetY = (event.clientY - centerY) / 10;

  const clamp = (v, a) => Math.max(-a, Math.min(a, v));
  const maxAngle = 15;
  const rotateY = clamp(offsetX, maxAngle);
  const rotateX = clamp(-offsetY, maxAngle);

  cardInner.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});

// Quando o mouse sai da carta, ela volta pro centro
card.addEventListener("mouseleave", () => {
  if (!girando) {
    cardInner.style.transform = "rotateY(0deg) rotateX(0deg)";
  }
});
