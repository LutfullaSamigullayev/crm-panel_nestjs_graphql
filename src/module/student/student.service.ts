import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>
  ) {}

  async create(createStudentInput: CreateStudentInput) {
    const {
      full_name,
      phone_number,
      profession,
      parent_name,
      parent_number,
      img_url,
    } = createStudentInput;
  
    const student = this.studentRepo.create({
      full_name,
      phone_number,
      profession,
      parent_name,
      parent_number,
      img_url,
      joined_at: new Date(),
    });
  
    await this.studentRepo.save(student);
    return student;
  }
  

  async findAll() {
    const students = await this.studentRepo.find();
    return students;
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException("Student not found");
    }
    return student;
  }

  async update(id: number, updateStudentInput: UpdateStudentInput) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException("Student not found");
    }
  
    this.studentRepo.merge(student, updateStudentInput);
    const updatedStudent = await this.studentRepo.save(student);
  
    return updatedStudent;
  }

  async remove(id: number) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException("Student not found");
    }
    await this.studentRepo.delete(id);
    return student
  }
}
