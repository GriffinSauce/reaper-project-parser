import parseValue from './lib/parseValue';

interface Input {
  projectRawText: string;
}

// Intermediate type with parent to walk back up the tree
interface TreeNode extends OutputNode {
  children: TreeNode[];
  parent: TreeNode;
}

// Used to parse a line to its components
const lineRegex = /^(?<whitespace>\s*)(?<tag>[\<\>])?(?<tagName>[a-zA-Z_]*)\s?(?<rawValue>.*)?/;

// Remove parent references to ensure a serialisable structure
const removeParents = (node: TreeNode): OutputNode => {
  const { parent, children, ...rest } = node;
  return {
    children: children.map(removeParents),
    ...rest,
  };
};

const parseProject = ({ projectRawText }: Input) => {
  const lines = projectRawText.split('\n');

  // Tree starting at root node that will be discarded in the output
  const root = {
    children: [],
  };
  const parsed = (root as unknown) as TreeNode;

  // The currently processing node
  let node: TreeNode = parsed;

  // Track indent of current node
  let currentIndent = 0;

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
        tagValue: {
          rawValue,
        },
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

    // This feels brittle to check only by indent
    // TODO: Save raw line on parent node and compare indent directly without tracking it
    // TODO: Is this even necessary? Try removing the check altogether
    const isValue = whitespace.length === currentIndent;
    if (isValue) {
      node.values[tagName] = parseValue(rawValue);
    }
  });

  const project = parsed.children[0];

  return removeParents(project);
};

export default parseProject;
