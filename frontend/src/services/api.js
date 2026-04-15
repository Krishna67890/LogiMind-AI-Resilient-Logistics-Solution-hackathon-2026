import { io } from 'socket.io-client';

const API_BASE = 'http://localhost:5000/api';
export const socket = io('http://localhost:5000');

export const getRoutes = async () => {
  try {
    const res = await fetch(`${API_BASE}/routes`);
    return await res.json();
  } catch (error) {
    console.error("API Error (getRoutes):", error);
    return { graph: {}, locations: {} };
  }
};

export const optimizeRoute = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.error("API Error (optimizeRoute):", error);
    return null;
  }
};

export const runSimulation = async (scenario) => {
  try {
    const res = await fetch(`${API_BASE}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario })
    });
    return await res.json();
  } catch (error) {
    console.error("API Error (runSimulation):", error);
    return null;
  }
};
