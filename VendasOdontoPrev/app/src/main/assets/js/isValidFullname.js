function isValidFullname(fieldValue) {
    if (!fieldValue) return false

    this.emptyValidationMessages()

    if (fieldValue.match(/\d+/g)) {
        this.handleValidationResult(false, 'numbers', this.validationMessages.fullname.numbers)

        return false
    }
    else {
        this.handleValidationResult(true, 'numbers')
    }

    if (fieldValue.match(/\.+/g)) {
        this.handleValidationResult(false, 'dots', this.validationMessages.fullname.dots)

        return false
    }
    else {
        this.handleValidationResult(true, 'dots')
    }

    const splitValue = fieldValue.split(' ')

    let incompleteNameErrors = []

    splitValue.forEach((v, k) => {
        if (k <= 1 && !v.length) {
            incompleteNameErrors.push(v)
        }
    })

    if (incompleteNameErrors.length) {
        this.handleValidationResult(false, 'surname', this.validationMessages.fullname.surname)

        return false
    }

    if (splitValue.length === 1) {
        this.handleValidationResult(false, 'surname', this.validationMessages.fullname.surname)

        return false
    }
    else {
        if (splitValue[0].length <= 1) {
            this.handleValidationResult(false, 'fullname', this.validationMessages.fullname.required)

            return false
        }
        else {
            this.handleValidationResult(true, 'fullname')
        }

        let errors = []

        if (splitValue[splitValue.length - 1].length && splitValue[splitValue.length - 1].length <= 1) {
            this.handleValidationResult(false, 'surname', this.validationMessages.fullname.surname)
            errors.push(this.validationMessages.fullname.surname)
        }
        else {
            this.handleValidationResult(true, 'surname')
        }

        if (errors.length) {
            return false
        }
    }

    return true
}
