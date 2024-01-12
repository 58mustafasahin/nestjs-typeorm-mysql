import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_addresses' })
export class Address {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  line1: string;

  @Column({ nullable: true })
  line2: string;

  @Column()
  zip: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
