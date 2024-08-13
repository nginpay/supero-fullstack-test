import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.BASE_URL),
    ClientsModule,
  ],
})
export class AppModule {}
