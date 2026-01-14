const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres', // Connect to default DB first
    password: 'adminlite35',
    port: 5432,
})

client.connect()
    .then(async () => {
        console.log('Connected successfully to postgres database!')
        try {
            await client.query('CREATE DATABASE gestion_stock')
            console.log('Database gestion_stock created successfully')
        } catch (e) {
            if (e.code === '42P04') {
                console.log('Database gestion_stock already exists')
            } else {
                console.error('Error creating database:', e)
            }
        }
        return client.end()
    })
    .catch(err => {
        console.error('Connection failed:', err)
        process.exit(1)
    })

