import type CompletedDay from "./CompletedDay";

export default class Habit {
    id: string;
    name: string;
    description: string;
    frequency: number;
    color: number;
    daysOfTheWeek: number[];
    completedDays?: CompletedDay[];
    schedules?: string[]

    constructor(
        id: string,
        name: string,
        description: string,
        frequency: number,
        color: number,
        daysOfTheWeek: number[],
        completedDays?: CompletedDay[],
        schedules?: string[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.frequency = frequency;
        this.color = color;
        this.daysOfTheWeek = daysOfTheWeek;
        this.completedDays = completedDays;
        this.schedules = schedules;
    }
}
