import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingRepository } from './training.repository';

@Module({
  controllers: [TrainingController],
  providers: [TrainingRepository],
})
export class TrainigModule {}
