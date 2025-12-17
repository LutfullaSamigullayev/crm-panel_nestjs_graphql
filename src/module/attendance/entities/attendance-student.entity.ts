// src/module/attendance/entities/attendance-student.entity.ts
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Attendance } from "./attendance.entity";
import { Student } from "src/module/student/entities/student.entity";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "attendance_student" })
export class AttendanceStudent {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Attendance, (attendance) => attendance.students, {
    onDelete: "CASCADE",
  })
  attendance: Attendance;

  @ManyToOne(() => Student, { onDelete: "CASCADE" })
  @Field(() => Student)
  student: Student;

  @Column({ default: false })
  @Field(() => Boolean)
  is_present: boolean;
}
