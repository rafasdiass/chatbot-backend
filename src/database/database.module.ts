import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm'; // Importando DataSource
import { ChatMessageRepository } from 'src/modules/chat/chat-message.repository/chat-message.repository';
import { ChatMessage } from 'src/modules/chat/chat-message.entity/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Usando SQLite
      database: 'data/chat.db', // Caminho para o arquivo SQLite (pode ser relativo ou absoluto)
      entities: [ChatMessage], // Entidades que serão usadas
      synchronize: true, // Sincroniza a estrutura do banco (somente para desenvolvimento)
    }),
    TypeOrmModule.forFeature([ChatMessage]), // Registrando a entidade ChatMessage
  ],
  providers: [ChatMessageRepository],
  exports: [ChatMessageRepository],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {}
}
