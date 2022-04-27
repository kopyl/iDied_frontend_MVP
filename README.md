# Angularapp

[Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Development server

Run `sudo ng s --port 80 --host 0.0.0.0 --disable-host-check` for a dev server. Navigate to `http://idied.org`. The app will automatically reload if you change any of the source files.

## Development server on ios

Run `sudo ng s --port 80 --host 0.0.0.0 --disable-host-check --configuration=ios`
It's required for local iOS manual testing since Google doesn't want to redirect to 192.168.0.101
It's calling `fakeAuthForIOS()` in `google-auth.service.ts`

## Development with local server on stage.idied.org
1. Launch NGINX
2. Run `ng s --port 81 --host 0.0.0.0 --disable-host-check --confuration=stage`
This should be a replacement for ios configuration

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
