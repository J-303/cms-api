import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';

@Injectable()
export class EventGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(EventEntity)
    private eventRepo: Repository<EventEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {        
    const req = context.switchToHttp().getRequest();
    const event_id = req.params.id;

    const modEvent = await this.eventRepo.findOne({
        where: { id: event_id },
        relations: ['owner']
    });
    if (!modEvent) {
        throw new NotFoundException('Specified event does not exists');
    }

    const owner = await this.userRepo.findOne({
        where: { id: modEvent.owner.id }
    });

    const user = req.user;
    if (user.id == owner.id) {
        return true;
    } else {
        throw new ForbiddenException('You are not the owner of specified event');
    }
  }
}
