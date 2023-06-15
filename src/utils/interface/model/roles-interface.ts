import { Optional } from "sequelize";
import { TRoleAttributes } from "../../types/model/roles-type";

export interface IRoleInput extends Optional<TRoleAttributes, "id">{}
export interface IRoleOutput extends Required<TRoleAttributes>{}