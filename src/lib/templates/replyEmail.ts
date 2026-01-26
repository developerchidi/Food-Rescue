
export const getReplyEmailTemplate = (originalName: string, replyMessage: string) => {
  const subject = `[Food Rescue] Phản hồi yêu cầu hỗ trợ của bạn`;

  const text = `
Chào ${originalName},

Cảm ơn bạn đã liên hệ với Food Rescue. Dưới đây là phản hồi từ đội ngũ hỗ trợ của chúng tôi:

${replyMessage}

Nếu bạn cần thêm thông tin, vui lòng trả lời email này hoặc liên hệ qua hotline.

Trân trọng,
Đội ngũ Food Rescue
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .header { background: #00b894; padding: 30px; text-align: center; color: white; }
    .content { padding: 40px 30px; color: #2d3436; line-height: 1.6; }
    .reply-box { background: #f8f9fa; border-left: 4px solid #00b894; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #636e72; background: #dfe6e9; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0; font-size: 24px;">Food Rescue Support</h1>
    </div>
    <div class="content">
      <p>Xin chào <strong>${originalName}</strong>,</p>
      <p>Cảm ơn bạn đã liên hệ với chúng tôi. Đội ngũ hỗ trợ xin phản hồi yêu cầu của bạn như sau:</p>
      
      <div class="reply-box">
        ${replyMessage.replace(/\n/g, '<br/>')}
      </div>

      <p>Nếu vấn đề chưa được giải quyết hoặc bạn cần hỗ trợ thêm, đừng ngần ngại liên hệ lại với chúng tôi nhé!</p>
      
      <p style="margin-top: 30px;">Trân trọng,<br/><strong>Đội ngũ Food Rescue</strong></p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Food Rescue Vietnam.
    </div>
  </div>
</body>
</html>
  `;
  return { subject, text, html };
};
