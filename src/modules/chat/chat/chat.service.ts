import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatMessageRepository } from '../chat-message.repository/chat-message.repository';
import { CreateChatMessageDto,} from '../dto/create-chat-message.dto';
import { ChatMessage } from '../chat-message.entity/chat-message.entity';
import { UpdateChatMessageDto } from '../dto/update-chat-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly chatMessageRepository: ChatMessageRepository) {}

  async createMessage(
    createChatMessageDto: CreateChatMessageDto,
  ): Promise<ChatMessage> {
    const newMessage = this.chatMessageRepository.create(createChatMessageDto);
    return this.chatMessageRepository.saveMessage(newMessage);
  }

  async getMessagesByUser(userId: string): Promise<ChatMessage[]> {
    return this.chatMessageRepository.findMessagesByUser(userId);
  }

  async updateMessage(
    id: string,
    updateChatMessageDto: UpdateChatMessageDto,
  ): Promise<ChatMessage> {
    const message = await this.chatMessageRepository.findOne({ where: { id } });
    if (!message)
      throw new NotFoundException(`Message with ID ${id} not found`);

    Object.assign(message, updateChatMessageDto);
    return this.chatMessageRepository.saveMessage(message);
  }

  async deleteMessage(id: string): Promise<void> {
    const result = await this.chatMessageRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Message with ID ${id} not found`);
  }
}
