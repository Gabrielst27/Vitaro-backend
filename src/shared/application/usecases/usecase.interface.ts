export interface IUsecase<Input, Output> {
  execute(input: Input): Output | Promise<Output>;
}
