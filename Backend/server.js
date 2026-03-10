
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs'); 

const app = express();
const PORT = process.env.PORT || 5000; 
const CRM_URL = process.env.CRM_URL || 'https://legalpapers.konceptsoftwaresolutions.com/leadRoutes';

// Middleware
app.use(helmet());
app.use(cors({ origin: '*' })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'IEC Backend Running' });
});

app.post('/api/submit-iec', async (req, res) => {
  try {
    console.log('Received from React:', req.body);

    const data = req.body;

    const crmPayload = {
      'ctl00$ContentPlaceHolder1$ddlApplicationType': data.application_type || '',
      'ctl00$ContentPlaceHolder1$txtBusinesEntity': data.business_entity || '',
      'ctl00$ContentPlaceHolder1$ddlConstitution': data.constitution || '',
      'ctl00$ContentPlaceHolder1$txtdescriptionbusiness': data.description_business || '',
      'ctl00$ContentPlaceHolder1$ddlBsinessActivity': data.business_activity || '',
      'ctl00$ContentPlaceHolder1$txtDate': data.date_of_incorporation || '',
      'txtpaddress': data.address_line1 || '',
      'txtpaddress2': data.address_line2 || '',
      'txtpcity': data.city || '',
      'txtpstate': data.state || '',
      'txtppincode': data.pincode || '',
      'ctl00$ContentPlaceHolder1$txtPanNo': data.pan_no || '',
      'ctl00$ContentPlaceHolder1$txtemail': data.email || '',
      'ctl00$ContentPlaceHolder1$txtphone': data.contact_no || '',
      'hasBranch': data.has_branch || '',
      'sez': data.sez || 'No',
      'serviceCategory': 'iecReg',
      'leadSource': 'iecregistration-india.org'
    };

    const formBody = new URLSearchParams(crmPayload);

    console.log('→ Fire-and-forget to CRM:', formBody.toString().slice(0, 400) + '...');
    fetch(CRM_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (compatible; IEC Proxy/1.0)'
      },
      body: formBody,
      keepalive: true  
    })
    .then(async res => {
      const text = await res.text();
      console.log('Late CRM response arrived:', {
        status: res.status,
        bodyPreview: text.slice(0, 500)
      });
      fs.appendFile('crm_responses.log', 
        `${new Date().toISOString()} - Status: ${res.status} | Body: ${text.slice(0, 300)}\n`, 
        () => {}
      );
    })
    .catch(err => {
      console.error('Background CRM failed (ignored):', err.message);
      fs.appendFile('crm_errors.log', 
        `${new Date().toISOString()} - Error: ${err.message}\n`, 
        () => {}
      );
    });

    // Turant success return kar do React ko
    res.json({
      success: true,
      message: 'Submitted successfully – processing in background (may take a few minutes)'
    });

  } catch (err) {
    console.error('Critical error before sending:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate submission – please try again'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});