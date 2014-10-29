module.exports = function(grunt)
{
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			docs: {
				options: {
					base: 'docs',
					livereload: true,
					port: 4004
				}
			}
		},

		phpcs: {
			tests: {
				dir: ['src/**/*.php', 'tests/**/*.php'],
				options: {
					bin: 'vendor/bin/phpcs',
					standard: 'psr2'
				}
			}
		},

		phpdocumentor: {
			src: {
				options: {
					directory: 'src/',
					target: 'docs'
				}
			}
		},

		phpunit: {
			tests: {
				options: {
					bin: 'vendor/bin/phpunit'
				}
			}
		},

		watch: {
			config: {
				files: 'Gruntfile.js',
				options: {
					reload: true
				}
			},

			src: {
				files: 'src/**/*.php',
				tasks: ['test', 'docs'],
				options: {
					livereload: true
				}
			},

			tests: {
				files: 'tests/**/*.php',
				tasks: ['test'],
				options: {
					reload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-phpcs');
	grunt.loadNpmTasks('grunt-phpdocumentor');
	grunt.loadNpmTasks('grunt-phpunit');

	grunt.registerTask('default', ['connect', 'watch']);

	grunt.registerTask('test', ['phpunit:tests', 'phpcs:tests']);
	grunt.registerTask('docs', ['phpdocumentor:src']);
};