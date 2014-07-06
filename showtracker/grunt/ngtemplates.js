var ngtemplates = {
  dev: {
    src: [
      '<%= htmlPath %>/**/*.html'
    ],
    dest: '<%= jsPath %>/app/templates.js',
    options: {
      module: 'ch.Templates',
      standalone: true,
      htmlmin: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true
      },
      url: function(url) {
        var
          urlArr = url.split('/');

        return urlArr[urlArr.length-1];
      }
    }
  }
}

module.exports = ngtemplates;