import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:"chatroom"})
export class admin extends BaseEntity{
@PrimaryGeneratedColumn({name:"id"})
id:any

@Column({name:"participants",type:"varchar",array:true, default:[]})
participants:any

@Column({name:"status",type:"int",default:1})
status:any

@Column({name:"created_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
created_at:any

@Column({name:"update_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
update_at:any
}