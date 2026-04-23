## Contexts and Reducers
Using internal states with `useState()` often accompanies the problem of prop drilling, where shared states get passed across multiple layers of components even when some or most don't need direct access to the data, leading to a less reusable code with lots of extra boilerplates.

One solution is embracing component composition. Another is to share states with `Context` whose API can wrap multiple, if not all, components, and allow react states to connect with the context value, using `useContext` or `use` (latter is more flexible and can be used inside `if` blocks). Like states, when context value changes, the component function using it gets reexecuted by React. 

Context management is made easier with reducers, essentially allowing a context API. `useReducers` dispatch actions on the latest snapshot of states, which is equivalent to prevState often encountered with `setState` operations. 

which allows the operations to be outside of the App component and move into the context file. It also works off of the latest snapshot of the state (~prevState used in setState)
