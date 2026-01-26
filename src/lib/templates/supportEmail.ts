
export const getSupportEmailTemplate = (name: string, email: string, message: string) => {
  const subject = `[Food Rescue] Yêu cầu hỗ trợ mới từ ${name}`;

  const text = `
FOOD RESCUE - HỆ THỐNG HỖ TRỢ

Xin chào Admin,

Bạn vừa nhận được một yêu cầu hỗ trợ mới.

CHI TIẾT NGƯỜI GỬI
------------------
Họ tên: ${name}
Email: ${email}
Thời gian: ${new Date().toLocaleString('vi-VN')}

NỘI DUNG TIN NHẮN
------------------
${message}
------------------

Vui lòng phản hồi yêu cầu này sớm nhất có thể.

Trân trọng,
Đội ngũ Food Rescue
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Support Request</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .header {
      background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
      padding: 35px 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .content {
      padding: 40px 35px;
    }
    .info-group {
      margin-bottom: 25px;
    }
    .label {
      color: #b2bec3;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
      display: block;
    }
    .value {
      color: #2d3436;
      font-size: 16px;
      font-weight: 500;
    }
    .message-card {
      background-color: #f8fbfb;
      border: 1px solid #e1e8ed;
      border-radius: 8px;
      padding: 25px;
      margin-top: 10px;
    }
    .message-content {
      color: #2d3436;
      font-size: 15px;
      white-space: pre-wrap;
      margin: 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #00b894;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      margin-top: 30px;
      text-align: center;
      transition: background-color 0.2s;
    }
    .cta-button:hover {
      background-color: #01a282;
    }
    .footer {
      background-color: #2d3436;
      padding: 25px;
      text-align: center;
    }
    .footer p {
      color: #636e72;
      font-size: 12px;
      margin: 5px 0;
    }
    .footer-links a {
      color: #00b894;
      text-decoration: none;
      font-size: 12px;
      margin: 0 8px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Food Rescue</h1>
    </div>
    
    <div class="content">
      <div style="text-align: center; margin-bottom: 35px;">
        <h2 style="color: #2d3436; font-size: 22px; margin: 0 0 10px 0;">Yêu cầu hỗ trợ mới</h2>
        <p style="color: #636e72; margin: 0;">Hệ thống vừa nhận được tin nhắn từ người dùng.</p>
      </div>

      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="info-group">
            <span class="label">Người gửi</span>
            <div class="value">${name}</div>
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="info-group">
            <span class="label">Email liên hệ</span>
            <div class="value">
              <a href="mailto:${email}" style="color: #00b894; text-decoration: none;">${email}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="info-group" style="margin-top: 10px;">
        <span class="label">Nội dung tin nhắn</span>
        <div class="message-card">
          <p class="message-content">${message}</p>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="mailto:${email}" class="cta-button">Phản hồi ngay</a>
      </div>
    </div>

    <div class="footer">
      <p style="color: #b2bec3;">Email này được gửi tự động từ hệ thống Food Rescue.</p>
      <div class="footer-links" style="margin-top: 15px;">
        <a href="#">Trang chủ</a> &bull; 
        <a href="#">Bảo mật</a> &bull; 
        <a href="#">Điều khoản</a>
      </div>
      <p style="color: #636e72; margin-top: 15px;">&copy; ${new Date().getFullYear()} Food Rescue Vietnam. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, text, html };
};
