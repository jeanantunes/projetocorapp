export default function (event) {
    return new Promise((resolve, reject) => {
        if (this.validation) {
            this.validation.forEach((v, k) => {
                if (v === 'required') {
                    this.handleValidationResult(this.isFieldFilled(event.target.value), v)
                }

                if (v === 'email') {
                    this.handleValidationResult(this.isEmailValid(event.target.value), v)
                }

                if (v === 'pattern' || v === 'cellphone' || v === 'cep') {
                    this.handleValidationResult(this.isValidPattern(event.target.value), v)
                }

                if (v === 'cpf') {
                    this.handleValidationResult(this.isValidCPF(event.target.value), v)
                }

                if (v === 'date') {
                    this.isValidDate(event.target.value)
                }

                if (v === 'fullname') {
                    this.isValidFullname(event.target.value)
                }

                if (v === 'password-match') {
                    this.handleValidationResult(this.areFieldsMatching(event.target.value, this.matchField), v)
                }

                if (v === 'password') {
                    this.handleValidationResult(this.isValidPassword(event.target.value), v)
                }

                if (v === 'credit-card') {
                    this.handleValidationResult(this.isValidCreditCardNumber(event.target.value), v)
                }

                if (v === 'credit-card-expiry') {
                    this.isValidCreditCardExpiryDate(event.target.value)
                }

                if (typeof v === 'object') {
                    v.forEach(fn => {
                        const validationObject = fn(event.target.value)

                        if (typeof validationObject.status !== 'undefined' && validationObject.type && validationObject.message) {
                            this.handleValidationResult(validationObject.status, validationObject.type, validationObject.message)
                        }
                    })
                }

                if (v === 'ofage') {
                    this.handleValidationResult(this.isValidOfage(event.target.value), v)
                }
            })
        }

        if (event.target.value && event.target.serverValidations && (this.validation && this.validation.indexOf('email') >= 1)) {
            this.$events.emit('existingMail', event.target.value)
        }
        else {
            resolve(this.validationErrors)
        }
    })
}
