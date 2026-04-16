import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:"mastercourse"})
export class mastercourse extends BaseEntity{
@PrimaryGeneratedColumn({name:"id"})
id:any

@Column({name:"title",type:"varchar",length:255, nullable:true})
title:any

@Column({name:"desc",type:"varchar",length:255, nullable:true})
desc:any

@Column({name:"level",type:"varchar",length:255, nullable:true})
level:any

@Column({name:"thumbnail",type:"varchar",length:255, nullable:true})
thumbnail:any

@Column({name:"content",type:"varchar",length:255, nullable:true})
content:any

@Column({name:"rating",type:"int",default:1})
rating:any



@Column({name:"duration",type:"int",default:1})
duration:any

@Column({name:"type",type:"varchar",default:1,length:255,})
type:any

@Column({name:"status",type:"varchar",default:"Active",length:255,})
status:any

@Column({name:"created_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
created_at:any

@Column({name:"update_at",type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
update_at:any
}