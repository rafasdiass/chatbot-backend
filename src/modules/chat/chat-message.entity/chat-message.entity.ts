import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('text') // Garantindo que a mensagem seja armazenada como texto
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn() // A data da última atualização da mensagem
  updatedAt: Date;
}
