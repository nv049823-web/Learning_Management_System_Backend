import "reflect-metadata";
import { DataSource } from "typeorm"
export const AppdataSoucre=new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"nv049823",
    database:"lms",
    synchronize:true,
    entities:["src/entities/**/*.ts"],
    migrations:["src/entities/migration/**/*.ts"],
    subscribers:["src/entities/subcribres/**/*.ts"],

}
)