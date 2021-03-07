import PriorityQueue from './priorityqueue';

let unionFind = {}
let newWeigths = new Map();

function addNode(graph, node) {
    graph.set(node, []);
}

function addEdge(graph, origin, destination, weigth) {
    graph.get(origin).push(destination);
    graph.get(destination).push(origin);
    let sortedName;
    if (origin < destination) {
        sortedName = `${origin}/${destination}`;
    }
    else {
        sortedName = `${destination}/${origin}`;
    }
    newWeigths.set(sortedName, weigth);
}

function createUnionFind(elements) {
    unionFind.parent = {}

    elements.forEach(e => (unionFind.parent[e] = e))
}

function union(a, b) {
    let rootA = find(a);
    let rootB = find(b);

    if (rootA === rootB) {
        return;
    }

    if (rootA < rootB) {
        if (unionFind.parent[b] !== b) {
            union(unionFind.parent[b], a);
        }
        unionFind.parent[b] = unionFind.parent[a];
    }
    else {
        if (unionFind.parent[a] !== a) {
            union(unionFind.parent[a], b);
        }
        unionFind.parent[a] = unionFind.parent[b];
    }
}

function find(element) {
    let aux = element;
    while (unionFind.parent[aux] !== aux) {
        aux = unionFind.parent[aux];
    }
    return aux;
}

function connected(a, b) {
    return find(a) === find(b)
}

function kruskalMST(graph, weights) {
    let MST = new Map();
    graph.forEach((_, node) => addNode(MST, node));
    if (MST.size === 0) {
        return MST;
    }

    let edgeQueue = new PriorityQueue();

    weights.forEach((weight, edge) => {
        edgeQueue.enqueue(edge, weight);
    })

    createUnionFind(Array.from(graph.keys()));

    while (!edgeQueue.isEmpty()) {
        let nextEdge = edgeQueue.dequeue();
        let nodes = nextEdge.element.split('/');
        let weight = nextEdge.priority;
        if(!connected(nodes[0], nodes[1])){
            addEdge(MST, nodes[0],nodes[1], weight);
            union(nodes[0], nodes[1]);
        }
    }
    return {MST, newWeigths};

}

export default kruskalMST;