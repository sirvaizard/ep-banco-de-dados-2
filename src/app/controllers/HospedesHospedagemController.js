import { sql } from '@databases/pg'

import db from '../../database/index.js'

class HospedesHospedagemControlller {
    async show (req, res) {
        const { id } = req.params

        const hospedagem = await db.query(sql`
            SELECT * FROM hospedagem WHERE idhospedagem = ${id}
        `)

        if (!hospedagem.length) {
            return res.status(400).json({
                error: 'Hospedagem não existe.'
            })
        }

        const hospedeResponsavel = await db.query(sql`
            SELECT *
            FROM HOSPEDES
            WHERE IDHOSPEDE = ${hospedagem[0].id_hospede_resp}
        `)

        const hospedes = await db.query(sql`
            SELECT IDHOSPEDE, NOME, CPF, NASC, SEXO, CELULAR
            FROM HOSPEDES H
            INNER JOIN HOSPEDE_FILIAL HF
            ON ID_HOSPEDE = IDHOSPEDE
            WHERE HF.ID_HOSPEDAGEM = ${id}
        `)

        delete hospedagem[0].id_hospede_resp
        hospedagem[0].hospedes = [...hospedes, hospedeResponsavel[0]]
        hospedagem[0].hospedeResponsavel = hospedeResponsavel[0]

        return res.status(200).json(hospedagem[0])
    }
}

export default new HospedesHospedagemControlller()