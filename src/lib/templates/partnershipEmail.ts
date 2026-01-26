export const getPartnershipEmailTemplate = (
  name: string,
  email: string,
  company: string,
  phone: string,
  type: string,
  message: string
) => {
  const subject = `[Food Rescue] Đề xuất hợp tác từ ${company}`;

  const text = `
YÊU CẦU HỢP TÁC - FOOD RESCUE
--------------------------------
DOANH NGHIỆP: ${company}
NGƯỜI LIÊN HỆ: ${name}
EMAIL: ${email}
SĐT: ${phone}
LOẠI HÌNH: ${type}
--------------------------------
NỘI DUNG ĐỀ XUẤT:
${message}
--------------------------------
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #f0f2f5; padding-bottom: 40px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    
    /* Header */
    .header { 
      background: linear-gradient(135deg, #00b894 0%, #00cec9 100%); 
      padding: 40px 30px; 
      text-align: center; 
    }
    .header h1 { color: #ffffff; margin: 0 0 10px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { color: rgba(255,255,255,0.9); margin: 0; font-size: 15px; font-weight: 500; }
    
    /* Content */
    .content { padding: 40px 40px 30px 40px; }
    
    /* Section Headers */
    .section-title { 
      font-size: 14px; 
      color: #b2bec3; 
      text-transform: uppercase; 
      letter-spacing: 1px; 
      font-weight: 700; 
      border-bottom: 2px solid #f1f2f6; 
      padding-bottom: 12px; 
      margin-bottom: 24px; 
      margin-top: 5px;
    }
    
    /* Info Grid (Table) */
    .info-table { width: 100%; border-collapse: separate; border-spacing: 0; }
    .info-cell { width: 50%; padding-bottom: 24px; vertical-align: top; }
    .info-label { display: block; font-size: 12px; color: #636e72; text-transform: uppercase; font-weight: 600; margin-bottom: 6px; letter-spacing: 0.5px; }
    .info-value { display: block; font-size: 16px; color: #2d3436; font-weight: 600; line-height: 1.4; }
    .highlight { color: #00b894; }
    
    /* Proposal Box */
    .proposal-box { 
      background: #f8f9fa; 
      border-radius: 12px; 
      padding: 24px; 
      border: 1px solid #e9ecef;
      margin-top: 10px;
    }
    .proposal-content { color: #2d3436; font-size: 15px; line-height: 1.7; white-space: pre-wrap; }
    
    /* Footer & Button */
    .actions { text-align: center; margin-top: 40px; padding-bottom: 10px; }
    .btn { 
      display: inline-block; 
      padding: 16px 32px; 
      background: #00b894; 
      color: #ffffff; 
      text-decoration: none; 
      border-radius: 50px; 
      font-weight: 700; 
      font-size: 16px; 
      box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4); 
      transition: all 0.2s; 
    }
    .footer { background: #fdfdfd; padding: 25px; text-align: center; border-top: 1px solid #f1f2f6; }
    .footer-text { font-size: 13px; color: #b2bec3; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div style="height: 40px;"></div>
    <div class="container">
      <div class="header">
        <h1>Đối Tác Mới</h1>
        <p>Có một đề xuất hợp tác mới từ doanh nghiệp</p>
      </div>
      
      <div class="content">
        <div class="section-title">Thông tin doanh nghiệp</div>
        
        <table class="info-table">
          <tr>
            <td class="info-cell">
              <span class="info-label">Tên Công ty / Tổ chức</span>
              <span class="info-value">${company}</span>
            </td>
            <td class="info-cell">
              <span class="info-label">Hình thức hợp tác</span>
              <span class="info-value highlight">${type}</span>
            </td>
          </tr>
          <tr>
            <td class="info-cell">
              <span class="info-label">Người liên hệ</span>
              <span class="info-value">${name}</span>
            </td>
            <td class="info-cell">
              <span class="info-label">Số điện thoại</span>
              <span class="info-value">${phone}</span>
            </td>
          </tr>
          <tr>
            <td class="info-cell" colspan="2">
              <span class="info-label">Email liên hệ</span>
              <a href="mailto:${email}" style="color: #2d3436; text-decoration: none;" class="info-value">${email}</a>
            </td>
          </tr>
        </table>

        <div class="section-title" style="margin-top: 10px;">Chi tiết đề xuất</div>
        <div class="proposal-box">
          <div class="proposal-content">${message}</div>
        </div>

        <div class="actions">
          <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Trao đổi về đề xuất hợp tác - ${company}`)}&body=${encodeURIComponent(`Kính gửi ${name},\n\nĐại diện Food Rescue xin cảm ơn đề xuất hợp tác từ Quý đối tác ${company}.\n\nChúng tôi đã xem qua thông tin:\n- Loại hình: ${type}\n- Nội dung: ${message.substring(0, 50)}...\n\n[Nhập phản hồi của bạn tại đây]\n\nTrân trọng,\nĐội ngũ Phát triển Đối tác Food Rescue`)}" class="btn">
            Phản hồi ngay
          </a>
        </div>
      </div>

      <div class="footer">
        <p class="footer-text">Email tự động từ hệ thống quản trị Food Rescue</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, text, html };
};
