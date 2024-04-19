const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const companyData = require('./data.json');

app.use(cors({
    origin: '*',  
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true 
}));

app.use(express.json());

app.get('/autocomplete', (req, res) => {
    const searchTerm = req.query.term.toLowerCase();
    const suggestions = companyData.companies
        .filter(company => company.name.toLowerCase().includes(searchTerm))
        .map(company => company.name);

    res.json(suggestions);
});

app.get('/company/:name', (req, res) => {
    const companyName = req.params.name.replace(/\s/g, '').toLowerCase();
    const company = companyData.companies.find(c => c.name.replace(/\s/g, '').toLowerCase() === companyName);

    if (company) {
        res.json(company);
    } else {
        res.status(404).json({ error: 'Company not found' }); 
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
