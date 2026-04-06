import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:"contactus"})
export class admin extends BaseEntity{
@PrimaryGeneratedColumn({name:"id"})
id:any

@Column({name:"name",type:"varchar",length:255,nullable:true})
name:any

@Column({name:"email",type:"varchar",length:255,unique:true})
email:any


@Column({name:"mobile",type:"varchar",length:255,nullable:true})
mobile:any

@Column({name:"subject",type:"varchar",length:255,nullable:true})
subject:any

@Column({name:"description",type:"varchar",length:255,nullable:true})
description:any

@Column({name:"created_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
created_at:any

@Column({name:"update_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
update_at:any
}