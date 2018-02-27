export default function () {
    let source = this.$refs.fieldEl

    if (!this.$refs.fieldEl) source = this.$el.querySelector('.form-control')

    return {
        target: {
            value: source.value,
            dataset: {
                bind: this.bind
            },
            serverValidations: true
        }
    }
}
