class HospedagemController {
    async index (req, res) {
        const hospedagens = await debug.query(sql`
            SELECT *
            FROM HOSPEDAGEM
            WHERE CHECKIN <= CURRENT_DATE AND
                  (CHECKOUT >= CURRENT_DATE OR CHECKOUT IS NULL); 
        `)

        return res.status(200).json(hospedagens)
    }
}

export default new HospedagemController()