import moment from 'moment'

export default function (fieldValue) {
    if (!fieldValue) return false

    this.emptyValidationMessages()

    if (!this.isValidPattern(fieldValue)) {
        this.handleValidationResult(false, 'date-pattern')

        return false
    }

    const splitDate = fieldValue.split('/')

    if (splitDate.length) {
        const providedDate = [splitDate[2], splitDate[1], splitDate[0]].join('-')

        if (parseInt(splitDate[0]) > 31 || parseInt(splitDate[0]) === 0) {
            this.handleValidationResult(false, 'date-pattern', 'Dia inválido')

            return false
        }

        if (parseInt(splitDate[1]) > 12 || parseInt(splitDate[1]) === 0) {
            this.handleValidationResult(false, 'date-pattern', 'Mês inválido')

            return false
        }

        if (parseInt(splitDate[2]) < 1890) {
            this.handleValidationResult(false, 'date-pattern', 'A data deve ser maior que 1890')

            return false
        }

        if (moment(providedDate).isAfter(moment().format('YYYY-MM-DD'))) {
            this.handleValidationResult(false, 'date-pattern', 'A data não deve ser maior que hoje')

            return false
        }

        return true
    }

    return false
}
