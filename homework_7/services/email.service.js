const {createTransport} = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {emailTemplates} = require('../email-templates');
const {CustomError} = require('../error');

module.exports = {

    sendMail: async (email = '', emailAction = '', locals = {}) => {

        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const templateInfo = emailTemplates[emailAction];

        if (!templateInfo) {
            throw new CustomError('Wrong template', 500);
        }

        const templateParse = new EmailTemplates({
            views: {
                root: path.join(process.cwd(), 'email-templates')
            }
        });

        const html = await templateParse.render(templateInfo.template, locals);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: templateInfo.subject,
            html
        });
    }
};