export const state = () => ({
    allNDF: {},
    int: 1
})

export const mutations = {
    mutationNDF(state, data) {
        if (data && data.value.isPush) {
            state.allNDF[data.key].push(data.value.data)
        } else {
            state.allNDF[data.key] = data.value
        }
    },
    increment(state) {
        state.int++
    }
}