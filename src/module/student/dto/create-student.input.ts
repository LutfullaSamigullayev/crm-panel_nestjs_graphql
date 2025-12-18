import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateStudentInput {
  @Field(() => String)
  full_name: string;

  @Field(() => String)
  phone_number: string;

  @Field(() => String)
  parent_name: string;

  @Field(() => String)
  parent_number: string;

  @Field(() => String, {nullable: true})
  img_url?: string;
}
