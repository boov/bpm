type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const clear = (event: Event) => {
  const field = event.target as Field;
  if (field.dataset?.error) field.setCustomValidity("");
};

export const installValidationMessages = (root: Document) => {
  root.addEventListener(
    "invalid",
    event => {
      const field = event.target as Field;
      if (field.dataset.error) field.setCustomValidity(field.dataset.error);
    },
    true
  );
  root.addEventListener("input", clear, true);
  root.addEventListener("change", clear, true);
};
