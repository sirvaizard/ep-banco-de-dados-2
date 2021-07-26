import { sql } from '@databases/pg'

import db from '../../database/index.js'

class HospedesHospedagemControlller {
    async show (req, res) {
        const { id } = req.params

        const hospedagem = await db.query(sql`
            SELECT * FROM hospedagem WHERE idhospedagem = ${id}
        `)

        if (!hospedagem) {
            return res.status(400).json({
                error: 'Hospedagem não existe.'
            })
        }

        const hospedes = await db.query(sql`
            SELECT * 
            FROM HOSPEDES H
            INNER JOIN HOSPEDE_FILIAL HF
            ON ID_HOSPEDE = IDHOSPEDE
            WHERE HF.ID_HOSPEDAGEM = ${id}
        `)

        hospedagem[0].hospedes = hospedes

        return res.status(200).json(hospedagem[0])
    }
}

export default new HospedesHospedagemControlller()