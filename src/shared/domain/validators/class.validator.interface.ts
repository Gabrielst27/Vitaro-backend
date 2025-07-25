export type FieldsErrors = {
  [field: string]: string[];
};

export interface IClassValidator<Rules> {
  errors: FieldsErrors;

  validate(props: Rules);
}
