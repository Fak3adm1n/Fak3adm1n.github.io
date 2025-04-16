const { encodeURL, escapeHTML, slugize } = require('hexo-util');

hexo.extend.helper.register('list_categories', function (categories, options = {}) {
  if (!categories || !categories.length) return '';

  const { separator = ', ', class: className = '', style = 'list', show_count = true } = options;

  if (style === 'list') {
    return `<ul class="${className}">${categories.map(category => {
      const slug = slugize(category.name, { transform: 1, encode: true });
      const url = this.url_for(this.config.category_dir + '/' + slug + '/');
      return `<li><a href=" ">${escapeHTML(category.name)}</a >${show_count ? `<span class="count">${category.length}</span>` : ''}</li>`;
    }).join('')}</ul>`;
  }

  // style === 'link'
  return categories.map(category => {
    const slug = slugize(category.name, { transform: 1, encode: true });
    const url = this.url_for(this.config.category_dir + '/' + slug + '/');
    return `<a class="${className}" href="${escapeHTML(url)}">${escapeHTML(category.name)}</a >`;
  }).join(separator);
});