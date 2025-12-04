function ListCategory({ node, level = 0 }) {
  const prefix = "_____ ".repeat(level);

//   const prefix = "\u00A0\u00A0".repeat(level);
  console.log("node", node);
  console.log("children", node.children);

  return (
    <>
      <option value={node._id} style={{textAlign:"start"}}>
        {prefix}
        {node.name}
        {node.children && node.children.length > 0 ? " (Cha)" : ""}
      </option>
      {node.children && node.children.length > 0 &&
        node.children.map((child) => (
          <ListCategory key={child._id} node={child} level={level + 1} />
        ))
      }
    </>
  );
}
export default ListCategory;