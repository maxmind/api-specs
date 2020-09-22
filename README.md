<h4 align="center">
  🚨🚨🚨 NOT PRODUCTION READY 🚨🚨🚨
  <br/>
  <br/>
  <small>These spec files are in active development.</small>
</h4>

- - -

<h3 align="center">
  <img
    alt="MaxMind"
    src=".github/images/maxmind-logo.svg"
    width="300"
  />
  <br/>
  <br/>
  <small>API Specs</small>
</h3>

- - -

## Overview

This project documents MaxMind's public APIs using the [OpenAPI spec](http://spec.openapis.org/oas/v3.0.3) for web services and [JSON Schema spec](https://json-schema.org/) for non-web services.

## Usage

* [Minimum Requirements](#minimum-requirements)
* [Installation](#installation)
* [Development](#development)
* [Testing](#testing)
* [Building](#building)
* [Deployments](#deployments)

### Minimum Requirements
* Node 12
* Yarn 1.22

If you need help installing and/or managing Node and Yarn versions, check out [NVM](https://github.com/nvm-sh/nvm) or [Volta](https://docs.volta.sh/guide/).

### Installation
```sh
yarn install
```

### Development
The specs are defined using TypeScript. Configuring "intellisense" in your text
editor to will improve your developer experience by adding niceties such as code
completion, parameter info, interface info, and member lists.

### Testing
```
yarn test
```

### Building
```sh
yarn build
```

### Deployment
A deploy GitHub action is configured to push the compiled JSON build artifacts
to GitHub pages.
