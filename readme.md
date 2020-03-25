# DevCamper API

> Backend API for DevCamper application, which is a bootcamp directory website

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -destroy

# Import all data
node seeder -i,port
```

## Demo

Extensive documentation with examples [here](https://documenter.getpostman.com/view/10271663/SzYUXztX?version=latest#3b843db5-99d1-4d72-a6c7-5660505214dd)

- Version: 1.0.0
- License: MIT
- Author: Mohammed Osman
