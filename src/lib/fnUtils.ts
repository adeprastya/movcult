export const debounce = <Fn extends (...args: any[]) => any>(func: Fn, delay: number = 1000) => {
	let timeout: ReturnType<typeof setTimeout>;

	return function (this: any, ...args: Parameters<Fn>) {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			func.call(this, ...args);
		}, delay);
	};
};
