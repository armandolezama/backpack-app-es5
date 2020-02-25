


export default function Cell (node = {}){
    this.node = node;
    this.coordinates = [];
    this.status = 'Empty';
    this.occuped = false;
    this.setStatus = true;
    this.directions = {
        left: undefined,
        right: undefined,
        up: undefined,
        down: undefined
    };

    this.isEmpty = function(node){
        for(const key in node){
            if(node.hasOwnProperty(key)){
                return false
            }
        }
        return true
    }
    this.setNode = function(node){
        if(!this.isEmpty(node) && this.isEmpty(this.node)){
            this.node = node;
            this.setStatus = true;
            this.changeStatus();
        };
    };

    this.changeStatus = function () {
        if(this.setStatus){
            this.occuped = !this.occuped;

            if(this.status === 'Occuped') {
                this.status = 'Empty';
            } else if (this.status === 'Empty') {
                this.status = 'Occuped';
            };
            this.setStatus = false;
        };
    };

    this.getStatus = function(){
        return this.status;
    }

    this.isOccuped = function(){
        return this.occuped;
    }

    this.delNode = function(){
        this.node = {};
        this.setStatus = true;
        this.delCoordinates();
        this.changeStatus();
    };

    this.setCoordinates = function(newCoordinates) {
        this.coordinates = newCoordinates;
    };

    this.getCoordinates = function(){
        return this.coordinates;
    }
    
    this.delCoordinates = function(){
     this.coordinates = [];
    };

    this.getUsedDirections = function(){
        let directions = [];
        for(const direction in this.directions){
            if (this.directions[direction] !== undefined){
                directions = [...directions, direction];
            }
        }

        return directions.length > 0 ? directions : ['None direction used'];
    }
}

//Refactor: get one cell abstract class and inheritance to supply and backpack cells;