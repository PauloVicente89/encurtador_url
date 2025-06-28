import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
		origin: true,
    credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe({ 
		transform: true,
		whitelist: true,
	}));

  if (
		process.env.NODE_ENV === 'dev' || 
		process.env.NODE_ENV === 'development'
	) {
		const config = new DocumentBuilder()
			.setTitle('API Teste | Teddy Open Finance')
			.setDescription('Documentation of Teddy Open Finance API')
			.setVersion('1.0.0')
			.addBearerAuth({
				name: "Authorization",
				in: "header",
				type: 'apiKey',
				description: "Enter your bearer token in the format: Bearer {token}",
			})
			.build()

		const document = SwaggerModule.createDocument(app, config)
		SwaggerModule.setup('docs', app, document)
	}

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
