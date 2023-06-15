import { Optional } from "sequelize";
import { TUsersAttributes } from "../../types/model/users-type";

export interface IUserInput extends Optional<TUsersAttributes, "id">{}
export interface IUserOutput extends Required<TUsersAttributes>{}