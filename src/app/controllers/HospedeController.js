import { sql } from '@databases/pg'

import db from '../../database/index.js'

class HospedeController {
    async index (req, res) {
        const hospedes = await db.query(sql`
            SELECT *
            FROM HOSPEDES
        `)

        return res.status(200).json(hospedes)
    }

    async show (req, res) {
        const { id } = req.params

        const hospede = await db.query(sql`
            SELECT *
            FROM HOSPEDES
            WHERE IDHOSPEDE = ${id}
        `)

        if (!hospede) {
            return res.status(400).json({
                error: 'Hospede não existe.'
            })
        }

        return res.status(200).json(hospede[0])
    }
}

export default new HospedeController()