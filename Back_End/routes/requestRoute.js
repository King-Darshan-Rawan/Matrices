import { Router } from 'express';
const router = Router();

import {
  sendRequest,
  getRequestsForUser,
  updateRequestStatus
} from '../controller/requestController.js';


router.route('/send')
  .post(sendRequest);

router.route('/received/:userId')
  .get(getRequestsForUser);

router.route('/status/:requestId')
  .put(updateRequestStatus);


export default router;

