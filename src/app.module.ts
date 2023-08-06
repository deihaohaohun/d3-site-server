import { Module } from '@nestjs/common';
import { VideosModule } from './modules/bili-history/videos/videos.module';
import { GlobalModule } from './global.module';
import { HistoriesModule } from './modules/bili-history/histories/histories.module';
import { NoteModule } from './modules/abhs/note.module';

@Module({
  imports: [VideosModule, GlobalModule, HistoriesModule, NoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
