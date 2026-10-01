import lodashTemplate from 'lodash-es/template';

export const template = (selector) => {
  const raw = document.querySelector(selector).innerHTML;
  return lodashTemplate(raw, { interpolate: /{{([\s\S]+?)}}/g });
}
