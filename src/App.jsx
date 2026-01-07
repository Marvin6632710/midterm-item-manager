import { useState } from "react";
import "./App.css";

import deleteIcon from "./assets/delete.svg";
import pen from "./assets/ink_pen.svg";
import fork from "./assets/flatware.svg";
import plug from "./assets/electrical_services.svg";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [nextId, setNextId] = useState(1);

  const getCategoryIcon = (cat) => {
    if (cat === "Stationary") return pen;
    if (cat === "Kitchenware") return fork;
    if (cat === "Appliance") return plug;
    return "";
  };

  const addItem = () => {
    // validation
    if (name.trim() === "") {
      setError("Item name must not be empty");
      return;
    }

    const duplicated = items.some(
      (i) => i.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicated) {
      setError("Item must not be duplicated");
      return;
    }

    if (category === "") {
      setError("Please select a category");
      return;
    }

    if (price === "" || Number(price) < 0) {
      setError("Price must not be less than 0");
      return;
    }

    const newItem = {
      id: nextId,
      name,
      category,
      price,
    };

    setItems([...items, newItem]);
    setNextId(nextId + 1);

    // reset form
    setName("");
    setCategory("");
    setPrice("");
    setError("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Item Management</h1>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>

          {/* FORM ROW */}
          <tr>
            <td></td>
            <td>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="Stationary">Stationary</option>
                <option value="Kitchenware">Kitchenware</option>
                <option value="Appliance">Appliance</option>
              </select>
            </td>
            <td>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </td>
            <td>
              <button onClick={addItem}>Add Item</button>
            </td>
          </tr>
        </thead>

        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>
                <img
                  src={getCategoryIcon(i.category)}
                  alt={i.category}
                  width="24"
                />
              </td>
              <td>{i.price}</td>
              <td>
                <img
                  src={deleteIcon}
                  alt="delete"
                  width="20"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteItem(i.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ERROR MESSAGE */}
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </div>
  );
}
