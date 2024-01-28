# IrvaBank-Front 

Welcome to IrvaBank! This is a Vue.js project that provides functionalities for controlling transfer operations. Below are important details about the configuration and usage of the project.


## Production Dependencies:

1) axios (^1.6.7): Library for making HTTP requests.
2) bootstrap (^5.3.2): Front-end framework for agile and responsive development.
3) flatpickr (^4.6.13): Date and time selection component.
4) moment (^2.30.1): Library for date manipulation and formatting.
5) vue (^3.3.4): Progressive JavaScript framework for building user interfaces.
6) vue-currency-input (^3.0.5): Currency input component for Vue.js.
7) vue-router (^4.2.5): Official router for Vue.js applications.
8) vue-the-mask (^0.11.1): Mask component for input data in Vue.js fields.

## Development Dependencies:

1) @tsconfig/node18 (^18.2.0): Set of TypeScript configurations for Node.js version 18.
2) @types/node (^18.17.5): TypeScript types for Node.js.
3) @vitejs/plugin-vue (^4.3.1): Vue plugin for Vite, a fast and flexible front-end app builder.
4) @vue/tsconfig (^0.4.0): TypeScript configurations for Vue.js projects.
5) npm-run-all (^4.1.5): Executes multiple NPM tasks in parallel or sequentially.
6) typescript (~5.1.6): Programming language that adds optional types to JavaScript.
7) vite (^4.4.9): Fast and flexible front-end app builder.
8) vue-tsc (^1.8.8): TypeScript compiler for Vue.js projects.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
