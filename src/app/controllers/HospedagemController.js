import { sql } from '@databases/pg'

import db from '../../database/index.js'

class HospedagemController {
    async index (req, res) {
        const hospedagens = await db.query(sql`
            SELECT *
            FROM HOSPEDAGEM
            WHERE CHECKIN <= CURRENT_DATE AND
                  (CHECKOUT >= CURRENT_DATE OR CHECKOUT IS NULL); 
        `)

        return res.status(200).json(hospedagens)
    }

    async show (req, res) {
        const { id } = req.params

        const hospedagem = await db.query(sql`
            SELECT *
            FROM HOSPEDAGEM
            WHERE IDHOSPEDAGEM = ${id}
        `)

        if (!hospedagem) {
            return res.status(400).json({
                error: 'Hospedagem não existe.'
            })
        }

        return res.status(200).json(hospedagem[0])
    } 
}

export default new HospedagemController()