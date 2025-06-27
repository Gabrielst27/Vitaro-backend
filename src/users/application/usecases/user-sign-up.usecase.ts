import { BadRequestException } from '@nestjs/common';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { UserOutput } from '../dtos/user.output.dto';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { IAuthService } from '../../../auth/infra/firebase/sign-up.service.interface';
import { UserEntity } from '../../domain/entities/user-entity';
import { ERole } from '../../../shared/domain/enums/role.enum';

export namespace UserSignUpUsecase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Ouput = UserOutput;

  export class UseCase implements IUsecase<Input, Ouput> {
    constructor(
      private userRepository: IUserRepository.Repository,
      private authService: IAuthService,
    ) {}
    async execute(input: Input): Promise<UserOutput> {
      const { name, email, password } = input;
      if (!name || !email || !password) {
        throw new BadRequestException('Input not provided');
      }
      await this.userRepository.emailExists(email);
      const entity = new UserEntity({
        name,
        email,
        password,
        isActive: false,
        role: ERole.COMMON,
      });
      await this.authService.createUser({
        id: entity.id,
        name,
        email,
        password,
      });
      delete entity.props.password;
      await this.userRepository.insert(entity);
      throw new Error('Method not implemented');
    }
  }
}
