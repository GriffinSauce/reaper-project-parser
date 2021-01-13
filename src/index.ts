interface Input {
  projectRawText: string;
}

interface Values {
  [key: string]: {
    rawValue: string;
  };
}

interface OutputNode {
  tagName: string;
  tagValue: string;
  values: Values;
  children: OutputNode[];
}

interface Parsed {
  root: {
    children: ParsedNode[];
  };
}

interface ParsedNode extends OutputNode {
  children: ParsedNode[];
  parent: ParsedNode;
}

// TODO: needs to handle lists like RECORD_PATH, probably best to rename to parseStringValue
// const unwrapStringValue = (rawValue: string): string => rawValue.slice(1, -1);

const lineRegex = /^(?<whitespace>\s*)(?<tag>[\<\>])?(?<tagName>[a-zA-Z_]*)\s?(?<rawValue>.*)?/;

const parseProject = ({ projectRawText }: Input) => {
  const lines = projectRawText.split('\n');

  const parsed: Parsed = {
    root: {
      children: [],
    },
  };
  let currentIndent = 0;
  let node: ParsedNode = parsed.root as ParsedNode;
  lines.forEach((line, index) => {
    if (!line) return;

    const match = lineRegex.exec(line);
    if (!match || !match.groups) {
      throw new Error(`Failed parsing line ${index}`);
    }

    const { whitespace, tag, tagName, rawValue } = match.groups;

    const isOpenTag = tag === '<';
    if (isOpenTag) {
      currentIndent += 2;

      const parent = node;
      node = {
        tagName,
        tagValue: rawValue,
        values: {},
        children: [],
        parent,
      };
      parent.children.push(node);

      return;
    }

    const isCloseTag = tag === '>';
    if (isCloseTag) {
      node = node.parent;
      currentIndent -= 2;
      return;
    }

    // This feels brittle
    // TODO: Save raw line on parent node and compare indent directly without tracking it
    // TODO: Is this even necessary? Try removing the check altogether
    const isValue = whitespace.length === currentIndent;
    if (isValue) {
      node.values[tagName] = {
        rawValue,
      };
    }
  });

  const cleanParents = (node: ParsedNode): OutputNode => {
    const { parent, children, ...rest } = node;

    return {
      children: children.map(cleanParents),
      ...rest,
    };
  };
  const project = parsed.root.children[0];
  const output = cleanParents(project);

  console.log('project', JSON.stringify(output, null, 2));

  return parsed;
};

export default parseProject;
