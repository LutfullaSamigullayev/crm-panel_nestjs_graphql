import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupResolver } from "./group.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Student } from "../student/entities/student.entity";
import { Auth } from "../auth/entities/auth.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Group, Student, Auth])],
  providers: [GroupResolver, GroupService],
})
export class GroupModule {}
