import db from "../database/models"

// import Users from "../database/models/users"
const DB: any = db
const {Users} = DB

export const UserLogin = async (id: number): Promise<boolean> => {
  try {
    const user = await Users.findOne({ where: { id: id } })
    if(!user) return false
    return true
  } catch (error) {
    return false
  }
}