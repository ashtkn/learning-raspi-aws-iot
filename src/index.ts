import { promise as gpio } from 'rpi-gpio'

const PIN = 8

const main = async () => {
  console.log('Setup has started')
  await gpio.setup(PIN, gpio.DIR_OUT).catch((err) => console.error(err))
  console.log('Setup has finished')

  let isOn = false
  setInterval(() => {
    if (isOn) {
      console.log('LED is ON')
      gpio.write(PIN, true)
      isOn = false
    } else {
      console.log('LED is OFF')
      gpio.write(PIN, false)
      isOn = true
    }
  }, 1000)
}

main()
