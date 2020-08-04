const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '<YOUR_API_KEY_HERE>'

sgMail.setApiKey(sendgridAPIKey)

// function is async and can be awaited when called. That is only if you want to wait for the email to be sent in code.
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
         // later set up with actual domain email
        from: 'fopineda95@gmail.com',
        subject: "Thanks for joining my site!",
        text: `Welcome to the application, ${name}. Let me know how you get along with the application!`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
         // later set up with actual domain email
        from: 'fopineda95@gmail.com',
        subject: "Goodbye for now!",
        text: `Hello ${name}, we are sad to see you go! If you have any feedback on why you are leaving please leave it in the box below. Thank you and hope to see you back!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
