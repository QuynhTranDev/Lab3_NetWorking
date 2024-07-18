const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const fs = require('fs')
const sinhVienRouters = require('./routes/sinhVienRoutes')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mailer = require('nodemailer')
const upload = multer({dest: 'Images/'})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/sinhvien', sinhVienRouters)
app.use('/Images', express.static(path.join(__dirname, 'Images')))

const jwt = require('jsonwebtoken')
const access = '12345'
const refresh = '12345'

const users = [
    { id: 1, username: 'user123', password: 'password' }
]

function genAccessToken(user) {
    return jwt.sign(user, access, { expiresIn: '15m' })
}

function genRefreshToken(user) {
    return jwt.sign(user, refresh, { expiresIn: '7d' })
}

app.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log('Received login request with username:', username)
    console.log('Received login request with password:', password)

    const user = users.find((u) => 
        u.username === username && u.password === password
    )

    if (!user) {
        console.log('User or password wrong')
        return res.status(401).json({ message: 'User or password wrong' })
    }

    const accessToken = genAccessToken({ id: user.id, username: user.username })
    const refreshToken = genRefreshToken({ id: user.id, username: user.username })

    res.json({ accessToken, refreshToken })
    console.log("AccessToken", accessToken)
    console.log("RefreshToken", refreshToken)
})

const PORT = process.env.PORT || 3000

app.get('/gallery', (req, res) => {
    fs.readdir(path.join(__dirname, 'Images'), (err, files) => {
        if (err) {
            console.log('Read file error', err)
            return
        }
        res.render('gallery', { images: files })
    })
})

app.post('/Images', upload.single('image'), (req, res) => {
    res.redirect('/gallery')
})

let transport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'quynhtdph21779@fpt.edu.vn',
        pass: 'dqjb rpjw pacr ocbt'
    }
})

let mailOption = {
    from: 'quynhtdph21779@fpt.edu.vn',
    to: 'hungdich90@gmail.com',
    subject: 'testing email',
    text: 'Email cua ngay 18/7 tam 12h toi'
}

transport.sendMail(mailOption, (err, info) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Successful', info.messageId)
    }
})

mongoose.connect('mongodb://localhost:27017/API_Test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connect Success!')
}).catch((err) => {
    console.log('Error', err)
})

app.listen(PORT, () => {
    console.log(`Server in Port ${PORT}`)
})
