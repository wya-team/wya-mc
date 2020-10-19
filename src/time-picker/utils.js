const create12TimeData = () => {
	let hours = Array.from(new Array(12 + 1).keys()).slice(1).map((it) => ({
		label: it >= 10 ? `${it}` : `0${it}`,
		value: it
	}));
	let minutes = Array.from(new Array(59 + 1).keys()).map((it) => {
		let minute = it >= 10 ? `${it}` : `0${it}`;
		return {
			label: minute,
			value: minute
		};
	});
	let timeQuantums = [
		{ label: '上午', value: 1 },
		{ label: '下午', value: 2 }
	];
	return [timeQuantums, hours, minutes];
};

const create24TimeData = () => {
	let hours = Array.from(new Array(23 + 1).keys()).map((it) => ({
		label: it >= 10 ? `${it}` : `0${it}`,
		value: it
	}));
	let minutes = Array.from(new Array(59 + 1).keys()).map((it) => {
		let minute = it >= 10 ? `${it}` : `0${it}`;
		return {
			label: minute,
			value: minute
		};
	});
	return [hours, minutes];
};

export const createDataSource = (mode, opts = {}) => {
	// const { minDate, maxDate } = opts;
	
	switch (mode) {
		case '12':
			return create12TimeData();
		case '24':
			return create24TimeData();
		default:
			return [];
	}
};