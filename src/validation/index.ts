export const validateAccount = (rule: any, value: any, callback: any) => {
  const validRule = /[\u4e00-\u9fa5a-zA-Z0-9]{4,12}/.test(value)

  if (value === '') callback(new Error('Please input account'))
  else if (!validRule)
    callback(
      new Error('Please input 4 ~ 12 characters in English, Chinese or Number')
    )
  else callback()
}

export const validatePassword = (rule: any, value: any, callback: any) => {
  const validRule = /[\u4e00-\u9fa5a-zA-Z0-9]{8,12}/.test(value)

  if (value === '') callback(new Error('Please input password'))
  else if (!validRule)
    callback(
      new Error('Please input 8 ~ 12 characters in English, Chinese or Number')
    )
  else callback()
}
