import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StudentStatistics {
  @Field()
  month: Date;

  @Field(() => Int)
  total_joined: number;

  @Field(() => Int)
  total_left: number;
}
