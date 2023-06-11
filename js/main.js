function clearOutput() {
    document.getElementById('output').innerHTML = '' 
}

function printToOutput(value) {
    document.getElementById('output').innerHTML += value 
}

function deleteLastCharacter() {
    const output = document.getElementById('output') 
    const currentContent = output.innerHTML 

    if (currentContent.length > 0) {
        output.innerHTML = currentContent.slice(0, -1) 
    }
}

function calculateResult() {
    const output = document.getElementById("output");
    const expression = output.innerHTML;

    const regex = /^(\d+(\.\d+)?)([\+\-\*\/%]?)(\d+(\.\d+)?%?)$/;

    if (regex.test(expression)) {
        try {
            let result = expression;

            while (result.includes("%")) {
                const percentIndex = result.indexOf("%");
                const numberIndex = result.lastIndexOf(/[+\-*\/]/, percentIndex);

                const number = parseFloat(result.substring(numberIndex + 1, percentIndex));
                const percent = parseFloat(result.substring(percentIndex + 1, result.length - 1));

                const calculatedValue = number * (percent / 100);
                result = result.substring(0, numberIndex + 1) + calculatedValue + result.substring(result.length - 1);
                console.log('Fez a operação')
            }

            const finalResult = eval(result);

            if (finalResult === Infinity) {
                alert("Divisão por zero não é permitida!");
                clearOutput();
            } else {
                output.innerHTML = finalResult;
            }
        } catch (error) {
            alert("Ocorreu um erro ao calcular a expressão!");
            clearOutput();
        }
    } else {
        alert("Operação inválida!");
        clearOutput();
    }
}