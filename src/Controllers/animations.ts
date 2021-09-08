//animations controller
import { Context } from "koa";
import {Season, seasonValues, Order, orderValues, Sort, sortValues} from "../Utilities/types";
import animationsGateway from "../Gateways/animations";
import transformer from "../Utilities/transformers";
import send from "koa-send";
//Responsibility:
    //Extracts ctx values into desired arguments
    //Converts sql values into desired respons
    //Acts as glue between databases and desired values

class animationsController {

    public static async filterAnimations(ctx:Context) {
        let season:Season;
        let year:number;
        let order:Order;
        let sort:Sort;
        let seasonType:boolean;

        //First perform error checking
        if (!ctx.query.year || Array.isArray(ctx.query.year)||!(/^\d+$/.test(ctx.query.year))) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL parameters"};
            return;
        } 
        year = parseInt(ctx.query.year, 10);

        if (!ctx.query.season  || Array.isArray(ctx.query.season)|| !seasonValues.includes(ctx.query.season)) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL parameters"};
            return;  
        } 
        season = ctx.query.season as Season;

        if (!ctx.query.order  || Array.isArray(ctx.query.order)|| !orderValues.includes(ctx.query.order)) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL parameters"};
            return;
        }
        order = ctx.query.order as Order;

        if (!ctx.query.sort  || Array.isArray(ctx.query.sort)|| !sortValues.includes(ctx.query.sort)) {
            ctx.status = 400;
            ctx.body = {"error": "Invalid or incorrect URL parameters"};
            return;
        }
        sort = ctx.query.sort as Sort;

        if (ctx.query.seasonType && (Array.isArray(ctx.query.seasonType) || !(ctx.query.seasonType == "year"))) {
            ctx.status = 400;
            ctx.body = {"error": "Invalid or incorrect URL parameters"};
            return;
        }
        seasonType = ctx.query.seasonType ? true : false; 

        //Then call gateways
        var animations:any = await animationsGateway.filterAnimations(season, seasonType, year, order, sort);
        animations = transformer.transformAnimations(animations.rows);
        ctx.body = {data:animations}
    }

    public static async locateAnimation(ctx:Context) {
        let id:number;
        let relations:boolean;

        //First perform error checking
        if (!(/^\d+$/.test(ctx.params.id))) {
            ctx.status = 404;
            ctx.body = {"error":"Animation doesn't exist"};
            return;
        } 

        id = parseInt(ctx.params.id, 10);

        if (ctx.query.include && (Array.isArray(ctx.query.id) || !(ctx.query.include === "relations"))) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL parameters"};
            return;
        }

        relations = ctx.query.include ? true : false; 
        
        //Check if resource exists first    
        if ((await animationsGateway.lookupAnimation(id))!.rowCount == 0) {
            ctx.status = 404;
            ctx.body = {"error":"Animation doesn't exist"};
            return;
        }


        //Then call gateways
        var animation:any = await animationsGateway.locateAnimation(id);
        animation = transformer.transformAnimation(animation.rows[0]);

        if (relations) {
            var sequels:any  = await animationsGateway.locateSequels(id); 
            sequels = transformer.transformAnimations(sequels.rows);

            var prequels:any  = await animationsGateway.locatePrequels(id); 
            prequels = transformer.transformAnimations(prequels.rows);

            var alternatives:any  = await animationsGateway.locateAlternatives(id); 
            alternatives = transformer.transformAnimations(alternatives.rows);

            var others:any  = await animationsGateway.locateOthers(id); 
            others = transformer.transformAnimations(others.rows);

            animation.sequels = {data:sequels}
            animation.prequels = {data:prequels}
            animation.others = {data:others}
            animation.alternatives = {data:alternatives}
        }

        ctx.body = {data: animation} //Fix later (potentially be defining type for ctx.body) 

    }

    public static async locateCover(ctx:Context) {
        let id:number;

        //First perform error checking
        if (!(/^\d+$/.test(ctx.params.id))) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL"};
            return;
        } 

        id = parseInt(ctx.params.id, 10);

        //Check if resource exists first    
        if ((await animationsGateway.lookupAnimation(id))!.rowCount == 0) {
            ctx.status = 404;
            ctx.body = {"error":"Animation doesn't exist"};
            return;
        }

        await send(ctx, ctx.params.id +".jpg", {root:"./public/images"})

        //Note: LocateCover should in fact serve a static file
        //Do we actually need this method()
    }

    public static async locatePrequels(ctx:Context) {
        let id:number;

        //First perform error checking
        if (!(/^\d+$/.test(ctx.params.id))) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL"};
            return;
        } 

        id = parseInt(ctx.params.id, 10);

        //Check if resource exists first    
        if ((await animationsGateway.lookupAnimation(id))!.rowCount == 0) {
            ctx.status = 404;
            ctx.body = {"error":"Animation doesn't exist"};
            return;
        }

        var prequels:any  = await animationsGateway.locatePrequels(id); 
        prequels = transformer.transformAnimations(prequels.rows);
        ctx.body = {data:prequels}
    }

    public static async locateSequels(ctx:Context) {
        let id:number;

        //First perform error checking
        if (!(/^\d+$/.test(ctx.params.id))) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL"};
            return;
        } 

        id = parseInt(ctx.params.id, 10);

        //Check if resource exists first    
        if ((await animationsGateway.lookupAnimation(id))!.rowCount == 0) {
            ctx.status = 404;
            ctx.body = {"error":"Animation doesn't exist"};
            return;
        }

        //Then call gateways
        var sequels:any  = await animationsGateway.locateSequels(id); 
        sequels = transformer.transformAnimations(sequels.rows);
        ctx.body = {data:sequels}
    }

    public static async locateAlternatives(ctx:Context) {
        let id:number;

        //First perform error checking
        if (!(/^\d+$/.test(ctx.params.id))) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL"};
            return;
        } 

        id = parseInt(ctx.params.id, 10);

        //Check if resource exists first    
        if ((await animationsGateway.lookupAnimation(id))!.rowCount == 0) {
            ctx.status = 404;
            ctx.body = {"error":"Animation doesn't exist"};
            return;
        }

        //Then call gateways
        var alternatives:any  = await animationsGateway.locateAlternatives(id); 
        alternatives = transformer.transformAnimations(alternatives.rows);
        ctx.body = {data:alternatives}
    }

    public static async locateOthers(ctx:Context) {
        let id:number;

        //First perform error checking
        if (!(/^\d+$/.test(ctx.params.id))) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL"};
            return;
        } 

        id = parseInt(ctx.params.id, 10);

        //Check if resource exists first    
        if ((await animationsGateway.lookupAnimation(id))!.rowCount == 0) {
            ctx.status = 404;
            ctx.body = {"error":"Animation doesn't exist"};
            return;
        }

        //Then call gateways
        var others:any  = await animationsGateway.locateOthers(id); 
        others = transformer.transformAnimations(others.rows);
        ctx.body = {data:others}

    }

    public static async locateRelated(ctx:Context) {
        let id:number;

        //First perform error checking
        if (!(/^\d+$/.test(ctx.params.id))) {
            ctx.status = 400;
            ctx.body = {"error":"Invalid or incorrect URL"};
            return;
        } 

        id = parseInt(ctx.params.id, 10);


        //Check if resource exists first    
        if ((await animationsGateway.lookupAnimation(id))!.rowCount == 0) {
            ctx.status = 404;
            ctx.body = {"error":"Animation doesn't exist"};
            return;
        }

        //Then call gateways
        var sequels:any  = await animationsGateway.locateSequels(id); 
        sequels = transformer.transformAnimations(sequels.rows);

        var prequels:any  = await animationsGateway.locatePrequels(id); 
        prequels = transformer.transformAnimations(prequels.rows);

        var alternatives:any  = await animationsGateway.locateAlternatives(id); 
        alternatives = transformer.transformAnimations(alternatives.rows);

        var others:any  = await animationsGateway.locateOthers(id); 
        others = transformer.transformAnimations(others.rows);

        ctx.body = {data:{
                    sequels: {data:sequels},
                    prequels: {data:prequels},
                    alternatives: {data:alternatives},
                    others: {data:others}
        }}
    }
}

export default animationsController;


// There are several ways of dealing with this
// so that we do it correctly
// For simplicity, we will have it so that
    // Start dates for winter begin on january?
        //That way everything is in a year