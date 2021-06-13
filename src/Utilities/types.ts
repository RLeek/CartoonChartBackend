const season= ["summer", "autumn", "winter", "spring"] as const;
type Season = typeof season[number];
const seasonValues = season as ReadonlyArray<string>;

const order = ["ascending", "descending"] as const;
type Order = typeof order[number];
const orderValues = order as ReadonlyArray<string>;

const sort = ["views", "rating", "title", "release"] as const;
type Sort = typeof sort[number];
const sortValues = sort as ReadonlyArray<string>;

type Animation = {
    id: number,
    title: string,
    synopsis:string,
    format: string,
    status: string,
    release: Date,
    season: string,
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