import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { FindOptionsWhere, ILike, Repository } from "typeorm";

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

  async findAll(query: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const search = query.search?.trim() ?? "";
  
    const skip = (page - 1) * limit;
  
    let where: FindOptionsWhere<Student>[] = [];
  
    if (search) {
      where = [
        { full_name: ILike(`%${search}%`) },
        { phone_number: ILike(`%${search}%`) },
        { profession: ILike(`%${search}%`) },
        { parent_name: ILike(`%${search}%`) },
      ];
    }
  
    const [students, count] = await this.studentRepo.findAndCount({
      where: search ? where : {},
      skip,
      take: limit,
      order: { id: "DESC" },
    });
  
    const totalPage = Math.ceil(count / limit);
  
    return {
      totalPage,
      prev: page > 1 ? { page: page - 1, limit } : null,
      next: totalPage > page ? { page: page + 1, limit } : null,
      students,
    };
  }

  async getStudentsStatistics() {
    return await this.studentRepo.query(`
      SELECT
        DATE_TRUNC('month', joined_at) AS month,
        COUNT(id) AS total_joined,
        SUM(CASE WHEN left_at IS NOT NULL THEN 1 ELSE 0 END) AS total_left
      FROM student
      GROUP BY DATE_TRUNC('month', joined_at)
      ORDER BY month ASC
    `);
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

  async leave(id: number) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException("Student not found");
    }
    student.left_at = new Date();
    const updatedStudent = await this.studentRepo.save(student);
    return updatedStudent;
  }

  async remove(id: number) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException("Student not found");
    }
    await this.studentRepo.delete(id);
    return student;
  }
}
