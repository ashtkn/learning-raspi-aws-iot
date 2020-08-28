import { promise as gpio } from 'rpi-gpio'

const blinkLed = async (pin: number): Promise<void> => {
  console.log('Setup has started')
  await gpio.setup(pin, gpio.DIR_OUT).catch((err) => console.error(err))
  console.log('Setup has finished')

  let isOn = false
  setInterval(async () => {
    if (isOn) {
      console.log('LED is ON')
      await gpio.write(pin, true)
      isOn = false
    } else {
      console.log('LED is OFF')
      await gpio.write(pin, false)
      isOn = true
    }
  }, 1000)
}

export default blinkLed
