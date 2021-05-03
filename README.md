# geidai-ikoi (藝大オンライン憩い)
[![Deploy to Firebase](https://github.com/MaySoMusician/geidai-ikoi/actions/workflows/firebase-deploy.yml/badge.svg)](https://github.com/MaySoMusician/geidai-ikoi/actions/workflows/firebase-deploy.yml)

## Installation

```bash
$ yarn install
```

Make sure `patch-package` has run to apply patches to:
 - `@chakra-ui/nuxt`

Patching is automatically done after installation via `postinstall` script. See [the repo](https://github.com/ds300/patch-package) for the details.

## Local development

```bash
# serve with hot reload at localhost:3000

# Uncomment the code below if you want to enable APPLICATION DEBUG
# APP_DEBUG=1
NOTION_DATABASE_CONFIG=#<configuration table id>
NOTION_DATABASE_NEWS=#<news table id>
NOTION_DATABASE_MEETLINKS=#<meetlinks table id>
yarn dev
```

## Generate production code (SPA)

```bash
NOTION_DATABASE_CONFIG=#<configuration table id>
NOTION_DATABASE_NEWS=#<news table id>
NOTION_DATABASE_MEETLINKS=#<meetlinks table id>
yarn generate
```


### Local server with production code
After `generate`d the code:
```bash
yarn start
```
Or you can run `yarn generate && yarn start` at once.

---

*For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).*

---

## Deployment

See [firebase-deploy.yml](.github/workflows/firebase-deploy.yml)

To enable APPLICATION DEBUG (in-app logging), set `APP_DEBUG=1`
