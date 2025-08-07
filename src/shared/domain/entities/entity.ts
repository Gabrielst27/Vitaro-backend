export class Entity<Props = any> {
  protected _id?: string;
  private _props: Required<Props>;

  constructor(props: Required<Props>, id?: string) {
    this._props = props;
    this._id = id;
  }

  get id(): string | undefined {
    return this._id;
  }

  get props(): Required<Props> {
    return this._props;
  }

  public updateId(id: string) {
    this._id = id ?? undefined;
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
