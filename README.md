# Datenguide Explorables: Components for building explorable explanations

A collection of React-based UI components used for building explorable explanations at [Datenguide](https://datengui.de).

### Development

We use [Storybook](https://storybook.js.org/) for developing UI components in isolation:

```
yarn storybook
```

### Prerequisites

We use Yarn for managing dependencies. After cloning this repo, run `yarn` to install everything that's needed to build and run this project. 

### Caveats

If you link this project using `npm link` or `yarn link` into another application during development, you may run into issues with [React being included twice](https://fb.me/react-invalid-hook-call) ("Error: Invalid hook call"). This problem can be handled by using `npm link` to include React from the other application's `node_modules` folder. Assuming the other application (e.g. `/datenguide`) and this project are sibling folders, you can fix it by running `npm link ../datenguide/node_modules/react` from this project's root folder. This should make the library use the application’s React copy.
