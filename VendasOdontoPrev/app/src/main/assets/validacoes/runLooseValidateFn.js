export default function () {
    return new Promise((resolve, reject) => {
        const fakeEventObj = this.getFakeEventObj()
        const isButtonCalling = true

        this.validate(fakeEventObj, valid => {
            this.onInput(fakeEventObj, valid, isButtonCalling)
            resolve()
        })
    })
}
