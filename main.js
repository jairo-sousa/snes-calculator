const displayedContent = document.querySelector("#displayedContent");

displayedContent.focus();
displayedContent.onblur = function () {
	this.focus();
};

displayedContent.oninput = function () {
	const inputValue = displayedContent.value.split("").map((char) => {
		if (isNumber(char) || isSpecial(char)) {
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
				// waitNewExpression()
			},
			"=": () => {
				displayedContent.value = result;
				// waitNewExpression()
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

function isSpecial(value) {
	try {
		Special = {
			"+": "+",
			"-": "-",
			"*": "*",
			"/": "/",
			".": ".",
			",": ",",
		}[value];
		return Special;
	} catch {
		return null;
	}
}

function round(value) {
	return Math.round(value * 100) / 100;
}

//TODO replace , for .
//TODO clear input before new expressions
// waitNewExpression(){ whe type any so:  clearInput()}

//TODO accept entry from clicked buttons in front end
//TODO show preview of results below
//TODO add copy to clipboard buttom
