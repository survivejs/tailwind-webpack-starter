import * as path from "https://deno.land/std/path/mod.ts";
import { expandGlobSync, existsSync } from "https://deno.land/std/fs/mod.ts";
import { assertEquals } from "https://deno.land/std@0.69.0/testing/asserts.ts";
import {
  setup as setupOceanwind,
  getStyleTag,
  VirtualInjector,
  themed,
} from "https://unpkg.com/@bebraw/oceanwind@0.2.6";
import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import * as elements from "./lib/elements.ts";
import parseCode from "./ast/parse-code.ts";
import parseProps from "./ast/parse-props.ts";
import queryNodes from "./ast/query-nodes.ts";
import getComponents from "./utils/get-components.ts";
import processMarkdown from "./utils/process-markdown.ts";
import type { AstNode } from "./types.ts";
import { createRemote } from "./lib/gentleRpc/rpcClient.ts";
import userTheme from "./user-theme.ts";
import Prism from "./lib/prism/mod.ts";

const remote = createRemote("http://0.0.0.0:4000");

const joinPath = path.posix.join;
const getDirectory = path.posix.dirname;
const getRelativePath = path.posix.relative;

const printAst = async (ast: AstNode): Promise<string> =>
  // @ts-ignore
  remote.print(ast);

const parseSource = async (source: string): Promise<AstNode> =>
  // @ts-ignore
  remote.parse(source);

const getStyleInjector = () => {
  const injector = VirtualInjector();

  setupOceanwind({ injector });

  return injector;
};

const ow = themed(userTheme);

// TODO: Check that given language exists
const highlight = (str: string, language: string) =>
  Prism.highlight(str, Prism.languages[language], language);

export {
  ow,
  highlight,
  assertEquals,
  expandGlobSync,
  elements,
  joinPath,
  existsSync,
  getComponents,
  getDirectory,
  getRelativePath,
  parseCode,
  parseProps,
  parseSource,
  printAst,
  processMarkdown,
  queryNodes,
  getStyleInjector,
  getStyleTag,
  Application,
};
