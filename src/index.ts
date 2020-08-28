import gpio from 'rpi-gpio'

const main = () => {
  const pin = 8
  let isOn = false
  gpio.setup(pin, gpio.DIR_OUT, () => {
    console.log('Setup finished')
    setInterval(() => {
      if (isOn) {
        console.log('LED is ON')
        gpio.write(pin, true)
        isOn = false
      } else {
        console.log('LED is OFF')
        gpio.write(pin, false)
        isOn = true
      }
    }, 1000)
  })
}

main()
