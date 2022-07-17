const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');

const {config} = require('../configs');
const {emailTemplate} = require('../email-templates');

module.exports = {
    sendMail: async (emailAction = '', locals = {}) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.EMAIL,
                pass: config.EMAIL_PASS
            }
        });

        const emailTemplates = emailTemplate[emailAction];

        const template = new EmailTemplate({
            views: {
                root: path.join(process.cwd(), 'email-templates')
            }
        });

        const html = await template.render(emailTemplates.template, locals);

        await transporter.sendMail({
            from: config.EMAIL,
            to: 'bbbbrazzer@gmail.com',
            subject: emailTemplates.subject,
            html
        });
    }
};