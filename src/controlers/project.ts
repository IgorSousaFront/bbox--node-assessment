import { Request, Response } from "express";
import { CustomRequest } from "../commons/interfaces";
import ProjectEntity  from "../models/project/entity";
import UserEntity  from "../models/user/entity";
import { ProjectRequestBody } from "../models/project/interface";
import { v4 as uuidv4 } from "uuid";

export default class Product {
  async post({ body }: CustomRequest<ProjectRequestBody>, res: Response) {
    const uuid = uuidv4();
    const user = await UserEntity.findOne({ uuid: body.userId });
    const project = ProjectEntity.create({
      uuid,
      description: body.description,
      owner: user,
      creationDate: new Date(),
    })

    await project.save();
    res.status(201).json({ id: uuid });
  }

  async get(req: Request, res: Response, next) {
    const projects = await ProjectEntity.find()
    res.status(200).json(projects);
  }

  async getByID(req: Request, res: Response, next) {
    const project = await ProjectEntity.findOne({ uuid: req.params.id });

    if(!project) {
      res.status(404).json({ message: "Project not found!" });
    }
    res.status(200).json(project);
  }

  async delete(req: Request, res: Response, next) {
    const projectId = req.params.id;
    const project = await ProjectEntity.findOne({ uuid: projectId });

    if(!project) {
      res.status(404).json({ message: "Project not found!" });
    }
    
    await ProjectEntity.delete(project);
    res.sendStatus(204);
  }
}