export const emailTemplate = (link: string) => `
<!DOCTYPE html>
<html lang="en" style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 0; margin: 0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>
  <body style="background-color: #f9fafb; padding: 20px; margin: 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
      <tr>
        <td style="background-color: #4f46e5; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Verify Your Email</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">
            Thank you for signing up for <strong>Articlew</strong>! Please confirm your email address by clicking the button below.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">Verify Email</a>
          </div>
          <p style="font-size: 14px; color: #666;">
            If you did not create an account, no further action is required.
          </p>
          <p style="font-size: 14px; color: #666;">This link will expire in 1 hour.</p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © 2025 Articlew. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>
`;
