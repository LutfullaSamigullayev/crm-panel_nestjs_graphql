// src/module/attendance/entities/attendance.entity.ts
import { ObjectType, Field, Int, GraphQLISODateTime } from "@nestjs/graphql";
import { Group } from "src/module/group/entities/group.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AttendanceStudent } from "./attendance-student.entity";

@ObjectType()
@Entity({ name: "attendance" })
export class Attendance {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Group, { onDelete: "CASCADE" })
  @Field(() => Group)
  group: Group;

  @Column({ type: "timestamp", default: () => "NOW()"})
  @Field(() => GraphQLISODateTime)
  date: Date;

  @OneToMany(
    () => AttendanceStudent,
    (attendanceStudent) => attendanceStudent.attendance,
    { cascade: true }
  )
  @Field(() => [AttendanceStudent])
  students: AttendanceStudent[];
}
