const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const companyData = require('./data.json');

app.get('/company/:name', (req, res) => {
    console.log("Inside controller");
    const companyName = req.params.name.replace(/\s/g, '');
    console.log("Company Name:", companyName);
    console.log("Company Data:", companyData);

    const company = companyData.companies.find(company => company.name.replace(/\s/g, '').toLowerCase() === companyName.toLowerCase());

    if (!company) {
        console.log("Company not found");
        return res.status(404).json({ error: 'Company not found' });
    }

    console.log("Company found:", company);
    res.json(company);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
