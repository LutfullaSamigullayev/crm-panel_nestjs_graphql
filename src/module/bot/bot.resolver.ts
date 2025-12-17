import { Resolver, Query } from "@nestjs/graphql";
import { BotService } from "./bot.service";
import { Bot } from "./entities/bot.entity";

@Resolver(() => Bot)
export class BotResolver {
  constructor(private readonly botService: BotService) {}

  @Query(() => [Bot])
  getMessagesFromToday() {
    return this.botService.getMessagesFromToday();
  }

  @Query(() => [Bot])
  getMessagesFromLastTenDays() {
    return this.botService.getMessagesFromLastTenDays();
  }
}
