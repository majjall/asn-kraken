# asn-kraken

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

# Introduction
This project is a simple fullstack app showing how to load an excel file in an ANGULAR app and push its contents to be inserted in a NoSQL Mongo DB through a NEST.js API server.


## Prerequisites
You need to have `node` and `npm` or `pnpm` installed on your machine in order to run the applications.

- [Downloading and installing Node.js and npm]([/guides/content/editing-an-existing-page#modifying-front-matter](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
- PNPM ..


You also need to have `docker` installed on your machine in order to run the applications.

- Docker install




### Google OAuth 2

For testing and use a protected api endpoint, you need to..




## Installation

### 1. Start MongoDB with Docker Compose

Run the following command from the `root` folder to start MongoDB:

```
docker compose up -d
```

### 2. Install the dependencies

To install all required dependencies, run the following instruction from the command line:

```
npm i
```

This will also set up the Prisma ORM to be used with our Mongo database.



## Run

Also from the root folder issue this command ` npm run run:all` to launch the applications.

Frontend accessible from `http://localhost:4200/`

The file to be uploaded can be found at the following location `examples/input-xl.xlsx`

