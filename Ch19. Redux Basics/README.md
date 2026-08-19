# Understanding Redux -- Managing App-Wide State with Redux

## What is Redux? And why would you use it?
state management system for cross-component or app-wide state
state:: data which, when changd, would affect the ui
    three kinds
        local state: belongs to a single component; useState/useReducer
        cross-component: affects multiple components (e.g., opening and closing state of a modal overlay); prop drilling
        app-wide: affects the entire app (e.g., user authentication); prop drilling
Redux ~= React Context
    potential disadvantages of react context
        very complex setup and management of states
            deeply nested providers or complex/large providers 
        performance 
            great for low frequency updates, but not for high frequency changes 
            redux is like a flux like state management library
how does redux work
    redux is all about having one central data(state) store
    components subscribe to the store. whenever there is a change, they're notifed so that the data may be retrieved
    components never directly manipulate the store data
        use reducer function for mutating 
        not useReducer hook
    action dispatch/trigger actions  
        describes the kind of operations the reducer should perform 

## Redux Basics & Using Redux with React


## Working with Redux Toolkit
Easier way to work with Redux
As the application grows,
    there can be typos or clashing action type names
    massive list of states to handle and return at every action dispatch (longer reducer function)
    hard to track and keep respecting state immutability
sol 1: use constants 
sol 2: redux toolkit