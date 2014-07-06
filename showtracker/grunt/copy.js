var copy = {
  main: {
    files: [
      { expand: true, flatten: true, src: ['components/bootstrap/dist/fonts/*'], dest: 'public/fonts/' },
      { expand: true, flatten: true, src: ['components/components.js'], dest: '<%= jsPath %>/' }
    ]
  }
};

module.exports = copy;