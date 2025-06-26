import { BadRequestException } from '@nestjs/common';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { UserOutput } from '../dtos/user.output.dto';

export namespace UserSignUpUsecase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Ouput = UserOutput;

  export class UseCase implements IUsecase<Input, Ouput> {
    execute(input: Input): UserOutput {
      const { name, email, password } = input;
      if (!name || !email || !password) {
        throw new BadRequestException('Input not provided');
      }
      throw new Error('Method not implemented');
    }
  }
}
