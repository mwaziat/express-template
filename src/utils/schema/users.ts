import { JSONSchemaType } from "ajv";
import { ICreateUser, IUpdateUser } from "../interface/controller/users-interface";

const createUserSchema: JSONSchemaType<ICreateUser> = {
  type: "object",
  properties: {
    firstName: {type: "string", nullable: false},
    lastName: { type: "string", nullable: true },
    email: {type: "string", nullable: false},
    username: {type: "string", nullable: false},
    password: {type: "string", nullable: false},
    address: {type: "string", nullable: true},
    phone: {type: "string", nullable: true},
    roleId: {
      type: "array",
      items: { type: "number" },
      nullable: false,
    },
  },
  required: ["firstName", "email", "password", "username" ],
  additionalProperties: false
}

const updateUserSchema: JSONSchemaType<IUpdateUser> = {
  type: "object",
  properties: {
    firstName: {type: "string", nullable: false},
    lastName: { type: "string", nullable: true },
    email: {type: "string", nullable: false},
    username: {type: "string", nullable: false},
    password: {type: "string", nullable: false},
    address: {type: "string", nullable: true},
    phone: {type: "string", nullable: true},
    roleId: {
      type: "array",
      items: { type: "number" },
      nullable: true,
    },
  },
  required: ["firstName", "email", "password", "username" ],
  additionalProperties: false
}


export {
  createUserSchema,
  updateUserSchema
}