import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Ensure bcrypt is imported

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log('User found:', user); // Log the found user object

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid); // Log password validation result

      if (isPasswordValid) {
        return user.toObject();
      }
    }

    throw new UnauthorizedException('Invalid email or password');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
