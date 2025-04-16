const { slugize } = require('hexo-util');
hexo.extend.filter.register('before_post_render', data => {
if (data.tags && data.tags.length) {
		      data.tags = data.tags.map(tag => {
			            tag.slug = slugize(tag.name, { transform: 1, encode: true });
			            return tag;
			          });
		    }
	  if (data.categories && data.categories.length) {
		      data.categories = data.categories.map(cat => {
			            cat.slug = slugize(cat.name, { transform: 1, encode: true });
			            return cat;
			          });
		    }
	  return data;
});
