import { Router, type IRouter } from "express";
import healthRouter from "./health";
import purchaseRequestsRouter from "./purchaseRequests";
import commodityPricesRouter from "./commodityPrices";

const router: IRouter = Router();

router.use(healthRouter);
router.use(purchaseRequestsRouter);
router.use(commodityPricesRouter);

export default router;
