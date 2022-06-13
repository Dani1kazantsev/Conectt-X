import {forwardRef, Module} from '@nestjs/common';
import { MailService } from './mail.service';
import {UsersModule} from "../users/users.module";

@Module({
  providers: [MailService],
  controllers: [],
  imports:[
    forwardRef(()=>UsersModule),
  ],
    exports:[MailService]
})
export class MailModule {}
