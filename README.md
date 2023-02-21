# Chedda Demo Frontend

This is the repo for the CHEDDA lending protocol demo app frontend

### Setup
You first need to install the [Ionic CLI](https://ionicframework.com/docs/cli) to be able to build and run the dapp.

##### Install Ionic CLI

```bash
npm install -g @ionic/cli
```

##### Build the app

### To run the dapp

```bash
ionic build
```

To serve the application, run the following

```bash
ionic serve
```


This serves the application in the default configuration.
To serve a specific configuration, use the `--configuration` flag, with the name of the environment to run in.

> See a list of potential environments [here](https://github.com/chedda-tech/market-frontend/blob/66feef9cc47d6a92ee2a4c42bd0cd262bec3a3b6/angular.json#L44)

```bash
ionic serve --configuration testnet.XXX
```

Application should now be running on the default port (8001).
