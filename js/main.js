function clearOutput() {
    document.getElementById('output').textContent = '' 
}

function printToOutput(value) {
    document.getElementById('output').textContent += value 
}

function deleteLastCharacter() {
    const output = document.getElementById('output') 
    const currentContent = output.textContent 

    if (currentContent.length > 0) {
        output.textContent = currentContent.slice(0, -1) 
    }
}

function calculateResult() {
    const input = document.getElementById('output').textContent 
    const operationRegex = /^-?\d+(\.\d+)?(?:[+\-*\/%]-?\d+(\.\d+)?)*$/ 

    if (!operationRegex.test(input)) {
        document.getElementById('output').textContent = 'Operação inválida' 
        return 
    }

    let result 
    try {
        const modifiedInput = input.replace(/(\d+(\.\d+)?)%/g, (match, number) => {
            return parseFloat(number) / 100 
        }) 
        result = eval(modifiedInput) 
        document.getElementById('output').textContent = result 
    } catch (error) {
        document.getElementById('output').textContent = 'Erro de cálculo' 
    }
}