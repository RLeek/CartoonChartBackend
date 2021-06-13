import {Season, Order, Sort} from "../Utilities/types";
import query from "../Utilities/database";

class animationsGateway {
    static SortMap: Record<Sort, string> ={
        views: " order by a.views ",
        rating: " order by a.average_rating ",
        title: " order by a.title ",
        release: " order by a.release "
    };

    static OrderMap: Record<Order, string> ={
        ascending: " asc ",
        descending: " desc "
    };

    public static async filterAnimations(season:Season, year:number, order:Order, sort:Sort) {
        return query(`select a.*, json_agg(g.genre) as genres
        from
            (select *
            from animation a
            where lower(a.season) = $1 and date_part('year', a.release) = $2) as a 
    
            left outer join 
    
            genre g on g.a_id = a.id
    
        group by a.id, a.title, 
        a.synopsis, a.format, 
        a.status, a.season, 
        a.release, a.episodes, 
        a.runtime, a.cover, 
        a.trailer, a.reviews, a.views, 
        a.average_rating`
        
        + this.SortMap[sort] + this.OrderMap[order] + ";",
         [season, year.toString()]);
    }

    public static async locateAnimation(id:number) {
        return query(`
        select a.*, json_agg(g.genre) as genres

            from animation a

            left outer join

            genre g on g.a_id = a.id

            where a.id = $1


        group by a.id, a.title, 
        a.synopsis, a.format, 
        a.status, a.season, 
        a.release, a.episodes, 
        a.runtime, a.cover, 
        a.trailer, a.reviews, a.views, 
        a.average_rating
        
        limit 1

        `
        , 
        [id.toString()]);
    }

    public static async locatePrequels(id:number) {
        return query(`
        select a.*, json_agg(g.genre) as genres
        from
            (select s.prequel as id
            from Sequel s where s.sequel = $1)  as preq
    
            join 
    
            animation a on a.id = preq.id
    
            left outer join 
    
            genre g on g.a_id = preq.id
    
        group by preq.id, a.id;`,
         [id.toString()]);
    }

    public static async locateSequels(id:number) {
        return query(`
        select a.*, json_agg(g.genre) as genres
        from
            (select s.sequel as id
            from Sequel s where s.prequel = $1)  as seq
    
            join
    
            animation a on a.id = seq.id
    
            left outer join 
    
            genre g on g.a_id = seq.id
    
        group by seq.id, a.id;`,
         [id.toString()]);
    }
    
    public static async locateAlternatives(id:number) {
        return query(`
        select a.*, json_agg(g.genre) as genres
        from
            (select alt.alternative as id
            from alternative alt where alt.a_id = $1)  as alt
    
            join 
    
            animation a on a.id = alt.id
    
            left outer join 
    
            genre g on g.a_id = alt.id
    
        group by alt.id, a.id;`,
         [id.toString()]);
    }

    public static async locateOthers(id:number) {
        return query(`
        select a.*, json_agg(g.genre) as genres
        from             
            (select o.other as id
            from Other o where o.a_id = $1)  as o
    
            join 
    
            animation a on a.id = o.id
    
            left outer join 
    
            genre g on g.a_id = o.id
    
        group by o.id, a.id;`,
         [id.toString()]);
    }

    public static async lookupAnimation(id:number) {
        return query(`
        select *
            from animation a
            where id = $1
            `
        , 
        [id.toString()]);
    }
}

export default animationsGateway;