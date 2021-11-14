var buttons = document.querySelectorAll('span');
var operators = ['+', '-', 'x', '÷'];
var decimalButtonState = false;

for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(preventPageChange) {
        var display = document.querySelector('.display');
        var inputVal = display.innerHTML;
        var btnVal = this.innerHTML;

        if (btnVal == 'C') {
            display.innerHTML = '';
            decimalButtonState = false;
        } else if (btnVal == '=') {
            var equation = inputVal;
            var lastChar = equation[equation.length - 1];

            equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

            if (operators.indexOf(lastChar) > -1 || lastChar == '.')
                equation = equation.replace(/.$/, '');

            if (equation)
                display.innerHTML = eval(equation);

            decimalButtonState = false;
        } else if (operators.indexOf(btnVal) > -1) {
            var lastChar = inputVal[inputVal.length - 1];

            if (inputVal != '' && operators.indexOf(lastChar) == -1)
                display.innerHTML += btnVal;

            else if (inputVal == '' && btnVal == '-')
                display.innerHTML += btnVal;


            if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                display.innerHTML = inputVal.replace(/.$/, btnVal);
            }

            decimalButtonState = false;
        } else if (btnVal == '.') {
            if (!decimalButtonState) {
                display.innerHTML += btnVal;
                decimalButtonState = true;
            }
        } else {
            display.innerHTML += btnVal;
        }

        // prevent page jumps
        preventPageChange.preventDefault();
    }
}