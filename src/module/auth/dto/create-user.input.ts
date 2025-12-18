import { InputType, Field } from "@nestjs/graphql";
import { GroupEnum } from "src/common/constants/group-enum";
import { UserRole } from "src/common/constants/role";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  login: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  full_name: string;

  @Field(() => GroupEnum, { nullable: true })
  teacherProfession?: GroupEnum;

  @Field(() => UserRole, { defaultValue: UserRole.USER, nullable: true })
  role: UserRole;

  @Field(() => String, {nullable: true})
  img_url?: string;
}
