import connect from '@databases/pg'

import config from '../config/database.js'

const connection = connect(config)

export default connection