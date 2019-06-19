module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n',
        sourceMap: true
      },
      dist: {
        src: ['js/src/Utils.js','js/src/Constants.js','js/src/MovingObject.js','js/src/*.js','js/src/Table.js','js/start.js'],
        dest: 'js/dist/<%= pkg.name %>.js'
      }
    },
    watch: {
      scripts: {
        files: ['js/src/*.js','js/start.js'],
        tasks: ['concat'],
        options: {
          atBegin: true
        }
      }
    },
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
  });

  // Load uglify task
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load concat task
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load watch task
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['watch']);

};
