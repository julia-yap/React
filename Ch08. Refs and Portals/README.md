## useRef
* Simplifies direct access to DOM
* Manages value that shouldn't be states
* Exposes API to other components

A ref enables referecing a value that's not needed for rendering. Unlike state, it is mutable and does not re-render the component on every change (=> Perfect for storing information that doesn't affect the visual output of the component)

## Portals
Detach where elements are rendered in the DOM vs where it is in the jsx code