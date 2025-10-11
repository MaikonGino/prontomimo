// Importa o mongoose, nossa ferramenta para falar com o MongoDB.
import mongoose from 'mongoose';

// Pega a "chave secreta" (Connection String) que guardamos no arquivo .env.local.
const MONGODB_URI = process.env.MONGODB_URI;

// Se a chave não for encontrada, o programa para com um erro claro.
if (!MONGODB_URI) {
    throw new Error(
        'Por favor, defina a variável de ambiente MONGODB_URI dentro de .env.local'
    );
}

/**
 * O cache global é usado para armazenar a conexão através das chamadas.
 * Isso evita criar uma nova conexão a cada requisição no ambiente "serverless",
 * o que é mais eficiente e econômico.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // Se já temos uma conexão no cache, a reutilizamos.
    if (cached.conn) {
        return cached.conn;
    }

    // Se não temos uma promessa de conexão, criamos uma.
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    // Aguardamos a promessa de conexão ser resolvida e a guardamos no cache.
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    // Retornamos a conexão ativa.
    return cached.conn;
}

// Exportamos a função para que outras partes do nosso código possam usá-la.
export default dbConnect;