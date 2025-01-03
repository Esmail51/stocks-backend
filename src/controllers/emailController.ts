import nodemailer from 'nodemailer';

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'josue48@ethereal.email',
        pass: 'kvYbp6RsWSMzxf9juF'
    }
});

export const sendEmail = async (paymentDetails: any, courseDetails: any) => {
  const mailOptions = {
    from: 'mel@dev.vto.group', // Sender address
    to: 'josue48@ethereal.email', // Receiver address (Admin's email)
    subject: 'New Payment Received', // Subject line
    html: `
      <h1>New Payment Received</h1>
      <p><strong>Payment Details:</strong></p>
      <ul>
        <li>Amount: $${paymentDetails.amount / 100}</li>
        <li>Payment Method: ${paymentDetails.payment_method}</li>
        <li>Payment Status: ${paymentDetails.status}</li>
      </ul>
      <p><strong>Course Details:</strong></p>
      <ul>
        <li>Course Name: ${courseDetails.name}</li>
        <li>Course Price: $${courseDetails.price}</li>
        <li>Course Description: ${courseDetails.description}</li>
      </ul>
      <p><strong>Customer Details:</strong></p>
        <ul>
            <li>Name: ${paymentDetails.billing_details.name}</li>
            <li>Email: ${paymentDetails.billing_details.email}</li>
        </ul>
    `,
  };

  try {
    const sendMail = await transporter.sendMail(mailOptions);
    if(sendMail.accepted.length > 0) {
        return { success: true, data: sendMail };
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
