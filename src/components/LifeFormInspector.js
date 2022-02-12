import { useState } from "react";
import { useDispatch } from "react-redux";
import { showLifeForm } from "../features/storymaster/storymasterSlice";

const LifeFormInspector = ({ lifeforms }) => {
  const [val, setVal] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="control">
      <label>
        Lifeform value
        <select
          name="lifeform"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        >
          <option value={""}>none</option>
          {lifeforms.map((lf, i) => (
            <option key={i} value={lf["kin-name-plural"]}>
              {lf["kin-name-plural"]}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => dispatch(showLifeForm({ lifeform: val }))}>
        show lifeform
      </button>
    </div>
  );
};

export default LifeFormInspector;
