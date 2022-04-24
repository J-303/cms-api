import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateUserDTO, LoginUserDTO, ResponseUserDTO, UpdateUserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@Crud({
    model: {
        type: UserEntity
    },
    dto: {
        create: CreateUserDTO,
        update: UpdateUserDTO
    },
    routes: {
        only: ['getManyBase', 'getOneBase', 'updateOneBase', 'deleteOneBase'],
        getManyBase: {
            decorators: [
                ApiOkResponse({type: ResponseUserDTO})
            ]
        },
        getOneBase: {
            decorators: [
                ApiOkResponse({type: ResponseUserDTO})
            ]
        },
        updateOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(UserGuard),
                ApiOkResponse({type: ResponseUserDTO})
            ]
        },
        deleteOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(UserGuard),
                ApiOkResponse({type: ResponseUserDTO})
            ]
        }
    }
})
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController implements CrudController<UserEntity> {
    constructor (public service: UserService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOkResponse({type: ResponseUserDTO})
    async login(@Request() req, @Body() dto: LoginUserDTO) {
        return this.service.login(req.user);
    }

    @Post('register')
    @ApiCreatedResponse({type: ResponseUserDTO})
    async register(@Body() dto: CreateUserDTO) {
        return this.service.register(dto);
    }
}
