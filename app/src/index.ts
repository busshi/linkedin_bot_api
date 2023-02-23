import { shortInterval, longInterval, newWelcomeMessage } from "./constants";
import * as dotenv from "dotenv";
import { Client } from "@busshi/linkedin-private-api";
import { checkAction, formatActionMessage, wait } from "./utils";

import Telegram from "@busshi/telegram-api";

dotenv.config();

const { LINKEDIN_ID, TELEGRAM_BOT_TOKEN, TELEGRAM_ID, USERNAME, PASSWORD } =
  process.env;

let INTERVAL = longInterval;

const checkReceivedInvitations = async (client: Client, telegram: Telegram) => {
  const d = new Date();
  const date = d.toLocaleString();
  console.log(`[${date}] Checking new connexions requests...`);
  const receivedScroller = client.invitation.getReceivedInvitations();
  const receivedInvitations = await receivedScroller.scrollNext();

  for (const invit of receivedInvitations) {
    const { entityUrn, profile, sharedSecret } = invit;
    const { firstName, lastName, pictureUrls, profileId, occupation } = profile;

    const invitationId = entityUrn.split(":")[3];
    const fromUser = `${firstName} ${lastName}`;
    let message = `✋ New connection request from ${fromUser} - ${occupation}`;

    TELEGRAM_ID && telegram.sendMessage(TELEGRAM_ID, message);
    console.log(message);

    if (pictureUrls && pictureUrls.length) {
      const fromUserPic = pictureUrls[0];
      console.log(fromUserPic);
      if (fromUserPic && TELEGRAM_ID)
        telegram.sendPhoto(TELEGRAM_ID, fromUserPic);
    }
    try {
      await client.invitation.replyInvitation({
        invitationId,
        invitationSharedSecret: sharedSecret,
      });
      wait(2);
      console.log(`Sending welcome message to ${firstName} ${lastName}`);
      await client.message.sendMessage({
        profileId,
        text: "👋",
      });
      wait(2);
      await client.message.sendMessage({
        profileId,
        text: newWelcomeMessage(firstName),
      });
      INTERVAL = shortInterval;
      message = `📤 Welcome message sent to ${firstName} ${lastName}`;
      console.log(message);
      TELEGRAM_ID && telegram.sendMessage(TELEGRAM_ID, message);
    } catch {
      console.error("Error while accepting connection request");
    }
    wait(2);
  }
  console.log("👥 Network checked");
};

const getConversation = async (
  client: Client,
  telegram: Telegram,
  conversationId: string
) => {
  const messagesScroller = client.message.getMessages({ conversationId });
  const messages = await messagesScroller.scrollNext();
  if (messages.length) {
    const lastMessage = messages[0];
    const { text } = lastMessage.eventContent.attributedBody;
    const { sentFrom } = lastMessage;
    const { pictureUrls, firstName, lastName, profileId } = sentFrom;
    const profilePicture = pictureUrls[0];

    const message = `📥 New unread message from ${firstName} ${lastName}:\n\n${text}`;
    console.log(message);
    if (TELEGRAM_ID) {
      telegram.sendMessage(TELEGRAM_ID, message);
      profilePicture && telegram.sendPhoto(TELEGRAM_ID, profilePicture);
    }

    wait(3);

    const action = formatActionMessage(text.toLowerCase());
    const answer = checkAction(action);
    if (answer) {
      TELEGRAM_ID &&
        telegram.sendMessage(
          TELEGRAM_ID,
          `Command [${action}] asked by ${firstName} ${lastName}`
        );
      if (TELEGRAM_ID && action === "contact")
        telegram.sendMessage(
          TELEGRAM_ID,
          `🚨 ${firstName} ${lastName} wants to talk to you`,
          false
        );
      wait(2);
      profileId !== LINKEDIN_ID &&
        (await client.message.sendMessage({
          profileId,
          text: answer,
        }));
      INTERVAL = shortInterval;
    }

    await client.conversation.markConversationAsRead({
      conversationId,
    });
  }
};

const checkUnreadMessages = async (client: Client, telegram: Telegram) => {
  const d = new Date();
  const date = d.toLocaleString();
  console.log(`[${date}] Checking unread messages...`);
  const conversationsScroller = client.conversation.getConversations();
  const conversations = await conversationsScroller.scrollNext();
  for (const conv of conversations) {
    if (conv.unreadCount > 0 && conv.conversationId)
      getConversation(client, telegram, conv.conversationId);
    wait(10);
  }
  console.log("📨 Messages checked");
};

(async () => {
  console.log("✅ Starting bot...");
  const client = new Client();
  await client.login.userPass({ username: USERNAME || "", password: PASSWORD });

  const telegram = new Telegram(TELEGRAM_BOT_TOKEN || "");
  TELEGRAM_ID && telegram.sendMessage(TELEGRAM_ID, "✅ Starting bot...");

  checkReceivedInvitations(client, telegram);

  TELEGRAM_ID && telegram.sendMessage(TELEGRAM_ID, "❌ Stopping bot...");
  // let i = 0;
  // setInterval(() => {
  //   !i && checkReceivedInvitations(client, telegram);
  //   checkUnreadMessages(client, telegram);
  //   i += 1;
  //   if (i % 10 === 0) INTERVAL = longInterval;
  //   if (i === 60) i = 0;
  //  }, INTERVAL * 1000);
})();
