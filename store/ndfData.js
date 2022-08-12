export const state = () => ({
    allNDF: {},
})

export const mutations = {
    mutationNDF(state, data) {
        state.allNDF[data.key] = data.value
    },
}