import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChatMessageDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
