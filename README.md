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

# Fixes

Here are all fixes of angular modules.

1. MQTT component "ng2-mqtt":  **src/app/shared/mqtt-msg/README.md**

# Configurations

Configuration of services are JSON files in the folder **src/assets/cfg**



