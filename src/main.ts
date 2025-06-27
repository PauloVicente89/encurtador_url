import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import constants from '@config/constants';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.use(cookieParser(constants.cookie.secret));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
		origin: true,
    credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe({ 
		transform: true,
		whitelist: true,
	}));

  if (!constants.isProd) {
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
