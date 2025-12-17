import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './module/student/student.module';
import { AuthModule } from './module/auth/auth.module';
import { GroupModule } from './module/group/group.module';
import { BotModule } from './module/bot/bot.module';
import { AttendanceModule } from './module/attendance/attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: String(process.env.DB_PASSWORD as string),
      database: String(process.env.DB_DATABASE as string),
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    StudentModule,
    GroupModule,
    BotModule,
    AttendanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
