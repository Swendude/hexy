import { useDispatch, useSelector } from "react-redux";
import { showLifeForm } from "../features/storymaster/storymasterSlice";

const LifeFormInspector = ({ lifeforms }) => {
  const dispatch = useDispatch();
  const lifeform_selected = useSelector(
    (state) => state.storymaster.showLifeform
  );
  return (
    <div className="control">
      <label>Show lifeform evaluation</label>
      <select
        name="lifeform"
        value={lifeform_selected}
        onChange={(e) => dispatch(showLifeForm({ lifeform: e.target.value }))}
      >
        <option value={""}>none</option>
        {lifeforms.map((lf, i) => (
          <option key={i} value={lf["kin-name-plural"]}>
            {lf["kin-name-plural"]}
          </option>
        ))}
      </select>

      <button onClick={() => dispatch(showLifeForm({ lifeform: "" }))}>
        hide
      </button>
    </div>
  );
};

export default LifeFormInspector;
