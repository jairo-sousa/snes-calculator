const displayedContent = document.querySelector("#displayedContent");
const preview = document.querySelector("#preview");
const joypad = document.getElementById("joypad");
const message = document.getElementById("message");
const copyBtn = document.getElementById("copy");

const displayedContentStatus = {
	clearWhenInput: false,
};

copyBtn.onclick = function () {
	if (displayedContent.value) {
		copyFromImput(displayedContent);
		showMessage(message);
	}
};

joypad.addEventListener("click", (event) => {
	const clickedElement = event.target;
	if (clickedElement.className.includes("key")) {
		inputByClick(clickedElement.innerText);
		filterInput(displayedContent);
		preview.value = displayedContent.value;
		displayResult(preview);
	}
	if (clickedElement.className.includes("command")) {
		commandByClick(clickedElement.innerText, displayedContent);
	}
});

displayedContent.focus();
displayedContent.onblur = function () {
	this.focus();
};

displayedContent.oninput = function () {
	filterInput(this);
	preview.value = this.value;
	displayResult(preview);
};

window.addEventListener("keydown", (keyEvent) => {
	try {
		command = {
			Enter: () => {
				displayedContentStatus.clearWhenInput = displayResult(displayedContent);
			},
			"=": () => {
				displayedContentStatus.clearWhenInput = displayResult(displayedContent);
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

function commandByClick(command, display) {
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
	display.value = evaluation(display.value);
	return true;
}

function evaluation(value) {
	const evaluated = evaluate(value);
	const result = isNumber(evaluated) ? round(evaluated) : "---";
	return result;
}

function clearDisplay(display) {
	display.value = "";
}

function copyFromImput(input) {
	hideSelection(input);
	input.select();
	input.setSelectionRange(0, 99999);
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
	hideSelection(input);
}

function hideSelection(element) {
	element.classList.toggle("hideSelection");
}

function showMessage(element) {
	element.classList.toggle("hide");
	setTimeout(() => {
		element.classList.toggle("hide");
	}, 3000);
}
