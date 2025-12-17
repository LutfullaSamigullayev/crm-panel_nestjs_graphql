import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThan } from "typeorm";
import { Bot } from "./entities/bot.entity";

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot)
    private botRepo: Repository<Bot>,
  ) {}

  async createMessage(first_name: string, message: string) {
    return this.botRepo.save({ first_name, message });
  }

  async getMessagesFromToday() {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    return this.botRepo.find({
      where: { createdAt: MoreThan(today) },
    });
  }

  async getMessagesFromLastTenDays() {
    const date = new Date();
    date.setDate(date.getDate() - 10);

    return this.botRepo.find({
      where: { createdAt: MoreThan(date) },
    });
  }
}
