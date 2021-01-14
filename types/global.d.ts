interface BaseValue {
  rawValue: string;
}

interface ListValue extends BaseValue {
  type: 'list';
  values: String[];
}

type Value = BaseValue | ListValue;

interface Values {
  [key: string]: Value;
}

// The output is a tree of these nodes
interface OutputNode {
  tagName: string;
  tagValue: Value;
  values: Values;
  children: OutputNode[];
}
