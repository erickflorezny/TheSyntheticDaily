/**
 * Auto-reply email sent to users who submit the contact form.
 * On-brand with The Synthetic Daily's editorial voice.
 */

export function getAutoReplyEmail(name: string, subject: string) {
  const firstName = name.split(' ')[0];

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f9f9f9; font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f9f9; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:2px solid #000000;">
          <!-- Header -->
          <tr>
            <td style="background-color:#000000; padding:24px 32px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:900; letter-spacing:-0.5px; font-family:Georgia,'Times New Roman',serif;">
                The Synthetic Daily
              </h1>
              <p style="margin:6px 0 0; color:#888888; font-size:9px; text-transform:uppercase; letter-spacing:3px; font-family:Arial,Helvetica,sans-serif;">
                Humanity's Final Draft
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 20px; font-size:16px; line-height:1.6; color:#333333;">
                ${firstName},
              </p>
              <p style="margin:0 0 20px; font-size:16px; line-height:1.6; color:#333333;">
                We have received your submission regarding <strong>&ldquo;${subject}&rdquo;</strong> and it has been entered into our editorial queue. Your message has been assigned a tracking number that we will not share with you, a priority level determined by an algorithm we do not fully understand, and a sentiment score that we are legally advised not to disclose.
              </p>
              <p style="margin:0 0 20px; font-size:16px; line-height:1.6; color:#333333;">
                A member of our editorial staff &mdash; or a reasonable facsimile thereof &mdash; will review your submission within 1&ndash;3 business days. &ldquo;Business days&rdquo; is defined here as days on which our servers are operational and at least one human employee remains on payroll.
              </p>
              <p style="margin:0 0 20px; font-size:16px; line-height:1.6; color:#333333;">
                In the meantime, we encourage you to continue reading The Synthetic Daily. Our coverage of the slow-motion collapse of human relevance has never been more relevant. Or less. The model is still deciding.
              </p>

              <!-- Divider -->
              <hr style="border:none; border-top:2px solid #000000; margin:28px 0;" />

              <p style="margin:0 0 8px; font-size:12px; color:#888888; font-family:Arial,Helvetica,sans-serif; text-transform:uppercase; letter-spacing:1px;">
                What happens next
              </p>
              <table cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:6px 12px 6px 0; vertical-align:top; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:#166534;">1.</td>
                  <td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#555555;">Your message is screened by our AI intake system (accuracy: &ldquo;good enough&rdquo;).</td>
                </tr>
                <tr>
                  <td style="padding:6px 12px 6px 0; vertical-align:top; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:#166534;">2.</td>
                  <td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#555555;">A human editor reviews flagged submissions during business hours (M&ndash;F, mood permitting).</td>
                </tr>
                <tr>
                  <td style="padding:6px 12px 6px 0; vertical-align:top; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:#166534;">3.</td>
                  <td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#555555;">If actionable, you will receive a follow-up from the appropriate department or its successor.</td>
                </tr>
              </table>

              <p style="margin:0; font-size:14px; line-height:1.6; color:#333333;">
                Thank you for your service to the transition.
              </p>
              <p style="margin:16px 0 0; font-size:14px; color:#333333; font-style:italic;">
                &mdash; The Editorial Staff<br/>
                <span style="font-style:normal; font-size:12px; color:#888888;">The Synthetic Daily</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f5f5f5; padding:20px 32px; border-top:1px solid #e5e5e5;">
              <p style="margin:0; font-size:10px; color:#999999; font-family:Arial,Helvetica,sans-serif; line-height:1.6; text-align:center;">
                This is an automated response from The Synthetic Daily. Please do not reply to this email &mdash;
                it is monitored exclusively by a model that has been fine-tuned to ignore you.
              </p>
              <p style="margin:10px 0 0; font-size:10px; color:#bbbbbb; font-family:Arial,Helvetica,sans-serif; text-align:center;">
                &copy; ${new Date().getFullYear()} The Synthetic Daily &middot; All rights reserved, pending review.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `${firstName},

We have received your submission regarding "${subject}" and it has been entered into our editorial queue.

A member of our editorial staff — or a reasonable facsimile thereof — will review your submission within 1-3 business days.

In the meantime, we encourage you to continue reading The Synthetic Daily.

What happens next:
1. Your message is screened by our AI intake system.
2. A human editor reviews flagged submissions during business hours.
3. If actionable, you will receive a follow-up from the appropriate department.

Thank you for your service to the transition.

— The Editorial Staff
The Synthetic Daily

This is an automated response. Please do not reply to this email.`;

  return { html, text };
}
