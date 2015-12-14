module.exports = function (grunt) {  
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    less:{
      all:{
        src:"style.less",
        dest:"build/style.css",
        options: {
          report: "gzip"
        }
      }
    },
    connect: {
      serve: {
        options: {
          port: 8080,
          base: "build/",
          hostname: "*",
          debug: true
        }
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      index: {
        files: "index.html",
        tasks: ["copy:index"]
      },
      app : {
        files: "app.js",
        tasks: ["copy:app"]
      },
      less: {
        files: ["style.less"],
        tasks: ["less"]
      }
    },
    copy: {
      index: {
        src: "index.html",
        dest: "build/",
        options: {
          processContent: function (content, srcpath) {
            // Compiling index.html file!
            var packageVersion = require("./package.json").version;
            return grunt.template.process(content, {
              data: {
                version: packageVersion
              }
            });
          }
        }
      },
      app:{
        src: "app.js",
        dest: "build/"
      },
      libs_resources:{
        expand: true,
        src: ["bower_components/animate.css/animate.min.css",
        "bower_components/animateCSS/dist/jquery.animatecss.min.js",
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/angular/angular.min.js"],
        dest: "build/"
      }
    },   
    clean: {
      all: {
        src: ["build/"]
      }
    }
  });
  grunt.registerTask("default", ["clean","less","copy","watch"]);
};
