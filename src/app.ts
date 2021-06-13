import Koa, { Context } from "koa";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { animationsRouter } from "./Routes/animations";
import config from "./Utilities/config";

const app = new Koa();

app.use(helmet());


//Fix this
var options = {
	origin : verifyOrigin,
  allowMethods : 'GET'
};


function verifyOrigin (ctx:Context):string {
  const origin = ctx.headers.origin ? ctx.headers.origin : "";
  var validOrigins = ['http://localhost:3000', 'https://www.cartoonchart.com/'];
  if (validOrigins.includes(origin) === true) {
    return origin;
  }
  return ""
}

app.use(cors(options));

app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log(ctx.query);
  await next();
  console.log(ctx.body);
});

app.use(animationsRouter.routes());
app.use(animationsRouter.allowedMethods());



app.listen(config.port);


//todo:
  //serving static files
  //fixing config