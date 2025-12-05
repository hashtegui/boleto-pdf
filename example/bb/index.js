const fs = require('fs')
const bbPDF = require('../../dist/index').bb

// Dados do boleto já prontos para gerar o PDF
const boleto = {
  barcodeData: '00190000090351600001234567890123456789012',
  digitableLine:
    '00190.00009 03516.000018 23456.789018 2 99990000000990',
  paymentPlace: 'PAGÁVEL EM QUALQUER BANCO ATÉ O VENCIMENTO.',
  beneficiary: 'ACME Telecomunicações Ltda - CNPJ 074.064.502/0001-12',
  beneficiaryAddress:
    'R. Servidão, 439 - Estrada Nova, Jaraguá do Sul - SC - CEP 89254-375',
  instructions:
    'Após o vencimento cobrar multa de 2,00% , mais juros ao mes de 1,00%.',
  bank: '001-9',
  agency: '0750',
  agencyDigit: '0',
  account: '54291',
  accountDigit: '1',
  expirationDay: new Date(2017, 11, 4), // 04/12/2017
  documentDate: new Date(2017, 7, 18), // 18/08/2017
  processingDate: new Date(2017, 7, 18), // 18/08/2017
  card: '17',
  documentNumber: '42493',
  formatedOurNumber: '00000019000001208-5',
  formatedValue: 'R$ 9,90',
  documentType: 'DM',
  accept: 'N',
  currencyType: 'Real (R$)',
  amount: ' ',
  valueOf: ' ',
  descountValue: ' ',
  otherDiscounts: ' ',
  feeValue: ' ',
  outherFees: ' ',
  chargeValue: ' ',
  qrcode: '',
  payer: {
    name: 'Anita Albuquerque',
    registerNumber: '221.412.772-05',
    street: 'Rua Maria Gertrudes Coelho',
    number: '827',
    complement: ' ',
    district: 'Estrada Nova',
    city: 'Divinópolis',
    state: 'MG',
    postalCode: '35500-700'
  },
  guarantor: {
    name: 'ACME Telecomunicações Ltda',
    registerNumber: '074.064.502/0001-12',
    street: 'Servidão',
    number: '439',
    district: 'Estrada Nova',
    complement: ' ',
    city: 'Jaraguá do Sul',
    state: 'SC',
    postalCode: '89254-375'
  }
}

// Gerar PDF do boleto BB
bbPDF(boleto)
  .then(pdf => {
    fs.writeFile('boleto-bb.pdf', pdf, 'binary', err => {
      if (err) {
        console.log('Erro ao salvar PDF:', err)
        return
      }
      console.log('Boleto BB gerado com sucesso: boleto-bb.pdf')
    })
  })
  .catch(err => {
    console.log('Erro ao gerar boleto BB:', err)
  })
