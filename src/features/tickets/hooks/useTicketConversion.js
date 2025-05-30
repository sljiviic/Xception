import { useState } from 'react'
import { useTickets } from './useTickets'

export const useTicketConversion = () => {
  const {
    regularTickets,
    conversionRate,
    convertToSpecial,
    isConvertingToSpecial
  } = useTickets()

  const [amount, setAmount] = useState('1')
  const [inputError, setInputError] = useState('')

  const handleConvert = async (e) => {
    e?.preventDefault()
    const numAmount = Number(amount)
    const maxSpecial = Math.floor(regularTickets / conversionRate)

    if (isNaN(numAmount)) {
      setInputError('Please enter a valid amount')
      return false
    }

    if (numAmount < 1) {
      setInputError('Minimum 1 ticket required')
      return false
    }

    if (numAmount > maxSpecial) {
      setInputError('Insufficient ticket balance')
      return false
    }

    await convertToSpecial(numAmount)
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

  return {
    amount,
    inputError,
    cost: conversionRate * Number(amount),
    isLoading: isConvertingToSpecial,
    handleConvert,
    handleAmountChange,
    resetConversion,
  }
}