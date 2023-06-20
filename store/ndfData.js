export const state = () => ({
    allNDF: {},
    offsettime: null
})

export const mutations = {
    mutationNDF(state, data) {
        if (data && data.value.isPush) {
            state.allNDF[data.key].push(data.value.data)
        } else {
            state.allNDF[data.key] = data.value
        }
    },
    mutationoffset(state, data) {
        state.offsettime = data
    },
    emptyNDF(state) {
        state.allNDF = {}
    }
}