import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { GroupEnum } from "src/common/constants/group-enum";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Student } from "src/module/student/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

registerEnumType(GroupEnum, {
  name: "GroupEnum",
});

@ObjectType()
@Entity({ name: "group" })
export class Group {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    type: "enum",
    enum: GroupEnum,
  })
  @Field(() => GroupEnum)
  profession: GroupEnum;

  @Column()
  @Field(() => String)
  group_name: string;

  @ManyToOne(() => Auth, { onDelete: "SET NULL" })
  @JoinColumn({ name: "teacher_id" })
  @Field(() => Auth, { nullable: true })
  teacher?: Auth;

  @OneToMany(() => Student, (student) => student.group)
  @Field(() => [Student], { nullable: true })
  students?: Student[];
}
