import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  async signup(
    @Body() body: { email: string; password: string },
  ) {
    return this.usersService.createUser(body.email, body.password);
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.loginUser(email, password);
  }

  @Post('google-login')
  async googleLogin(@Body('token') token: string) {
    return this.usersService.googleLogin(token);
  }

  @Get('hello')
  testHello() {
    return { message: 'Hello from Backend!' };
  }

  @Get('test-db')
  async testDb() {
    console.log('Test DB Endpoint Hit');
    return this.usersService.testConnection();
  }
  @Patch(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    // Cast body fields if necessary, or just pass through.
    // Ideally create a UpdateUserDto, but keeping it flexible for now.
    return this.usersService.updateUser(parseInt(id), body);
  }
}
