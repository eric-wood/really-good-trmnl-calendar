export const portraitHack = () => {
  // this shouldn't be necessary but larapaper doesn't seem to set these classes itself, so we will
  if (window.innerHeight > window.innerWidth) {
    document.querySelector(".screen")?.classList.add("screen--portrait");
  }
};

export const deleteFirstHack = () => {
  // stupid hack to render dividers between elements; the first is marked for removal
  const toDelete = document.querySelectorAll(".delete-first")[0];
  toDelete?.remove();
};

export const verticalDivider = () => {
  const divider = document.createElement("div");
  divider.classList.add("divider--v");
  divider.classList.add("delete-first");
  return divider;
};

export const isOverflowingY = (el: HTMLElement) =>
  el.scrollHeight > el.getBoundingClientRect().height;

export const textWrapping = (el: HTMLElement) => {
  const fontSize = parseInt(window.getComputedStyle(el).fontSize, 10);
  const height = el.getBoundingClientRect().height;

  return height > fontSize * 2;
};

export const intersecting = (el1: HTMLElement, el2: HTMLElement) => {
  const bounds1 = el1.getBoundingClientRect();
  const bounds2 = el2.getBoundingClientRect();

  return (
    bounds2.bottom > bounds1.top &&
    bounds2.right > bounds1.left &&
    bounds2.top < bounds1.bottom &&
    bounds2.left < bounds1.right
  );
};
