export type SerieProps = {
  position: number;
  weight: number;
  reps: number;
  restInSeconds?: number;
  technique?: string;
  accessory?: string;
};

export class SerieEntity {
  constructor(props: SerieProps) {
    props.restInSeconds = props.restInSeconds || 90;
  }
}
