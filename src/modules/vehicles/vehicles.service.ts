  import { pool } from "../../config/db";


 const createvehicles = async (vehicle_name:string,type:string,registration_number:string,daily_rent_price:number,availability_status:string) =>
{
    const result = await pool.query(
            `INSERT INTO Vehicles  (vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status]
           );

           return result;
}

const gatevehicles = async () =>
{
    const result = await pool.query(`SELECT * FROM Vehicles`);
                  
    return result;
}

const getsinglevehicles = async (id:any) =>
{

    const result = await pool.query(`SELECT * FROM Vehicles WHERE id = $1`,[id])

    return result;

}

const updatevehicles = async (vehicle_name:string,type:string,registration_number:any,daily_rent_price:any,availability_status:string,id:any) =>
{
     const result = await pool.query(`UPDATE Vehicles SET  vehicle_name=$1,  type=$2,  registration_number=$3,  daily_rent_price=$4,  availability_status=$5 WHERE id=$6 RETURNING * `,[vehicle_name,type,registration_number,daily_rent_price,availability_status,id]);

     return result;
}

const deletevehicles = async (id:any) =>
{
        const result = await pool.query(`DELETE FROM Vehicles WHERE id = $1`,[id]);

        return result;
}

export const vehicleservice = 
{
      createvehicles,
      gatevehicles,
      getsinglevehicles,
      updatevehicles,
      deletevehicles
}