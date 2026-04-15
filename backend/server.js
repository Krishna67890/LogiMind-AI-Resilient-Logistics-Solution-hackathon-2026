const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { calculateDijkstra } = require('./utils/dijkstra');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Mock Data: Logistics Network (Weighted Graph)
// node1 -> [{node: node2, weight: w}]
const graph = {
  "Warehouse A": [ {node: "City B", weight: 10}, {node: "City C", weight: 15} ],
  "City B": [ {node: "Warehouse A", weight: 10}, {node: "City D", weight: 12}, {node: "City E", weight: 15} ],
  "City C": [ {node: "Warehouse A", weight: 15}, {node: "City E", weight: 10}, {node: "City F", weight: 20} ],
  "City D": [ {node: "City B", weight: 12}, {node: "Distribution Center", weight: 5}, {node: "City F", weight: 8} ],
  "City E": [ {node: "City B", weight: 15}, {node: "City C", weight: 10}, {node: "Distribution Center", weight: 10} ],
  "City F": [ {node: "City C", weight: 20}, {node: "City D", weight: 8}, {node: "Distribution Center", weight: 12} ],
  "Distribution Center": [ {node: "City D", weight: 5}, {node: "City E", weight: 10}, {node: "City F", weight: 12} ]
};

const locations = {
  "Warehouse A": { lat: 40.7128, lng: -74.0060 },
  "City B": { lat: 40.7306, lng: -73.9352 },
  "City C": { lat: 40.6782, lng: -73.9442 },
  "City D": { lat: 40.7484, lng: -73.9857 },
  "City E": { lat: 40.7580, lng: -73.9855 },
  "City F": { lat: 40.7200, lng: -73.9900 },
  "Distribution Center": { lat: 40.7831, lng: -73.9712 }
};

app.get('/api/routes', (req, res) => {
  res.json({ graph, locations });
});

app.post('/api/optimize', (req, res) => {
  const { start, end, activeDisruptions } = req.body;

  // Clone graph to apply disruptions
  const dynamicGraph = JSON.parse(JSON.stringify(graph));

  if (activeDisruptions && activeDisruptions.length > 0) {
    activeDisruptions.forEach(disruption => {
      const { from, to, factor } = disruption;
      // Find the edge in the adjacency list
      if (dynamicGraph[from]) {
        const edge = dynamicGraph[from].find(e => e.node === to);
        if (edge) {
            edge.weight *= factor;
        }
      }
    });
  }

  const result = calculateDijkstra(dynamicGraph, start || "Warehouse A", end || "Distribution Center");
  const originalResult = calculateDijkstra(graph, start || "Warehouse A", end || "Distribution Center");

  res.json({
    path: result.path,
    distance: result.distance,
    originalPath: originalResult.path,
    originalDistance: originalResult.distance,
    stats: {
      deliveryTime: Math.floor(result.distance * 1.5), // Mock scale
      efficiency: Math.max(70, 100 - (result.distance / 2)),
      risk: activeDisruptions?.length > 0 ? 45 : 5
    }
  });
});

app.post('/api/simulate', (req, res) => {
  const { scenario } = req.body;

  const disruptionPool = [
    { from: "Warehouse A", to: "City B", type: "Rain", factor: 2.5, msg: "HEAVY STORM: Route A-B compromised." },
    { from: "City C", to: "City E", type: "Traffic", factor: 3.5, msg: "GRIDLOCK: Massive congestion near City C." },
    { from: "City B", to: "City D", type: "Accident", factor: 6.0, msg: "CRITICAL: Major accident on Route B-D." }
  ];

  const disruption = scenario === 'none' ? null : (disruptionPool.find(d => d.type === scenario) || disruptionPool[0]);

  if (disruption) {
    io.emit('disruption_alert', disruption);
  }

  res.json({ status: "Simulation Updated", disruption });
});

io.on('connection', (socket) => {
  console.log('Control Center Linked:', socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`LogiMind AI Backend operational on port ${PORT}`);
});
