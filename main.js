window.onload = function () {
	const displayedNumber = document.querySelector("#displayedNumber");

	displayedNumber.focus();
	displayedNumber.onblur = function () {
		displayedNumber.focus();
	};

	displayedNumber.oninput = function () {
		//TODO Filter numbers
	};

	function evaluate(expression) {
		//WARNING this function presents security risks
		try {
			if (expression.match(/[a-zA-z&#$<>{}]/g)) throw new Error();
			return new Function(`return (${expression})`)();
		} catch (e) {
			return null;
		}
	}
	window.addEventListener("keydown", (keyEvent) => {
		try {
			comand = {
				Enter: () => {
					displayedNumber.value = evaluate(displayedNumber.value);
				},
				"=": () => {
					displayedNumber.value = evaluate(displayedNumber.value);
				},
			}[`${keyEvent.key}`]();
		} catch (e) {
			return null;
		}
	});
};
