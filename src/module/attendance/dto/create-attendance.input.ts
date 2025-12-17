// dto/create-attendance.input.ts
import { InputType, Field, Int } from "@nestjs/graphql";
import { AttendanceStudentInput } from "./attendance-student.input";

@InputType()
export class CreateAttendanceInput {
  @Field(() => Int)
  groupId: number;

  @Field(() => Date)
  date: Date;

  @Field(() => [AttendanceStudentInput])
  students: AttendanceStudentInput[];
}
