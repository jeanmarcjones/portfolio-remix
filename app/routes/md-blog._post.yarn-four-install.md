I was able to fix this for yarn version 4 by following the corepack
manual [installation instructions][corepack-install].

```bash
npm uninstall -g yarn pnpm
npm install -g corepack
corepack enable
```

These are the latest [installation instruction][yarn-install] for yarn.

FYI: I used asdf to install node

[corepack-install]: https://github.com/nodejs/corepack?tab=readme-ov-file#manual-installs
[yarn-install]: https://yarnpkg.com/getting-started/install
