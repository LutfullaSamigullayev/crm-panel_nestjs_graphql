import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field(() => String)
  login: string;

  @Field(() => String)
  password: string;
}
