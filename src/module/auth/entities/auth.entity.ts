import { ObjectType, Field, Int, registerEnumType, HideField } from "@nestjs/graphql";
import { GroupEnum } from "src/common/constants/group-enum";
import { UserRole } from "src/common/constants/role";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

registerEnumType(UserRole, {
  name: "UserRole",
});

@ObjectType()
@Entity({ name: "auth" })
export class Auth {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  login: string;

  @Column()
  @HideField()
  password: string;

  @Column()
  @Field(() => String)
  full_name: string;

  @Column({
    type: "enum",
    enum: GroupEnum,
    nullable: true,
  })
  @Field(() => GroupEnum, { nullable: true })
  profession?: GroupEnum;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  @Field(() => UserRole)
  role: UserRole;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  img_url?: string;

  @Column({ type: "timestamp" })
  @Field(() => Date)
  joined_at: Date;

  @Column({ type: "timestamp" })
  @Field(() => Date)
  update_at: Date;
}
