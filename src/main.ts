import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import constants from '@config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV) {
		const config = new DocumentBuilder()
			.setTitle('API Teste | Teddy Open Finance')
			.setDescription('Documentation of Teddy Open Finance API')
			.setVersion('1.0.0')
			.addCookieAuth('accessToken', {
				type: 'http',
				in: 'Header',
				scheme: 'Bearer'
			})
			.build()

		const document = SwaggerModule.createDocument(app, config)
		SwaggerModule.setup('docs', app, document)
	}

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
