import { Pool } from 'pg';

const pool = new Pool({
    user: "ricky",
    host: "/var/run/postgresql",
    database: "Animation",
    port: 5432,
});


//Not sure if this is correct
async function query(text:string, values:string[]) {
    try {
        const rows = await pool.query(text, values);
        return rows;
    } catch(e) {
        console.log(e);
    }
}

export default query;
