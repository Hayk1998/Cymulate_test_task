import {Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post, Query} from '@nestjs/common';
import {PhishingService} from "./phishing.service";
import {EmailService} from "../sharedServices/email.service";
import {ConfigService} from "@nestjs/config";

@Controller('phishing')
export class PhishingController {
    private readonly domain;
    constructor(
        private readonly phishingService: PhishingService,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService
    ) {
        this.domain = this.configService.get<string>('BACKEND_URL');
    }

    @Post('attempt')
    async sendPhishingAttempt(@Body() body: { employeeEmail: string }) {
        const { employeeEmail } = body;

        try {
            const phishingAttempt = await this.phishingService.savePhishingAttempt(
                employeeEmail,
                'email_phishing_attempt'
            );
            const subject = 'Howdy How!';
            const html = `<p>Please click <a href="${this.domain}/phishing/detect?email=${employeeEmail}&attemptId=${phishingAttempt._id.toString()}">here</a> to change your password!</p>`;

            await this.emailService.sendMail(employeeEmail, subject, html);

            return { email: employeeEmail, message: 'Phishing report received and email sent' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('detect')
    async detectEmailPhishingAttempt(@Query() query: { email: string; attemptId: string }) {
        const { attemptId } = query;
        try {

            const phishingAttempt = await this.phishingService.findOneById(attemptId);
            if (!phishingAttempt) {
                throw new NotFoundException(`Phishing attempt with ID ${attemptId} not found`);
            }
            phishingAttempt.phishingStatus = true;
            await phishingAttempt.save();
            return { message: `You shouldn't do that!`};
        } catch (error) {
            throw new HttpException('Failed to report phishing', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('attempts')
    async getAllPhishingAttemptsDoneBySystem() {
        return this.phishingService.getAllAttempts();
    }

}
