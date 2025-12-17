import { Injectable, OnModuleInit } from "@nestjs/common";
import TelegramBot from "node-telegram-bot-api";
import { BotService } from "./bot.service";

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(private readonly botService: BotService) {}

  onModuleInit() {
    this.bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const first_name = msg.from?.first_name ?? "";

      this.bot.sendMessage(
        chatId,
        `Assalomu aleykum ${first_name}, murojatingizni qoldiring!`,
      );
    });

    this.bot.on("message", async (msg) => {
      const chatId = msg.chat.id;
      const first_name = msg.from?.first_name ?? "";

      if (!msg.text || msg.text === "/start") return;

      if (msg.text.length < 5) {
        return this.bot.sendMessage(
          chatId,
          `${first_name} 5 ta belgidan ko‘proq yozing`,
        );
      }

      await this.botService.createMessage(first_name, msg.text);
      this.bot.sendMessage(chatId, "Murojatingiz yetkazildi ✅");
    });
  }
}
