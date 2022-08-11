const fs = requre('fs');
const crypto = require('crypto');
const { create } = require('./users');


module.exports = class Repository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename'); {
            }

            this.filename = filename;
            try {
            Fs.accessSync(this.filename);
        }   catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
     }

        async create(attrs) {
            attrs.id = this.randomId();

            const records = await this.getAll();
            records.push(attrs);
            await this.writeAll(records);
            
            return attrs;
        }


       async getAll() {
         return JSON.parse(await fs.promises.readFiles(this.filename, {
            encoding: 'utf8'
         })
        );  
    }

    async WriteAll(records) {
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(records, null, 2)
            );
    }


    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    async getONE(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id );
    }
}

async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    await this.writeAll(filteredRecords);
    }


    async update(id, attrs) {
            const records = await this.getAll();
            const record = records.find(record => record.id === id);

            if (!record) {
                throw new Error(`Record with id ${id} not found `);
            }
           
            Object.assign(record, attrs);
            await this.writeAll(records);
        }

        async getOneBy(filers) {
            const records = await this.getAll();

            for (let record of records) {
                let found = true;

                for (let key in filters) {
                    if (record[key] !== filters[key]) {
                        found = false;
                    }
                }

                if (found) {
                    return record;
                }
            }
        }
    }

}