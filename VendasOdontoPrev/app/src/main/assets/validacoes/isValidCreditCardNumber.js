export default function (fieldValue) {
    if (!fieldValue) return false

    let creditCardnumber = fieldValue.replace(/\D+/g, '')

    return creditCardnumber.length === 13 || creditCardnumber.length === 15 || creditCardnumber.length === 16
}
