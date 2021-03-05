import kruskalMST from './kruskal';
import renderGraph from './renderGraph';

function compareKey(a, b) {
  if (a.key < b.key) {
    return -1;
  }
  if (a.key > b.key) {
    return 1;
  }
  return 0;
}

// Funções de criação de grafo
const adjList = new Map();
const edgesWeight = new Map();

function addNode(repo) {
  adjList.set(repo, []);
}

function addEdge(origin, destination) {
  adjList.get(origin).push(destination);
  adjList.get(destination).push(origin);
}

function addEdgeWeight(origin, destination) {
  let sortedName;
  if (origin < destination) {
    sortedName = `${origin}/${destination}`;
  }
  else {
    sortedName = `${destination}/${origin}`;
  }
  if (edgesWeight.get(sortedName)) {
    edgesWeight.set(sortedName, edgesWeight.get(sortedName) + 1);
  }
  else {
    edgesWeight.set(sortedName, 1);
  }
}

function addAllEdges(reposArray) {
  for (let i = 0; i < reposArray.length; i++) {
    for (let j = i + 1; j < reposArray.length; j++) {
      addEdge(reposArray[i], reposArray[j]);
      addEdgeWeight(reposArray[i], reposArray[j]);
    }
  }
}

function render(MST, newWeigths) {
  const graph = Array.from(MST, ([key, value]) => ({ key, value })).sort(compareKey);
  const edges = Array.from(newWeigths, ([key, value]) => ({ key, value })).sort(compareKey);

  let edgesArray = [];
  const nodes = graph
    .filter(repo => repo.key)
    .map(repo => { return { data: { id: repo.key } } });

  edges
    .filter(repo => repo.value[0] !== null)
    .forEach(repo => {
      let [source, target] = repo.key.split('/');
      edgesArray = edgesArray.concat(
        {
          data: {
            id: repo.key,
            source,
            target
          },
          style: {
            label: repo.value
          }
        });
    })

  const elements = [...nodes, ...edgesArray];
  renderGraph({ elements });
}

function constructGraph({ adjListLanguages, adjListRepos }) {
  const repoNames = Array.from(adjListRepos.keys());
  repoNames.forEach(repo => addNode(repo));

  const reposInLanguages = Array.from(adjListLanguages.values());
  reposInLanguages.forEach(repos => addAllEdges(repos));
  const { MST, newWeigths } = kruskalMST(adjList, edgesWeight);
  render(MST, newWeigths);
}

export default constructGraph;