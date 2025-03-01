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
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  await app.listen(3000);
}
bootstrap();
