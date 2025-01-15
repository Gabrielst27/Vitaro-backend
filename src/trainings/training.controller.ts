import { Controller } from '@nestjs/common';
import { TrainingRepository } from './training.repository';

@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingRepository: TrainingRepository) {}
}
