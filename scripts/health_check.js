const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        bot: 'USDT Clone Bot Running'
    });
});

app.get('/', (req, res) => {
    res.json({ 
        message: 'USDT Clone Bot is running',
        token: '59qfawpS114aAY6wAu9RfZfP9wSShLc15rJSVZ5iGWrt',
        owner: 'CQGqaL3djnRbPwTA1RFppzavQyD6QggUFUAwfKp3JR9G'
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;