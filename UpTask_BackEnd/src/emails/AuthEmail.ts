import { transporter } from "../config/nodemailer";

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {

    // Enviar Email de confirmación
    static sendConfirmationEmail = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'Bienvenido a UpTask - Confirma tu cuenta',
            text: 'UpTask - Confirma tu cuenta',
            html: `<p>Hola ${user.name}, has creado tu cuenta en UpTask, ya casi está todo listo, solo debes confirmar tu cuenta</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta </a>
            <p>Ingresa el código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `,
        });

        console.log('Email enviado', info.messageId);
    };

    // Enviar código de recuperación
    static sendPasswordResetToken = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'Bienvenido a UpTask - Resstablece tu Password',
            text: 'UpTask - Resstablece tu Password',
            html: `<p>Hola ${user.name}, has solicitado reestablecer tu password.</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
            <p>Ingresa el código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `,
        });

        console.log('Email enviado', info.messageId);
    };
};