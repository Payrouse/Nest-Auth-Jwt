import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

import { ApikeyGuard } from './auth/guards/apikey.guard';

@UseGuards(ApikeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    console.log('Funcion');
    return this.appService.getHello();
  }

  @Get('nuevo')
  @Public()
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @Get('/task/')
  tasks() {
    return this.appService.getTask();
  }
}
