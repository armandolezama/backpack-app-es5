import Cell from './Backpack-cell';
import Supply from './Supply';

export default function Bag(height = 0, width = 0){
    this.height = height;
    this.width = width;
    this.bagSpace = [];

    [height, width]

    this.takeSupply = function (supplyName) {
        supplyName
    };

    this.inspectSupply = function (supplyName) {
        supplyName
    };

    this.getAllSupplies = function () {

    };

    this.applyToAllCells = function(applicable){
        for(const row of this.bagSpace){
            for(const cell of row){
                applicable(cell)
            };
        };
    };

    this.__linkTo = function(cell, direction){
        
        if(direction === 'up'){
            cell.directions.up = this.bagSpace[cell.getCoordinates()[0] -1][cell.getCoordinates()[1]];
            this.bagSpace[cell.getCoordinates()[0] -1][cell.getCoordinates()[1]].directions.down = cell;
        };

        if(direction === 'down'){
            cell.directions.down = this.bagSpace[cell.getCoordinates()[0] + 1][cell.getCoordinates()[1]];
            this.bagSpace[cell.getCoordinates()[0] + 1][cell.getCoordinates()[1]].directions.up = cell;
        };

        if(direction === 'left'){
            cell.directions.left = this.bagSpace[cell.getCoordinates()[0]][cell.getCoordinates()[1] - 1];
            this.bagSpace[cell.getCoordinates()[0]][cell.getCoordinates()[1] - 1].directions.right = cell;
        };

        if(direction === 'right'){
            cell.directions.right = this.bagSpace[cell.getCoordinates()[0]][cell.getCoordinates()[1] + 1];
            this.bagSpace[cell.getCoordinates()[0]][cell.getCoordinates()[1] + 1].directions.left = cell;
        };
    }
    this.__linkAllNodes = function () {
        for(let row = 0; row < this.bagSpace.length; row++){
            for(let cell = 0; cell < this.bagSpace[row].length; cell++){
                if(cell !== this.width - 1){
                    this.__linkTo(this.bagSpace[row][cell], 'right');
                };

                if(row !== this.height - 1){
                    this.__linkTo(this.bagSpace[row][cell], 'down');
                };

                if(cell !== 0){
                    this.__linkTo(this.bagSpace[row][cell], 'left');
                };

                if(row !== 0){
                    this.__linkTo(this.bagSpace[row][cell], 'up');
                };
            };
        };
    };

    this.__isValidCell = function(bagNode, supply){
        supply.restartAllNodes();
        const firstBagCell = bagNode
        const firstSupplyCell = supply.getCurrentNode();
        let isValid = true;
        if(firstBagCell.isOccuped()){
            isValid = false;
            supply.restartAllNodes()
        } else {
            firstSupplyCell.setCoordinates(firstBagCell.getCoordinates())
            for(const direction of firstSupplyCell.getUsedDirections()){
                if(firstBagCell.directions[direction] === undefined || firstBagCell.directions[direction].isOccuped()){
                    isValid = false
                    supply.restartAllNodes()
                } else if (isValid) {
                    firstSupplyCell.directions[direction].setCoordinates(firstBagCell.directions[direction].getCoordinates());
                }
            };
            
            while(!supply.nextNode() && isValid){
                const bagCell = this.bagSpace[supply.getCurrentNode().getCoordinates()[0]][supply.getCurrentNode().getCoordinates()[1]]
                const supplyCell = supply.getCurrentNode();
                if(bagCell.isOccuped()){
                    isValid = false;
                    supply.restartAllNodes()
                } else if(isValid) {
                    supplyCell.setCoordinates(bagCell.getCoordinates())
                    for(const direction of supplyCell.getUsedDirections()){
                        if(bagCell.directions[direction] === undefined || bagCell.directions[direction].isOccuped()){
                            isValid = false;
                            supply.restartAllNodes();
                        } else if(isValid){
                            supplyCell.directions[direction].setCoordinates(bagCell.directions[direction].getCoordinates());;
                        }
                    };
                };
            }
        };

        return isValid;
    };

    this.__createSpace = function(){
        let newSpace = [];
        for(let i = 0; i < this.height; i++){
            const rowPosition = i;
            let row = [];
            for(let j = 0;j < this.width; j++){
                const columPosition = j;
                const newCell = new Cell();
                newCell.setCoordinates([rowPosition, columPosition])
                row = [...row, newCell]
            }
            newSpace = [...newSpace, row]
        }
        this.bagSpace = newSpace;
        this.__linkAllNodes();
    }

    this.__putSupply = function(supply){
        supply.currentIndex = 0;
        while(!supply.nextNode()){
            if(typeof supply.getCurrentNode().getUsedDirections() !== 'string'){
                const supplyNodeCoordinates = supply.getCurrentNode().getCoordinates();
                const bagCell = this.bagSpace[supplyNodeCoordinates[0]][supplyNodeCoordinates[1]]
                bagCell.node = supply.getCurrentNode()
            } else {
                supply.currentIndex = supply.size;
            }
        }
    }

    
    this.addSupply = function(supply) {
        //Find reference**
        //Insert reference node of supply in reference node in bagSpace
        //find nex supply node can be setted in next bagspace node
        //if all supply can be setted, then, set supply and end
        //else find reference
        //if all nodes are explored return supply can't be setted, not enough space**

        for(let column = 0; column < this.width; column++){
            for(let row = 0; row < this.height; row++){
                if(this.__isValidCell(this.bagSpace[row][column], supply)){
                    column = this.height;
                    row = this.width;
                    this.__putSupply(supply)
                } else if(row === this.width -1 && column === this.height - 1){
                    return [`Supply can't be setted, not enough space`]
                }
                
            }
        }
    }

    this.__createSpace();
}

