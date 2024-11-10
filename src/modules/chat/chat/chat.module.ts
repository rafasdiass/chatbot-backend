import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatMessageRepository } from '../chat-message.repository/chat-message.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '../chat-message.entity/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessage]), // Registra a entidade ChatMessage para ser usada no repositório
  ],
  providers: [
    ChatService, // Serviço que lida com a lógica de negócios
    ChatMessageRepository, // Repositório que lida com a persistência dos dados
  ],
  controllers: [ChatController], // Controlador para gerenciar as requisições HTTP
})
export class ChatModule {}
