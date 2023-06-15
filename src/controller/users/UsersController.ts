import { Request, RequestHandler, Response } from "express";
import { ICreateUser, IUpdateUser } from "../../utils/interface/controller/users-interface";
import db from "../../database/models";

const DB: any = db;
const { 
  Users,
  UserRoles,
  Roles
} = DB;


class UsersController {
  
  constructor() {

  }

  GetUsers = async (req: Request, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    try {
      const users = await Users.findAll({
        attributes: ['id', 'firstName', 'lastName', 'name', 'email', 'username', 'phone', 'address'],
        include: [
          {
            model: UserRoles,
            include: [
              {model: Roles}
            ]
          }
        ]
      })
      if(!users) return res.status(400).send({status: 0, message: 'Can not access data'});
      if (users.length > 0) return res.status(200).send({ status: 1, message: 'Success get data', data: users });
      return res.status(404).send({ status: 0, message: 'Data not fount' });
      
    } catch (error) {
      console.log(error)
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    }
  }

  GetOneUser = async (req: Request<{id: number}>, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    try {
      const id = req.params.id
      const users = await Users.findOne({
        where: {id: id},
        attributes: ['id', 'firstName', 'lastName', 'name', 'email', 'username', 'phone', 'address'],
        include: [
          {
            model: UserRoles,
            include: [
              {model: Roles}
            ]
          }
        ]
      })
      if(!users) return res.status(404).send({ status: 0, message: 'Data not fount' });
      return res.status(200).send({ status: 1, message: 'Success get data', data: users });
      
    } catch (error) {
      console.log(error)
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    }
  }

  createUser = async (req: Request<ICreateUser>, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    const trx = await db.sequelize.transaction()
    try {
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        phone,
        address,
        roleId,
      } = req.body

      const createUser = await Users.create({
        firstName, lastName, email, username, password, emailVerified: null, phone, address,
      }, { transaction: trx })
      if (!createUser) return res.status(403).send({ status: 0, message: "Can't create data user", data: "" });

      const userRoles = roleId.map((roleId: number) => {
        return { userId: createUser.id, roleId };
      });

      const createUserRoles = await UserRoles.bulkCreate(userRoles, { transaction: trx });
      if (!createUserRoles)  return res.status(403).send({ status: 0, message: "Can't create user role data", data: "" });

      trx.commit()
      return res.status(200).send({status: 1, message: "Success create data", data: createUser});
    } catch (error) {
      trx.rollback()
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.name) + JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    }
  }

  updateUser = async (req: Request<{ id: number }, any, IUpdateUser>, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    const trx = await db.sequelize.transaction()
    try {
      const {id} = req.params
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        phone,
        address,
        roleId,
      } = req.body

      const [rowsAffected, [updatedUser]] = await Users.update({
        firstName, lastName, email, username, password, emailVerified: null, phone, address,
      }, {where: {id: id}, returning: true }, { transaction: trx })
      if (!rowsAffected) return res.status(403).send({ status: 0, message: "Can't update data user", data: "" });

      if (roleId) {
        await UserRoles.destroy({where: {userId: id}}, { transaction: trx })
        const userRoles = roleId.map((roleId: number) => {
          return { userId: id, roleId };
        });
        const createUserRoles = await UserRoles.bulkCreate(userRoles, { transaction: trx });
        if (!createUserRoles)  return res.status(403).send({ status: 0, message: "Can't update user role data", data: "" });
      }

      trx.commit()
      return res.status(200).send({status: 1, message: "Success update data", data: updatedUser});
    } catch (error) {
      trx.rollback()
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    }
  }
}

export default new UsersController();