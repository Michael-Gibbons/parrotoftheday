import dotenv from 'dotenv'
dotenv.config()

import { parrots } from './parrots.js'
import cron from 'node-cron'

import { WebClient } from '@slack/web-api';
const token = process.env.SLACK_API_TOKEN
const web = new WebClient(token);

const randomParrot = () => {
  return parrots[Math.floor(Math.random() * parrots.length)]
}

const postParrotOfTheDay = async () => {
  const parrotOfTheDay = `:${randomParrot()}:`;

  await web.chat.postMessage({
    text: `SKWAK! Today's featured parrot emoji is...\` ${parrotOfTheDay} \``,
    channel: process.env.GENERAL_CHANNEL_ID,
    icon_emoji: parrotOfTheDay
  });
  await web.chat.postMessage({
    text: parrotOfTheDay,
    channel: process.env.GENERAL_CHANNEL_ID,
    icon_emoji: parrotOfTheDay
  });
}

cron.schedule('0 12 * * *', postParrotOfTheDay);