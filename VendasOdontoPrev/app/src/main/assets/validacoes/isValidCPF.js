export default function (fieldValue) {
    /* eslint-disable */
    if (!fieldValue) return true

    const cpf = fieldValue.replace(/\D+/g, '')
    let sum
    let module
    let errors

    errors = []
    sum = 0

    for (let i = 0; i <= 9; i++) {
        if (cpf == i.toString().padEnd(11, i)) errors.push(this.validationMessages.cpf)
    }

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    module = (sum * 10) % 11

    if ((module == 10) || (module == 11)) module = 0
    if (module != parseInt(cpf.substring(9, 10))) errors.push(this.validationMessages.cpf)

    sum = 0
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    module = (sum * 10) % 11

    if ((module == 10) || (module == 11)) module = 0
    if (module != parseInt(cpf.substring(10, 11))) errors.push(this.validationMessages.cpf)

    if (errors.length) {
        return false
    }

    return true
    /* eslint-enable */
}
