import { Injectable } from '@nestjs/common';
import { fromEvent } from "rxjs";
import { EventEmitter } from "events";
@Injectable()
export class AppService {
  private readonly emitter = new EventEmitter();
  getHello(): string {
    return 'Hello World!';
  }

  subscribe(eventName: string) {
    return fromEvent(this.emitter, eventName);
  }

  async emit(eventName) {
    this.emitter.emit(eventName, { data: 'for user with ID:' + eventName });
  }
}

