import { Body, Controller, Get, Param, Post, Res, Sse } from '@nestjs/common';
import { tap } from 'rxjs';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Sse('open/:id')
  events(
    @Param('id') id: string,
  ) {
    console.log(`User ${id} suscribed`)
    return this.appService.subscribe(id).pipe(tap(item => console.log(`Emit to user ${id}`, item)));
  }

  @Post('emit')
  async emit(@Body('id') id: string) {
    this.appService.emit(id);
    return { ok: true };
  }
}
