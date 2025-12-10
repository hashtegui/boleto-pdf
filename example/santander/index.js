const fs = require('fs')
const path = require('path')
const santanderPDF = require('../../dist/index').santander

// Dados do boleto já prontos para gerar o PDF
const boleto = {
  barcodeData: '03399876500000125001234567890123456789012',
  digitableLine: '03399.12345 67890.123456 78901.234567 9 87650000012500',
  paymentPlace: 'Pagável em qualquer banco até o vencimento.',
  beneficiary: 'EMPRESA EXEMPLO LTDA - CNPJ: 12.345.678/0001-90',
  beneficiaryAddress:
    'Av Paulista, 1000 - Bela Vista - São Paulo/SP - CEP 01310-100',
  instructions:
    'Após o vencimento cobrar multa de 2,00%, mais juros ao mês de 1,00%.',
  bank: '033-7',
  agency: '0123',
  agencyDigit: '4',
  account: '12345',
  accountDigit: '6',
  expirationDay: new Date(2024, 11, 31), // 31/12/2024
  documentDate: new Date(2024, 11, 1), // 01/12/2024
  processingDate: new Date(2024, 11, 1), // 01/12/2024
  card: '101',
  documentNumber: '98765-4',
  formatedOurNumber: '000012345678-9',
  formatedValue: 'R$ 1.250,00',
  documentType: 'DM',
  accept: 'N',
  currencyType: 'R$',
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

// Gerar PDF do boleto Santander
santanderPDF(boleto)
  .then(pdf => {
    const outputPath = path.join(__dirname, 'boleto-santander.pdf')
    fs.writeFile(outputPath, pdf, 'binary', err => {
      if (err) {
        console.log('Erro ao salvar PDF:', err)
        return
      }
      console.log('Boleto Santander gerado com sucesso: ' + outputPath)
    })
  })
  .catch(err => {
    console.log('Erro ao gerar boleto Santander:', err)
  })
