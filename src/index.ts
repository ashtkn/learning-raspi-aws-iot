import { promise as gpio } from 'rpi-gpio'
import device from './device'

const PIN = 8
const DEVICE_SHADOW = '$aws/things/raspi-home/shadow'

console.log('Establishing connection...')

device.on('connect', async () => {
  console.log('Established connection!!')
  device.subscribe(`${DEVICE_SHADOW}/update/delta`)
  device.publish(
    `${DEVICE_SHADOW}/update`,
    JSON.stringify({
      state: {
        reported: {
          led: 'off',
        },
      },
    })
  )

  await gpio.setup(PIN, gpio.DIR_OUT).catch((err) => console.error(err))
  await gpio.write(PIN, false) // turn off
})

device.on('message', async (topic, payload) => {
  console.log(`Received a message: ${topic}`)
  console.log(`  Payload: ${payload}`)

  const shadow = JSON.parse(payload)
  if (shadow && shadow.state && shadow.state.led) {
    console.log(`LED will be ${shadow.state.led}`)

    const isOn = shadow.state.led === 'on'
    await gpio.setup(PIN, gpio.DIR_OUT)
    await gpio.write(PIN, isOn)

    device.publish(
      `${DEVICE_SHADOW}/update`,
      JSON.stringify({
        state: {
          reported: {
            led: shadow.state.led,
          },
        },
      })
    )
  }
})
