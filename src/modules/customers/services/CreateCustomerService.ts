import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(customerData: IRequest): Promise<Customer> {
    const checkEmailExists = await this.customersRepository.findByEmail(
      customerData.email,
    );

    if (checkEmailExists) {
      throw new AppError('E-mail already exists.');
    }

    const customer = this.customersRepository.create(customerData);

    return customer;
  }
}

export default CreateCustomerService;
