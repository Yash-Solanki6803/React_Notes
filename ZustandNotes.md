# Zustand Notes

## Why to use Zustand over Redux?

- Zustand is a small, fast and scaleable state management library.
  - Zustand is a small library, only 1.5kb gzipped.
  - Zustand is fast, it uses immer under the hood to allow for immutable updates which are fast and memory efficient.
  - Zustand is scaleable, it uses a hook based API which allows you to use it in any component, no matter how deep in the component tree.
  - Zustand is easy to use, it uses a simple API which is easy to learn and understand.
  - Zustand is flexible, it allows you to use any data structure you want, you can use objects, arrays, strings, numbers, etc.
  - Zustand is framework agnostic, it can be used with React, Preact, Vue, Svelte, Angular, etc.
  - Zustand is TypeScript ready, it is written in TypeScript and comes with its own types.
  - Zustand is testable, it is easy to test your Zustand stores.
  - Zustand is debuggable, it comes with a devtools extension which allows you to inspect and manipulate your stores.
  - Zustand is SSR ready, it works with SSR out of the box.
  - Zustand is easy to migrate to, it is easy to migrate from Redux to Zustand.
  - Zustand is easy to learn, it has a small API which is easy to learn and understand.
  - Zustand is easy to use, it has a simple API which is easy to use.

## How to use Zustand?

  ### create

  ```js
  import {create} from 'zustand'

  const useStore = create(set => ({
    bears: 0,
    increasePopulation: () => set(state => ({bears: state.bears + 1})),
    removeAllBears: () => set({bears: 0}),
  }))
  ```

  Here the set function is a function that accepts a function or an object. If you pass a function, it will receive the current state as its first argument and expects you to return a new partial state. If you pass an object, it will shallow merge that object into the current state.

  ### use

  ```js
  import {useStore} from './store'

  const BearCounter = () => {
    const bears = useStore(state => state.bears)
    return <h1>{bears} around here ...</h1>
  }
  ```

  Here the useStore hook accepts a selector function which receives the current state and returns whatever you want from it. The hook will then subscribe to the store and re-render whenever the selected state changes.

  ### subscribe

  ```js

  const unsub = useStore.subscribe(
    bears => console.log(`There are ${bears} bears`),
    state => state.bears,
  )

  unsub()
  ```

  Here the subscribe function accepts a callback function which receives the selected state and a selector function which receives the current state and returns whatever you want from it. The callback function will then be called whenever the selected state changes. The subscribe function returns an unsubscribe function which you can call to unsubscribe from the store.

  ### destroy

  ```js

  useStore.destroy()
  ```
  Here the destroy function will destroy the store and unsubscribe all listeners.

  ### api

  ```js

  const api = useStore.getState()
  ```

  Here the getState function will return the store api which contains the following methods:

  - getState: () => state
  - setState: (partial: Partial) => void
  - subscribe: (listener: Listener, selector: Selector) => () => void
  - destroy: () => void
  - [key: string]: any
  - [Symbol.iterator]: () => IterableIterator<[string, any]>
  - [Symbol.observable]: () => Observable
  - [Symbol.toPrimitive]: () => any
  - [Symbol.toStringTag]: string

  ### immer

  ```js
  
  const useStore = create(
    set => ({
      bears: 0,
      increasePopulation: () => set(state => ({bears: state.bears + 1})),
      removeAllBears: () => set({bears: 0}),
    }),
    {name: 'zustand-store', immer: true},
  )
  ```     

  Here the immer option will enable immer support for the store. This means that you can mutate the state directly in your actions and the store will still be immutable. This is possible because immer will create a copy of the state and apply all mutations to that copy. This is very useful because it allows you to write your actions in a mutable way which is easier to read and write.

  ### devtools

  ```js

  import {devtools} from 'zustand/middleware'

  const useStore = create(
    devtools(set => ({
      bears: 0,
      increasePopulation: () => set(state => ({bears: state.bears + 1})),
      removeAllBears: () => set({bears: 0}),
    })),
  )
  ```

  Here the devtools middleware will enable the devtools extension for the store. This means that you can inspect and manipulate the store in the devtools extension. This is very useful because it allows you to debug your store and see what is happening inside it.

  ### redux

  ```js

  import {redux} from 'zustand/middleware'

  const useStore = create(
    redux(
      (set, get, api) => (state, action) => {
        switch (action.type) {
          case 'increase':
            return {...state, count: state.count + 1}
          case 'reset':
            return {count: 0}
          default:
            return state
        }
      },
      {count: 0},
    ),
  )
  ```
  Here the redux middleware will enable the redux reducer for the store. This means that you can use the store with redux. This is very useful because it allows you to use the store with redux and redux devtools.

  ### persist

  ```js

  import {persist} from 'zustand/middleware'

  const useStore = create(
    persist(
      set => ({
        bears: 0,
        increasePopulation: () => set(state => ({bears: state.bears + 1})),
        removeAllBears: () => set({bears: 0}),
      }),
      {name: 'zustand-store'},
    ),
  )
  ```
  Here the persist middleware will enable the persist store for the store. This means that you can persist the store to local storage. This is very useful because it allows you to persist the store to local storage and restore it when the page is reloaded.



    
