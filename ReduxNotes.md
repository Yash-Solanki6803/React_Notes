#  Redux and React-Redux Notes by Yash Solanki

### References

[Dave Gray YT tutorial](https://www.youtube.com/watch?v=NqzdVN2tyvQ&t=121s)  
[freeCodeCamp YT tutorial](https://youtu.be/zrs7u6bdbUw)  
[Redux Docs](https://redux.js.org/introduction/getting-started)   
[React-Redux Docs](https://react-redux.js.org/introduction/getting-started)  
[Redux Toolkit Docs](https://redux-toolkit.js.org/introduction/getting-started)  
[Codeevolution YT tutorial](https://youtu.be/9boMnm5X9ak)



### What is React-Redux?

  __React-Redux lets your React components read data from a Redux store, and dispatch actions to the store to update state.__

### Why Redux?

  _Redux is Predictable. That means in redux, all state transitions are explicit and it is possible to keep track of them . The changes to your applications's state become predictable ._

#### Redux vs React-Redux

  React is a library for building user interfaces.

  Redux is a state management library for JavaScript applications. It is used to store the state of your application.

  React-redux is a library that provides a way to pass data and dispatch actions from your components to redux store.

# Redux

### Basic Concepts

#### Store

  _The store is the object that brings the states together. The store has the following responsibilities:_

  * Holds application state;
  * Allows access to state via `getState()`;
  * Allows state to be updated via `dispatch(action)`;
  * Registers listeners via `subscribe(listener)`;
  * Handles unregistering of listeners via the function returned by `subscribe(listener)`.

#### Actions

  _Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`._

  _Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants._

  _Once an action is dispatched, the store will call the reducer function you gave it. The store will pass two arguments to the reducer: the current state tree and the action._

#### Reducers

  _Reducers tie the store and actions together._

  _Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes._

  _Reducers are pure functions. They should not have any side-effects. Reducers are the only way to change the state._

  _Reducers must not mutate state. Instead, they should return a new state object._


__Example__ : If there is a cake shop .  
  * The store is the shop itself.  
  * The actions are the orders placed by the customers.  
  * The reducers are the chef who takes the order and bakes the cake.  
  * The state is the cake itself.

__Thus Ultimately__ :
  * A store holds the state of your application.
  * An Action describes the changes in the state of the application.
  * A reducer which actually carries out the state transition depending on the action. 


## Redux pattern

  ### Store
  
  * The store is a single source of truth.
  * The state is read-only.
  * Changes are made with pure functions.

  __Eg__: Consider the cake Shop example  
  The store will be an object : 
  ```js
    {
      numOfCakes: 10
    }
  ```

  ### Actions

  * Actions are the options or the orders that the user can place.
  * This are also stored in an object 
  
  __Eg__: Consider the cake Shop example
  The actions will be an object:
  ```js
    {
      type: BUY_CAKE
    }
  ```

  ### Reducers

  * To specify how the state tree is transformed by actions, you wrtie pure reducers.
  
  Reducer - (previousState, action) => newState

  __Eg__: Consider the cake Shop example
  The reducer will be an function :
  ```js
    const reducer = (state, action) => {
      switch(action.type) {
        case BUY_CAKE: return {
          ...state,
          numOfCakes: state.numOfCakes - 1
        }
      }
    }
  ```

  ## Redux primary Example

  Let's implement everything we have learnt so far.

  A simple example of how Store, actions and reducers work together. We will consider the cake shop example:

  ```js
  import redux from 'redux'
  import {createStore} from 'redux'

  const BUY_CAKE = 'BUY_CAKE'

  function buyCake() {
    return {
      type: BUY_CAKE,
      info: 'First redux action'
    }
  }

  const initialState = {
    numOfCakes: 10
  }

  const reducer = (state = initialState, action) => {
    switch(action.type) {
      case BUY_CAKE: return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
      default: return state
    }
  } 

  const store = createStore(reducer) 
  /* Now the redux store is created which currently holds *the initial state of the application
  */

  console.log('Initial state', store.getState()) // returns the initial state of the application

  //Now we register a listener to the store so that we can see the changes in the state of the application

  const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))

  //Now we dispatch an action to the store
  store.dispatch(buyCake()) 
  store.dispatch(buyCake()) 
  store.dispatch(buyCake()) 
  unsubscribe() // this will unsubscribe the listener from the store
  ```

  Now the output of the above code will be :

  ```js
  Initial state { numOfCakes: 10 }
  Updated state { numOfCakes: 9 }
  Updated state { numOfCakes: 8 }
  Updated state { numOfCakes: 7 }
  ```
  Thus we can see that the state of the application is changing as we dispatch actions to the store.


  ## Multiple Reducers

  In the above example we had only one reducer which was responsible for the state transition of the application. But in real world applications we have multiple reducers which are responsible for the state transition of different parts of the application.

  For example in a cake shop application we can have two reducers, one for the cakes and one for the ice-creams.


  Defining action
  ```js
  const BUY_ICECREAM = 'BUY_ICECREAM'
  ```

  Defining action creator
  ```js
  function buyIceCream() {
    return {
      type: BUY_ICECREAM
    }
  }
  ```

  Defining Initial State
  ```js
  const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
  }
  ```

  Defining Reducer
  ```js
  const reducer = (state = initialState, action) => {
    switch(action.type) {
      case BUY_CAKE: return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
      case BUY_ICECREAM: return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      }
      default: return state
    }
  } 
  ```

  Calling the action creator
  ```js
  store.dispatch(buyIceCream());
  ```

  __This method is great when we have less number of products or states . But in the long run this will result in a very large reducer function which is hard to read and debug. The other approach is to split the intialState objects .__

  ## Combining reducers

  ```js
  const initialCakeState = {
    numOfCakes: 10
  }

  const initialIceCreamState = {
    numOfIceCreams: 20
  }
  ```
  
  ```js
  const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
      case BUY_CAKE: return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
      default: return state
    }
  }

  const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
      case BUY_ICECREAM: return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      }
      default: return state
    }
  }

   
  ```






# React-Redux

## Installation

#### Installing React-Redux in a new Project

```
# Vite with our Redux+TS template
# (using the `degit` tool to clone and extract the template)
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app

# Next.js using the `with-redux` template
npx create-next-app --example with-redux my-app
```


#### Install the package and toolkit in an existing project

```
  npm install @reduxjs/toolkit react-redux
```

## Getting Started

### Provider

The `<Provider>` component makes the Redux store available to any nested components that need to access the Redux store.

```
  import { Provider } from 'react-redux'
  import store from './store'
```

```

  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  )

```

_Here the 'store' is the state managed my Redux . Redux Stores the state of your application._

### useSelector

The `useSelector` hook lets you extract data from the Redux store state, using a selector function.

```
  import { useSelector } from 'react-redux'
```

```
  const counter = useSelector(state => state.counter.value)
```

### useDispatch

The `useDispatch` hook returns a reference to the dispatch function from the Redux store.

```
  import { useDispatch } from 'react-redux'
```

```
  const dispatch = useDispatch()
```

This dispatch function is what we use to dispatch actions to the Redux store.It is similar to the Reducer function in the useReducer hook.

```
  dispatch(increment())
```


