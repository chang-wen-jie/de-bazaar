<!DOCTYPE html>
<html lang="">
<head>
    <meta charset="utf-8">
    <title>User Contract</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .contract-id {
            text-align: right;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .section {
            margin-bottom: 20px;
        }
        .signature-area {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
        }
        .signature-line {
            border-top: 1px solid #000;
            width: 200px;
            margin-top: 50px;
            padding-top: 5px;
        }
    </style>
</head>
<body>
<div class="header">
    <h1>USER AGREEMENT</h1>
    <p>Date: {{ $date }}</p>
</div>

<div class="contract-id">
    Contract ID: {{ $contract_id }}
</div>

<div class="section">
    <h2>User Information</h2>
    <p><strong>Name:</strong> {{ $user->first_name }} {{ $user->infix ?? '' }} {{ $user->last_name }}</p>
    <p><strong>Email:</strong> {{ $user->email }}</p>
    <p><strong>User ID:</strong> {{ $user->id }}</p>
    <p><strong>Role:</strong> {{ $user->role->name ?? 'Unknown' }}</p>
</div>

<div class="section">
    <h2>Agreement Terms</h2>
    <p>This is a sample contract document generated for demonstration purposes only. In a real application, this would contain actual legal terms and conditions relevant to the user agreement.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo quis nisl faucibus finibus. Morbi vel diam eget odio congue tempor. Fusce semper eros vel nisi fermentum, at ullamcorper lorem pretium.</p>
    <p>Etiam euismod mi ac felis molestie, nec ultrices enim cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ante ipsum primis in faucibus.</p>
</div>

<div class="signature-area">
    <div>
        <div class="signature-line">User Signature</div>
    </div>
    <div>
        <div class="signature-line">Administrator Signature</div>
    </div>
</div>
</body>
</html>
