1. **What is the difference between Component and PureComponent? give an example where it might break my app.**
  - `Component` is the base class for creating the Regular React components and `PureComponent` is a subclass of `Component`
  that provides a simple way to optimize our components by preventing unnecessary re renders. An example where it might break my app is if your component's props or state contain complex data structures, a shallow comparison might not accurately detect changes within those data structures.

2. **Context + ShouldComponentUpdate might be dangerous. Can think of why is that?**
  - So I think that might be a risk because as I know the “componentShouldUpdate” is triggered whenever the props or states change so we can decide wether the components re render or not but if we combine context the context doesn’t trigger changes in the props or states so its kind of a global thing so we loose the validation in “componentShouldUpdate” so we can ended in a performance issue.

3. Describe 3 ways to pass information from a component to its PARENT.
  - Callback props: 
  - Context API
  - Event Emitters

4. Give 2 ways to prevent components from re-rendering.
  - PureComponent / React.memo
  - ShouldComponentUpdate for class components
5. What is a fragment and why do we need it? Give an example where it might break my app.
  - Fragments are used to group multiple elements without adding extra DOM elements. IMO fragments are generally safe and the only way I can think the app might break if we have two elements inside a Fragment, normally if they are wrapped inside a normal DOM elment they will act as parent children siblings but inside a Fragment they will not be siblings so if you have selected in CSS `p + h1` for example, that would not work.

6. Give 3 examples of the HOC pattern.
  - Authentication HOC
  - Data Fetching HOC
  - Theme provider HOC

7. What's the difference in handling exceptions in promises, callbacks and async...await.
  - Callbacks: Normally you pass the error as a first argument to callbacks
  - Promises: Promises have two parameters and errors can be handled using the `reject`
  - Async/Await: By using try catch we can handle errors

8. How many arguments does setState take and why is it async.
  - Can take two arguments, the first its the object that corresnponds to the state and the second its a callback
  that defines once the value was updated and this is why is asynchrounous.

9. List the steps needed to migrate a Class to Function Component.
  - Remove state and life cycle methods, replace this.setState with hooks `useState`
  - Convert life cycle methods to `useEffect` hooks.
  - Instead of `this.props`, use directly the function arguments to access props.
  - Remove the render method en return directly the JSX

10. List a few ways styles can be used with components.
  - Inline styles
  - CSS Modules
  - Styled Components
  - SCSS

11. How to render an HTML string coming from the server.
  - We can make use of `dangerouslySetInnerHTML` but this should be our last resource and should only be used with trusted and sanitized content. We should consider using safer alternatives like React's built-in methods for rendering components or libraries like DOMPurify for sanitization.

