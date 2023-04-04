const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'kevinjacksonob9@gmail.com',
        pass: "izndfrsudwbbcmvw"
    }
})

module.exports = transporter
