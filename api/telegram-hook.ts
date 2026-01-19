import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const webhookUrl = process.env.WEBHOOK_URL;
///api.telegram.org/bot{token}/setWebhook?url={url}/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180
//api.telegram.org/bot{token}setWebhook?url=https://mobile-proxies.vercel.app/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180

const bot = new Telegraf(BOT_TOKEN);

// start handler
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const channelUrl = "t.me/gateProxy0";
  const targetUrl = "t.me/+8jbq-af0dBIwMDg0";

  // Welcome message with Markdown formatting
  const reply = `
[All 2025 Paying methods are posted for free, join to learn for free

Bank Logs: Using spammed banking credentials for  transactions or withdrawals (ach/wires etc)

OpenUps: Creating accounts with spammed or synthetic identities to launder funds

Cash App Methods: Exploiting vulnerabilities in Cash App for unauthorized transactions

PayPal Methods: Exploiting PayPal's system through spammed accounts, transaction manipulation, or spammed credentials

CC Dumps & Pins: How to use spammed  credit card information in batches for swiping](${targetUrl})

`;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Learn how to setup socks proxies and rdps securely",
              url: channelUrl,
            },
          ]
        ],
      },
    });
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}
export async function sendImageCommand(ctx) {
  const media = [
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/space/main/photo_2025-09-06_15-26-08.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/space/main/photo_2025-09-06_15-26-14.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/space/main/photo_2025-09-06_15-26-34.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/space/main/photo_2025-09-06_15-26-43.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/space/main/photo_2025-09-06_15-28-22.jpg",
    },
       
    
  ];
  // Send image first
  await ctx.replyWithMediaGroup(media);
}

// Register the /start command handler
bot.command("start", async (ctx) => {
  // Send image first
  await sendImageCommand(ctx);
  await handleStartCommand(ctx);
});

// Webhook handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    if (query.setWebhook === "true") {
      const success = await bot.telegram.setWebhook(webhookUrl);
      // console.log("Webchook set:", webhookUrl, success);
      return res.status(200).send("OK");
    }

    await bot.handleUpdate(body);
    return res.status(200).send("OK");
  } catch (err) {
    return res.json({ error: "Internal server error" }, { status: 500 });
  }

  // res.status(200).send("OK");
};
