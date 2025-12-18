import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Student } from "../entities/student.entity";

@ObjectType()
export class StudentPagination {
  @Field(() => Int)
  totalPage: number;

  @Field(() => Student, { nullable: true })
  prev?: any;

  @Field(() => Student, { nullable: true })
  next?: any;

  @Field(() => [Student])
  students: Student[];
}
