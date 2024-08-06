declare module 'vite-plugin-handlebars' {
    import { Plugin } from 'vite';

    interface HandlebarsOptions {
      // eslint-disable-next-line no-unused-vars
      context?: (pagePath: string | number) => any;
      partialDirectory?: string;
      helpers?: { [key: string]: Function };
    }

    // eslint-disable-next-line no-unused-vars
    export default function handlebars(options?: HandlebarsOptions): Plugin;
  }
