import { Module } from '@nestjs/common';
import { VideosModule } from './modules/videos/videos.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [VideosModule, GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
