import { Field, ObjectType, ID } from "@nestjs/graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@ObjectType()
@Entity("bot")
export class Bot {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  first_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone_number?: string;

  @Field()
  @Column()
  message: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
