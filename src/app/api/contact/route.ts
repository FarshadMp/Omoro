import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, message, email, name, phone } = body;

    // Create a transporter using Gmail SMTP
    // NOTE: For this to work with Gmail, you need to generate an 'App Password'
    // Go to Google Account > Security > 2-Step Verification > App passwords
    const transporter = nodemailer.createTransport({
      service: 'gmail',
        auth: {
        user: 'fakesnapworld@gmail.com', // Your email
        // IMPORTANT: You must use an Environment Variable for the password in production
        // For local testing, replace process.env.GMAIL_APP_PASSWORD with your actual App Password
        pass: process.env.GMAIL_APP_PASSWORD || 'iwjouaahcfsfbidk', 
      },
    });

    const mailOptions = {
      from: `"Omoro Website" <fakesnapworld@gmail.com>`,
      to: 'fakesnapworld@gmail.com', // Where you want to receive the notifications
      replyTo: email, // Valid email from the form
      subject: subject || 'New Enquiry from Omoro Website',
      text: `
        Enquiry Received
        
        --------------------------------------------------
        Item                  Details
        --------------------------------------------------
        Name:                 ${name}
        Email:                ${email}
        Phone:                ${phone}
        Subject:              ${subject || 'General Enquiry'}
        
        Message:
        ${message}
        --------------------------------------------------
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Enquiry from Omoro</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 20px; margin-bottom: 20px;">
            
            <!-- Header -->
            <div style="background-color: #04AFE2; padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">OMORO</h1>
              <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 14px;">Enquiry</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; margin-top: 0;">You have received a new enquiry from the website contact form.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 500;">
                    <a href="mailto:${email}" style="color: #04AFE2; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Phone</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 500;">
                    <a href="tel:${phone}" style="color: #111827; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Subject</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 500;">${subject || 'General Enquiry'}</td>
                </tr>
              </table>

              <div style="margin-top: 30px;">
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">Message:</p>
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; color: #374151; font-size: 15px; white-space: pre-wrap;">${message}</div>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Omoro. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email', error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
