function ListCategory({ node, level = 0, excludeId }) {
  if (node._id === excludeId) return null; // Loại bỏ chính nó

  const prefix = "_____ ".repeat(level);
  console.log("node",node)
  return (
    <>
      <option value={node._id} style={{ textAlign: "start" }} > 
        
        {prefix}
        {node.name}
        {node.children && node.children.length > 0 ? " (Cha)" : ""}
      </option>
      {node.children && node.children.length > 0 &&
        node.children.map((child) => (
          <ListCategory key={child._id} node={child} level={level + 1} excludeId={excludeId} />
        ))
      }
    </>
  );
}
export default ListCategory;