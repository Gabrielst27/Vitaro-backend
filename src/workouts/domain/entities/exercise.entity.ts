import { Entity } from '../../../shared/domain/entities/entity';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';
import { ExerciseValidatorFactory } from '../validators/exercise.validator';
import { SerieEntity, SerieProps } from './serie.entity';

export type ExerciseProps = {
  refId: string;
  series: SerieProps[];
};

export class ExerciseEntity extends Entity<ExerciseProps> {
  private _series: SerieEntity[] = [];
  constructor(props: ExerciseProps, id?: string) {
    ExerciseEntity.validate(props);
    super(props, id);
    this.initializeSeries(props.series);
  }

  public get refId(): string {
    return this.props.refId;
  }

  public get series(): SerieEntity[] {
    return this._series;
  }

  static validate(props: ExerciseProps) {
    const validator = ExerciseValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  addSerie(serie: SerieProps) {
    const newSerie: SerieEntity = new SerieEntity(serie);
    this._series.push(newSerie);
    this.updateSeries();
  }

  removeSerie(serieId: string) {
    const newSeries: SerieEntity[] = this._series.filter(
      (item) => item.id !== serieId,
    );
    this._series = newSeries;
    this.updateSeries();
  }

  updateProps(props: ExerciseProps) {
    ExerciseEntity.validate(props);
    super.updateProps(props);
  }

  updateSeries() {
    const newPropsSeries: SerieProps[] = [];
    for (const entity of this._series) {
      newPropsSeries.push(entity.toJSON());
    }
    this.props.series = newPropsSeries;
  }

  private initializeSeries(series: SerieProps[]) {
    if (series.length < 1) {
      return;
    }
    for (const serie of series) {
      const entity = new SerieEntity(serie);
      this._series.push(entity);
    }
  }
}
