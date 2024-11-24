import axios from 'axios'

export function generateOrderId(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase()

  return `${year}${month}${day}${hours}${minutes}${seconds}-${randomPart}`
}

export async function sendOrderToTelegram(orderText: string): Promise<void> {
  const botToken = '6690815586:AAFh5kcrmt7Heggp-Syg66FDlGP9idUzQEI'
  const chatId = '5456798232'
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

  try {
    await axios.post(apiUrl, {
      chat_id: chatId,
      text: orderText,
    })
  } catch (error) {
    console.error('Error sending order to Telegram:', error)
  }
}
