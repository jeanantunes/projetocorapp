export default function (status) {
    this.$store.commit('application/HANDLE_KEYBOARD_ACTIVE', true)
    if (status === true) {
        this.$store.commit('application/SET_INPUT_ACTIVE', true)

        let plataform = window.navigator.userAgent.toLowerCase()

        // Fix para o botão de voltar do teclado no android
        // que mantém o foco mesmo após oculto
        if (plataform.search(/android/) !== -1) {
            window.addEventListener('resize', () => {
                if (window.innerWidth + window.innerHeight === this.$store.getters['application/originalSize']) {
                    this.$store.commit('application/HANDLE_KEYBOARD_ACTIVE', false)
                }
                else if (window.innerWidth + window.innerHeight < this.$store.getters['application/originalSize'] - 50) {
                    this.$store.commit('application/HANDLE_KEYBOARD_ACTIVE', true)
                }
            }, false)
        }
        else {
            this.$store.commit('application/HANDLE_KEYBOARD_ACTIVE', true)
        }
    }
    else {
        // Desabilita a store que manipula as barras
        if (!this.$store.getters['application/inputIsActive']) {
            this.$store.commit('application/HANDLE_KEYBOARD_ACTIVE', false)
            this.$store.commit('application/SET_INPUT_ACTIVE', false)
        }
    }
}
