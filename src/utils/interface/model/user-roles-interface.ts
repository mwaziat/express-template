import { Optional } from "sequelize";
import { TUserRoleAttributes } from "../../types/model/user-roles";

export interface IUserRolesInput extends Optional<TUserRoleAttributes, "id">{}
export interface IUserRolesOutput extends Required<TUserRoleAttributes>{}