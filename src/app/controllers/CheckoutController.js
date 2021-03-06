import { sql } from '@databases/pg'

import db from '../../database/index.js'

class CheckoutController {
    async show(req, res) {
        const { id } = req.params

        const hospedagem = await db.query(sql`
            SELECT * FROM hospedagem WHERE idhospedagem = ${id}
        `)

        if (!hospedagem.length) {
            return res.status(400).json({
                error: 'Hospedagem não existe.'
            })
        }

        const valorTotal = await db.query(sql`
            SELECT IDHOSPEDAGEM, ID_HOSPEDE_RESP, NUM_QUARTO, CHECKIN, CHECKOUT,
            VALOR_TOTAL_PAGO, DATA_PAGAMENTO, 
            COUNT(*) * C.QUANTIDADE AS QTD_PRATOS, 
            SUM(C.VALOR_COBRADO * C.QUANTIDADE) AS VALOR_TOTAL_COMIDA, 
            Q.VALOR_DIARIA * (CURRENT_DATE - HP.CHECKIN) AS VALOR_TOTAL_ESTADIA,
            SUM(C.VALOR_COBRADO * C.QUANTIDADE) + Q.VALOR_DIARIA * (CURRENT_DATE - HP.CHECKIN) AS TOTAL_A_PAGAR
            FROM COMPRA C
            INNER JOIN HOSPEDAGEM HP
            ON C.ID_HOSPEDAGEM = HP.IDHOSPEDAGEM
            INNER JOIN QUARTOS Q
            ON HP.NUM_QUARTO = Q.NUMQUARTO
            WHERE HP.CHECKIN <= CURRENT_DATE AND IDHOSPEDAGEM = ${id}
            GROUP BY HP.IDHOSPEDAGEM, C.QUANTIDADE, Q.VALOR_DIARIA, HP.CHECKIN,
            HP.ID_HOSPEDE_RESP, HP.NUM_QUARTO;        
        `)

        return res.status(200).json(valorTotal[0])
    }
}

export default new CheckoutController()