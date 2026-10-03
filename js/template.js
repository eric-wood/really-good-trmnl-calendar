import lodashTemplate from 'lodash-es/template';

export const template = (selector) => {
  const raw = document.querySelector(selector).innerHTML;
  const compiled = lodashTemplate(raw, { interpolate: /{{([\s\S]+?)}}/g });

  return (...args) => {
    const html = compiled(...args);
    const container = document.createElement('div');
    container.innerHTML = html;

    return container.children[0];
  };
}
