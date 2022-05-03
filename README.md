# UnoCSS

This example shows how to use [UnoCSS](https://github.com/unocss/unocss) with Next.js.

## Working Configuration

- Install and use a preset manually (e.g. `@unocss/preset-uno`)
- `import 'uno.css'`
- disbale webpack build cache (for UnoCSS)

---

`next.config.js`

```js
const UnoCSS = require("@unocss/webpack").default;
const presetUno = require("@unocss/preset-uno").default;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config, context) {
    config.plugins.push(UnoCSS({ presets: [presetUno()] }));

    if (context.buildId !== "development") {
      // * disable filesystem cache for build
      // * https://github.com/unocss/unocss/issues/419
      // * https://webpack.js.org/configuration/cache/
      config.cache = false;
    }

    return config;
  },
};

module.exports = nextConfig;
```

`_app.js`

```tsx
import "uno.css";
```

`index.tsx`

```tsx
// * somewhere
<div className='text-red'><div>
```

## Explanation

UnoCSS doesn't work well with Webpack 5's cache system for now (according to this <https://github.com/unocss/unocss/issues/419>)

The effect (with cache) is that:

- `npx next build`: first time, everything is ok
- `npx next build`: second time, all unocss style is gone
- `npx next build`: third time, `Failed to compile. no such file ./_virtual_\__uno.css`

**So just turn cache off for build.**
