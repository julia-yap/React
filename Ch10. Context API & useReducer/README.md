The problem of hsared state: prop drilling
state lifted up to the component with access to all children components, and passe dthrough prop across multiple layers of components even though most don't need that data directly => less reusable, lots of extra boilerplate code

a sltn: embracing component composition

sharing state with context
context api 
sharing data across layers made easy 
wrap multiple/all components 
react state connected to context value, dont' have to pass through props, anything that needs it can directly reach out to it


managing complex state with reducers
