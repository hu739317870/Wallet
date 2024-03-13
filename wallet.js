// app.js
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const controller = require('./balanceController');

app.post('/balance', controller.postBalance);

app.get('/getBalance', controller.getBalance);

app.post('/likes', controller.postWishlist);

// app.get('/likes/:count', controller.getWishlist);
app.get('/getLikes', controller.getWishlist);

app.post('/wishTable', controller.postWishTable);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

function addOneBalanceDaily() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 30, 0, 0);
  const delay = tomorrow - now;
  setTimeout(() => {
      controller.addOneBalance();
      addOneBalanceDaily();
  }, delay);
}

addOneBalanceDaily();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器已启动，监听端口 ${PORT}`);
});
