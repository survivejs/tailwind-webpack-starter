import { Application } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import {
  WebSocket,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.0.3/mod.ts";
import {
  setup,
  getStyleTag,
  VirtualInjector,
} from "https://unpkg.com/@bebraw/oceanwind@0.2.5";
import getUrls, { Urls } from "../utils/get-urls.ts";
import watchDirectories from "./watch-directories.ts";

type Pages = {
  [key: string]: Page;
};
type Page = {
  default: ({
    url,
    title,
    meta,
  }: {
    url: string;
    title?: string;
    meta?: { [key: string]: string };
  }) => void;
};

const websocketClient = `const socket = new WebSocket('ws://localhost:8080');
  
socket.addEventListener('message', (event) => {
  if (event.data === 'connected') {
    console.log('WebSocket - connected');
  }

  if (event.data === 'refresh') {
    location.reload();
  }
});`
  .split("\n")
  .join("");

async function serve(port: number) {
  const app = new Application();
  const urls = getUrls();
  const pageContext: {
    _pages: Pages;
    init: () => void;
    getPage: (url: string) => Page;
  } = {
    _pages: {},
    init: async function () {
      this._pages = await getPages(urls);
    },
    getPage: function (url: string) {
      return this._pages[url];
    },
  };
  await pageContext.init();

  const wss = new WebSocketServer(8080);
  wss.on("connection", (ws: WebSocket) => {
    console.log("wss - Connected");

    ws.send("connected");

    // Catch possible messages here
    /*ws.on("message", (message: string) => {
      console.log(message);
      ws.send(message);
    });*/
  });

  // TODO: generalize
  app.use(async (context) => {
    const url = context.request.url.pathname;
    const page = pageContext.getPage(url);

    if (!page) {
      // favicon and others fall here
      context.response.status = 404;

      return;
    }

    try {
      const injector = VirtualInjector();
      setup({ injector });

      const pageHtml = page.default({ url });

      const styleTag = getStyleTag(injector);

      context.response.headers.set("Content-Type", "text/html; charset=UTF-8");
      context.response.body = new TextEncoder().encode(`<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Deno demo</title>
      <meta name="description" content="description goes here"></meta>
      <script>${websocketClient}</script>
      <script type="text/javascript" src="https://unpkg.com/sidewind@3.1.2/dist/sidewind.umd.production.min.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/tailwindcss@1.8.3/dist/base.min.css" />
      <link rel="stylesheet" href="https://unpkg.com/@tailwindcss/typography@0.2.0/dist/typography.min.css" />
      ${styleTag}
    </head>
    <body>
      ${pageHtml}
    </body>
  </html>`);
    } catch (err) {
      console.error(err);

      context.response.body = new TextEncoder().encode(err.stack);
    }
  });

  console.log(`Serving at http://127.0.0.1:${port}`);
  app.listen({ port });

  watchDirectories(
    // Directories have to be relative to cwd
    // https://github.com/denoland/deno/issues/5742
    ["./ds", "./pages"],
    async () => {
      await pageContext.init();

      wss.clients.forEach((socket) => {
        // 1 for open, https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
        if (socket.state === 1) {
          console.log("watchDirectories - Refresh ws");

          socket.send("refresh");
        }
      });
    },
  );
}

async function getPages(urls: Urls) {
  const pages: Pages = {};

  await Promise.all(
    Object.entries(urls).map(async ([url, pagePath]) => {
      // TODO: Maintain a counter per page instead of using a random number
      pages[url] = await import(`${pagePath}?version=${Math.random()}.tsx`);

      return Promise.resolve();
    }),
  );

  return pages;
}

// TODO: Make port configurable
const port = 3000;

// Only development mode for now
serve(port);
