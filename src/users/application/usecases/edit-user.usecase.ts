import { UnauthorizedError } from '../../../shared/application/errors/unauthorized.error';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';
import { UserProps } from '../../domain/entities/user-entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { UserOutput, UserOutputMapper } from '../outputs/user.output';

export namespace EditUserUseCase {
  export type Input = {
    name?: string;
    age?: number;
    height?: number;
    weight?: number;
  };
  export type Output = UserOutput;

  export class UseCase implements IUsecase<Input, Output> {
    constructor(private userRepository: IUserRepository.Repository) {}
    async execute(input: Input, token?: string): Promise<UserOutput> {
      if (!token) {
        throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
      }
      const { name, age, height, weight } = input;
      const entity = await this.userRepository.findByToken(token);
      const props: UserProps = {
        ...entity.toJSON(),
        name: name ?? entity.name,
        age: age ?? entity.age,
        height: height ?? entity.height,
        weight: weight ?? entity.weight,
      };
      entity.updateProps(props);
      await this.userRepository.update(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
