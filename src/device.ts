import awsIoT from 'aws-iot-device-sdk'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const device = new awsIoT.device({
  keyPath: process.env.KEY_PATH,
  certPath: process.env.CERT_PATH,
  caPath: process.env.CA_PATH,
  clientId: process.env.CLIENT_ID,
  host: process.env.HOST,
})

export default device
