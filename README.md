# ESN-F16-SA3

[![CircleCI](https://circleci.com/gh/cmusv-fse/ESN-F16-SA3/tree/master.svg?style=shield&circle-token=aa1a16bb457448ba34d8fdd183ca5027f789f62e)](https://circleci.com/gh/cmusv-fse/ESN-F16-SA3/tree/master)

SA3 team project repo (PLEASE DO NOT CREATE ANY PUBLIC REPO INSIDE CMUSV-FSE)

### Environment Setup

```bash
$ npm install grunt-cli -g
```

### Dependencies Install

```bash
$ npm install
```

### Test

```bash
$ grunt test
```

### DB Install
- Install Postgres SQL from https://www.postgresql.org/download/

```bash
$ createdb esn
$ psql -d esn -f ./utils/ESN.sql
```

### Start
```bash
$ npm start
```

## Attribution

- Background image provided by ["Mike" Michael L. Baird](https://www.flickr.com/photos/mikebaird/)
