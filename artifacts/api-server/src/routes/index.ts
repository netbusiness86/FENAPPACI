import { Router, type IRouter } from "express";
import healthRouter from "./health";
import purchaseRequestsRouter from "./purchaseRequests";

const router: IRouter = Router();

router.use(healthRouter);
router.use(purchaseRequestsRouter);

export default router;
