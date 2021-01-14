export const enum Encoding {
  Unknown = 'Unknown',
  Base64 = 'base64',
}

export const enum ValueType {
  List = 'list',
  Base64 = 'base64',
}

export interface BaseValue {
  key: string;
  rawValue: string;
}

export interface ListValue extends BaseValue {
  type: ValueType.List;
  values: string[];
}

export interface EncodedValue extends BaseValue {
  type: ValueType.Base64;
  value: string;
}

export type Value = BaseValue | ListValue | EncodedValue;

// The output is a tree of these nodes
export interface OutputNode {
  key: string;
  tagValue: Value;
  values: Value[];
  children: OutputNode[];
}
