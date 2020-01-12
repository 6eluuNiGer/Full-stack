const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.route('/users').get((req, res) => {
    User.find()
        .then(userss => res.json(userss))
        .catch(err => res.status(400).json('Error' + err))

});
router.post('/register',
    [
        check('email', 'Некорректный емайл').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)                //валидация вхідних полей
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            const { email, password } = req.body // відправказ фронта
            /* console.log(req.body) */
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ massage: 'candidat true' })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })
            await user.save()
            res.status(201).json({ message: "Created user" })
        } catch (e) {
            res.status(500).json({ message: 'Have a problem, try again' })
        }
    })

router.post('/login',
    [
        check('email', 'Введите корректный емайл').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)                //валидация вхідних полей
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ massage: 'Пользователь не найден' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.starus(400).json({ message: 'неверний пароль' })
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }                                                     //Время токена
            )
            res.json({ token, userId: user.id })
        } catch (e) {
            res.status(500).json({ message: 'have aproblem, try again' })
        }
    })

module.exports = router