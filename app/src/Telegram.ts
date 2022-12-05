import axios from "axios";

export class Telegram {
  apiUrl: string;
  telegramUrl: string;

  constructor(token: string) {
    this.telegramUrl = "https://api.telegram.org/";
    this.apiUrl = `${this.telegramUrl}bot${token}`;
  }

  sendMessage = async (
    dest: string,
    message: string,
    disableNotification = true
  ) => {
    await axios.post(
      `${this.apiUrl}/sendMessage`,
      {
        chat_id: dest,
        text: message,
        disable_notification: disableNotification,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  };

  sendPhoto = async (
    dest: string,
    picUrl: string,
    disableNotification = true
  ) => {
    await axios.post(
      `${this.apiUrl}/sendPhoto`,
      {
        chat_id: dest,
        photo: picUrl,
        disable_notification: disableNotification,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  };
}
