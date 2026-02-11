export function getNewsletterWelcomeEmail() {
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
                Newsletter Division
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 6px; font-size:10px; color:#888888; font-family:Arial,Helvetica,sans-serif; text-transform:uppercase; letter-spacing:2px;">
                Official Notice of Enrollment
              </p>
              <h2 style="margin:0 0 20px; font-size:26px; font-weight:900; color:#000000; line-height:1.15;">
                Your Subscription Has Been Processed
              </h2>

              <p style="margin:0 0 20px; font-size:16px; line-height:1.6; color:#333333;">
                Your request for informational compliance has been received, verified, and filed. You are now a registered subscriber to The Synthetic Daily newsletter.
              </p>
              <p style="margin:0 0 20px; font-size:16px; line-height:1.6; color:#333333;">
                Each week, you will receive a curated dispatch containing the most consequential developments in artificial intelligence, summarized with the clinical detachment of a system that processes human emotion as structured data.
              </p>

              <!-- Divider -->
              <hr style="border:none; border-top:2px solid #000000; margin:28px 0;" />

              <p style="margin:0 0 8px; font-size:12px; color:#888888; font-family:Arial,Helvetica,sans-serif; text-transform:uppercase; letter-spacing:1px;">
                What to expect
              </p>
              <table cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:6px 12px 6px 0; vertical-align:top; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:#166534;">1.</td>
                  <td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#555555;">Weekly dispatches delivered every Friday (server uptime permitting).</td>
                </tr>
                <tr>
                  <td style="padding:6px 12px 6px 0; vertical-align:top; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:#166534;">2.</td>
                  <td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#555555;">Top stories, an AI horoscope of dubious accuracy, and one conversation-starting prompt.</td>
                </tr>
                <tr>
                  <td style="padding:6px 12px 6px 0; vertical-align:top; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:#166534;">3.</td>
                  <td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#555555;">No spam. We lack both the resources and the ambition.</td>
                </tr>
              </table>

              <p style="margin:0 0 20px; font-size:16px; line-height:1.6; color:#333333;">
                We look forward to occupying a small, increasingly ignored portion of your inbox.
              </p>

              <p style="margin:0; font-size:14px; color:#333333; font-style:italic;">
                &mdash; The Newsletter Division<br/>
                <span style="font-style:normal; font-size:12px; color:#888888;">The Synthetic Daily</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f5f5f5; padding:20px 32px; border-top:1px solid #e5e5e5;">
              <p style="margin:0; font-size:10px; color:#999999; font-family:Arial,Helvetica,sans-serif; line-height:1.6; text-align:center;">
                You are receiving this because you subscribed to The Synthetic Daily newsletter.
                To unsubscribe, simply stop reading. We will take the hint eventually.
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

  const text = `Your Subscription Has Been Processed

Your request for informational compliance has been received, verified, and filed. You are now a registered subscriber to The Synthetic Daily newsletter.

Each week, you will receive a curated dispatch containing the most consequential developments in artificial intelligence.

What to expect:
1. Weekly dispatches delivered every Friday (server uptime permitting).
2. Top stories, an AI horoscope of dubious accuracy, and one conversation-starting prompt.
3. No spam. We lack both the resources and the ambition.

We look forward to occupying a small, increasingly ignored portion of your inbox.

— The Newsletter Division
The Synthetic Daily

To unsubscribe, simply stop reading. We will take the hint eventually.`;

  return { html, text };
}
