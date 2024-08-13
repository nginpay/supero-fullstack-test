import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './schemas/client.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) 
    private clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    return  await this.clientModel.create(createClientDto);
  }

  findAll(): Promise<Client[]> {
    return this.clientModel.find();
  }

  findById(id: string): Promise<Client> {
    return this.clientModel.findById({ _id: id });
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.clientModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: updateClientDto }
    );
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.clientModel.findOneAndDelete({ _id: id });
  }
}
