import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GroupService } from "./group.service";
import { Group } from "./entities/group.entity";
import { CreateGroupInput } from "./dto/create-group.input";
import { UpdateGroupInput } from "./dto/update-group.input";
import { UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { GqlAuthGuard } from "src/common/guards/auth-guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UserRole } from "src/common/constants/role";

@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Group)
  createGroup(@Args("createGroupInput") createGroupInput: CreateGroupInput) {
    return this.groupService.create(createGroupInput);
  }

  @Query(() => [Group])
findAllGroups() {
  return this.groupService.findAll();
}


  @Query(() => Group, { name: "group" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.groupService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Group)
  updateGroup(@Args("updateGroupInput") updateGroupInput: UpdateGroupInput) {
    return this.groupService.update(updateGroupInput.id, updateGroupInput);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Group)
  removeGroup(@Args("id", { type: () => Int }) id: number) {
    return this.groupService.remove(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Group)
  addStudentToGroup(
    @Args("groupId", { type: () => Int }) groupId: number,
    @Args("studentId", { type: () => Int }) studentId: number
  ) {
    return this.groupService.addStudent(groupId, studentId);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Group)
  removeStudentFromGroup(
    @Args("groupId", { type: () => Int }) groupId: number,
    @Args("studentId", { type: () => Int }) studentId: number
  ) {
    return this.groupService.removeStudent(groupId, studentId);
  }
}
