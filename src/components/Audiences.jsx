import React, { useState } from "react";
import axios from "axios";
import '../styles/AudienceList.css';

const AudienceSegmentForm = () => {
  const [name, setName] = useState("");
  const [conditions, setConditions] = useState([
    { field: "", operator: "", value: "", logic: "AND" },
  ]);
  const [audienceSize, setAudienceSize] = useState(0);

  const addCondition = () => {
    setConditions([
      ...conditions,
      { field: "", operator: "", value: "", logic: "AND" },
    ]);
  };

  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const handleConditionChange = (index, key, value) => {
    const newConditions = [...conditions];
    newConditions[index][key] = value;
    setConditions(newConditions);
  };

  const calculateAudienceSize = async () => {
    const formattedConditions = conditions.map((condition) => {
      if (
        condition.field === "totalSpendings" ||
        condition.field === "visits"
      ) {
        condition.value = Number(condition.value);
      }
      return condition;
    });

    try {
      console.log(formattedConditions);
      const response = await axios.post(
        "https://mini-crm-pe3c.onrender.com/api/audiences/calculate",
        { conditions: formattedConditions }
      );
      setAudienceSize(response.data.audienceSize);
    } catch (error) {
      console.error("Error calculating audience size:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mini-crm-pe3c.onrender.com/api/audiences",
        {
          name,
          conditions,
        }
      );
      console.log("Audience Segment created:", response.data);
    } catch (error) {
      console.error("Error saving audience segment:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Audience Segment</h2>
      <form className="audience-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Segment Name:</label>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="conditions-section">
          <h3 className="conditions-title">Conditions</h3>
          {conditions.map((condition, index) => (
            <div className="condition-row" key={index}>
              <select
                className="condition-field"
                value={condition.field}
                onChange={(e) =>
                  handleConditionChange(index, "field", e.target.value)
                }
                required
              >
                <option value="">Select Field</option>
                <option value="totalSpendings">Total Spendings</option>
                <option value="visits">Visits</option>
                <option value="datesVisited">Last Visited</option>
              </select>

              <select
                className="condition-operator"
                value={condition.operator}
                onChange={(e) =>
                  handleConditionChange(index, "operator", e.target.value)
                }
                required
              >
                <option value="">Select Operator</option>
                <option value=">">greater</option>
                <option value="<">smaller</option>
                <option value=">=">≥</option>
                <option value="<=">≤</option>
                <option value="==">==</option>
              </select>

              <input
                className="condition-value"
                type="text"
                value={condition.value}
                onChange={(e) =>
                  handleConditionChange(index, "value", e.target.value)
                }
                required
                placeholder="Enter Value"
              />

              <select
                className="condition-logic"
                value={condition.logic}
                onChange={(e) =>
                  handleConditionChange(index, "logic", e.target.value)
                }
                required
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>

              <button
                className="remove-condition-btn"
                type="button"
                onClick={() => removeCondition(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            className="add-condition-btn"
            type="button"
            onClick={addCondition}
          >
            Add Condition
          </button>
        </div>

        <div className="audience-size-section">
          <button
            className="calculate-size-btn"
            type="button"
            onClick={calculateAudienceSize}
          >
            Calculate Audience Size
          </button>
          <p className="audience-size-display">Audience Size: {audienceSize}</p>
        </div>

        <button className="save-btn" type="submit">
          Save Audience Segment
        </button>
      </form>
    </div>
  );
};

export default AudienceSegmentForm;
