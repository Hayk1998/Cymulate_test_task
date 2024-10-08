"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
const auth_module_1 = require("./auth/auth.module");
const phishing_module_1 = require("./phishing/phishing.module");
const jwt_service_1 = require("./auth/jwt.service");
const auth_middleware_1 = require("./auth/auth.middleware");
const email_service_1 = require("./sharedServices/email.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes('phishing');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [() => {
                        const nodeEnv = process.env.NODE_ENV;
                        const envFilePath = nodeEnv ? `.env.${nodeEnv}` : '.env';
                        dotenv.config({ path: envFilePath });
                        return {};
                    }],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const uri = configService.get('MONGODB_URI');
                    console.log(`Connecting to MongoDB at ${uri}`);
                    return {
                        uri: configService.get('MONGODB_URI'),
                    };
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            phishing_module_1.PhishingModule,
        ],
        providers: [jwt_service_1.JwtService, email_service_1.EmailService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map