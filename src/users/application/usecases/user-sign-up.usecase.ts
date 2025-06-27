import { BadRequestException } from '@nestjs/common';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { UserOutput } from '../dtos/user.output.dto';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';

export namespace UserSignUpUsecase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Ouput = UserOutput;

  export class UseCase implements IUsecase<Input, Ouput> {
    constructor(private userRepository: IUserRepository.Repository) {}
    async execute(input: Input): Promise<UserOutput> {
      const { name, email, password } = input;
      if (!name || !email || !password) {
        throw new BadRequestException('Input not provided');
      }
      await this.userRepository.emailExists(email);

      throw new Error('Method not implemented');
    }
  }
}
