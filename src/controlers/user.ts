import { Request, Response } from "express";
import { CustomRequest } from "../commons/interfaces";
import UserEntity, { UserRole, UserEvent } from "../models/user/entity";
import { UserRequestBody } from "../models/user/interface"
import { v4 as uuidv4 } from "uuid";


export default class User {
  async post ({ body }: CustomRequest<UserRequestBody>, res: Response, next) {
    const uuid = uuidv4();
    const user = UserEntity.create({
      uuid,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      password: body.password,
      role: UserRole.CLIENT,
      creationDate: new Date(),
      currentEvent: UserEvent.CREATION,
    });
    await user.save();
    res.status(201).json({ id: uuid });
  }

  async get (req, res, next) {
    const users = await UserEntity.find();
    res.status(200).json(users);
  }

  async getByID (req: Request, res: Response, next) {
    const user = await UserEntity.findOne({ uuid: req.params.id });
    if(!user) {
      res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  }

  async delete(req: Request, res: Response, next) {
    const user = await UserEntity.findOne({ uuid: req.params.id })
    if(!user) {
      res.status(404).json({ message: "User not found!" });
    }
    await UserEntity.delete(user);
    res.sendStatus(204);
  }
}