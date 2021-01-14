import { OutputNode } from './types';
import parseLine from './lib/parseLine';
import parseValue from './lib/parseValue';

interface Input {
  projectRawText: string;
}

// Intermediate type with parent to walk back up the tree
interface TreeNode extends OutputNode {
  children: TreeNode[];
  parent: TreeNode;
}

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

  lines.forEach((line, index) => {
    if (!line) return;

    let parsedLine;
    try {
      parsedLine = parseLine(line);
    } catch (err) {
      throw new Error(`Failed parsing line ${index} - ${err.message}`);
    }
    const { bracket, key, rawValue, encoding } = parsedLine;

    const isOpenTag = bracket === '<';
    if (isOpenTag) {
      const parent = node;
      node = {
        key,
        tagValue: {
          key,
          rawValue,
        },
        values: [],
        children: [],
        parent,
      };
      parent.children.push(node);

      return;
    }

    const isCloseTag = bracket === '>';
    if (isCloseTag) {
      node = node.parent;
      return;
    }

    const parsedValue = parseValue({
      key: key,
      rawValue,
      encoding,
    });
    node.values.push(parsedValue);
  });

  const project = parsed.children[0];

  return removeParents(project);
};

export default parseProject;
