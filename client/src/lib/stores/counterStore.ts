import {makeAutoObservable} from "mobx";

export default class CounterStore {
    title: string = 'CounterStore';
    count: number = 42;
    events: string[] = [`The initial count is ${this.count}`];  
    
    constructor() {
        makeAutoObservable(this);
    }
    
    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`The count is incremented by ${amount}. Count is now ${this.count}`);
    }
    
    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`The count is decremented by ${amount}. Count is now ${this.count}`);
    }
    
    get eventsCount() {
        return this.events.length;
    }
}