declare module "google-translator" {
  export class Translator {
    constructor(config: { from: string; to: string; key?: string });
    translate(text: string): Promise<string>;
  }
}
