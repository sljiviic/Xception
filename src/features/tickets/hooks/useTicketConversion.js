import { useState } from 'react'
import { useTickets } from './useTickets'

export const useTicketConversion = () => {
  const {
    regularTickets,
    conversionRate,
    convertToSpecial,
    isLoading
  } = useTickets()

  const [amount, setAmount] = useState('1')
  const [inputError, setInputError] = useState('')
  const maxSpecial = Math.floor(regularTickets / conversionRate)

  const handleConvert = async (e) => {
    e?.preventDefault()
    const numAmount = Number(amount)

    if (isNaN(numAmount)) {
      setInputError('Please enter a valid amount')
      return false
    }

    if (numAmount < 1) {
      setInputError('Minimum 1 ticket required')
      return false
    }

    if (numAmount > maxSpecial) {
      setInputError(`Maximum ${maxSpecial} special tickets available`)
      return false
    }

    const success = await convertToSpecial(numAmount)
    return success
  }

  const handleAmountChange = (value) => {
    if (value === '' || (/^\d+$/.test(value) && value.length <= 3)) {
      setAmount(value)
      setInputError('')
    }
  }

  const resetConversion = () => {
    setAmount('1')
    setInputError('')
  }

  const numAmount = Number(amount) || 0
  const cost = numAmount * conversionRate
  const hasEnoughTickets = cost <= regularTickets

  return {
    amount,
    inputError,
    cost,
    hasEnoughTickets,
    maxSpecial,
    isLoading,
    handleConvert,
    handleAmountChange,
    resetConversion,
    setAmount,
    setInputError
  }
}