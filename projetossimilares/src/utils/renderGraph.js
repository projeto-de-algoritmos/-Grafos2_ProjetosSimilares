import cytoscape from 'cytoscape';
import avsdf from 'cytoscape-avsdf';

cytoscape.use(avsdf);

const renderGraph = (props) => cytoscape({

  container: document.getElementById('cy'), // container to render in

  elements: props.elements,

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#531e5e',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#bbb0bb',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'none',
        'curve-style': 'bezier'
      }
    }
  ],

  layout: {
    name: 'breadthfirst',

    fit: true, // whether to fit the viewport to the graph
    directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: 30, // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
    spacingFactor: 1.0, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    roots: undefined, // the roots of the trees
    maximal: false, // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only)
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled,
    animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) { return position; }
    // name: 'concentric',

    // fit: false, // whether to fit the viewport to the graph
    // padding: 50, // the padding on fit
    // startAngle: 3 / 2 * Math.PI, // where nodes start in radians
    // sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    // clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    // equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
    // minNodeSpacing: 100, // min spacing between outside of nodes (used for radius adjustment)
    // boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    // avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    // nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    // height: undefined, // height of layout area (overrides container height)
    // width: undefined, // width of layout area (overrides container width)
    // spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    // concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
    //   const bg = node._private.style["background-color"];
    //   if(bg){
    //     return bg.value[0];
    //   }
    //   return 0;
    // },
    // levelWidth: function( nodes ){ // the variation of concentric values in each level
    // return  nodes.maxDegree() / 4;
    // },
    // animate: true, // whether to transition the node positions
    // animationDuration: 500, // duration of animation in ms if enabled
    // animationEasing: undefined, // easing of animation if enabled
    // animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    // ready: undefined, // callback on layoutready
    // stop: undefined, // callback on layoutstop
    // transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
  }
});

export default renderGraph;