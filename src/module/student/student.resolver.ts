import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { StudentService } from "./student.service";
import { Student } from "./entities/student.entity";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/constants/role";
import { GqlAuthGuard } from "src/common/guards/auth-guard";

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Student)
  createStudent(
    @Args("createStudentInput") createStudentInput: CreateStudentInput
  ) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [Student])
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => Student)
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.studentService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Student)
  updateStudent(
    @Args("updateStudentInput") updateStudentInput: UpdateStudentInput
  ) {
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput
    );
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Student)
  leaveStudent(@Args("id", { type: () => Int }) id: number) {
    return this.studentService.leave(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Student)
  removeStudent(@Args("id", { type: () => Int }) id: number) {
    return this.studentService.remove(id);
  }
}
