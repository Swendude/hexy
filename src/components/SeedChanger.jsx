import { useState } from "react";

const SeedChanger = ({ setter }) => {
  const [val, setVal] = useState("");
  return (
    <div>
      <input value={val} onChange={(e) => setVal(e.target.value)} />
      <button onClick={() => setter(val)}>set seed</button>
    </div>
  );
};

export default SeedChanger;
