# Psi [![CircleCI](https://circleci.com/gh/kengz/psi.svg?style=shield)](https://circleci.com/gh/kengz/psi) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/1bfadfa824fc46eab2f86841b46fb8c6)](https://www.codacy.com/app/kengzwl/psi?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kengz/psi&amp;utm_campaign=Badge_Grade)
The horsemen are getting back to work. New trading project Psi - ψ.


## Installation

Make sure you have `node>v7` and `python3`. See `bin/setup` for the full dependency. Git clone this cray and cd into it.

```shell
npm run setup # system dependencies
npm install # node modules
python setup.py install # pip dependencies
```


## Setup

### OKCoin (because they can't hiring a fucking good UX designer)

- get an account at [OKCoin](https://www.okcoin.com).
- Create a [new API](https://www.okcoin.com/user/api.do) and set your `api_key`, `secret` in `config/default.json`


## Run

We use `async/await`, so run `node` with the harmony flag. But for safe practices, run all commands via `npm`:

```shell
npm start
```

Alternatively to test-run a single script, use node with flag
```shell
node --harmony-async-await src/index.js
```

### Pre-commit checks

- `npm run lint` Style-check your code with `eslint`. Useful: install [this Sublime linter](https://github.com/roadhump/SublimeLinter-eslint)
- `npm test` Run tests


## Roadmap

Backend - pythong mostly, for data science. See the [Github Project for to dos](https://github.com/kengz/psi/projects/1)

- [x] project setup, CI, CC, config, db
- [x] add jslint file for codacy
- [ ] get data sources, pipe to db, 
- [ ] write migration and setup of entire pipe
