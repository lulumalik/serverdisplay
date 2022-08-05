export const state = () => ({
    isToken: false,
})

export const mutations = {
    mutationUsers(state, data) {
        state[data.key] = data.value
    },
}