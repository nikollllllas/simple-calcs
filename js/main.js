function clearOutput() {
    document.getElementById('output').textContent = ''
}

function appendToOutput(value) {
    document.getElementById('output').textContent += value
}

function calculateResult() {
    const input = document.getElementById('output').textContent

    const operationRegex = /^-?\d+(\.\d+)?(?:[+\-*\/%]-?\d+(\.\d+)?)*$/

    if (!operationRegex.test(input)) {
        document.getElementById('output').textContent = 'Operação inválida'

        return
    }

    try {
        let result = eval(input.replace('%', '/100'))
        document.getElementById('output').textContent = result
    } catch (error) {
        document.getElementById('output').textContent = 'Erro de cálculo'
    }
}