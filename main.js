window.onload = function () {
	const displayedNumber = document.querySelector("#displayedNumber");

	displayedNumber.focus();
	displayedNumber.onblur = function () {
		displayedNumber.focus();
	};
};
