// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  dev: false,
  images: {
    nav_bar: "../../../assets/images/qr-code-color.png",
    about: '../../../assets/images/qr-code-color.png',
    us:'../../../assets/images/ppl-working-cropped.jpg',
  },
  baseUrl: 'http://20.226.8.18'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
