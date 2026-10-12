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
