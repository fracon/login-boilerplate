## Description

This project was created to help developers to start a new project without lose time with authentication and authorization systems.

## Installation

Rename .env.example to .env and configure correctly.
Configure file /src/shared/config/dbconfig-cli.json.

```bash
$ npm install

$ docker-compose config

$ docker-compose up --build -V
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:debug

# production mode
$ npm run start:prod

# sync database
$ npm run typeorm:cli schema:sync
```


## Test

```Not implemented yet.

## Author

- [Rafael Vilaca]
