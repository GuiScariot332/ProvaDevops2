import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly repo: Repository<Supplier>,
  ) {}

  findAll(): Promise<Supplier[]> {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Supplier> {
    const supplier = await this.repo.findOneBy({ id });
    if (!supplier) throw new NotFoundException(`Fornecedor ${id} não encontrado`);
    return supplier;
  }

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    return this.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateSupplierDto): Promise<Supplier> {
    const supplier = await this.findOne(id);
    Object.assign(supplier, dto);
    return this.save(supplier);
  }

  async remove(id: number): Promise<void> {
    const supplier = await this.findOne(id);
    await this.repo.remove(supplier);
  }

  // converte violação de unicidade do Postgres (23505) em 409 Conflict
  private async save(supplier: Supplier): Promise<Supplier> {
    try {
      return await this.repo.save(supplier);
    } catch (err) {
      if (err?.code === '23505') {
        throw new ConflictException('Já existe um fornecedor com esse CNPJ');
      }
      throw err;
    }
  }
}
