import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Audiences.css';

const Audience = () => {
  const [audiences, setAudiences] = useState([]);

  useEffect(() => {
    const fetchAudiences = async () => {
      try {
        const response = await axios.get(
          "https://mini-crm-pe3c.onrender.com/api/audiences"
        ); // Update with your API endpoint
        setAudiences(response.data);
      } catch (error) {
        console.error('Error fetching audiences:', error);
      }
    };

    fetchAudiences();
  }, []);

  return (
    <div className="audience">
      <h1>Audience Segments</h1>
      <div className="audience-list">
        {audiences.length === 0 ? (
          <p>No audience segments found.</p>
        ) : (
          audiences.map((audience) => (
            <div className="audience-card" key={audience._id}>
              <h2>{audience.name}</h2>
              <p>
                <strong>Audience Size:</strong> {audience.audienceSize}
              </p>
              <h3>Conditions:</h3>
              <ul>
                {audience.conditions.map((condition, index) => (
                  <li key={index}>
                    {condition.field} {condition.operator} {condition.value} (
                    {condition.logic})
                  </li>
                ))}
              </ul>
              <h3>Customers:</h3>
              <ul className="customer-names-list">
                {audience.customerNames.map((name, index) => (
                  <li key={index} className="customer-name-item">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Audience;
