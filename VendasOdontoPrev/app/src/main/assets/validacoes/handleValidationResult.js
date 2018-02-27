export default function (validationResult, type, message = '') {
    if (!validationResult) {
        let validationErrorObj = {type: type}

        if (message) {
            validationErrorObj.message = message
        }
        else {
            validationErrorObj.message = this.validationMessages[type]
        }

        this.validationErrors.push(validationErrorObj)
    }
    else {
        this.validationErrors = this.validationErrors.filter((el) => {
            return el.type !== type
        })
    }
}
