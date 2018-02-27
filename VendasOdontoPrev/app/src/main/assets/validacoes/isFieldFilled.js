export default function (fieldValue) {
    if (!fieldValue || fieldValue && fieldValue.match(/^\s+$/i)) { // eslint-disable-line no-mixed-operators
        return false
    }

    return true
}
