import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { formType, ...formData } = await request.json();

    // Налаштування Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Шаблони для різних форм
    const emailTemplates: Record<string, { subject: string; html: string }> = {
      // 1. Швидкий запис на консультацію
      consultation: {
        subject: `🔔 Швидкий запис від ${formData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🏥 Швидкий запис на консультацію</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 10px 0;"><strong>👤 Ім'я:</strong> ${formData.name}</p>
                <p style="margin: 10px 0;"><strong>📱 Телефон:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
                <p style="margin: 10px 0;"><strong>📧 Email:</strong> <a href="mailto:${formData.email}">${formData.email || 'Не вказано'}</a></p>
                <p style="margin: 10px 0;"><strong>🏥 Тип консультації:</strong> ${formData.consultationType}</p>
              </div>
              
              ${formData.comment ? `
                <div style="background: white; padding: 20px; border-radius: 8px;">
                  <p style="margin: 0 0 10px 0; font-weight: bold;">💬 Коментар:</p>
                  <p style="margin: 0; color: #4b5563; line-height: 1.6;">${formData.comment}</p>
                </div>
              ` : ''}
              
              <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
                Відправлено ${new Date().toLocaleString('uk-UA')}
              </p>
            </div>
          </div>
        `,
      },
      
      // 2. Запис на послугу (модальні форми)
      service: {
        subject: `🏥 Запис на послугу: ${formData.serviceName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🏥 Запис на послугу</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">${formData.serviceName}</p>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 10px 0;"><strong>👤 Ім'я:</strong> ${formData.name}</p>
                <p style="margin: 10px 0;"><strong>📱 Телефон:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
                <p style="margin: 10px 0;"><strong>📧 Email:</strong> <a href="mailto:${formData.email}">${formData.email || 'Не вказано'}</a></p>
              </div>
              
              ${formData.comment ? `
                <div style="background: white; padding: 20px; border-radius: 8px;">
                  <p style="margin: 0 0 10px 0; font-weight: bold;">💬 Побажання щодо дати та часу:</p>
                  <p style="margin: 0; color: #4b5563; line-height: 1.6;">${formData.comment}</p>
                </div>
              ` : ''}
              
              <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
                Відправлено ${new Date().toLocaleString('uk-UA')}
              </p>
            </div>
          </div>
        `,
      },
      
      // 3. Форма МЦ "Ехокор"
      ehokor: {
        subject: `🏥 Запис в МЦ Ехокор від ${formData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🏥 МЦ «Ехокор»</h1>
              <p style="color: white; margin: 10px 0 0 0;">Запис на консультацію</p>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 10px 0;"><strong>👤 Ім'я:</strong> ${formData.name}</p>
                <p style="margin: 10px 0;"><strong>📱 Телефон:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
                ${formData.specialist ? `<p style="margin: 10px 0;"><strong>👨‍⚕️ Спеціаліст:</strong> ${formData.specialist}</p>` : ''}
                ${formData.desiredDate ? `<p style="margin: 10px 0;"><strong>📅 Бажана дата:</strong> ${formData.desiredDate}</p>` : ''}
              </div>
              
              ${formData.comment ? `
                <div style="background: white; padding: 20px; border-radius: 8px;">
                  <p style="margin: 0 0 10px 0; font-weight: bold;">💬 Коментар:</p>
                  <p style="margin: 0; color: #4b5563; line-height: 1.6;">${formData.comment}</p>
                </div>
              ` : ''}
              
              <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
                Відправлено ${new Date().toLocaleString('uk-UA')}
              </p>
            </div>
          </div>
        `,
      },
    };

    const template = emailTemplates[formType];

    if (!template) {
      return NextResponse.json(
        { success: false, error: 'Невідомий тип форми' },
        { status: 400 }
      );
    }

    // Відправка email
    await transporter.sendMail({
      from: `"SleepCheck AI" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: template.subject,
      html: template.html,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email відправлено' 
    });

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Помилка відправки' 
      },
      { status: 500 }
    );
  }
}