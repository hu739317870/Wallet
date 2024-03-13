const redis = require('redis');
const client = redis.createClient()
client.on('error', err => console.log('redis client eror', err))
client.connect();

exports.postBalance = (req, res) => {
    console.log(req.body);
    const balance = req.body.balance;
    client.set('balance', balance, (err) => {
        if (err) {
            return res.status(500).json({ error: 'save balance failed' });
        }
    });
    return res.status(201).json({ message: 'have set balance' });
};

exports.getBalance = async (req, res) => {
    const balance = await client.get('balance');
    console.log(balance)
    return res.status(200).json({ balance: balance});
}

exports.addOneBalance = async () => {
    await client.incr('balance', (err) => {
        if (err) {
            console.log("add balance failed")
        }
    });
}

exports.postWishlist = async (req, res) => {
    console.log(req.body);
    const wishlist = req.body.wishlist;
    client.set('wishlist', wishlist, (err) => {
        if (err) {
            return res.status(500).json({ error: 'save balance failed' });
        }
    });
    return res.status(201).json({ message: 'have set wishlist' });
};

exports.getWishlist = async (req, res) => {
    const wishlist = await client.get('wishlist');
    console.log(wishlist)
    return res.status(200).json({ wishlist: wishlist});
}

// exports.getWishlist = async (req, res) => {
//     console.log(req.params);
//     const count = parseInt(req.params.count);

//     if (!count || count <= 0) {
//         return res.status(400).json({ error: '无效的推文数量' });
//     }
//     const tweets = await client.lRange('tweets', 0, count - 1, (err) => {
//         if (err) {
//             return res.status(500).json({ error: '获取推文时出现错误' });
//         }
//     });
//     console.log(tweets);
//     return res.json(tweets);
// };

exports.postWishTable = async (req, res) => {
    console.log(req.body);
    const wishTable = req.body.wishTable;
    client.set('wishTable', wishTable, (err) => {
        if (err) {
            return res.status(500).json({ error: 'save balance failed' });
        }
    });
    return res.status(201).json({ message: 'have set wishlist' });
}