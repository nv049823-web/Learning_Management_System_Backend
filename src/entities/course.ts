import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:"course"})
export class course extends BaseEntity{
@PrimaryGeneratedColumn({name:"id"})
id:any

@Column({name:"course_id",type:"int", nullable:true})
course_id:any

@Column({name:"user_id",type:"int", nullable:true})
user_id:any

@Column({name:"status",type:"int",default:1})
status:any

@Column({name:"created_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
created_at:any

@Column({name:"update_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
update_at:any
}