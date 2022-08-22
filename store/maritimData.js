export const state = () => ({
    modelrun: {},
})

export const mutations = {
    mutationData(state, data) {
        state[data.key] = data.value
    },
    emptyData(state) {
        state.modelrun = {}
    }
}