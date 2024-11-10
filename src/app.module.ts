import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAuthModule } from './modules/firebase-auth/firebase-auth.module';
import { PaymentsModule } from './modules/payments/payments/payments.module';
import { ChatModule } from './modules/chat/chat/chat.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [FirebaseAuthModule, PaymentsModule, ChatModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
