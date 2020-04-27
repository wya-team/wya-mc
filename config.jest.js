module.exports = {
	testPathIgnorePatterns: [
		'/node_modules/',
	],
	collectCoverage: true,
	collectCoverageFrom: [
		'lib/**/*.{js, wxss, wxml, json}',
	],
}