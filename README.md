# Prerequisities
When you are new with Angular..

1. Install **node.js** and **npm**. [All is here..](https://nodejs.org/en/)
2. Instal **Angular-cli**

```
$ npm install -g @angular/cli
```

# After clonning of repo

1. Go to root of clonned repo.
2. Install packages

```
$ cd iqrf-gateway-webapp-ng
$ npm install
```

# Running for Development

```
$ cd iqrf-gateway-webapp-ng
$ ng serve
```

After this open your browser at **http://localhost:4200/**.

# Building

```
$ cd iqrf-gateway-webapp-ng
$ ng build
```

After this in **dist** folder has been placed the distribution.

# Production Build

```
$ cd iqrf-gateway-webapp-ng
$ ng build --prod
```

After this in **dist** folder has been placed the distribution. Distribution has been optimized.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
