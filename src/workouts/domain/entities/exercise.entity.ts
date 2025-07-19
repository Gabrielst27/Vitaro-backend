import { SerieEntity } from './serie.entity';

export type ExerciseProps = {
  refId: string;
  name: string;
  series: SerieEntity[];
};

export class ExerciseEntity {
  constructor(props: ExerciseProps) {}
}
