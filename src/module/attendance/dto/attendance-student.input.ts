// dto/attendance-student.input.ts
import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class AttendanceStudentInput {
  @Field(() => Int)
  studentId: number;

  @Field(() => Boolean)
  is_present: boolean;
}
