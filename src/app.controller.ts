import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Rate limiting is applied to this route.
  @SkipThrottle({ default: false })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // This route will skip rate limiting.
  @SkipThrottle()
  @Get('test')
  getTest(): string {
    return 'test';
  }

  // Override default configuration for Rate limiting and duration.
  @SkipThrottle({ default: false })
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get('asd')
  getAsd(): string {
    return 'asd';
  }
}
