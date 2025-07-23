import { v4 } from 'uuid';

export class Entity<Props = any> {
  private readonly _id: string;
  private _props: Required<Props>;

  constructor(props: Required<Props>, id?: string) {
    this._props = props;
    this._id = id ?? v4();
  }

  get id(): string {
    return this._id;
  }

  get props(): Required<Props> {
    return this._props;
  }

  protected updateProps(props: Props): void {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this._props,
    } as Required<{ id: string } & Props>;
  }
}
