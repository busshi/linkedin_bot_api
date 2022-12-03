import dotenv from "dotenv";

dotenv.config();

import { Client } from "linkedin-private-api";

const GITHUB_URL = process.env.GITHUB_URL;
const CV_URL = process.env.CV_URL;
const USERNAME = process.env.USERNAME ?? "";
const PASSWORD = process.env.PASSWORD;

// const wait = (seconds: number) =>
//   new Promise((res) => setTimeout(res, seconds * 1000));

// const buildMessage = (profile: { firstName: string }) => `
// Hey ${profile.firstName},

// Thank you for connecting!
// Hello. I'm a software engineer and I'm looking for my next challenge :)

// I'm sending this message using a LinkedIn bot I've created in NodeJS that wraps the LinkedIn private API.
// You can have a look at the source code here: ${GITHUB_URL}.
// You can also view my CV here: ${CV_URL}

// Thanks,
// `;

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

const checkReceivedInvitations = async (client: {
  invitation: { getReceivedInvitations: () => any };
}) => {
  const receivedScroller = client.invitation.getReceivedInvitations();
  const receivedInvitations = await receivedScroller.scrollNext();
  console.log("INVIT", receivedInvitations);
};

const getConversation = async (client: Client, conversationId: string) => {
  const messagesScroller = client.message.getMessages({ conversationId });
  const messages = await messagesScroller.scrollNext();
  if (messages.length) {
    //console.log("MESSAGES", messages);
    const lastMessage = messages[messages.length - 1];
    const { text } = lastMessage.eventContent.attributedBody;
    //    console.log("LAST MESSAGE", lastMessage);

    const { sentFrom } = lastMessage;
    const { pictureUrls, firstName, lastName, profileId } = sentFrom;
    const profilePicture = pictureUrls[0];
    console.log(profilePicture, firstName, lastName, profileId, text);

    const conversationAsRead = await client.conversation.markConversationAsRead(
      {
        conversationId,
      }
    );
    console.log("-> OK", conversationAsRead.read);
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
  const conversationsScroller = client.conversation.getConversations();
  const conversations = await conversationsScroller.scrollNext();
  console.log(conversations.length);
  for (const conv of conversations) {
    if (conv.unreadCount > 0 && conv.conversationId) {
      //      const { firstName, lastName, occupation } = conv.participants[0];
      //    const username = `${firstName} ${lastName}`;
      //  console.log(`new unread message from ${username} (${occupation})`);
      getConversation(client, conv.conversationId);
    }
  }
};

(async () => {
  const client = new Client();
  await client.login.userPass({ username: USERNAME, password: PASSWORD });

  // const [
  //   [{ company: google }],
  //   [{ company: microsoft }],
  //   [{ company: facebook }],
  //   [{ company: linkedin }],
  // ] = await Promise.all([
  //   client.search.searchCompanies({ keywords: "Google" }).scrollNext(),
  //   client.search.searchCompanies({ keywords: "Microsoft" }).scrollNext(),
  //   client.search.searchCompanies({ keywords: "Facebook" }).scrollNext(),
  //   client.search.searchCompanies({ keywords: "LinkedIn" }).scrollNext(),
  // ]);

  // const companyIds = [
  //   google.companyId,
  //   microsoft.companyId,
  //   facebook.companyId,
  //   linkedin.companyId,
  // ];

  //  sendInvitations(client, companyIds);
  //setInterval(() => {
  //  getConnections(client);
  //}, 14400000);
  checkReceivedInvitations(client);
  checkUnreadMessages(client);
})();
