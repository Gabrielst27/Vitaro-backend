export class Entity<Props = any> {
  private _props: Required<Props>;

  constructor(props: Required<Props>) {
    this._props = props;
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
      ...this._props,
    } as Required<{ id: string } & Props>;
  }
}
