import { Router } from "express"
import Project from "../controlers/project"

const ProjectController = new Project();
const router = Router()

router.post('/', ProjectController.post)

router.get('/', ProjectController.get)

router.get('/:id', ProjectController.getByID)

router.delete('/:id', ProjectController.delete)

export default router