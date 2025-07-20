import { Entity } from '../../../shared/domain/entities/entity';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';
import { SerieValidatorFactory } from '../validators/serie.validator';

export type SerieProps = {
  position: number;
  weight: number;
  reps: number;
  restInSeconds?: number;
  technique?: string;
  accessory?: string;
};

export class SerieEntity extends Entity<SerieProps> {
  constructor(props: SerieProps, id?: string) {
    SerieEntity.validate(props);
    super(props, id);
    this.props.restInSeconds = this.props.restInSeconds || 90;
  }

  static validate(props: SerieProps) {
    const validator = SerieValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
