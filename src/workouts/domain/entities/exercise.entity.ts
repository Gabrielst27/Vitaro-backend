import { Entity } from '../../../shared/domain/entities/entity';
import { SerieEntity } from './serie.entity';

export type ExerciseProps = {
  refId: string;
  name: string;
  series: SerieEntity[];
};

export class ExerciseEntity extends Entity<ExerciseProps> {
  constructor(props: ExerciseProps, id?: string) {
    super(props, id);
  }
}
