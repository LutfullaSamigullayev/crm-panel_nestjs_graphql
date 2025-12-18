import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { CreateUserInput } from "./dto/create-user.input";
import { LoginInput } from "./dto/login.input";
import { Auth } from "./entities/auth.entity";
import { AuthResponse } from "./dto/auth-response";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/common/guards/auth-guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/constants/role";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Mutation(() => Auth)
  // registerSuperAdmin(
  //   @Args("createUserInput") createUserInput: CreateUserInput
  // ) {
  //   return this.authService.registerSuperAdmin(createUserInput);
  // }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Mutation(() => Auth)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.authService.createUser(createUserInput);
  }

  @Mutation(() => AuthResponse)
  async login(@Args("loginInput") loginInput: LoginInput) {
    const { login, password } = loginInput;
    return this.authService.login(login, password);
  }

  @Query(() => [Auth])
  findAllUsers() {
    return this.authService.findAll();
  }

  @Query(() => [Auth])
  findAllTeachers() {
    return this.authService.findAllTeachers();
  }
}
