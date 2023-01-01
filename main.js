const displayedContent = document.querySelector("#displayedContent");

displayedContent.focus();
displayedContent.onblur = function () {
	this.focus();
};

displayedContent.oninput = function () {
	const inputValue = displayedContent.value.split("").map((char) => {
		if (isNumber(char) || isOperator(char)) {
			return char;
		} else {
			return null;
		}
	});

	this.value = inputValue.join("");
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
	//WARNING this function presents security risks,
	//but it's not for production so let's leave it like that...
	try {
		if (expression.match(/[a-zA-z&#$<>{}]/g)) throw new Error();
		return new Function(`return (${expression})`)();
	} catch (e) {
		return null;
	}
}

function isNumber(value) {
	if (typeof parseInt(value) === "number") {
		return !isNaN(value) && isFinite(value);
	} else {
		return null;
	}
}

function isOperator(value) {
	try {
		operator = {
			"+": "+",
			"-": "-",
			"*": "*",
			"/": "/",
		}[value];
		return operator;
	} catch {
		return null;
	}
}

function round(value) {
	return Math.round(value * 100) / 100;
}
