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

export class SerieEntity {
  private _position: number;
  private _weight: number;
  private _reps: number;
  private _restInSeconds: number;
  private _technique: string;
  private _accessory: string;

  constructor(props: SerieProps, id?: string) {
    SerieEntity.validate(props);
    this._restInSeconds = props.restInSeconds || 90;
    this._technique = props.technique ?? '';
    this._accessory = props.accessory ?? '';
  }

  get position(): number {
    return this._position;
  }

  get weight(): number {
    return this._weight;
  }

  get reps(): number {
    return this._reps;
  }

  get restInSeconds(): number | undefined {
    return this._restInSeconds;
  }

  get technique(): string | undefined {
    return this._technique;
  }

  get accessory(): string | undefined {
    return this._accessory;
  }

  static validate(props: SerieProps) {
    const validator = SerieValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
