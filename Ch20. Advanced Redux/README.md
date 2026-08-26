
# Redix Deep Dive

## Handling Async Tasks with Redux
reducers function should be pure, side effect free, synchronous functions
where should side-efects & async tasks be executed ? (e.g., HTTP requests)
1. inside the components via useEffect
2. inside the action creators


## Where to Put Your Code 
using firebase as the backend db
not adding functions for data transformation, need to do it in the frontend before passing to backend
data transformation (e.g., checking whether store in the backend has an item, if yes update, if not add)

!! even though inside redux reducer function we are writing code that seems like we are directly mutating the state
object, we should never do it outside (DONT MODIFY THE STATE)

fat reducers vs fat components vs fat actions
if synchrnonous, side-effect free code (data transformations) => inside reducers
if async code or code with side-effects => inside action creators or components

thunk
function that delays an action until later
an action creator function that does not return the action itself but instead
anoter function which eventually returns the action 
=> can execute any code before we dispatch the actual action 
