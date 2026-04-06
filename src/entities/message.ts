import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:"message"})
export class admin extends BaseEntity{
@PrimaryGeneratedColumn({name:"id"})
id:any

@Column({name:"room_id",type:"int", nullable:true})
room_id:any

@Column({name:"sender_id",type:"int", nullable:true})
sender_id:any

@Column({name:"message",type:"varchar", length:255,nullable:true})
message:any

@Column({name:"status",type:"int",default:1})
status:any

@Column({name:"created_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
created_at:any

@Column({name:"update_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
update_at:any
}
