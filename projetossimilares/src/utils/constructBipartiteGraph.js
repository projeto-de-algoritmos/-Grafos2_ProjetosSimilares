import constructGraph from './constructGraph';

// Primeiro, criamos um grafo bipartido de repositorios e linguagens
const adjListLanguages = new Map();
const adjListRepos = new Map();

function addNode(repo) {
  adjListRepos.set(repo.name, []);
  for (let language of repo.languages) {
    if(!adjListLanguages.get(language)){
      adjListLanguages.set(language, []);
    }
    addEdge(repo.name, language);
  }
}

function addEdge(origin, destination) {
  adjListRepos.get(origin).push(destination);
  adjListLanguages.get(destination).push(origin);
}

function constructBipartiteGraph(arrayOfRepos) {
  arrayOfRepos.forEach(addNode);
  constructGraph({adjListLanguages, adjListRepos});
}

export default constructBipartiteGraph;