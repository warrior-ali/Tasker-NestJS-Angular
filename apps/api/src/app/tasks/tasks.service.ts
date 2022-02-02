import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly _tasksRepository: TasksRepository) {}

  async getTasks() {
    return (await this._tasksRepository.getTasks()).rows[0].task_list;
  }
}
