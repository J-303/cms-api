import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO, UserDTOResponse } from "./user.dto";
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
                ApiOkResponse({type: UserDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns all registered users' }),
            ]
        },
        getOneBase: {
            decorators: [
                ApiOkResponse({type: UserDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns specified user' }),
                ApiNotFoundResponse({ description: 'User not found' })
            ]
        },
        updateOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(UserGuard),
                ApiOkResponse({type: UserDTOResponse}),
                ApiForbiddenResponse({ description: 'Cannot update other users' }),
                ApiAcceptedResponse({ description: 'Updates user params' }),
                ApiNotFoundResponse({ description: 'User not found' })
            ]
        },
        deleteOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(UserGuard),
                ApiOkResponse({type: UserDTOResponse}),
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

    @UseGuards(AuthGuard('local'))
    @ApiAcceptedResponse({description: 'User is logged in'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiOkResponse({type: UserDTOResponse})
    @Post('login')
    async login(@Body() data: LoginUserDTO) {
        return this.service.login(data);
    }

    @UseGuards(AuthGuard('local'))
    @ApiCreatedResponse({description: 'User registered'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiOkResponse({type: UserDTOResponse})
    @Post('login')
    async register(@Body() data: CreateUserDTO) {
        return this.service.register(data);
    }
}