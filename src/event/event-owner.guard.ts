import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';

@Injectable()
export class EventOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepo: EventRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {        
    const req = context.switchToHttp().getRequest();

    const event = await this.eventRepo.findOne({where: {id: req.params.id}});
    if (!event) {
      throw new NotFoundException();
    }

    const user = req.user;
    if (user.id != event.ownerId) {
      throw new ForbiddenException()
    }
    return true;
  }
}
