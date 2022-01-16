# geidai-ikoi (藝大オンライン憩い)
[![Deploy to Firebase](https://github.com/MaySoMusician/geidai-ikoi/actions/workflows/firebase-deploy.yml/badge.svg)](https://github.com/MaySoMusician/geidai-ikoi/actions/workflows/firebase-deploy.yml)

## Prerequisites 

You must install a git-lfs client **before cloning this repository**, that are used here to store large font files.

```bash
$ # some installing-git-lfs commands
$ git lfs install
```

Make sure the filters set up in your `.gitconfig`.
```bash
$ git config -l

...
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
...

```

If you forgot to install or initialize git-lfs before cloning, you can fetch Git LFS data by `git lfs pull`.

MEMO
```bash
$ git lfs track "assets/fonts/**/complete/**/*.woff"
$ git lfs track "assets/fonts/**/complete/**/*.woff2"
```

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

---

## Dependency resolutions

- `"@chakra-ui/nuxt/chakra-loader/module/lodash.template": "^4.5.0"` - [CVE-2019-10744](https://github.com/advisories/GHSA-jf85-cpcp-j695)
- `"@chakra-ui/nuxt/chakra-loader/module/concat-stream": "^1.5.2"` - [GHSA-g74r-ffvr-5q9f](https://github.com/advisories/GHSA-g74r-ffvr-5q9f)
- `"**/glob-parent": "^5.1.2"` - [CVE-2020-28469](https://github.com/advisories/GHSA-ww39-953v-wcq6)
- `"**/axios": "^0.21.2"` - [CVE-2021-3749](https://github.com/advisories/GHSA-cph5-m8f7-6c5x)
