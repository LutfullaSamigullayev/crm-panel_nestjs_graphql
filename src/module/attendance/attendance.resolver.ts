// attendance.resolver.ts
import { Resolver, Mutation, Args, Query, Int } from "@nestjs/graphql";
import { AttendanceService } from "./attendance.service";
import { Attendance } from "./entities/attendance.entity";
import { CreateAttendanceInput } from "./dto/create-attendance.input";

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Mutation(() => Attendance)
  createAttendance(
    @Args("createAttendanceInput") input: CreateAttendanceInput
  ) {
    return this.attendanceService.create(input);
  }

  @Query(() => [Attendance])
  attendanceByGroup(@Args("groupId", { type: () => Int }) groupId: number) {
    return this.attendanceService.findByGroup(groupId);
  }
}
