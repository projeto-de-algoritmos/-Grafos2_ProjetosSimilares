import kruskalMST from './kruskal';

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

function addEdgeWeight(origin, destination){
  let sortedName;
  if(origin<destination){
    sortedName = `${origin}/${destination}`;
  }
  else{
    sortedName = `${destination}/${origin}`;
  }
  if(edgesWeight.get(sortedName)){
    edgesWeight.set(sortedName, edgesWeight.get(sortedName)+1);
  }
  else{
    edgesWeight.set(sortedName, 1);
  }
}

function addAllEdges(reposArray){
  for(let i=0; i< reposArray.length; i++){
    for(let j=i+1; j<reposArray.length; j++){
      addEdge(reposArray[i], reposArray[j]);
      addEdgeWeight(reposArray[i], reposArray[j]);
    }
  }
}

function constructGraph({adjListLanguages, adjListRepos}){
  const repoNames = Array.from(adjListRepos.keys());
  repoNames.forEach(repo => addNode(repo));

  const reposInLanguages = Array.from(adjListLanguages.values());
  reposInLanguages.forEach(repos => addAllEdges(repos));
  const MST = kruskalMST(adjList, edgesWeight);
  //console.log(MST);
}


export default constructGraph;