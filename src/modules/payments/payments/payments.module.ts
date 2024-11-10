import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentRepository } from '../payment.repository/payment.repository';
import { PaymentsController } from './payments.controller';


@Module({
  providers: [PaymentsService, PaymentRepository],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
