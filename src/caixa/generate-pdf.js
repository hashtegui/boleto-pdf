import path from 'path'
import PDFDocument from 'pdfkit'
import {barcode} from '../commons/utils/barcode'
import cutSeparator from '../commons/utils/cut-separator'
import body from './sections/body'
import header from './sections/header'

/**
 * Gera PDFs de boletos da Caixa Econômica Federal
 *
 * @param {Object} bill - Dados do(s) boleto(s) a serem gerados
 * @param {string} bill.barcodeData - Dados do código de barras
 * @param {string} bill.digitableLine - Linha digitável do boleto
 * @param {string} bill.paymentPlace - Local de pagamento
 * @param {string} bill.beneficiary - Nome do beneficiário (cedente)
 * @param {string} bill.beneficiaryAddress - Endereço do beneficiário
 * @param {string} bill.instructions - Instruções para o pagamento
 * @param {string} bill.bank - Código do banco (ex: '104')
 * @param {string} bills.agency - Número da agência
 * @param {string} bills.agencyDigit - Dígito verificador da agência
 * @param {string} bills.account - Número da conta
 * @param {string} bills.accountDigit - Dígito verificador da conta
 * @param {Date} bills.expirationDay - Data de vencimento
 * @param {Date} bills.documentDate - Data do documento
 * @param {Date} bills.processingDate - Data de processamento
 * @param {string} bills.card - Carteira
 * @param {string} bills.documentNumber - Número do documento
 * @param {string} bills.formatedOurNumber - Nosso número formatado
 * @param {string} bills.formatedValue - Valor formatado
 * @param {string} bills.documentType - Tipo do documento
 * @param {string} bills.accept - Aceite (S/N)
 * @param {string} bills.currencyType - Tipo de moeda
 * @param {string} bills.amount - Quantidade
 * @param {string} bills.billValue - Valor
 * @param {string} bills.descountValue - Valor de desconto
 * @param {string} bills.otherDiscounts - Outras deduções
 * @param {string} bills.feeValue - Valor de mora/multa
 * @param {string} bills.outherFees - Outros acréscimos
 * @param {string} bills.chargeValue - Valor cobrado
 * @param {Object} bills.payer - Dados do pagador
 * @param {Object} bills.recibo - Dados do recibo
 * @param {Object} [bills.guarantor] - Dados do avalista (opcional)
 * @returns {Promise<Buffer>} Promise que resolve com o buffer do PDF gerado
 */
export default function(bill) {
  return new Promise((resolve, reject) => {
    const buffers = []
    const MARGIN = 25
    const realStartY = 90
    const doc = new PDFDocument({
      autoFirstPage: false
    })

    doc.addPage({
      size: 'A4',
      margin: MARGIN
    })

    // Var filial = bill.filial
    // var fill = 'logos/motobrasil/filial'+filial+'.jpg'

    const config = {
      startY: realStartY,
      startX: MARGIN,
      smallGutterY: 3,
      smallGutterX: 3,
      line: 0.3,
      tableLimit: doc.page.width - MARGIN - MARGIN,
      lineColor: '#000',
      boxHeight: 25,
      gutterX: 10,
      gutterY: 12,
      smallFontSize: 5.8,
      fontSize: 9,
      largefontSize: 12,
      mediumFontSize: 11,
      fontBold: path.join(__dirname, 'fonts/roboto-regular.ttf'),
      fontRegular: path.join(__dirname, 'fonts/roboto-regular.ttf'),
      logo: path.join(__dirname, 'logos/logo-caixa.jpg'),
      // Logomarca: path.join(__dirname, fill),
      bodyStarY: realStartY + 25 * 14
    }

    try {
      header(doc, bill, config)
      cutSeparator(doc, realStartY + 25 * 13 + 20)
      body(doc, bill, config)
      barcode(doc, MARGIN, realStartY + 25 * 28, bill.barcodeData)
    } catch (err) {
      reject(err)
    }

    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers)
      resolve(pdfData)
    })

    doc.end()
  })
}
