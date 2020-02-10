import * as elements from "typed-html";

export default ({ head, body, cssTags, jsTags, htmlAttributes }) => (
  <html {...htmlAttributes}>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {head}
      {cssTags}
    </head>
    <body>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">/</a>
            </li>
            <li>
              <a href="/another">another</a>
            </li>
          </ul>
        </nav>
      </header>
      {body}
      <footer>footer</footer>
    </body>
    {jsTags}
  </html>
);
