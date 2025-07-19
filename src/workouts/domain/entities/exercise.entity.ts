import { Entity } from '../../../shared/domain/entities/entity';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';
import { ExerciseValidatorFactory } from '../validators/exercise.validator';
import { SerieEntity } from './serie.entity';

export type ExerciseProps = {
  refId: string;
  name: string;
  series: SerieEntity[];
};

export class ExerciseEntity extends Entity<ExerciseProps> {
  constructor(props: ExerciseProps, id?: string) {
    ExerciseEntity.validate(props);
    super(props, id);
  }

  static validate(props: ExerciseProps) {
    const validator = ExerciseValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
