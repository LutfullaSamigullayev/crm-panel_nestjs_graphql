import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendanceService } from "./attendance.service";
import { AttendanceResolver } from "./attendance.resolver";
import { Attendance } from "./entities/attendance.entity";
import { AttendanceStudent } from "./entities/attendance-student.entity";
import { Group } from "../group/entities/group.entity";
import { Student } from "../student/entities/student.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attendance,
      AttendanceStudent,
      Group,
      Student,
    ]),
  ],
  providers: [AttendanceResolver, AttendanceService],
})
export class AttendanceModule {}
