const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const companyData = require('./data.json');

app.use(cors());
app.use(express.json());

app.get('/autocomplete', (req, res) => {
    const searchTerm = req.query.term.toLowerCase();
    console.log("search term: " + searchTerm);
    const suggestions = companyData.companies
        .filter(company => company.name.toLowerCase().includes(searchTerm))
        .map(company => company.name);

    console.log(suggestions);

    res.json(suggestions);
});

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

app.use(cors({
    origin: 'http://127.0.0.1:5500/index.html'
}));