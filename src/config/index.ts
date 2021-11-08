import dotenv from 'dotenv';
dotenv.config();

const venv = {
  PORT: process.env.PORT || 8080,
  TIPO_PERSISTENCIA: process.env.TIPO_PERISTENCIA || "Memoria",
  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pass',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbNameAtlas',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'dbNameLocal',
  FIREBASE_PRIVATEKEY: process.env.FIREBASE_PRIVATEKEY || 'firebaseKey',
  FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID || 'firebaseProjectId',
  FIREBASE_CLIENTEMAIL: process.env.FIREBASE_CLIENTEMAIL || 'firebaseClienteEmail',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'facebookAppId',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'facebookAppPass',
  ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'email@ethereal.email',
  ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'password',
  ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'ethereal owner name',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'email@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
  GMAIL_NAME: process.env.GMAIL_NAME || 'GMAIL owner name',
  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || 'twilioId',
  TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilioToken',
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || '+123456789',
  PERSONAL_CELLPHONE: process.env.PERSONAL_CELLPHONE || '+541112345678',
};

export default venv;