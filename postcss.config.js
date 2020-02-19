module.exports = {
	plugins: {
		autoprefixer: {
			browsers: [
				'iOS >= 8',
				'Android >= 4.1'
			]
		},
		cssnano: {
			preset: 'default'
		}
	}
};
