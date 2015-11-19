exports.config = {
	specs: [
		'./e2e/**/*.spec.js'
	],

	baseUrl: 'http://localhost:3000',

	chromeOnly: false,
  	capabilities: {
    'browserName': 'chrome'
  },
}