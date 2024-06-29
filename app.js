class Calculator {
    constructor() {
        this.screen = document.querySelector('.calculator-screen');
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateScreen();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateScreen();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' && operation !== 'sqrt' && operation !== 'sin' && operation !== 'cos' && operation !== 'tan') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        if (operation !== 'sqrt' && operation !== 'sin' && operation !== 'cos' && operation !== 'tan') {
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        } else {
            this.compute();
        }
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) && isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case 'sqrt':
                computation = Math.sqrt(current);
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            case 'sin':
                computation = Math.sin(current);
                break;
            case 'cos':
                computation = Math.cos(current);
                break;
            case 'tan':
                computation = Math.tan(current);
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateScreen();
    }

    updateScreen() {
        this.screen.value = this.currentOperand;
    }

    handleButtonClick(event) {
        const button = event.target;
        const value = button.value;

        if (button.classList.contains('operator')) {
            this.chooseOperation(value);
        } else if (button.classList.contains('all-clear')) {
            this.clear();
        } else if (button.classList.contains('equal-sign')) {
            this.compute();
        } else {
            this.appendNumber(value);
        }
    }
}

const calculator = new Calculator();

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    if (event.target.matches('button')) {
        calculator.handleButtonClick(event);
    }
});
