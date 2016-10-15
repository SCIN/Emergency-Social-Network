'use strict'

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochacli: {
      all: ['test/*.js'],
    },
  });

  grunt.loadNpmTasks('grunt-mocha-cli');

  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('test', ['mochacli']);

};
