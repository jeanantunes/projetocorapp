export default function (classes = []) {
    if (this.customClasses.length) {
        this.customClasses.map((v, k) => {
            classes.push(v)
        })
    }

    this.elementClasses = classes
}
