//Animation routers
import Router from "@koa/router";
import animationsController from "../Controllers/animations"

const animationsRouter = new Router();


animationsRouter.get("/animations/:id/cover", animationsController.locateCover);
animationsRouter.get("/animations/:id/sequels", animationsController.locateSequels);
animationsRouter.get("/animations/:id/prequels", animationsController.locatePrequels);
animationsRouter.get("/animations/:id/alternatives", animationsController.locateAlternatives);
animationsRouter.get("/animations/:id/others", animationsController.locateOthers);
animationsRouter.get("/animations/:id/relations", animationsController.locateRelated);
animationsRouter.get("/animations/:id", animationsController.locateAnimation);
animationsRouter.get("/animations", animationsController.filterAnimations);

export { animationsRouter };




