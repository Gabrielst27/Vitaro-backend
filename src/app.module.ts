import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/infra/users.module';
import { SharedModule } from './shared/infra/shared.module';
import { AuthModule } from './auth/infra/auth.module';
import { FirebaseService } from './shared/infra/database/firebase/firebase.service';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [UsersModule, SharedModule, AuthModule, WorkoutsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly firebaseService: FirebaseService) {}
}
