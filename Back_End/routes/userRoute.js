import { Router } from 'express';
const router = Router();

import { registerUser , loginUser , getUserProfile , updateUserProfile } from '../controller/userController';

router.route('/login')
    .post(loginUser);

router.route('/register')
    .post(registerUser);

router.route('/profile/update')
    .put(updateUserProfile);

router.route('/profile/:id')
    .get(getUserProfile)

export default router;
