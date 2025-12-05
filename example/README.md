# Exemplos de Geração de Boletos PDF

Esta pasta contém exemplos de uso da biblioteca `boleto-pdf` para gerar PDFs de boletos bancários.

## Estrutura

Cada banco possui sua própria pasta com um exemplo independente:

- **`bb/`** - Exemplo para Banco do Brasil
- **`bradesco/`** - Exemplo para Bradesco
- **`omni/`** - Exemplo para OMNI

## Como usar

### 1. Fazer o build do projeto

Antes de executar os exemplos, é necessário fazer o build do projeto:

```bash
cd /home/guilherme/trab/boleto-pdf
npm run build
```

### 2. Executar um exemplo específico

Entre na pasta do banco desejado e execute o exemplo:

```bash
# Banco do Brasil
cd example/bb
node index.js

# Bradesco
cd example/bradesco
node index.js

# OMNI
cd example/omni
node index.js
```

### 3. Resultado

Cada exemplo irá gerar um arquivo PDF na respectiva pasta:

- `boleto-bb.pdf` - Boleto do Banco do Brasil
- `boleto-bradesco.pdf` - Boleto do Bradesco
- `boleto-omni.pdf` - Boleto do OMNI

## Estrutura dos dados

Todos os exemplos seguem o mesmo padrão: um objeto JavaScript com os dados já formatados do boleto. **Não é necessário usar o pacote `boleto-br`** para gerar os dados - basta passar o objeto com os campos preenchidos.

### Campos obrigatórios

```javascript
{
  barcodeData: '00190000090351600001234567890123456789012',
  digitableLine: '00190.00009 03516.000018 23456.789018 2 99990000000990',
  paymentPlace: 'PAGÁVEL EM QUALQUER BANCO ATÉ O VENCIMENTO.',
  beneficiary: 'EMPRESA LTDA - CNPJ 12.345.678/0001-90',
  beneficiaryAddress: 'Endereço completo',
  instructions: 'Instruções de pagamento',
  bank: '001-9',
  agency: '1234',
  agencyDigit: '5',
  account: '12345',
  accountDigit: '6',
  expirationDay: new Date(2017, 11, 4),
  documentDate: new Date(2017, 7, 18),
  processingDate: new Date(2017, 7, 18),
  card: '17',
  documentNumber: '12345',
  formatedOurNumber: '00000019000001208-5',
  formatedValue: 'R$ 1.000,00',
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
  qrcode: '', // Opcional - apenas para BB
  payer: {
    name: 'Nome do Pagador',
    registerNumber: '123.456.789-00',
    street: 'Rua Exemplo',
    number: '100',
    complement: ' ',
    district: 'Centro',
    city: 'Cidade',
    state: 'UF',
    postalCode: '12345-678'
  },
  guarantor: { // Opcional
    name: 'Nome do Avalista',
    registerNumber: '987.654.321-00',
    street: 'Rua Avalista',
    number: '200',
    complement: ' ',
    district: 'Centro',
    city: 'Cidade',
    state: 'UF',
    postalCode: '12345-678'
  }
}
```

## Uso na sua aplicação

```javascript
const { bb, bradesco, omni } = require('boleto-pdf')

// Seus dados do boleto
const dadosBoleto = {
  // ... preencha os campos conforme o exemplo acima
}

// Gerar PDF
bb(dadosBoleto)
  .then(pdf => {
    // pdf é um Buffer que pode ser salvo ou enviado
    fs.writeFile('boleto.pdf', pdf, 'binary', err => {
      if (err) console.log('Erro:', err)
      else console.log('PDF gerado com sucesso!')
    })
  })
  .catch(err => console.log('Erro ao gerar boleto:', err))
```
