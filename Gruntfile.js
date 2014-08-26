'use strict';

module.exports = function(grunt) {
  //Default config
  grunt.initConfig({
    mandrilltemplate: {
      server: {
          src: ['output/*.html'],
          filter: 'isFile',
          options: {
              key: '',
              from_email: '',
              from_name: '',
              subject: '',
              text: '',
              publish: true,
              labels: ['autogen']
          }
      }
  })
  //
  grunt.loadTasks('tasks');
};
