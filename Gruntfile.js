module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
    },
    watch: {
      html: {
        files: ['./public/**/*.html'],
        task: [],
      },
      css: {
        files: ['./public/**/*.css'],
        task: [],
      },
      js: {
        files: ['./public/**/*.js'],
        task: []
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%=connect.options.port%>'
      }
    }
  });
  grunt.registerTask('default', ['open', 'watch']);
}