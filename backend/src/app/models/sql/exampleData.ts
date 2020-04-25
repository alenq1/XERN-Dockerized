import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, getRepository} from 'typeorm'
import config from '../../settings/config'


export interface IExampleSQL {
    name: string
    price: number
    quantity: number
    description: string
    findSorted(): Promise<any>

}

@Entity()
export default class exampleData{

    @PrimaryGeneratedColumn("uuid")
    _id!: string;

    @Column({type: 'varchar', unique: true, })
    name!: string;

    @Column({type: 'int'})
    price!: number;

    @Column({type: 'int'})
    quantity!: number;

    @Column({type: 'varchar'})
    description!: string;

    @CreateDateColumn()
    created?: Date;

    @UpdateDateColumn()
    updated?: Date;

    async findSorted(): Promise<any> { 
        return await getRepository(exampleData).find({order: {quantity: "ASC"}})
    }

}