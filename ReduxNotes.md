#  Redux and React-Redux Notes by Yash Solanki

### References

[Dave Gray YT tutorial](https://www.youtube.com/watch?v=NqzdVN2tyvQ&t=121s)  
[freeCodeCamp YT tutorial](https://youtu.be/zrs7u6bdbUw)  
[Redux Docs](https://redux.js.org/introduction/getting-started)   
[React-Redux Docs](https://react-redux.js.org/introduction/getting-started)  
[Redux Toolkit Docs](https://redux-toolkit.js.org/introduction/getting-started)  
[Code-evolution YT tutorial](https://youtu.be/9boMnm5X9ak)


### Index

* [What is React-Redux?](https://github.com/Yash-Solanki6803/React_Notes/blob/main/ReduxNotes.md#what-is-react-redux)
* [Redux ](https://github.com/Yash-Solanki6803/React_Notes/blob/main/ReduxNotes.md#what-is-react-redux)
    * [Redux pattern](https://github.com/Yash-Solanki6803/React_Notes/blob/main/ReduxNotes.md#redux-pattern)
    * [Multiple Reducers](https://github.com/Yash-Solanki6803/React_Notes/blob/main/ReduxNotes.md#multiple-reducers)
    * [Combining Reducers](https://github.com/Yash-Solanki6803/React_Notes/blob/main/ReduxNotes.md#combining-reducers)
     

* [React Redux](https://github.com/Yash-Solanki6803/React_Notes/blob/main/ReduxNotes.md#react-redux)


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

  //Here buyCake() is an action creator
  function buyCake() {
    return {
      type: BUY_CAKE,
      info: 'First redux action'
    }
    /*An action must have a  type property and it can have any other number of properties*/
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

  //Now we register a listener to the store so that we can see the changes in the state of the application. This function will be called whenever the state of the application changes.

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

  ## Bind Action Creators

  As you might have realised , using store.dispatch() to dispatch an action every time is a bit cumbersome. So we use action creators to create action objects. But we still have to dispatch the action object using store.dispatch().

  To avoid this we use bindActionCreator() function provided by redux. This function takes the store.dispatch() method as a parameter and binds the action creators to it and returns the object with the same keys but with every action creator wrapped into a dispatch call so they may be invoked directly.

  ```js
  import {bindActionCreators} from 'redux'

  const actionCreators = {
    buyCake: buyCake,
    buyIceCream: buyIceCream
  }

  const actions= bindActionCreators(actionCreators, store.dispatch)

  ```
  Now we can dispatch actions directly as follows:

  ```js
  actions.buyCake()
  actions.buyIceCream()
  ```
  _Note:

  _In Redux, action creators simply return an action:_


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


  __This method is great when we have less number of products or states . But in the long run this will result in a very large reducer function which is hard to read and debug. The other approach is to split the intialState objects .__


  ```js
  const initialCakeState = {
    numOfCakes: 10
  }

  const initialIceCreamState = {
    numOfIceCreams: 20
  }
  ```

  ## Combining reducers

  
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
  Thus in this method we have split the reducer function into two different functions. Now we have to combine these two functions into one single function. This can be done using the `combineReducers` function from the redux library.

  ```js
  const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
  })
  ```

  The combineReducers method  accepts an object as an argument and each key value pair in the object is an individual reducer function. The key of the key value pair will be the name of the reducer function and the value will be the reducer function itself. 

  Now we have to create a store using the rootReducer.

  ```js
  const store = createStore(rootReducer)

  console.log('Initial state', store.getState()) // returns the initial state of the application

  const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))

  store.dispatch(buyCake())
  store.dispatch(buyCake())
  store.dispatch(buyCake())
  store.dispatch(buyIceCream())
  store.dispatch(buyIceCream())
  unsubscribe() // this will unsubscribe the listener from the store
  
  ```
  


  Now the output of the above code will be :

  ```js
  Initial state { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }
  Updated state { cake: { numOfCakes: 9 }, iceCream: { numOfIceCreams: 20 } }
  Updated state { cake: { numOfCakes: 8 }, iceCream: { numOfIceCreams: 20 } }
  Updated state { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 20 } }
  Updated state { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 19 } }
  Updated state { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 18 } }
  ```


  Thus we can see that the state of the application is changing as we dispatch actions to the store.

  __When the File increases in size you can separate the reducers into different files and then import them into the root reducer file.__


  ## Enhancers

  The createStore function accepts three parameters:

  * reducer
  * preloadedState
  * enhancer



  Enhancers are higher-order functions used to enhance the behavior of the Redux store. In contrast to middleware and reducers  , they  have access to all the internal store functions and can be used to extend Redux with custom capabilities.

  One can use store enhancers for:

  * Store synchronization
  * State persistence
  * Integration with dev tools

  Lets consider a basic example for calculating the time it takes to deliver a cake to the customer.

  ```js   
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


  //logEnhancer is a store enhancer that will calculate the time it takes to deliver a cake to the customer.
  const logEnhancer = (createStore) => (reducer,initialState,enhancer)=>{
    
    const logReducer = (state,action) => {
      console.log('Order Received', state)
      const newState = reducer(state,action)
      console.log('Order Delivered', newState)
      return newState
    }


    return createStore(logReducer,initialState,enhancer)
  }

  const store = createStore(reducer,logEnhancer);

  console.log('Initial state', store.getState()) // returns the initial state of the application

  const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))

  store.dispatch(buyCake())
  store.dispatch(buyCake())
  ```
  
### Combining Enhancers

  _It is self evident that we can combine enhancers just like we combine reducers._

  ```js
  const store = createStore(reducer,compose(firstEnhancer,secondEnhancer));
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

```js
  import { useSelector } from 'react-redux'
```

```js
  const counter = useSelector(state => state.counter.value)
```

### useDispatch

The `useDispatch` hook returns a reference to the dispatch function from the Redux store.

```js
  import { useDispatch } from 'react-redux'
```

```js
  const dispatch = useDispatch()
```

This dispatch function is what we use to dispatch actions to the Redux store.It is similar to the Reducer function in the useReducer hook.

```js
  dispatch(increment())
```

### connect

The `connect` function connects a React component to a Redux store.

```js
  import { connect } from 'react-redux'
```

```js
  const ConnectedCounter = connect(mapState, mapDispatch)(Counter)
```

### useSelector vs connect

`useSelector` is a hook that you can use to extract data from the Redux store state. It takes a selector function as an argument, and returns the data that the selector selects from the Redux store state.

`connect` is a higher-order function that you can use to connect React components to a Redux store. It takes two arguments: `mapStateToProps` and `mapDispatchToProps`. It returns a function that takes a component and returns a new component that is connected to the Redux store.

