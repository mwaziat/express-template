import { Request, Response } from "express";
import { ICreateRole } from "../../utils/interface/controller/roles-interface";
import db from "../../database/models";

const DB: any = db;
const { 
  Users,
  UserRoles,
  Roles
} = DB;

class RolesController {
  
  constructor() {

  }

  GetRoles = async (req: Request, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    try {
      const roles = await Roles.findAll()
      if(!roles) return res.status(400).send({status: 0, message: "Can't find data"});
      if (roles.length > 0) return res.status(200).send({ status: 1, message: 'Success find data', data: roles });
      return res.status(404).send({ status: 0, message: 'Data not found' });
      
    } catch (error) {
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    }
  }

  GetOneRole = async (req: Request<{id: number}>, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    try {
      const {id} = req.params
      const roles = await Roles.findOne({where: {id: id}})
      if(!roles) return res.status(404).send({ status: 0, message: 'Data not found' });
      return res.status(200).send({ status: 1, message: 'Success find data', data: roles });
      
    } catch (error) {
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    }
  }

  createRole = async (req: Request<ICreateRole>, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    const trx = await db.sequelize.transaction()
    try {
      const {name, slug, description, status} = req.body
      const createRole = await Roles.create({name, slug, description, status}, {transaction: trx})
      if (!createRole) return res.status(400).send({ status: 0, message: "Can't create role data" });
      trx.commit()
      return res.status(200).send({ status: 1, message: 'Success cerate role data', data: createRole });
    } catch (error) {
      trx.rollback()
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    }
  }

  updateRole = async (req: Request<{id: number}, any, ICreateRole>, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    const trx = await db.sequelize.transaction()
    try {
      const {id} = req.params
      const {name, description, status} = req.body
      const [rowsAffected, [updatedRole]] = await Roles.update({name, description, status}, {where: {id: id}, returning: true }, {transaction: trx})
      if (!rowsAffected) return res.status(400).send({ status: 0, message: "Can't update role data" });
      trx.commit()
      return res.status(200).send({ status: 1, message: 'Success update role data', data: updatedRole });
    } catch (error) {
      trx.rollback()
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    }
  }
}

export default new RolesController();