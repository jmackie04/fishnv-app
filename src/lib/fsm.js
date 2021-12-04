export const createMachine = (def) => {
  const machine = {
    value: def.initial,
    ...def,

    transition (state, event) {
      console.log("HELLO FROM THE MACHINE")
      console.log({ state, event })
      const allowedStates = Object.keys(def.states)
      const currentState = def.states[state]
      const transition = currentState?.transitions?.[event]
      
      if (!transition) return machine.value
      
      const nextState = transition?.target

      const value = typeof nextState !== 'function'
        ? nextState
        : nextState(machine)

      if (!allowedStates.includes(value)) return machine.value

      if (Object.keys(def).includes('history')) machine.history.push(state)
      machine.value = value
      return machine.value
    }
  }

  return machine
}
