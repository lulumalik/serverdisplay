export const state = () => ({
    widgetSaved: {},
})

export const mutations = {
    mutationWidget(state, data) {
        state.widgetSaved[data.key] = data.value
    },
    emptyWidget(state) {
        state.widgetSaved = {}
    }
}