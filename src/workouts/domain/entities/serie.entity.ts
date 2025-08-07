import { v4 } from 'uuid';
import { Entity } from '../../../shared/domain/entities/entity';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';
import { SerieValidatorFactory } from '../validators/serie.validator';

export type SerieProps = {
  id?: string;
  position: number;
  reps: number;
  restInSeconds?: number;
  weight?: number | null;
  techniqueId?: string | null;
  accessory?: string | null;
};

export class SerieEntity extends Entity<SerieProps> {
  constructor(props: SerieProps) {
    SerieEntity.validate(props);
    const id = props.id ?? v4();
    const restInSeconds = props.restInSeconds || 90;
    const weight = props.weight ?? null;
    const technique = props.techniqueId ?? null;
    const accessory = props.accessory ?? null;
    super({
      ...props,
      id,
      restInSeconds,
      weight,
      techniqueId: technique,
      accessory,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get position(): number {
    return this.props.position;
  }

  get weight(): number | null {
    return this.props.weight;
  }

  get reps(): number {
    return this.props.reps;
  }

  get restInSeconds(): number {
    return this.props.restInSeconds;
  }

  get technique(): string | null {
    return this.props.techniqueId;
  }

  get accessory(): string | null {
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
