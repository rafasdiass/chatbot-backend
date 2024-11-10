import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from '../dto/create-chat-message.dto';
import { ChatMessage } from '../chat-message.entity/chat-message.entity';
import { UpdateChatMessageDto } from '../dto/update-chat-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createMessage(
    @Body() createChatMessageDto: CreateChatMessageDto,
  ): Promise<ChatMessage> {
    return this.chatService.createMessage(createChatMessageDto);
  }

  @Get(':userId')
  async getMessagesByUser(
    @Param('userId') userId: string,
  ): Promise<ChatMessage[]> {
    return this.chatService.getMessagesByUser(userId);
  }

  @Patch(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateChatMessageDto: UpdateChatMessageDto,
  ): Promise<ChatMessage> {
    return this.chatService.updateMessage(id, updateChatMessageDto);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string): Promise<void> {
    return this.chatService.deleteMessage(id);
  }
}
