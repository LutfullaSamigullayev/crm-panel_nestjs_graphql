// dto/create-attendance.input.ts
import { InputType, Field, Int, GraphQLISODateTime } from "@nestjs/graphql";
import { AttendanceStudentInput } from "./attendance-student.input";

@InputType()
export class CreateAttendanceInput {
  @Field(() => Int)
  groupId: number;

  @Field(() => GraphQLISODateTime)
  date: Date;

  @Field(() => [AttendanceStudentInput])
  students: AttendanceStudentInput[];
}
