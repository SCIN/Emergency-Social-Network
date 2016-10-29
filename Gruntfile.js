'use strict'

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochacli: {
      all: ['test/*.js'],
    },
    jshint: {
      all: ['Gruntfile.js', 'app.js', 'routes/**/*.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true,
      },
    },
  });

  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('lint', ['jshint']);

};
