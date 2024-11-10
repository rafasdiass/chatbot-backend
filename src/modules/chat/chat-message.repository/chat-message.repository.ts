import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ChatMessage } from '../chat-message.entity/chat-message.entity';

@Injectable()
export class ChatMessageRepository extends Repository<ChatMessage> {
  constructor(private dataSource: DataSource) {
    super(ChatMessage, dataSource.createEntityManager());
  }

  async findMessagesByUser(userId: string): Promise<ChatMessage[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async saveMessage(chatMessage: ChatMessage): Promise<ChatMessage> {
    return this.save(chatMessage);
  }
}
