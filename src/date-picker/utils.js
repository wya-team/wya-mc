
const getYearArray = (minYear, maxYear) => {
	return Array.from(new Array(maxYear + 1).keys()).slice(minYear).map((it) => ({
		label: `${it}年`,
		value: it
	}));
};
const getMonthArray = () => {
	return Array.from(new Array(12 + 1).keys()).slice(1).map((it) => ({
		label: `${it}月`,
		value: it
	}));
};
const getQuarterArray = () => {
	return Array.from(new Array(4 + 1).keys()).slice(1).map((it) => ({
		label: `第${it}季度`,
		value: it
	}));
};
const getDayArray = (day) => {
	return Array.from(new Array(day + 1).keys()).slice(1).map((it) => ({
		label: `${it}日`,
		value: it
	}));
};

const createDateData = (minDate, maxDate) => {
	const minYear = minDate.getFullYear();
	const maxYear = maxDate.getFullYear();
	let yearArray = getYearArray(minYear, maxYear);
	let monthArray = getMonthArray();
	let dayArray = getDayArray(31);
	return [yearArray, monthArray, dayArray];
};
const createMonthData = (minDate, maxDate) => {
	const minYear = minDate.getFullYear();
	const maxYear = maxDate.getFullYear();
	let yearArray = getYearArray(minYear, maxYear);
	let monthArray = getMonthArray();
	return [yearArray, monthArray];
};
const createQuarterData = (minDate, maxDate) => {
	const minYear = minDate.getFullYear();
	const maxYear = maxDate.getFullYear();
	let yearArray = getYearArray(minYear, maxYear);
	let quarterArray = getQuarterArray();
	return [yearArray, quarterArray];
};
const createTimeData = () => {};

export const createDataSource = (mode, opts = {}) => {
	const { minDate, maxDate } = opts;
	if (!(minDate instanceof Date)) {
		throw new Error('【@wya/mc date-picker】minDate不是Date类型');
	}
	if (!(maxDate instanceof Date)) {
		throw new Error('【@wya/mc date-picker】maxDate不是Date类型');
	}
	switch (mode) {
		case 'date':
			return createDateData(minDate, maxDate);
		case 'quarter':
			return createQuarterData(minDate, maxDate);
		case 'month':
			return createMonthData(minDate, maxDate);
		case 'time':
			return [];
		default:
			return [];
	}
};

export const DAYS_MAP = {
	28: getDayArray(28),
	29: getDayArray(29),
	30: getDayArray(30),
	31: getDayArray(31),
};