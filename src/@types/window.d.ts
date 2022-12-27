// class WebCredential {
//   constructor(dataType, data, { recommendedHandlerOrigins = [] } = {}) {
//     if (typeof dataType !== "string") {
//       throw new TypeError('"dataType" must be a string.');
//     }
//     this.type = "web";
//     this.dataType = dataType;
//     this.data = data;
//     this.options = { recommendedHandlerOrigins };
//   }
// }

interface WebCredential {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (dataType: string, data: object, options: object): WebCredential;
}

declare interface Window {
  WebCredential: WebCredential;
}
