import { useState } from "react";

const SeedChanger = ({ setter, seed }) => {
  const [val, setVal] = useState("");
  return (
    <div className="control">
      <label>Seed: {seed}</label>
      <input
        name="seed"
        type="number"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />

      <button onClick={() => setter(val)}>set seed</button>
    </div>
  );
};

export default SeedChanger;
