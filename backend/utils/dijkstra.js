/**
 * LogiMind AI - Dijkstra Algorithm Implementation
 * Optimized for dynamic weight scaling based on disruption factors.
 */

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }
    dequeue() {
        return this.values.shift();
    }
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

function calculateDijkstra(graph, startNode, endNode) {
    const distances = {};
    const nodes = new PriorityQueue();
    const previous = {};
    let path = [];
    let smallest;

    // Initial state
    for (let vertex in graph) {
        if (vertex === startNode) {
            distances[vertex] = 0;
            nodes.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }

    while (nodes.values.length) {
        smallest = nodes.dequeue().val;

        if (smallest === endNode) {
            while (previous[smallest]) {
                path.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }

        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor in graph[smallest]) {
                // Calculate new distance to neighbor
                let nextNode = graph[smallest][neighbor];
                let candidate = distances[smallest] + nextNode.weight;
                let nextNeighbor = nextNode.node;

                if (candidate < distances[nextNeighbor]) {
                    distances[nextNeighbor] = candidate;
                    previous[nextNeighbor] = smallest;
                    nodes.enqueue(nextNeighbor, candidate);
                }
            }
        }
    }

    return {
        path: path.concat(startNode).reverse(),
        distance: distances[endNode]
    };
}

module.exports = { calculateDijkstra };
