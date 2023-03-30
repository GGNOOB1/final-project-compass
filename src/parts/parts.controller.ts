import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { CreatePartsDto } from './dtos/create-parts.dto';
import { PartsPagination } from './dtos/parts-pagination.dto';
import { UpdatePartsDto } from './dtos/update-parts.dto';
import { PartsService } from './parts.service';

@Controller('api/v1/parts')
export class PartsController {
  constructor(private partsService: PartsService) {}

  @Get()
  listParts(@Query() partsPagination: PartsPagination) {
    return this.partsService.find(partsPagination);
  }

  @Post()
  createParts(@Body() createPartsDto: CreatePartsDto) {
    return this.partsService.create(createPartsDto);
  }

  @Patch('/:id')
  updateParts(@Param('id') id: string, @Body() updatePartsDto: UpdatePartsDto) {
    return this.partsService.updateById(id, updatePartsDto);
  }

  @Get('/:id')
  getPartsById(@Param('id') id: string) {
    return this.partsService.findById(id);
  }
}
