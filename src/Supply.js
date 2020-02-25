import PieceOfSupply from './PieceOfSupply.js';

export default function Supply(nodesInfo, supplyName = 'default-name'){
    this.nodes = {};
    this.currentNode = {};
    this.currentIndex = 1;
    this.size = 0;

    for(const node in nodesInfo){
        this.size++
        this.nodes[node] = new PieceOfSupply(supplyName);
        this.nodes[node].setId(`${supplyName}-piece-${node}`);
    };

    for(const node in this.nodes){
        for(const direction in nodesInfo[node]){
            this.nodes[node].directions[direction] = this.nodes[nodesInfo[node][direction]];
        };
    };

    this.currentNode = this.nodes[1]

    this.getCurrentNode = function(){
        return this.currentNode;
    };

    this.nextNode = function(){
        if(this.currentIndex < this.size){
            this.currentIndex++;
            this.currentNode = this.nodes[this.currentIndex];
        } else {
            return 'Are you already in the last node'
        };
    };

    this.applyToAllNodes = function(applicable){
        for(const node in this.nodes){
            applicable(this.nodes[node])
        }
    }

    this.__clearAllNodesCoordinates = function() {
        for(const node in this.nodes){
            this.nodes[node].clearCoordinates()
        }
    }

    this.restartAllNodes = function(){
        this.__clearAllNodesCoordinates();
        this.currentIndex = 1;
        this.currentNode = this.nodes[this.currentIndex];
    };
};