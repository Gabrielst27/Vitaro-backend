import { ClassValidator } from '../../../shared/domain/validators/class.validator';
import { WorkoutProps } from '../entities/workout.entity';
import { WorkoutRules } from './workout.rules';

export class WorkoutValidator extends ClassValidator<WorkoutRules> {
  validate(props: WorkoutProps): boolean {
    return super.validate(new WorkoutRules(props ?? ({} as WorkoutProps)));
  }
}

export class WorkoutValidatorFactory {
  static create() {
    return new WorkoutValidator();
  }
}
