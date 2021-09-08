import * as crypto from "crypto";
import redis from 'redis';
import * as util from 'util';
import canonicalizeUrlParams from "./canonicalize";
import { Context, Next } from "koa";

const client = redis.createClient();
const getAsync = util.promisify(client.get).bind(client);

const cacheHandler = async(ctx:Context, next:Next)=> {
    const hasher = crypto.createHash('sha1')
    const hash = hasher.update(ctx.apth +'='+ canonicalizeUrlParams(ctx.query)).digest('hex')
    var value = await getAsync(hash);
    if (value) {
      ctx.body = JSON.parse(value)
      return;
    }
    await next();
    client.set(hash, JSON.stringify(ctx.body), 'EX',  86400)
  
}


export default cacheHandler;