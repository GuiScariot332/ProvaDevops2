import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  company_name: string;

  // somente dígitos (14), sem máscara
  @Column({ length: 14, unique: true })
  cnpj: string;

  @Column({ length: 100 })
  contact_name: string;

  @Column({ length: 150 })
  contact_email: string;
}
