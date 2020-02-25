export default function PieceOfSupply(name){
    this.id = '';
    this.name = `${name}-piece`;
    this.directions = {
        left: undefined,
        right: undefined,
        up: undefined,
        down: undefined
    };
    this.coordinates = [];

    this.setId = function(id){
        this.id = id;
    };
    
    this.linkTo = function(direction, node){
        this.directions[direction] = node;
    };

    this.setCoordinates = function(newCoordinate) {
        this.coordinates = newCoordinate;
    }

    this.clearCoordinates = function(){
        this.coordinates = [];
    }

    this.getCoordinates = function(){
        return this.coordinates;
    }
    
    this.getUsedDirections = function(){
        let directions = [];
        for(const direction in this.directions){
            if (this.directions[direction] !== undefined){
                directions = [...directions, direction];
            }
        }

        return directions.length > 0 ? directions : 'None direction used';
    };
};