import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BotService } from "./bot.service";
import { BotResolver } from "./bot.resolver";
import { TelegramService } from "./telegram.service";
import { Bot } from "./entities/bot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Bot])],
  providers: [BotService, BotResolver, TelegramService],
})
export class BotModule {}
