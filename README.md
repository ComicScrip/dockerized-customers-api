# Before cloning the repo
```sh
git config --global core.autocrlf input
```
(just re-clone if already cloned).

# Setup

Install dependencies and the migration tool :
```sh
npm i
npm i -g db-migrate db-migrate-mysql
```
Copy the environnement variables : 
```
cp .env.sample .env
```
This `.env` file allows to change the way the Node server connects to the database, but you probably won't have to change any of those variables unless you want to deploy the app yourself and connect it to a specific DB.

## With Docker (recommanded)

Install Docker on your OS.

```sh
docker-compose up -d
```
That will install and run the app with all its dependencies (including the DB) in isolated containers. With this single command, you will have a fully functionnal API listening by default on `localhost:3000`. 

You will also have two running DB servers (one for developpement and one for running automated tests), accessible respectively on `localhost:3307` and `localhost:3308` with the user `root` and the password `root`.

If you want to manually run migrations you can do it with :
docker exec backend npm run migrate
```

### I want to run the automated tests
```sh
docker exec test_db npm run test:setup-db #(wait until the test DB is accessible at localhost:3308)
docker exec test_db npm run test:migrate-db
docker exec test_db npm run test
```

## Without Docker

Install MySQL (5.7) on your OS. 
Then, change variables in .env file to match you db settings.

### Run the app

```sh
npm run migrate
npm run start:watch
```

### Run the automated tests

```sh
npm run test:migrate-db
npm run test
```

# Docs
You can access the docs at [localhost:5000/api-docs](http://localhost:3000/api-docs)
