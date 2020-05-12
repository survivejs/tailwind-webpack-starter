import * as elements from "typed-html";
import Page from "./_layouts/page";
import Button from "./_components/button";

export default ({ htmlAttributes, cssTags, jsTags }) => (
  <Page
    htmlAttributes={htmlAttributes}
    cssTags={cssTags}
    jsTags={jsTags}
    head={[
      <title>tailwind-webpack-starter</title>,
      <meta
        name="description"
        content="tailwind-webpack-starter combines webpack with Tailwind and provides a starting point for site projects"
      ></meta>,
    ]}
    body={
      <main class="w-full mx-auto">
        <h1>tailwind-webpack-starter</h1>
        <p>TODO</p>
        <div x-state="false">
          <div class="mb-4">
            Value: <span x="state" />
          </div>
          <div>
            <Button label="Demo button" onclick="setState(v => !v)" />
          </div>
        </div>
      </main>
    }
  />
);
