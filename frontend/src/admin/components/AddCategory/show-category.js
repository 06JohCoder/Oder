import { Link } from "react-router-dom";
import { prefixAdmin } from "../../../config/system";

function ShowCategory({ node, level = 0 }) {
    const prefix = "_____ ".repeat(level);

    return (
        <>
            <tr>
                <td>
                    <input type="checkbox" name="id" />
                </td>
                <td>{node._id}</td>
                <td>
                    <img src={node.img} alt={node.name} className="storyHome-img" />
                </td>
                <td>
                    {prefix}
                    {node.name}
                    {node.children && node.children.length > 0 ? " (Cha)" : ""}
                </td>
                <td>{node.status}</td>
                <td>
                    <input
                        type="number"
                        value={node.position}
                        style={{ width: "60px" }}
                        min="1"
                        name="position"
                        readOnly
                    />
                </td>
                <td style={{ display: "flex", gap: "5px" }}>
                    <Link to={`${prefixAdmin}admin/editCategory/${node._id}`}>
                        <button className="admin-btn" type="button">
                            <i className="bi bi-pen"></i>
                        </button>
                    </Link>
                    <button className="admin-btn btn-danger" type="button">
                        <i className="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
            {node.children && node.children.length > 0 &&
                node.children.map((child) => (
                    <ShowCategory key={child._id} node={child} level={level + 1} />
                ))
            }
        </>
    );
}

export default ShowCategory;