import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Required fields missing' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('technoyogy');

    const enquiry = {
      name,
      email,
      subject: subject || 'General Enquiry',
      message,
      createdAt: new Date(),
      status: 'NEW'
    };

    const result = await db.collection('enquiries').insertOne(enquiry);

    // Email Notification Configuration
    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials missing in environment variables');
      }

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // 1. Send Notification to Admin
      const adminMailOptions = {
        from: `"TECHNOYOGY ADMIN" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `[NEW LEAD] ${subject || 'General Enquiry'} - ${name}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #7a3983; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">New Lead Captured</h1>
            </div>
            <div style="padding: 30px; color: #333333;">
              <p style="font-size: 14px; color: #666666; margin-bottom: 25px;">A new enquiry has been submitted through the official website portal.</p>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f9f9f9; font-weight: bold; width: 120px; color: #7a3983; font-size: 12px; text-transform: uppercase;">Sender</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f9f9f9; font-size: 14px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f9f9f9; font-weight: bold; color: #7a3983; font-size: 12px; text-transform: uppercase;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f9f9f9; font-size: 14px;"><a href="mailto:${email}" style="color: #7a3983; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f9f9f9; font-weight: bold; color: #7a3983; font-size: 12px; text-transform: uppercase;">Subject</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f9f9f9; font-size: 14px;">${subject || 'General Enquiry'}</td>
                </tr>
              </table>

              <div style="margin-top: 30px; background-color: #fcfcfc; padding: 20px; border-left: 4px solid #7a3983; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 12px; color: #7a3983; text-transform: uppercase;">Message Content:</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #444444; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="margin-top: 30px; text-align: center;">
                <a href="${request.headers.get('origin')}/admin/dashboard/enquiries" style="background-color: #7a3983; color: #ffffff; padding: 12px 25px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase; border-radius: 4px; display: inline-block;">View in Admin Panel</a>
              </div>
            </div>
            <div style="background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; font-size: 10px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">System generated alert • Reference: ${result.insertedId}</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(adminMailOptions);

      // 2. Send Auto-Reply to User
      const userMailOptions = {
        from: `"TECHNOYOGY" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `We've received your enquiry: ${subject || 'General Enquiry'}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #7a3983; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Thank You</h1>
            </div>
            <div style="padding: 30px; color: #333333; text-align: center;">
              <h2 style="color: #1a1a1a; margin-top: 0;">Hello ${name},</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #444444;">Your message has been successfully transmitted to our team.</p>
              <p style="font-size: 14px; line-height: 1.6; color: #666666; margin-bottom: 30px;">We have received your enquiry regarding <strong>"${subject || 'General Enquiry'}"</strong>. Our specialists are reviewing your request and will contact you shortly.</p>
              
              <div style="border-top: 1px solid #eeeeee; padding-top: 25px;">
                <p style="margin: 0; font-size: 12px; color: #999999; font-style: italic;">"Pioneering the future through innovation."</p>
              </div>
            </div>
            <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #ffffff; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Official Response System</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(userMailOptions);

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
