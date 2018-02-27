export default function (fieldValue) {
    if (!fieldValue) return false

    this.emptyValidationMessages()

    const splitDate = fieldValue.split('/')

    if (splitDate[0] > 12) {
        this.handleValidationResult(false, 'credit-card-expiry', this.validationMessages.creditCardExpiry.month)

        return false
    }

    const expiryDate = new Date(splitDate[1] + '/' + splitDate[0])
    const today = new Date()

    if (expiryDate.getTime() < today.getTime()) {
        this.handleValidationResult(false, 'credit-card-expiry', this.validationMessages.creditCardExpiry.expired)

        return false
    }

    return true
}
