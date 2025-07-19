import { Entity } from '../../../shared/domain/entities/entity';

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
    super(props, id);
    props.restInSeconds = props.restInSeconds || 90;
  }
}
