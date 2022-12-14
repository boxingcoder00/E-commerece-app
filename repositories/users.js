const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypto);

class UsersRespository extends Repository {
    async comparePasswords(saved, supplied) {
        // Saved -> password saved in our database. 'hased.salt'
        // Supplied ->password given to us by a user trying sign in
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuf = await.scrypto(supplied, salt, 64);

        return hashed === hashedSuppliedBuf.toString('hex');
    }


    async create(attrs) {

        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const hashed = await scrypt(attrs.password, salt, 64);

        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        };
        records.push(record);

        await this.writeAll(records);

        return record;
    }
}

module.exports = new UsersRespository('users.json');

