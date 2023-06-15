import { Request, Response } from "express";
// import DBGeneratorModel, { IDatabaseInfo, INewDBGenerator } from "../../database/models/dbGenerator";

class DBGeneratorController {
  
  constructor() {

  }

  BDCreate = async (req: Request, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    return res.status(200).send({ status: 1, message: 'Success get data', data: "users" });
    /* try {
      // Konfigurasi untuk membangun database baru
      const config: INewDBGenerator = {
        dialect: 'mysql',
        username: 'root',
        password: '',
        host: 'localhost',
        port: 3306,
        database: "db_test_02"
      };

      // Memanggil metode NewDBGenerate dari DBGeneratorModel
      const dbGenerate: IDatabaseInfo = await DBGeneratorModel.NewDBGenerate(config);
      if(! dbGenerate.databaseName) return res.status(400).send({status: 0, message: "Kesalahan dalam membuat database"});
      return res.status(200).send({ status: 1, message: 'Berhasil membuat database', data: '' });


    } catch (error) {
      console.log(error)
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    } */
  }

  TableCreate = async (req: Request, res: Response<IResponseSuccess | IResponseError>): Promise<Response> => {
    return res.status(200).send({ status: 1, message: 'Success get data', data: "users" });
    /* try {
      // Konfigurasi untuk membangun database baru
      const config: INewDBGenerator = {
        dialect: 'mysql',
        username: 'root',
        password: '',
        host: 'localhost',
        port: 3306,
        database: "db_test_01"
      };

      // Memanggil metode NewDBGenerate dari DBGeneratorModel
      const dbGenerate: IDatabaseInfo = await DBGeneratorModel.NewDBGenerateTable(config);
      if(! dbGenerate.tables) return res.status(400).send({status: 0, message: "Kesalahan dalam membuat table"});
      return res.status(200).send({ status: 1, message: 'Berhasil membuat table', data: '' });


    } catch (error) {
      console.log(error)
      if (error !== null && error instanceof Error) {
        return res.status(500).send({status: 0, message: JSON.stringify(error.message)});
      }
      return res.status(500).send({status: 0, message: "Internal Server Error"});
    } */
  }
}

export default new DBGeneratorController();