import { Controller, UseGuards } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { UserEntity } from "./user.entity";
import { UserGuard } from "./user.guard";
import { UserService } from "./user.service";

@Crud({
    model: {
        type: UserEntity
    },
    routes: {
        only: ['getManyBase', 'getOneBase', 'updateOneBase', 'deleteOneBase'],
        getManyBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns all registered users' }),
            ]
        },
        getOneBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns specified user' }),
                ApiNotFoundResponse({ description: 'User not found' })
            ]
        },
        updateOneBase: {
            decorators: [
                UseGuards(JwtAuthGuard),
                UseGuards(UserGuard),
                ApiForbiddenResponse({ description: 'Cannot update other users' }),
                ApiAcceptedResponse({ description: 'Updates user params' }),
                ApiNotFoundResponse({ description: 'User not found' })
            ]
        },
        deleteOneBase: {
            decorators: [
                UseGuards(UserGuard),
                ApiAcceptedResponse({ description: 'Deletes user' }),
                ApiNotFoundResponse({ description: 'User not found' }),
            ]
        }
    },
    dto: {
        create: CreateUserDTO,
        update: UpdateUserDTO
    }
})
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController implements CrudController<UserEntity> {
    constructor(public service: UserService) {}
}