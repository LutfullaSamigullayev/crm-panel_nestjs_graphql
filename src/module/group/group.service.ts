import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./entities/group.entity";
import { CreateGroupInput } from "./dto/create-group.input";
import { UpdateGroupInput } from "./dto/update-group.input";
import { Student } from "../student/entities/student.entity";
import { Auth } from "../auth/entities/auth.entity";
import { UserRole } from "src/common/constants/role";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,

    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,

    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>
  ) {}

  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    const { teacherId, profession, group_name } = createGroupInput;

    let teacher: Partial<Auth> | undefined = undefined;

    if (teacherId) {
      const teacherEntity = await this.authRepo.findOne({
        where: { id: teacherId },
      });

      if (!teacherEntity) {
        throw new NotFoundException("Teacher not found");
      }

      if (teacherEntity.role !== UserRole.TEACHER) {
        throw new BadRequestException("User is not a teacher");
      }

      if (teacherEntity.profession !== profession) {
        throw new BadRequestException(
          `Teacher profession (${teacherEntity.profession}) does not match group profession (${profession})`
        );
      }

      teacher = { id: teacherEntity.id } as Partial<Auth>;
    }

    const group = this.groupRepo.create({
      group_name,
      profession,
      teacher,
    });

    return this.groupRepo.save(group);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepo.find({
      relations: ["students", "teacher"],
    });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ["students", "teacher"],
    });

    if (!group) {
      throw new NotFoundException("Group not found");
    }

    return group;
  }

  async update(id: number, updateGroupInput: UpdateGroupInput): Promise<Group> {
    const group = await this.findOne(id);

    const { teacherId, profession, ...data } = updateGroupInput;

    if (profession && group.teacher) {
      if (group.teacher.profession !== profession) {
        throw new BadRequestException(
          "Teacher profession does not match updated group profession"
        );
      }
    }

    if (teacherId) {
      const teacher = await this.authRepo.findOne({ where: { id: teacherId } });

      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      if (teacher.role !== UserRole.TEACHER) {
        throw new BadRequestException("User is not a teacher");
      }

      if ((profession ?? group.profession) !== teacher.profession) {
        throw new BadRequestException(
          "Teacher profession does not match group profession"
        );
      }

      group.teacher = teacher;
    }

    Object.assign(group, data);

    if (profession) {
      group.profession = profession;
    }

    return this.groupRepo.save(group);
  }

  async remove(id: number): Promise<boolean> {
    const group = await this.findOne(id);
    await this.groupRepo.remove(group);
    return true;
  }

  async addStudent(groupId: number, studentId: number): Promise<Group> {
    const group = await this.findOne(groupId);
    const student = await this.studentRepo.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException("Student not found");
    }

    if (student.group) {
      throw new BadRequestException("Student already in a group");
    }

    student.group = group;
    await this.studentRepo.save(student);

    return this.findOne(groupId);
  }

  async removeStudent(groupId: number, studentId: number): Promise<Group> {
    const student = await this.studentRepo.findOne({
      where: { id: studentId },
      relations: ["group"],
    });

    if (!student || !student.group || student.group.id !== groupId) {
      throw new BadRequestException("Student not in this group");
    }

    student.group = null;
    await this.studentRepo.save(student);

    return this.findOne(groupId);
  }
}
