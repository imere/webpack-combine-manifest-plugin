# webpack-combine-manifest-plugin

This is not an official plugin

## ✈ Getting Started

```console
npm install --save-dev webpack-combine-manifest-plugin
```

## ⚙ Configuration

```js
const Plugin = require('webpack-combine-manifest-plugin');

new Plugin({
  // For same properties, the last json takes precedence
  from: ['path/to/manifest_a.json', 'path/to/manifest_b.json', ...],
  to: 'path/to/manifest_c.json'
})
```

## 📕 License

[MIT](./LICENSE)
