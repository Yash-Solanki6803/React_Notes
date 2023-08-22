# TypeScript

Typescript is open source by Microsoft. It is a superset of JavaScript. It is a strongly typed language. It is a compiled language. It is a language for application-scale JavaScript. It is a typed superset of JavaScript that compiles to plain JavaScript.

## Why TypeScript?

- TypeScript allows you ,as code author, to leave more of your intent in the code.
- It basically adds optional static typing to JavaScript.
  
  eg: 

  ```js
  function add(a, b) {
    return a + b;
  }
  ```
  
- Now what if we want to add two numbers but we want to make sure that both of them are numbers. We can do that with TypeScript.

  ```ts
  function add(a: number, b: number):number {
    return a + b;
  }
  ```

  _This shows that `a` is a number , `b` is a number as well as the value returned by the function is also a number._