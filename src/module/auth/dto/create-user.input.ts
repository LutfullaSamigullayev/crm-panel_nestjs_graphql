import { InputType, Field } from "@nestjs/graphql";
import { UserRole } from "src/common/constants/role";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  login: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  profession: string;

  @Field(() => UserRole, { defaultValue: UserRole.USER, nullable: true })
  role: UserRole;

  @Field(() => String)
  img_url: string;
}
