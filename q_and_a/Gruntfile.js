module.exports = gruntConfig;

function gruntConfig(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsPath: 'public/javascripts',
    componentsPath: 'public/components',
    cssPath: 'public/stylesheets',
    htmlPath: 'public/templates',

    concat: require('./grunt/concat')
    //copy: require('./grunt/copy'),
    //sass: require('./grunt/sass'),
    //ngtemplates: require('./grunt/ngtemplates')

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['concat:components', 'copy:main', 'sass:dev', 'ngtemplates:dev', 'concat:dev']);
}