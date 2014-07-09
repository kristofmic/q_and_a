module.exports = gruntConfig;

function gruntConfig(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsPath: 'public/javascripts',
    componentsPath: 'public/components',
    cssPath: 'public/stylesheets',
    htmlPath: 'public/templates',

    concat: require('./grunt/concat'),
    //copy: require('./grunt/copy'),
    sass: require('./grunt/sass'),
    ngtemplates: require('./grunt/ngtemplates'),
    bgShell: require('./grunt/bgShell')

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['concat:components', 'ngtemplates:dev', 'concat:dev', 'sass:dev']);

  grunt.registerTask('express', ['bgShell:express']);

  grunt.registerTask('default', ['build', 'express']);
}