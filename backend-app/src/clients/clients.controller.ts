import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(
    private clientsService: ClientsService,
  ) {}

  @Post('create')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get('find-all')
  findAll() {
    return this.clientsService.findAll();
  }
  
  @Get('find/:id')
  findById(@Param('id') id: string) {
    return this.clientsService.findById(id);
  }

  
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateClientDto
  ) {
    return this.clientsService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param("id") id: string): Promise<void> {
    return this.clientsService.remove(id);
  }
}
