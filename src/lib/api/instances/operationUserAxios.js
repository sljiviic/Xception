import baseAxios from './baseAxios'

const operationUserAxios = baseAxios.create({
  baseURL: `${baseAxios.defaults.baseURL}/OperationUser`,
})

export default operationUserAxios