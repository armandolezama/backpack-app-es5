import { LitElement, html, css } from 'lit-element';
import Bag from './Bag.js'
import Supply from './Supply.js'

export class BackpackComponent extends LitElement {

    static get styles() {
        return css`
            .bag{
                border:1px solid red;
            }
        `
    }

    static get properties() {
        return {
            backPack: {type: Map}
        };
    };

    constructor() {
        super();
        this.backPack = new Map([
            ['main bag',{isOpened:false, stuff:  new Bag(15, 15)}],
            ['left bag',{isOpened:false, stuff:  new Bag(6, 6)}],
            ['right bag',{isOpened:false, stuff:  new Bag(6, 6)}],
            ['front bag',{isOpened:false, stuff:  new Bag(10, 10)}]
        ]);
        this.supply = new Supply({
            1:{
                up: 3,
                right: 2
            },
            2:{
                up: 4,
                left: 1
            },
            3:{
                right: 4,
                down: 1
            },
            4:{
                down: 2,
                left: 3
            }
        }, 'test')
    };

    firstUpdated(){
        this.__setAttributte('main-bag');
        this.__setAttributte('left-bag');
        this.__setAttributte('right-bag');
        this.__setAttributte('front-bag');
    };

    __setAttributte(nodeId){
        const idTransformed = nodeId.split('-').join(' ');
        this.shadowRoot.querySelector(`#${nodeId}`).setAttribute("bag", idTransformed);
    };

    __openOrCloseBag(event){
        const node = event.currentTarget;
        const newState = !this.backPack.get(node.getAttribute('bag')).isOpened;
        this.backPack.get(node.getAttribute('bag')).isOpened = newState;
        this.__setStatus(node, newState);
    };

    __setStatus(node, newState){
        newState ? node.querySelector('.status').innerHTML = 'Opened' : node.querySelector('.status').innerHTML = 'Closed'
    };

    // __addNewSupply(bag, supplyName, supplySize){
    //     if(this.backPack.get(bag).isOpened){
    //         this.backPack.get(bag).stuff.set(supplyName, supplySize);
    //     } else {
    //         alert('Bag is closed')
    //     }
    // }

    render() {
        return html`
            <div style="border:1px solid black;"> 
                <h3>Bag</h3>
                <section style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" unselectable="on" onselectstart="return false;" onmousedown="return false;" @click="${this.__openOrCloseBag}" class="bag" id="main-bag">
                    <h3>Main bag</h3>
                    <p class="status">Closed</p>
                    <p class="error"></p>
                </section>
                <section style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" unselectable="on" onselectstart="return false;" onmousedown="return false;" @click="${this.__openOrCloseBag}" class="bag" id="left-bag">
                    <h3>Left bag</h3>
                    <p class="status">Closed</p>
                    <p class="error"></p>
                </section>
                <section style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" unselectable="on" onselectstart="return false;" onmousedown="return false;" @click="${this.__openOrCloseBag}" class="bag" id="right-bag">
                    <h3>Right bag</h3>
                    <p class="status">Closed</p>
                    <p class="error"></p>
                </section>
                <section style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" unselectable="on" onselectstart="return false;" onmousedown="return false;" @click="${this.__openOrCloseBag}" class="bag" id="front-bag">
                    <h3>Front bag</h3>
                    <p class="status">Closed</p>
                    <p class="error"></p>
                </section>
            </div>
            <div style="border:1px solid black;">
                <h3>Supplies</h3>
                <!-- <button name="Cuaderno" @click="${this.__addNewSupply}">Cuaderno</button>
                <button name="Lápiz" @click="${this.__addNewSupply}">Lápiz</button>
                <button name="Pluma" @click="${this.__addNewSupply}">Pluma</button>
                <button name="Borrador" @click="${this.__addNewSupply}">Borrador</button>
                <button name="Libro" @click="${this.__addNewSupply}">Libro</button> -->
            </div>
        `;
    }
}
customElements.define('backpack-component', BackpackComponent);