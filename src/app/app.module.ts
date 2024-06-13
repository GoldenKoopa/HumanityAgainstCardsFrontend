import { RxStompService } from './rx-stomp.service';
import { rxStompServiceFactory } from './rx-stomp-service-factory';

providers: [
  {
    provide: RxStompService,
    useFactory: rxStompServiceFactory,
  },
];
