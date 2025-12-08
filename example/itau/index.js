const fs = require('fs')
const path = require('path')
const itauPDF = require('../../dist/index').itau

// Dados do boleto já prontos para gerar o PDF
const boleto = {
  barcodeData: '34191726700000009901234567890123456789012',
  digitableLine: '34191.23456 67890.123458 67890.123456 1 72670000000990',
  paymentPlace: 'Pagável em qualquer banco até o vencimento.',
  beneficiary: 'EMPRESA EXEMPLO LTDA - CNPJ: 12.345.678/0001-90',
  beneficiaryAddress:
    'Av Paulista, 1000 - Bela Vista - São Paulo/SP - CEP 01310-100',
  instructions:
    'Após o vencimento cobrar multa de 2,00%, mais juros ao mês de 1,00%.',
  bank: '341-7',
  agency: '0123',
  agencyDigit: '4',
  account: '12345',
  accountDigit: '6',
  expirationDay: new Date(2024, 11, 31), // 31/12/2024
  documentDate: new Date(2024, 11, 1), // 01/12/2024
  processingDate: new Date(2024, 11, 1), // 01/12/2024
  card: '109',
  documentNumber: '98765-4',
  formatedOurNumber: '109/12345678-9',
  formatedValue: 'R$ 1.250,00',
  documentType: 'DM',
  accept: 'N',
  currencyType: 'Real (R$)',
  amount: ' ',
  billValue: ' ',
  valueOf: ' ',
  descountValue: ' ',
  otherDiscounts: ' ',
  feeValue: ' ',
  outherFees: ' ',
  chargeValue: ' ',
  payer: {
    name: 'João da Silva Santos',
    registerNumber: '123.456.789-00',
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    district: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    postalCode: '01000-000'
  },
  guarantor: {
    name: 'Tech Solutions Ltda',
    registerNumber: '98.765.432/0001-10',
    street: 'Av Faria Lima',
    number: '500',
    district: 'Pinheiros',
    complement: 'Sala 1001',
    city: 'São Paulo',
    state: 'SP',
    postalCode: '01452-000'
  },
  recibo: {
    beneficiaryAddress:
      'Av Paulista, 1000 - Bela Vista - São Paulo/SP - CEP 01310-100',
    agency: '0123',
    agencyDigit: '4',
    expirationDay: new Date(2024, 11, 31), // 31/12/2024
    documentDate: new Date(2024, 11, 1), // 01/12/2024
    processingDate: new Date(2024, 11, 1), // 01/12/2024
    card: '109',
    documentNumber: '98765-4',
    formatedOurNumber: '109/12345678-9',
    formatedValue: 'R$ 1.250,00',
    descountValue: ' ',
    otherDiscounts: ' ',
    feeValue: ' ',
    outherFees: ' ',
    chargeValue: ' ',
    payer: {
      name: 'João da Silva Santos',
      registerNumber: '123.456.789-00',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      district: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '01000-000'
    },
    guarantor: {
      name: 'Tech Solutions Ltda',
      registerNumber: '98.765.432/0001-10',
      street: 'Av Faria Lima',
      number: '500',
      district: 'Pinheiros',
      complement: 'Sala 1001',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '01452-000'
    }
  }
}

// Gerar PDF do boleto Itaú
itauPDF(boleto)
  .then(pdf => {
    const outputPath = path.join(__dirname, 'boleto-itau.pdf')
    fs.writeFile(outputPath, pdf, 'binary', err => {
      if (err) {
        console.log('Erro ao salvar PDF:', err)
        return
      }
      console.log('Boleto Itaú gerado com sucesso: ' + outputPath)
    })
  })
  .catch(err => {
    console.log('Erro ao gerar boleto Itaú:', err)
  })
