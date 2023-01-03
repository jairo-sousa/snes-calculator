const displayedContent = document.querySelector("#displayedContent");
const joypad = document.getElementById("joypad");

const displayedContentStatus = {
	clearWhenInput: false,
};

joypad.addEventListener("click", (event) => {
	const clickedElement = event.target;
	if (clickedElement.className.includes("key")) {
		inputByClick(clickedElement.innerText);
		filterInput(displayedContent);
	}
	if (clickedElement.className.includes("command")) {
		comandByClick(clickedElement.innerText, displayedContent);
	}
});

displayedContent.focus();
displayedContent.onblur = function () {
	this.focus();
};

displayedContent.oninput = function () {
	filterInput(this);
};

window.addEventListener("keydown", (keyEvent) => {
	try {
		comand = {
			Enter: () => {
				displayedContentStatus.clearWhenInput = displayResult(displayedContent);
			},
			"=": () => {
				displayedContentStatus.clearWhenInput = displayResult(displayedContent);
				console.log(displayedContentStatus.clearWhenInput);
			},
			c: () => {
				clearDisplay(displayedContent);
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

function filterInput(display) {
	const inputValue = display.value.split("").map((char) => {
		if (isNumber(char) || isSpecial(char)) {
			return char;
		} else {
			return null;
		}
	});

	display.value = inputValue.join("").replace(",", ".");

	if (displayedContentStatus.clearWhenInput) {
		display.value = display.value[display.value.length - 1];
		displayedContentStatus.clearWhenInput = false;
	}
}

function inputByClick(text) {
	if (text[1]) {
		text = text[0];
	}
	displayedContent.value += text;
}

function comandByClick(command, display) {
	try {
		commands = {
			C: () => {
				clearDisplay(display);
			},
			"=": () => {
				displayedContentStatus.clearWhenInput = displayResult(display);
			},
		}[`${command}`]();
	} catch (e) {
		console.log(e);
	}
}

function displayResult(display) {
	const evaluated = evaluate(display.value);
	const result = isNumber(evaluated) ? round(evaluated) : "---";
	display.value = result;
	return true;
}

function clearDisplay(display) {
	display.value = "";
}

//bugfix
//TODO bugfix: prevent repetitive dots let containsDot = false

//Improvements
//TODO feat: show preview of results below
//TODO feat: add copy to clipboard buttom
//TODO remove h1 "First release"

//TODO bugfix: resize cross keys to exact visual size
