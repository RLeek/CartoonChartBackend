import { StringMappingType } from "typescript";

const season= ["summer", "autumn", "winter", "spring"] as const;
type Season = typeof season[number];
const seasonValues = season as ReadonlyArray<string>;

const order = ["ascending", "descending"] as const;
type Order = typeof order[number];
const orderValues = order as ReadonlyArray<string>;

const sort = ["views", "rating", "title", "release"] as const;
type Sort = typeof sort[number];
const sortValues = sort as ReadonlyArray<string>;

const specificity = ["season", "month", "date"]
type Specificity =   typeof specificity[number];
const specificityValues = sort as ReadonlyArray<string>;

type Animation = {
    id: number,
    title: string,
    synopsis:string,
    format: string,
    status: string,
    release: {
        specificty: Specificity,
        date:Date
    }
    episodes: number,
    runtime: number,
    cover: string,
    trailer: string,
    views:number,
    reviews:number,
    average_rating:number,
    genres:string[],
    sequels?:Animation[];
    prequels?:Animation[];
    alternatives?:Animation[];
    others?:Animation[];
}



export {Animation, seasonValues, Season, orderValues, Order, sortValues, Sort};