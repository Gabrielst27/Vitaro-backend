import { ClassValidator } from '../../../shared/domain/validators/class.validator';
import { ExerciseProps } from '../entities/exercise.entity';
import { ExerciseRules } from './exercise.rules';

export class ExerciseValidator extends ClassValidator<ExerciseRules> {
  validate(props: ExerciseProps): boolean {
    return super.validate(new ExerciseRules(props ?? ({} as ExerciseProps)));
  }
}

export class ExerciseValidatorFactory {
  static create() {
    return new ExerciseValidator();
  }
}
