const displayedContent = document.querySelector("#displayedContent");

displayedContent.focus();
displayedContent.onblur = function () {
	this.focus();
};

displayedContent.oninput = function () {
	//TODO Filter numbers
};

window.addEventListener("keydown", (keyEvent) => {
	const evaluated = evaluate(displayedContent.value);
	const result = isNumber(evaluated) ? round(evaluated) : "---";
	try {
		comand = {
			Enter: () => {
				displayedContent.value = result;
			},
			"=": () => {
				displayedContent.value = result;
			},
		}[`${keyEvent.key}`]();
	} catch (e) {
		return null;
	}
});

function evaluate(expression) {
	//WARNING this function presents security risks
	try {
		if (expression.match(/[a-zA-z&#$<>{}]/g)) throw new Error();
		return new Function(`return (${expression})`)();
	} catch (e) {
		return null;
	}
}

function isNumber(value) {
	if (typeof value === "number") {
		return !isNaN(value) && isFinite(value);
	} else {
		return null;
	}
}

function round(value) {
	return Math.round(value * 100) / 100;
}
