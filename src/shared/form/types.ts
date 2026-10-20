export type FieldType = "text" | "textarea" | "number" | "select" | "tags" | "color";

export interface IFieldOption {
  value: string;
  label: string;
}

// one input of a schema driven form, key is a field of the edited record
export interface IFieldConfig<TValues> {
  key: Extract<keyof TValues, string>;
  label: string;
  type?: FieldType;
  options?: readonly IFieldOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  // takes the whole form row
  wide?: boolean;
}
