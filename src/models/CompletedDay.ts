export default class CompletedDay {
    id: string;
    date: string; // ISO format: 'YYYY-MM-DD'
    frequency: number;
    frequencyInDate: number;
    done: boolean;
    
    constructor(
        id: string,
        date: string,
        frequency: number,
        done: boolean,
    ) {
        this.id = id,
        this.date = date;
        this.frequency = frequency;
        this.frequencyInDate = frequency;
        this.done = done
    }
};