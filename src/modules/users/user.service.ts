import { pool } from "../../config/db";

const createuser = async (name:string,email:string,password:string,phone:any,role:string) =>
{
    const result = await pool.query(
            `INSERT INTO Users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,[name,email,password,phone,role]
           );

           return result;
}


const getuser = async () =>
{
     const result = await pool.query(`SELECT * FROM Users`);
     return result;
}


const getsingleuser = async (id:any) =>
{
     const result = await pool.query(`SELECT * FROM Users WHERE id = $1`,[id]);

     return result;
}

const updateuser = async (name:any,email:any,password:any,phone:any,role:any,id:any) =>
{
    const result = await pool.query(`UPDATE users SET name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6 RETURNING * `,[name,email,password,phone,role,id]);
    return result;
}

const deleteuser = async (id:any) =>
{
    const result = await pool.query(`DELETE FROM Users WHERE id = $1`,[id]);

    return result;
}

export const userservice = 
{
      createuser ,
      getuser,
      getsingleuser,
      updateuser,
      deleteuser
}