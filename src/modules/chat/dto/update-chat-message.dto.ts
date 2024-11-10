import { IsString, IsOptional } from 'class-validator';

export class UpdateChatMessageDto {
  @IsString()
  @IsOptional()
  content?: string;
}
