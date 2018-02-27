export default function (event, callback = () => {}) {
    this.runValidations(event)
    .then(validationErrors => {
        if (!validationErrors.length) {
            this.valid = true
        }
        else {
            this.valid = false
        }

        this.setValidationFeedback()

        callback(this.valid)
    })
}
