import { Field, ObjectType } from "@nestjs/graphql";
import { Auth } from "../entities/auth.entity";

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: string;

  @Field(() => Auth)
  user: Auth;
}
