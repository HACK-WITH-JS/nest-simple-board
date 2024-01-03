import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger();

  @Get()
  getHello(@Ip() ip: string): string {
    // console.log(ip);
    // return this.appService.getHello();
    this.logger.log('hi');
    this.logger.log(`config: ${this.configService.get('ENVIRONMENT')}`);
    throw new NotFoundException('hi');
  }

  @Get('/name')
  getName(@Query('name') name: string) {
    return `hello ${name}`;
  }
}
