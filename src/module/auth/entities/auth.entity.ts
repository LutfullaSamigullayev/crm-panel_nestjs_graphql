import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
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
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  profession: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  @Field(() => UserRole)
  role: UserRole;

  @Column()
  @Field(() => String)
  img_url: string;

  @Column({ type: "timestamp" })
  @Field(() => Date)
  joined_at: Date;

  @Column({ type: "timestamp" })
  @Field(() => Date)
  update_at: Date;
}
