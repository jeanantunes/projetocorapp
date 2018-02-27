export default function (fieldValue, matchFieldName) {
    if (!fieldValue) return false
    if (!matchFieldName) return false

    const matchFieldEl = this.$parent.$el.querySelector('[name="' + matchFieldName + '"]')

    if (!matchFieldEl) return false

    matchFieldEl.focus()
    matchFieldEl.blur()

    return matchFieldEl.value === fieldValue
}
