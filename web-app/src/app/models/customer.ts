export class Customer {
  _id!: string;
  nome!: string;
  cnpj!: string;
  dataContrato!: Date;
  valorContrato!: number;
  situacaoContrato!: string;
  createdAt!: Date;
  updatedAt!: Date;
  id!: string;

  constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }
}
