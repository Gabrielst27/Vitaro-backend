import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TrainigModule } from './trainings/training.module';

@Module({
  imports: [UserModule, TrainigModule],
})
export class AppModule {}
