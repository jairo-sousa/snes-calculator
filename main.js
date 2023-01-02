const displayedContent = document.querySelector("#displayedContent");
const joypad = document.getElementById("joypad");

let clearWhenInput = false;

joypad.addEventListener("click", (event) => {
	const clickedElement = event.target;
	if (clickedElement.className.includes("key")) {
		inputByClick(clickedElement.innerText);
	}
	if (clickedElement.className.includes("command")) {
		clearWhenInput = comandByClick(clickedElement.innerText, displayedContent);
	}
});

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

	this.value = inputValue.join("").replace(",", ".");
	if (clearWhenInput) {
		this.value = this.value[this.value.length - 1];
		clearWhenInput = false;
	}
};

window.addEventListener("keydown", (keyEvent) => {
	try {
		comand = {
			Enter: () => {
				clearWhenInput = displayResult(displayedContent);
			},
			"=": () => {
				clearWhenInput = displayResult(displayedContent);
			},
			c: () => {
				clearDisplay();
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
				clearDisplay();
			},
			"=": () => {
				return displayResult(display);
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

function clearDisplay() {
	displayedContent.value = "";
}

//bugfix
//TODO bugfix: evaluate by click =

//TODO bugfix: prevent repetitive dots let containsDot = false
//TODO bugfix: resize keys to exact visual size

//Improvements
//TODO feat: show preview of results below
//TODO feat: add copy to clipboard buttom
//TODO remove h1 "First release"
