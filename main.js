window.onload = function () {
	const displayedContent = document.querySelector("#displayedContent");

	displayedContent.focus();
	displayedContent.onblur = function () {
		displayedContent.focus();
	};

	displayedContent.oninput = function () {
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
					displayedContent.value = evaluate(displayedContent.value);
				},
				"=": () => {
					displayedContent.value = evaluate(displayedContent.value);
				},
			}[`${keyEvent.key}`]();
		} catch (e) {
			return null;
		}
	});
};
