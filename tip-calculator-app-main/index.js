function TipCalculator() {
    const mostrarCalculoTipAmount = document.getElementById('mostrarTipAmount');
    const mostrarCalculoTotalAmount = document.getElementById('mostrarTotalAmount');
    const numeroPessoas = document.getElementById('people');
    const resetButton = document.getElementById('resetButton');
    const calcularButton = document.getElementById('calcularButton');
    const customTip = document.getElementById('custom');
    this.billAmount = document.getElementById('bill');

    let selectedTipButton = null;

    const captureTipPercentage = () => {
        document.addEventListener('click', event => {
            const el = event.target;
            if (el.classList.contains('porcentagemButton')) {
                if (selectedTipButton) {
                    selectedTipButton.classList.remove('selected');
                } else if (customTip.value !== '') {
                    customTip.value = '';
                }

                selectedTipButton = el;
                selectedTipButton.classList.add('selected');
            }
        });
    };

    const captureTipPercentageCustom = () => {
        customTip.addEventListener('input', () => {
            if (selectedTipButton) {
                selectedTipButton.classList.remove('selected');
            }
            selectedTipButton = null;
        });
    }

    const calculateTip = () => {
        if (selectedTipButton) {
            const tipPercentage = parseFloat(selectedTipButton.value) / 100;
            const numPeople = parseFloat(numeroPessoas.value);
            const bill = parseFloat(this.billAmount.value) / numPeople;

            if (isNaN(bill) || bill <= 0) {
                alert('Por favor, insira um valor válido para o valor da conta.');
                return;
            } else if (isNaN(numPeople) || numPeople <= 0 || numPeople === '') {
                alert('Por favor, insira um valor válido para o número de pessoas.');
                return;
            }

            const tipAmount = (bill * tipPercentage);
            const totalAmount = (bill + tipAmount);

            mostrarCalculoTipAmount.innerHTML = `R$${tipAmount.toFixed(2)}`;
            mostrarCalculoTotalAmount.innerHTML = `R$${totalAmount.toFixed(2)}`;
        } else if (customTip.value !== '') {
            const tipPercentage = parseFloat(customTip.value) / 100;
            const numPeople = parseFloat(numeroPessoas.value);
            const bill = parseFloat(this.billAmount.value) / numPeople;

            if (isNaN(bill) || bill <= 0) {
                alert('Por favor, insira um valor válido para o valor da conta.');
                return;
            } else if (isNaN(numPeople) || numPeople <= 0 || numPeople === '') {
                alert('Por favor, insira um valor válido para o número de pessoas.');
                return;
            } else if (isNaN(tipPercentage) || tipPercentage <= 0) {
                alert('Por favor, insira um valor válido para a porcentagem da gorjeta.');
                return;
            }

            const tipAmount = (bill * tipPercentage);
            const totalAmount = (bill + tipAmount);

            mostrarCalculoTipAmount.innerHTML = `R$${tipAmount.toFixed(2)}`;
            mostrarCalculoTotalAmount.innerHTML = `R$${totalAmount.toFixed(2)}`;
        }
    };

    const resetValues = () => {
        if (selectedTipButton) {
            selectedTipButton.classList.remove('selected');
        }
        selectedTipButton = null;

        mostrarCalculoTipAmount.innerHTML = 'R$0.00';
        mostrarCalculoTotalAmount.innerHTML = 'R$0.00';
        customTip.value = '';
        this.billAmount.value = '';
        numeroPessoas.value = '';
    };

    calcularButton.addEventListener('click', calculateTip);
    resetButton.addEventListener('click', resetValues);

    captureTipPercentage();
    captureTipPercentageCustom();
}

const calculator = new TipCalculator();
