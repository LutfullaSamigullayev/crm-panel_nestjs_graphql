// attendance.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attendance } from "./entities/attendance.entity";
import { AttendanceStudent } from "./entities/attendance-student.entity";
import { CreateAttendanceInput } from "./dto/create-attendance.input";
import { Group } from "../group/entities/group.entity";
import { Student } from "../student/entities/student.entity";

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,

    @InjectRepository(AttendanceStudent)
    private attendanceStudentRepo: Repository<AttendanceStudent>,

    @InjectRepository(Group)
    private groupRepo: Repository<Group>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>
  ) {}

  async create(input: CreateAttendanceInput): Promise<Attendance> {
    const group = await this.groupRepo.findOne({
      where: { id: input.groupId },
    });

    if (!group) throw new NotFoundException("Group not found");

    const attendance = this.attendanceRepo.create({
      group,
      date: input.date,
    });

    await this.attendanceRepo.save(attendance);

    for (const s of input.students) {
      const student = await this.studentRepo.findOne({
        where: { id: s.studentId },
      });

      if (!student) continue;

      const attendanceStudent = this.attendanceStudentRepo.create({
        attendance,
        student,
        is_present: s.is_present,
      });

      await this.attendanceStudentRepo.save(attendanceStudent);
    }

    const result = await this.attendanceRepo.findOne({
      where: { id: attendance.id },
      relations: ["group", "students", "students.student"],
    });
    
    if (!result) {
      throw new NotFoundException("Attendance not found after create");
    }
    
    return result;
  }

  async findByGroup(groupId: number): Promise<Attendance[]> {
    return this.attendanceRepo.find({
      where: { group: { id: groupId } },
      relations: ["students", "students.student", "group"],
    });
  }
}
