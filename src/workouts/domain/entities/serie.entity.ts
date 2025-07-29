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
    const restInSeconds = props.restInSeconds || 90;
    const technique = props.technique ?? '';
    const accessory = props.accessory ?? '';
    super({ ...props, restInSeconds, technique, accessory }, id);
  }

  get position(): number {
    return this.props.position;
  }

  get weight(): number {
    return this.props.weight;
  }

  get reps(): number {
    return this.props.reps;
  }

  get restInSeconds(): number {
    return this.props.restInSeconds;
  }

  get technique(): string {
    return this.props.technique;
  }

  get accessory(): string {
    return this.props.accessory;
  }

  static validate(props: SerieProps) {
    const validator = SerieValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  updateProps(props: SerieProps): void {
    SerieEntity.validate(props);
    super.updateProps(props);
  }
}
