const { slugize } = require('hexo-util');

hexo.extend.generator.register('category', function (locals) {
  function generateCategory(category) {
    const encodedSlug = slugize(category.name, { transform: 1, encode: true });

    const path = this.config.category_dir + '/' + encodedSlug + '/index.html';

    const posts = category.posts.sort('-date');

    const data = {
      path,
      layout: ['category', 'archive', 'index'],
      data: Object.assign({}, category, {
        page: category,
        posts,
        category: category.name
      })
    };

    return data;
  }

  const result = [];

  locals.categories.each(category => {
    result.push(generateCategory.call(this, category));
  });

  return result;
});