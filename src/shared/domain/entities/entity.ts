import { v4 } from 'uuid';

export class Entity<Props = any> {
  private readonly _id: string;
  private _props: Props;

  constructor(props: Props, id?: string) {
    this._props = props;
    this._id = id ?? v4();
  }

  get id(): string {
    return this._id;
  }

  get props(): Props {
    return this._props;
  }

  protected updateProps(props: Props) {
    if (props !== this._props) this._props = props;
  }
}
