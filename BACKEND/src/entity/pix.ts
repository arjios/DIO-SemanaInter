import { User } from './user';
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    JoinColumn,
    ManyToOne, 
    Column,
    CreateDateColumn, 
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class Pix {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.id )
    @JoinColumn()
    requestingUser: User;

    @ManyToOne(() => User, user => user.id, {nullable: true} )
    @JoinColumn()
    payingUser: User;

    @Column()
    value: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}