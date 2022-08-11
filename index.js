const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminproductsRouter = require('./routes/admin/products');
const productsRouter = require('.routes/products');
const cartsRouter = require('./routes/carts');

const app = express();

app.use(express.static('public');)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
    keys:['random']
    })
);
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

app.get('/signup', (req, res) => {
    res.send(`
    <div>
        Your id is: ${req.session.userId}
        <form method="POST">
            <input name ="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button>Sign Up</button>
        </form>
    </dev>
    `);
});

app.post('/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    
    const existingUser = await usersRepo.getOneby ({ email });
    if (existingUser) {
        return res.send('Email in use');
    }
    
    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    //Create a user in our user repo to represent this person
    const user = await usersRepo.create({email: email, password: password});

    //Store the id of that user inside the users cookie
    req.session.userId = user.id;


    res.send('Account created!!');
});


app.listen(3000, () => {
    console.log('Listening');
});
