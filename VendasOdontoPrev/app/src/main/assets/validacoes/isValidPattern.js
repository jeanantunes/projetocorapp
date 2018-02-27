export default function (fieldValue) {
    // Campos vazios devem ser tratados no required e não no pattern
    if (!fieldValue) return true

    let match = fieldValue.match(this.pattern.replace(/^\'(.*)\'$/gi, '$1'))
    let valid = match ? (match[0] == match.input ? true : false) : false // eslint-disable-line

    return valid
}
