import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [DatabaseModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
