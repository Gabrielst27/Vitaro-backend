import { Entity } from '../../../shared/domain/entities/entity';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';
import { ExerciseValidatorFactory } from '../validators/exercise.validator';
import { SerieEntity, SerieProps } from './serie.entity';

export type ExerciseProps = {
  refId: string;
  name: string;
  series: SerieProps[];
};

export class ExerciseEntity extends Entity<ExerciseProps> {
  private _refId: string;
  private _name: string;
  private _series: SerieEntity[];

  constructor(props: ExerciseProps, id?: string) {
    ExerciseEntity.validate(props);
    super(props, id);
    const series = ExerciseEntity.initializeSeries(props.series);
    this._series = series;
  }

  public get refId(): string {
    return this._refId;
  }

  public get name(): string {
    return this._name;
  }

  public get series(): SerieEntity[] {
    return this._series;
  }

  static initializeSeries(series: SerieProps[]): SerieEntity[] {
    if (series.length < 1) {
      return [];
    }
    const entities: SerieEntity[] = [];
    for (const serie of series) {
      entities.push(new SerieEntity(serie));
    }
    return entities;
  }

  static validate(props: ExerciseProps) {
    const validator = ExerciseValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
