const { slugize } = require('hexo-util');

hexo.extend.generator.register('tag', function (locals) {
  return locals.tags.map(tag => {
    const encodedSlug = slugize(tag.name, { transform: 1, encode: true });

    const path = this.config.tag_dir + '/' + encodedSlug + '/index.html';

    return {
      path,
      layout: ['tag', 'archive', 'index'],
      data: Object.assign({}, tag, {
        page: tag,
        current: tag.name,
        posts: tag.posts.sort('-date'),
        tag: tag.name
      })
    };
  });
});