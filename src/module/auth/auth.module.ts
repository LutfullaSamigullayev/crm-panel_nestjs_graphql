import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/common/constants/jwt-constants";

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "600s" },
    }),
  ],

  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
