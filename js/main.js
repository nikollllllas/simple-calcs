function clearOutput() {
    document.getElementById('output').textContent = ''
}

function appendToOutput(value) {
    document.getElementById('output').textContent += value
}

function calculateResult() {
    const operationRegex = /^-?\d+(\.\d+)?(?:[+\-*\/%]-?\d+(\.\d+)?)*$/
    const input = document.getElementById('output').textContent

    if (!operationRegex.test(input)) {
        document.getElementById('output').textContent = 'Operação inválida'

        return
    }

    let result
    
    try {
        result = evaluateExpression(input)
        document.getElementById('output').textContent = result
    } catch (error) {
        document.getElementById('output').textContent = 'Erro de cálculo'
    }
}

function evaluateExpression(expression) {
    let result = 0
    let currentOperator = null

    const tokens = expression.match(/(-?\d+(\.\d+)?|[+\-*\/%])/g)

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]

        if (isNumber(token)) {
            const number = parseFloat(token)

            if (currentOperator === null) {
                result = number
            } else {
                result = applyOperator(result, currentOperator, number)
            }
        } else {
            currentOperator = token
        }
    }

    return result
}

function isNumber(token) {
    return !isNaN(parseFloat(token)) && isFinite(token)
}

function applyOperator(operand1, operator, operand2) {
    switch (operator) {
        case '+':
            return operand1 + operand2
        case '-':
            return operand1 - operand2
        case '*':
            return operand1 * operand2
        case '/':
            if (operand2 === 0) {
                throw new Error('Divisão por zero')
            }
            return operand1 / operand2
        case '%':
            return operand1 * (operand2 / 100)
        default:
            throw new Error('Operador inválido')
    }
}