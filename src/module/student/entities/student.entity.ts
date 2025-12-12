  import { ObjectType, Field, Int } from "@nestjs/graphql";
  import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

  @ObjectType()
  @Entity({ name: "student" })
  export class Student {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => String)
    full_name: string;

    @Column()
    @Field(() => String)
    phone_number: string;

    @Column()
    @Field(() => String)
    profession: string;

    @Column()
    @Field(() => String)
    parent_name: string;

    @Column()
    @Field(() => String)
    parent_number: string;

    @Column()
    @Field(() => String)
    img_url: string;

    @Column({ type: "timestamp" })
    @Field(() => Date)
    joined_at: Date;

    @Column({ type: "timestamp", nullable: true, default: null })
    @Field(() => Date, { nullable: true })
    left_at: Date | null;
  }
