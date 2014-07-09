module.exports = {
  components: {
    src: [
      '<%= componentsPath %>/angular/angular.min.js',
      '<%= componentsPath %>/angular-ui-router/release/angular-ui-router.min.js'
    ],
    dest: '<%= jsPath %>/components.js'
  },
  dev: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/app/states/states_config.js',
      '<%= jsPath %>/app/states/*.js',
      '<%= jsPath %>/app/nav/nav_module.js',
      '<%= jsPath %>/app/nav/*.js',
      '<%= jsPath %>/app/qas/qas_module.js',
      '<%= jsPath %>/app/qas/*.js',
      '<%= jsPath %>/app/edit/edit_module.js',
      '<%= jsPath %>/app/edit/*.js',
      '<%= jsPath %>/app/list/list_module.js',
      '<%= jsPath %>/app/list/*.js',
      '<%= jsPath %>/app/templates_module.js',
      '<%= jsPath %>/app/main_module.js',
      '<%= jsPath %>/app/**/*.js',
    ],
    dest: '<%= jsPath %>/app.js'
  }
};