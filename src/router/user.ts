import { Router } from "express"
import User from "../controlers/user"

const UserController = new User();
const router = Router()


router.post('/', UserController.post)

router.get('/', UserController.get)

router.get('/:id', UserController.getByID)

router.delete('/:id', UserController.delete)

export default router