import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';


@Module({
  providers: [FirebaseAuthService]
})
export class FirebaseAuthModule {}
