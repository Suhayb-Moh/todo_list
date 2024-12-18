import { Module, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/users/auth/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        console.log('JWT Secret from useFactory:', secret); // Debug log here
        const logger = new Logger('AuthModule');
        logger.log(`Using JWT secret: ${secret} was loaded successfully`);
        const signOptions = { expiresIn: '1h' };
        return { secret, signOptions };
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, Logger, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
