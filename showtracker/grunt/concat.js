var concat = {
  components: {
    src: [
      'components/angular/angular.js',
      'components/angular-ui-router/release/angular-ui-router.js',
      'components/angular-resource/angular-resource.js',
      'components/angular-alerts/angular-alerts.js',
      'components/angular-alerts/angular-alerts.template.js',
      'components/lodash/lodash.js'
    ],
    dest: 'components/components.js'
  },
  dev: {
    src: [
      '<%= jsPath %>/navbar/navbar_module.js',
      '<%= jsPath %>/navbar/**/*.js',
      '<%= jsPath %>/app/main/main_module.js',
      '<%= jsPath %>/app/main/shows/*js',
      '<%= jsPath %>/app/main/**/*js',
      '<%= jsPath %>/app/templates.js',
      '<%= jsPath %>/app/showtracker_module.js',
      '<%= jsPath %>/app/**/*.js'
    ],
    dest: '<%= jsPath %>/app.js',
  },
};

module.exports = concat;