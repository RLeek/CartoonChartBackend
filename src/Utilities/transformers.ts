import { Animation } from "./types"

class transformer {

    //FIXME: Cast to new specified data type for animations (dates)

    public static transformAnimations(data:any[]):Animation[] {
        let transformedData:Animation[] = [];

        for (let entry of data) {
            transformedData.push(this.transformAnimation(entry));
        }

        return transformedData;
    }

    public static transformAnimation(data:any):Animation {
        let transformedData:Animation;

        //Not sure if this is correct
        transformedData = {
            id:Number(data.id),
            title: String(data.title),
            synopsis:String(data.synopsis),
            format:String(data.format),
            status:String(data.format),
            release: {
                specificty: String(data.specificity),
                date: data.release
            },
            episodes: Number(data.episodes),
            runtime: Number(data.runtime),
            cover: String(data.cover), //Should probably add the corresponding whole url if desired
            trailer: String(data.trailer), //Should probably add the corresponding whole url if desired
            views:Number(data.views),
            reviews: Number(data.reviews),
            average_rating: Number(data.average_rating),
            genres: <string[]>data.genres
        }

        if (data.sequels) {
            transformedData.sequels = this.transformAnimations(data.sequels)
        }
        if (data.prequels) {
            transformedData.prequels = this.transformAnimations(data.prequels)
        }
        if (data.alternatives) {
            transformedData.alternatives = this.transformAnimations(data.alternatives)
        }
        if (data.others) {
            transformedData.others = this.transformAnimations(data.others)
        }
        return transformedData;
    }
}



export default transformer;