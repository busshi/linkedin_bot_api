import dotenv from "dotenv";
import {
  shortInterval,
  longInterval,
  welcomeMessage,
  colors,
} from "./constants";

dotenv.config();

import { Client } from "linkedin-private-api";

const { GITHUB_URL, CV_URL, USERNAME, PASSWORD } = process.env;
let INTERVAL = longInterval; // seconds

// const getConnections = async (client: {
//   search: { searchOwnConnections: (arg0: { filters: {} }) => any };
// }) => {
//   const connectionsScroller = client.search.searchOwnConnections({
//     filters: {},
//   });

//   let connections;
//   while (
//     (connections = await connectionsScroller.scrollNext()) &&
//     connections.length
//   ) {
//     for (const connection of connections) {
//       const { profile } = connection;
//       //console.log("PROFILE", profile);
//       console.log(profile.publicIdentifier, profile.profileId);

//       // const [conversation] = await client.conversation
//       //   .getConversations({
//       //     recipients: profile.profileId,
//       //   })
//       //   .scrollNext();

//       // console.log("CONVERSATION =>", [conversation]);
//       // if (!conversation) {

//       // }
//     }
//   }
// };

// const sendMessages = async (client: {
//   search: { searchOwnConnections: (arg0: { filters: {} }) => any };
//   conversation: {
//     getConversations: (arg0: { recipients: any }) => {
//       (): any;
//       new (): any;
//       scrollNext: { (): [any] | PromiseLike<[any]>; new (): any };
//     };
//   };
// }) => {
//   const connectionsScroller = client.search.searchOwnConnections({
//     filters: {
//       //      currentCompany: companyIds,
//       //    geoUrn: COUNTRY_CODE,
//     },
//   });

//   let connections;
//   let counter = 0;

//   while (
//     (connections = await connectionsScroller.scrollNext()) &&
//     connections.length
//   ) {
//     for (const connection of connections) {
//       console.log("CONNECTION", connection);
//       const { profile } = connection;
//       console.log("PROFILE", profile);

//       const [conversation] = await client.conversation
//         .getConversations({
//           recipients: profile.profileId,
//         })
//         .scrollNext();

//       console.log("CONVERSATION =>", [conversation]);
//       if (!conversation) {
//         const message = buildMessage(profile);

//         //        console.log(message);
//         // await client.message.sendMessage({
//         //   profileId: profile.profileId,
//         //   text: message,
//         // });

//         counter += 1;
//         await wait(5);
//       }
//     }

//     if (counter === 30) {
//       counter = 0;
//       await wait(1800);
//     } else {
//       await wait(10);
//     }
//   }

//   console.log("Finished processing all connections!");
// };

const checkReceivedInvitations = async (client: Client) => {
  console.log(
    `${colors.orange}[+] Checking new connexions requests...${colors.clear}`
  );
  const receivedScroller = client.invitation.getReceivedInvitations();
  const receivedInvitations = await receivedScroller.scrollNext();

  for (const invit of receivedInvitations) {
    const { entityUrn, profile, sharedSecret } = invit;
    const { firstName, lastName, pictureUrls, profileId } = profile;
    const invitationId = entityUrn.split(":")[3];
    const fromUser = `${firstName} ${lastName}`;
    if (pictureUrls && pictureUrls.length) {
      const fromUserPic = pictureUrls[0];
    }
    //TODO
    // Telegram notif
    const message = `✋ New connection request from ${fromUser}`;
    // sendMessage
    // sendPhoto
    // try {
    //   await client.invitation.replyInvitation({
    //     invitationId,
    //     invitationSharedSecret: sharedSecret,
    //   });
    console.log(
      `${colors.orange}[+] Sending welcome message to ${firstName} ${lastName}${colors.clear}`
    );
    //   await client.message.sendMessage({
    //     profileId,
    //     text: "👋",
    //   });

    //   wait(2);

    //   await client.message.sendMessage({
    //     profileId,
    //     text: welcomeMessage(firstName),
    //   });
    //    INTERVAL = shortInterval
    //
    // . TO DO
    //  Notification Telegram
    // const msg = `📤 Welcome message sent to [${firstName lastName}]`
    // } catch {
    //   console.error("Error while accepting connection request");
    // }
    console.log("👥 Network checked");
  }
};

const getConversation = async (client: Client, conversationId: string) => {
  const messagesScroller = client.message.getMessages({ conversationId });
  const messages = await messagesScroller.scrollNext();
  if (messages.length) {
    //console.log("MESSAGES", messages);
    const lastMessage = messages[0];
    const { text } = lastMessage.eventContent.attributedBody;
    console.log("LAST MESSAGE", lastMessage);

    const { sentFrom } = lastMessage;
    const { pictureUrls, firstName, lastName, profileId } = sentFrom;
    const profilePicture = pictureUrls[0];

    //TO DO
    // Telegram notification
    console.log(profilePicture, firstName, lastName, profileId, text);
    const message = `📥 New unread message from ${firstName} ${lastName}
    ${text}
    `;
    console.log(message);
    //sendMessage
    //sendPhoto

    // const conversationAsRead = await client.conversation.markConversationAsRead(
    //   {
    //     conversationId,
    //   }
    // );
    // console.log("-> OK", conversationAsRead.read);

    //TODO
    //check action
    // action reply

    // const myConnectionsScroller = client.search.searchOwnConnections({
    //   keywords: "Alice DUBAR",
    // });
    // const alice = await myConnectionsScroller.scrollNext();
    // console.log(alice[0].profile.profileId);
    // const message = "ça marche enfin";
    // if (`${firstName} ${lastName}` !== "Alexandre DUBAR")
    //   await client.message.sendMessage({
    //     profileId: alice[0].profile.profileId,
    //     text: message,
    //   });
  }
};

const checkUnreadMessages = async (client: Client) => {
  console.log(`${colors.orange}[+] Checking unread messages...${colors.clear}`);
  const conversationsScroller = client.conversation.getConversations();
  const conversations = await conversationsScroller.scrollNext();
  for (const conv of conversations) {
    if (conv.unreadCount > 0 && conv.conversationId) {
      //      const { firstName, lastName, occupation } = conv.participants[0];
      //    const username = `${firstName} ${lastName}`;
      //  console.log(`new unread message from ${username} (${occupation})`);
      getConversation(client, conv.conversationId);
    }
  }
  console.log("📨 Messages checked");
};

(async () => {
  console.log("✅ Starting bot...");
  const client = new Client();
  await client.login.userPass({ username: USERNAME || "", password: PASSWORD });

  let i = 0;
  setInterval(() => {
    //   !i && checkReceivedInvitations(client);
    checkUnreadMessages(client);
    i += 1;
    if (i % 10 === 0) INTERVAL = longInterval;
    if (i === 60) i = 0;
  }, INTERVAL * 1000);
})();
