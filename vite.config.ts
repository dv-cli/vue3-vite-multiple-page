import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve, join } from "path";
import { readdirSync } from "fs";

import viteCompression from "vite-plugin-compression";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const project_pages = {};
const entryPath = resolve(__dirname, "./src/modules");
const entrys = readdirSync(entryPath).reduce((obj, dirname) => {
  obj[dirname] = join(entryPath, dirname);
  return obj;
}, {});

Object.keys(entrys).forEach(pageName => {
  project_pages[pageName] = resolve(__dirname, `src/modules/${pageName}/index.html`);
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let pages = {};
  const env = loadEnv(mode, process.cwd());
  const isDev = mode === "development";

  if (isDev) {
    pages = { ...project_pages };
  } else {
    if (env.VITE_APP_MODEL) {
      pages[env.VITE_APP_MODEL] = project_pages[env.VITE_APP_MODEL];
    } else {
      pages = { ...project_pages };
    }
  }
  return {
    root: env.VITE_APP_ROOTPATH,
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [
          resolve(process.cwd(), "src/assets/icons"),
          resolve(process.cwd(), "src/modules/main/assets/icons"),
        ],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    resolve: {
      extensions: [".js", ".ts", ".vue", ".json"],
      alias: {
        "@": resolve(__dirname, "src"),
        "@main": resolve(__dirname, "src/modules/main"),
        "@minor": resolve(__dirname, "src/modules/minor"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/assets/style/main.less";',
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5238,
      open: false,
      https: false,
      proxy: {
        "/cnhis": {
          target: "https://mock.mengxuegu.com/mock/63856c7c9433403d6c06899c", // easymock
          changeOrigin: true,
          rewrite: path => path.replace(/^\/cnhis/, ""),
        },
      },
    },
    build: {
      rollupOptions: {
        input: pages,
        output: { dir: "./dist" },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});
