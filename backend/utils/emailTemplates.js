export const getResetPasswordTemplate = (user, resetUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            border: 1px solid #eaeaea;
        }
        .email-header {
            background-color: #2D3748;
            padding: 30px 20px;
            text-align: center;
        }
        .email-header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            letter-spacing: 1px;
            font-weight: 600;
        }
        .email-body {
            padding: 40px 30px;
            color: #4a5568;
            line-height: 1.6;
            font-size: 16px;
        }
        .email-body p {
            margin: 0 0 20px 0;
        }
        .greeting {
            font-size: 20px;
            font-weight: 600;
            color: #2D3748;
            margin-bottom: 25px;
        }
        .btn-container {
            text-align: center;
            margin: 35px 0;
        }
        .btn {
            display: inline-block;
            padding: 14px 30px;
            background-color: #4299E1;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            font-size: 16px;
            transition: background-color 0.3s ease;
            box-shadow: 0 2px 5px rgba(66, 153, 225, 0.4);
        }
        .btn:hover {
            background-color: #3182ce;
        }
        .disclaimer {
            font-size: 14px;
            color: #718096;
            padding: 20px;
            background-color: #f8fafc;
            border-radius: 6px;
            margin-bottom: 0;
        }
        .raw-link {
            word-break: break-all;
            color: #4299E1;
            font-size: 13px;
        }
        .email-footer {
            background-color: #f7fafc;
            padding: 20px;
            text-align: center;
            font-size: 13px;
            color: #a0aec0;
            border-top: 1px solid #edf2f7;
        }
        .email-footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>ShopIT Team</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
            <p class="greeting">Hello, ${user.name} 👋</p>
            <p>You are receiving this email because we received a password reset request for your account.</p>
            <p>Click the secure button below to choose a new password. This link will expire in <strong>15 minutes</strong>.</p>
            
            <div class="btn-container">
                <a href="${resetUrl}" class="btn" target="_blank">Reset Password</a>
            </div>

            <div class="disclaimer">
                <p>If you did not request a password reset, no further action is required and your password has not been changed.</p>
                <p style="margin-bottom: 5px;">Trouble clicking the button? Copy and paste this URL into your web browser:</p>
                <a href="${resetUrl}" class="raw-link">${resetUrl}</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p>&copy; ${new Date().getFullYear()} ShopIT Inc. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
        </div>
    </div>
</body>
</html>
`;
