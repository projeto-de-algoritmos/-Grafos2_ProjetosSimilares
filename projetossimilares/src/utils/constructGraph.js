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

// function addEdgeWeight(origin, destination){
//   const sortedName = sort([origin, destination]); 
// }

function addAllEdges(reposArray){
  for(let i=0; i< reposArray.length; i++){
    for(let j=i+1; j<reposArray.length; j++){
      addEdge(reposArray[i], reposArray[j]);
    }
  }
}

function constructGraph({adjListLanguages, adjListRepos}){
  const repoNames = Array.from(adjListRepos.keys());
  repoNames.forEach(repo => addNode(repo));

  const reposInLanguages = Array.from(adjListLanguages.values());
  reposInLanguages.forEach(repos => addAllEdges(repos));
  console.log(adjList);
}

export default constructGraph;