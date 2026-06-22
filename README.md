# AShore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

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

---

## CI/CD Pipeline

[![CI/CD](https://github.com/zab3355/A-Shore/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/zab3355/A-Shore/actions/workflows/ci-cd.yml)

This project validates on every push and pull request, and deploys to production on `main` push after validation passes.

### Checks

- **Frontend Build**: Build Angular app
- **Frontend Lint**: TSLint code quality
- **Frontend Tests**: Karma/Jasmine unit tests
- **Backend Build**: Build Express.js server
- **Backend Lint**: TypeScript type checking
- **Backend Tests**: With MongoDB and Redis services
- **Deploy**: Automatic deployment to server on `main` push

### Manual Trigger

You can manually run checks without pushing by going to [GitHub Actions](https://github.com/zab3355/A-Shore/actions/workflows/ci-cd.yml) and clicking "Run workflow".

For details, see the [CI/CD Deployment Guide](../../CI-CD-DEPLOYMENT.md).
