![deploy](https://github.com/busshi/linkedin_bot_api/actions/workflows/deploy.yml/badge.svg)

# Linkedin Bot / API

### A basic linkedin bot used to accept incoming connexions requests coded in Typescript.

This bot is the following of [the first one](https://github.com/busshi/linkedin_bot_api) which used Selenium but for some reasons, I decided to create another one using the API to avoid my raspberry to suffer!

## Functionalities:

- Autologin without TFA enabled
- Accept connexions requests
- Send an automatic welcome message inside my network
- Autoreply to messages from new contacts and send actions keywords:
  - dispo
  - techno
  - profile
  - contact
  - unmute
- Send notifications to a Telegram account (userID needed, get yours with [Telegram API](https://core.telegram.org/bots/api#getting-updates)) using a telegram bot (you can easily create one with [BotFather](https://telegram.me/BotFather)) with new connexions requests and profile picture

## Usage

- Copy env.sample to a .env file a replace with your custom values
- Install dependencies `cd app && yarn install`
- Run the bot in development mode `cd app && yarn run dev`
- Build the bot and transpile into Javascript `cd app && tsc`
- Run the built bot ready to be deployed: `node app/dist/index.js`

## Docker usage

- Production usage `docker-compose up -d`

## Notes

- This bot uses the [Linkedin-private-api](https://github.com/eilonmore/linkedin-private-api) with uses Linkedin Voyager API.
- Also available on [Dockerhub](https://hub.docker.com/busshi/linkedin_bot_api)
