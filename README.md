# New ECA Application Template.
##### Find/Replace the following:
* my_github_repo_name_in_hiera -> ex.: eca_local_scanning_web_ui
* my_app_name_in_hiera -> ex.: local_scanning_web
* my-app-name -> ex.: eca-local-scanning-web
    This should exclude the -service, -api, or -ui suffix. 
* myAppName -> ex.: localScanningWeb
    This should exclude any Service, Api, or UI suffix.
* MyAppName -> ex.: LocalScanningWeb
* My App Name -> ex.: ECA Local Scanning Web
##### Delete this line and all above it.

# My App Name

This is a web front-end built with Angular 5, generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

This provides all of the skeleton necessary for an ECA application built using Typescript. It will be accessible through the DRC INSIGHT Portal.

A person will be able to use this UI to log into the portal and see and application that just displays its own name. 

## Table of Contents

### Development Workflow
1. [External Resource Dependency](#external-resource-dependency)
1. [Development Server](#development-server)
1. [Configuration](#configuration)
1. [Code Scaffolding](#code-scaffolding)
1. [Running Unit Tests](#running-unit-tests)
1. [Running End-to-End Tests](#running-end-to-end-tests)
1. [Running Linters](#running-linters)
1. [Build for Distribution](#build-for-distribution)
1. [Licenses](#licenses)

### Architecture

The application UI is expecte to use rxjs and ngrx/store. Application state is managed entirely with ngrx actions, reducers and effects in the [src/app/state](src/app/state/) directory.

1. [rxjs and Observables](src/OBSERVABLES.md)
1. [State Management with ngrx/store](src/app/eca/state/README.md)

As is, the project looks for these resources at `https://api-gateway-cloud-dev.drcedirect.com/eca-my-app-name-ui/all-development-v0/Resources/` whether you are working locally or accessing the deployed application from S3.

 You can configure this address in [src/config.json](src/config.json).

update the urls in [src/index.html](src/index.html) to match `assets/Resources/...` before launching the application's development server as documented below.

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4242/`. The app will automatically reload if you change any of the source files.

Run `ng serve --open` to start the server and automatically launch your default web browser at the correct location.`

Run `ng serve -e=localapi` to start the server and direct web api traffic to localhost instead of the deployed dev environment.

Run `ng serve -e=protractor` to start the server in e2e test mode. Usually used for debugging e2e test failures.

Run `ng serve --hmr --e=hmr` to start the server with Hot Module Reloading enabled (for use with the Redux DevTools for [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/?src=cb-dl-hotness))

## Configuration

Base configuration (client abbreviation, urls to use for back-end services, etc) is located in [src/config.json](src/config.json). This is overwritten by the Jenkins job that deploys the application to S3, so the data in this file is the default for your local machine and for automated test runs on Jenkins for Pull Requests.

If you'd like to programmatically change this configuration data as it's consumed by the application (for example, to substitute the remote API URL with one on localhost when running the server in a particular environment, as noted in the [Development Server](#development-server) section.) you can do so in [src/app/services/configuration.service.ts](src/app/eca/services/configuration.service.ts).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng test --cc` to execute unit tests with code coverage reporting.

## Running End-to-End Tests

Run `ng e2e -e=protractor` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Running Linters

Run `ng lint` to execute tslint and SonarTS code inspection

## Build for Distribution

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Jenkins Pipeline

The project's [Jenkinsfile](Jenkinsfile) defines the Jenkins job for CI and deployment using the [Jenkins Pipeline](https://jenkins.io/doc/book/pipeline/jenkinsfile/) method of job configuration.

Here's a link to our [eca-my-app-name-ui Jenkins Pipeline job](https://jenkinsci.datarecognitioncorp.com/job/eca-my-app-name-ui/) on the Jenkins server.

## Consul (Service Discovery)

Some of our infrastructure is in S3, Lambda, Kinesis or Dynamo. Those things do not show up in Consul.

Our Web API does show up in Consul, within the AWS datacenter:

- [Web API in lower environments](http://host:port/path)
- [Web API in Loadtesting / Production](http://host:port/path)

The web-server host OS does not matter in terms of licensing.

Licenses can be transferred between different web-server hosts but each license can only be in use on one server at a time, and production servers can only have production licenses on them.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
