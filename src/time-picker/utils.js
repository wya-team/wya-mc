import { preZero } from '../common/utils';

const create12TimeData = () => {
	let hours = Array.from(new Array(12 + 1).keys()).slice(1).map((it) => ({
		label: preZero(it),
		value: it
	}));
	let minutes = Array.from(new Array(59 + 1).keys()).map((it) => {
		return {
			label: preZero(it),
			value: it
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
		label: preZero(it),
		value: it
	}));
	let minutes = Array.from(new Array(59 + 1).keys()).map((it) => {
		return {
			label: preZero(it),
			value: it
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
		case 'range':
			return [...create24TimeData(), ...create24TimeData()];
		default:
			return [];
	}
};