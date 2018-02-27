export default function () {
    if (!this.valid) {
        this.setElementClasses(['field-invalid'])
        this.setValidationStatus(this.validationErrors[0].message)

        if ('vibrate' in navigator) {
            navigator.vibrate([576, 391, 320])
        }
    }

    if (this.valid) {
        this.setValidationStatus('')
        this.setElementClasses(['field-valid'])
    }
}
