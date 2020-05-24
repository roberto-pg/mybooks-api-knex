const bcrypt = require('bcryptjs');
const connection = require('../database/connection');
const jwt = require('jsonwebtoken');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: '7 days',
    });
}

module.exports = {

    async index(req, res) {
        const users = await connection('users').select('id', 'email');

        return res.json(users);
    },

    async create(req, res) {
        const { email } = req.body;
        var { password } = req.body;
        password = await bcrypt.hash(password, 10);
        try {
            await connection('users').insert({
                email,
                password,
            })
        } catch (error) {
            return res.status(400).json({ Erro: error.detail });
        }

        const user = await connection('users').
            select('*')
            .where('email', email)
            .first();

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    },

    async delete(req, res) {
        const { id } = req.params;

        const user = await connection('users')
            .where('id', id)
            .first();

        if (!user) {
            return res.status(400).json({ Error: 'User not found in the database' });
        }

        await connection('users').where('id', id).delete();

        return res.json({ success: true, message: 'ok' });
    }

}; 