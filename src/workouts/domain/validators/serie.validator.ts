import { ClassValidator } from '../../../shared/domain/validators/class.validator';
import { SerieProps } from '../entities/serie.entity';
import { SerieRules } from './serie.rules';

export class SerieValidator extends ClassValidator<SerieRules> {
  validate(props: SerieProps): boolean {
    return super.validate(new SerieRules(props ?? ({} as SerieProps)));
  }
}

export class SerieValidatorFactory {
  static create() {
    return new SerieValidator();
  }
}
