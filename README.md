# UnoCSS

This example shows how to use [UnoCSS](https://github.com/unocss/unocss) with Next.js.

## Issue that remain

It's not perfect.

According to this <https://github.com/unocss/unocss/issues/419>

There are still some problems related to webpack cache logic.

The effect is that:

- `npx next build`: first time, everything is ok
- `npx next build`: second time, all unocss style is gone
- `npx next build`: third time, `Failed to compile. no such file ./_virtual_\__uno.css`

So either clear `.next` cache before each build as a workaround or try to make a code fix…

## Working Configuration

Install a preset manually (e.g. `@unocss/preset-uno`)

`import 'uno.css'`

---

`next.config.js`

```js
const UnoCSS = require('@unocss/webpack').default
const presetUno = require('@unocss/preset-uno').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config, context) {
    config.plugins.push(UnoCSS({ presets: [presetUno()] }))

    return config
  },
}

module.exports = nextConfig
```

`_app.js`

```tsx
import 'uno.css'
```

`index.tsx`

```tsx
// * somewhere
<div className='text-red'><div>
```
