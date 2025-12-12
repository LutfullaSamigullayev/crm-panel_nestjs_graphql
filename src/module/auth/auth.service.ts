import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Auth } from "./entities/auth.entity";
import { CreateUserInput } from "./dto/create-user.input";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepo: Repository<Auth>,
    private jwtService: JwtService
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<Auth> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    const newUser = this.authRepo.create({
      ...createUserInput,
      password: hashedPassword,
      joined_at: new Date(),
      update_at: new Date(),
    });

    return this.authRepo.save(newUser);
  }

  async login(login: string, password: string) {
    const user = await this.authRepo.findOne({ where: { login } });

    if (!user) {
      throw new UnauthorizedException("Login yoki parol noto'g'ri");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException("Login yoki parol noto'g'ri");
    }

    // Token yaratish
    const token = await this.jwtService.signAsync({
      id: user.id,
      login: user.login,
      role: user.role,
      profession: user.profession,
    });

    return {
      token,
      user,
    };
  }
}
