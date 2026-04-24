## Handling Side effects with `useEffect`

Side effects are essentially tasks that do not impact the current component render cycle. An example in this codebase is fetching user's current position and sorting places according to distance.

Use `useEffect` to prevent infinite loop or execute code that can only run when the component is executed at least once. 
