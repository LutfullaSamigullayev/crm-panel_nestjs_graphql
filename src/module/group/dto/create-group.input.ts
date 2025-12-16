import { InputType, Field, Int } from "@nestjs/graphql";
import { GroupEnum } from "src/common/constants/group-enum";

@InputType()
export class CreateGroupInput {
  @Field(() => GroupEnum)
  profession: GroupEnum;

  @Field(() => String)
  group_name: string;

  @Field(() => Int, { nullable: true })
  teacherId?: number;
}
