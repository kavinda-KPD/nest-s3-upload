import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //setup the aws sdk
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_ACCESS_KEY_SECRET'),
    },
    region: configService.get<string>('AWS_REGION'),
  });

  await app.listen(3000);
}
bootstrap();
