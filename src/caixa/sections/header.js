import formatDate from '../../commons/utils/format-date'

/**
 * Renderiza o cabeçalho (header/recibo) do boleto da Caixa Econômica Federal
 *
 * @param {Object} doc - Instância do PDFKit document
 * @param {Object} _ref - Dados do boleto
 * @param {string} _ref.digitableLine - Linha digitável do boleto
 * @param {string} _ref.paymentPlace - Local de pagamento
 * @param {string} _ref.beneficiary - Nome do beneficiário (cedente)
 * @param {string} _ref.beneficiaryAddress - Endereço do beneficiário
 * @param {string} _ref.agency - Número da agência
 * @param {string} _ref.agencyDigit - Dígito verificador da agência
 * @param {string} _ref.account - Número da conta
 * @param {string} _ref.accountDigit - Dígito verificador da conta
 * @param {Date|string} _ref.expirationDay - Data de vencimento
 * @param {Date|string} _ref.documentDate - Data do documento
 * @param {Date|string} _ref.processingDate - Data de processamento
 * @param {string} _ref.documentType - Tipo/Espécie do documento
 * @param {string} _ref.accept - Aceite (S/N)
 * @param {string} _ref.card - Carteira
 * @param {string} _ref.documentNumber - Número do documento
 * @param {string} _ref.formatedOurNumber - Nosso número formatado
 * @param {string} _ref.formatedValue - Valor do documento formatado
 * @param {string} _ref.descountValue - Valor de desconto
 * @param {string} _ref.otherDiscounts - Outras deduções
 * @param {string} _ref.feeValue - Valor de mora/multa
 * @param {string} _ref.outherFees - Outros acréscimos
 * @param {string} _ref.chargeValue - Valor cobrado
 * @param {Object} _ref.recibo - Dados do recibo
 * @param {Object} _ref.recibo.payer - Dados do pagador no recibo
 * @param {Object} [_ref.recibo.guarantor] - Dados do avalista no recibo
 * @param {Object} _ref.payer - Dados do pagador
 * @param {Object} [_ref.guarantor] - Dados do avalista (opcional)
 * @param {string} _ref.bank - Código do banco
 * @param {string} _ref.instructions - Instruções de pagamento
 * @param {string} _ref.currencyType - Tipo de moeda
 * @param {Object} _ref2 - Configurações de layout
 * @param {number} _ref2.startY - Posição Y inicial
 * @param {number} _ref2.startX - Posição X inicial
 * @param {number} _ref2.smallGutterY - Espaçamento vertical pequeno
 * @param {number} _ref2.smallGutterX - Espaçamento horizontal pequeno
 * @param {number} _ref2.line - Espessura da linha
 * @param {number} _ref2.tableLimit - Limite da tabela
 * @param {string} _ref2.lineColor - Cor das linhas
 * @param {number} _ref2.boxHeight - Altura das caixas
 * @param {number} _ref2.gutterX - Espaçamento horizontal
 * @param {number} _ref2.gutterY - Espaçamento vertical
 * @param {number} _ref2.smallFontSize - Tamanho da fonte pequena
 * @param {number} _ref2.fontSize - Tamanho da fonte padrão
 * @param {number} _ref2.largefontSize - Tamanho da fonte grande
 * @param {number} _ref2.mediumFontSize - Tamanho da fonte média
 * @param {string} _ref2.fontBold - Nome da fonte em negrito
 * @param {string} _ref2.fontRegular - Nome da fonte regular
 * @param {Buffer|string} _ref2.logo - Logo do banco
 */
export default function(doc, _ref, _ref2) {
  const {
    beneficiary,
    beneficiaryAddress,
    agency,
    agencyDigit,
    account,
    accountDigit,
    expirationDay,
    documentDate,
    processingDate,
    documentType,
    accept,
    card,
    documentNumber,
    formatedOurNumber,
    formatedValue,
    descountValue,
    otherDiscounts,
    feeValue,
    outherFees,
    chargeValue,
    recibo,
    guarantor,
    bank,
    instructions,
    currencyType
  } = _ref

  const {
    startY,
    startX,
    smallGutterY,
    smallGutterX,
    line,
    tableLimit,
    lineColor,
    boxHeight,
    gutterX,
    gutterY,
    smallFontSize,
    fontSize,
    largefontSize,
    mediumFontSize,
    fontBold,
    fontRegular,
    logo
  } = _ref2

  const rightSize = 160
  const widthStringValue = doc.widthOfString(formatedValue)

  doc.image(logo, startX + smallGutterX, startY + boxHeight, {
    height: 23
  })

  // Doc.image(logomarca, startX + smallGutterX, startY + boxHeight * 5 + gutterY + 70, {
  //  height: 55
  // });

  doc.rect(startX + 120, startY + boxHeight, line, boxHeight).fill(lineColor)

  doc
    .fontSize(largefontSize)
    .font(fontBold)
    .text(bank, startX + 130, startY + 8 + boxHeight)

  doc.rect(startX + 170, startY + boxHeight, line, boxHeight).fill(lineColor)

  doc
    .fontSize(largefontSize)
    .text('RECIBO DO SACADO', startX + 400, startY + 8 + boxHeight)

  // Doc.rect(startX, startY + boxHeight, tableLimit, line).fill(lineColor);

  // Box
  // doc.rect(startX, startY + boxHeight, tableLimit, boxHeight).lineWidth(line).stroke(lineColor);

  // doc.fontSize(smallFontSize).font(fontRegular).text('Local de Pagamento', startX + smallGutterX, startY + boxHeight + smallGutterY);

  // doc.fontSize(fontSize).font(fontBold).text(recibo.paymentPlace, startX + gutterX, startY + boxHeight + gutterY);

  doc
    .rect(startX, startY + boxHeight * 2, tableLimit - rightSize, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Cedente',
      startX + smallGutterX,
      startY + boxHeight * 2 + smallGutterY
    )

  doc
    .fontSize(8)
    .font(fontBold)
    .text(beneficiary, startX + 40, startY + boxHeight * 2 + smallGutterY)

  doc
    .fontSize(smallFontSize)
    .font(fontBold)
    .text(beneficiaryAddress, startX + 40, startY + boxHeight * 2 + 15)

  doc
    .rect(
      startX + tableLimit - rightSize,
      startY + boxHeight * 2,
      80,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Agencia/Código Cedente',
      startX + tableLimit - rightSize + smallGutterX,
      startY + boxHeight * 2 + smallGutterY
    )

  doc
    .fontSize(8)
    .font(fontRegular)
    .text(
      `${agency}${agencyDigit} / ${account}${accountDigit}`,
      startX + tableLimit - rightSize + smallGutterX,
      startY + boxHeight * 2 + gutterX + 5
    )

  doc
    .rect(
      startX + tableLimit - rightSize / 2,
      startY + boxHeight * 2,
      rightSize / 2,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Vencimento',
      startX + tableLimit - rightSize + smallGutterX + rightSize / 2,
      startY + boxHeight * 2 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      formatDate(expirationDay),
      startX + tableLimit - rightSize + rightSize / 2 + smallGutterX,
      startY + boxHeight * 2 + gutterX + 5
    )

  doc
    .rect(startX, startY + boxHeight * 3, 100, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Data documento',
      startX + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      formatDate(documentDate),
      startX + gutterX,
      startY + boxHeight * 3 + gutterX
    )

  doc
    .rect(startX + 100, startY + boxHeight * 3, 140, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Número documento',
      startX + 100 + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      documentNumber,
      startX + 100 + gutterX,
      startY + boxHeight * 3 + gutterX
    )

  doc
    .rect(startX + 240, startY + boxHeight * 3, 55, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(6)
    .font(fontRegular)
    .text(
      'Esp. doc.',
      startX + 240 + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      documentType,
      startX + 240 + gutterX,
      startY + boxHeight * 3 + gutterX
    )

  doc
    .rect(startX + 295, startY + boxHeight * 3, 30, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Aceite',
      startX + 295 + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(accept, startX + 295 + gutterX, startY + boxHeight * 3 + gutterX)

  doc
    .rect(
      startX + 325,
      startY + boxHeight * 3,
      tableLimit - 325 - rightSize,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Data processamento',
      startX + 325 + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      formatDate(processingDate),
      startX + 325 + smallGutterX,
      startY + boxHeight * 3 + gutterX
    )
  // Right side

  doc
    .rect(
      startX + tableLimit - rightSize,
      startY + boxHeight * 3,
      rightSize,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Nosso Número',
      startX + tableLimit - rightSize + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(mediumFontSize)
    .font(fontBold)
    .text(
      formatedOurNumber,
      startX + tableLimit - rightSize + 52,
      startY + boxHeight * 3 + gutterX
    )

  doc
    .rect(startX, startY + boxHeight * 4, 50, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Uso do Banco',
      startX + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .rect(startX, startY + boxHeight * 4, 100, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'CIP',
      startX + smallGutterX + 50,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text('000', startX + smallGutterX + 50, startY + boxHeight * 4 + gutterX)

  doc
    .rect(startX + 100, startY + boxHeight * 4, 30, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Carteira',
      startX + 100 + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(card, startX + 100 + gutterX, startY + boxHeight * 4 + gutterX)

  doc
    .rect(startX + 130, startY + boxHeight * 4, 55, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Espécie Moeda',
      startX + 130 + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      currencyType,
      startX + 130 + gutterX,
      startY + boxHeight * 4 + gutterX
    )

  doc
    .rect(startX + 185, startY + boxHeight * 4, 55, boxHeight)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Quantidade',
      startX + 185 + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .rect(
      startX + 240,
      startY + boxHeight * 4,
      tableLimit - 240 - rightSize,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Valor',
      startX + 240 + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  // Right side
  doc
    .rect(
      startX + tableLimit - rightSize,
      startY + boxHeight * 4,
      rightSize,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(=) Valor do documento',
      startX + tableLimit - rightSize + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(mediumFontSize)
    .font(fontBold)
    .text(
      formatedValue,
      tableLimit - widthStringValue - 5,
      startY + boxHeight * 4 + gutterX
    )

  doc
    .rect(startX, startY + boxHeight * 5, tableLimit - rightSize, boxHeight * 5)
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Instruções (Texto de responsabilidade do sacador)',
      startX + smallGutterX,
      startY + boxHeight * 5 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontBold)
    .text(instructions, startX + smallGutterX, startY + boxHeight * 5 + gutterY)

  doc
    .rect(
      startX + tableLimit - rightSize,
      startY + boxHeight * 5,
      rightSize,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(-) Desconto / Adiantamento',
      startX + tableLimit - rightSize + smallGutterX,
      startY + boxHeight * 5 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      descountValue,
      startX + tableLimit - rightSize + gutterX,
      startY + boxHeight * 5 + gutterY
    )

  doc
    .rect(
      startX + tableLimit - rightSize,
      startY + boxHeight * 6,
      rightSize,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(-) Outras deduções',
      startX + tableLimit - rightSize + smallGutterX,
      startY + boxHeight * 6 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      otherDiscounts,
      startX + tableLimit - rightSize + gutterX,
      startY + boxHeight * 6 + gutterY
    )

  doc
    .rect(
      startX + tableLimit - rightSize,
      startY + boxHeight * 7,
      rightSize,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(+) Mora / Multa',
      startX + tableLimit - rightSize + smallGutterX,
      startY + boxHeight * 7 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      feeValue,
      startX + tableLimit - rightSize + gutterX,
      startY + boxHeight * 7 + gutterY
    )

  doc
    .rect(
      startX + tableLimit - rightSize,
      startY + boxHeight * 8,
      rightSize,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(-) Acrécimos',
      startX + tableLimit - rightSize + smallGutterX,
      startY + boxHeight * 8 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      outherFees,
      startX + tableLimit - rightSize + gutterX,
      startY + boxHeight * 8 + gutterY
    )

  doc
    .rect(
      startX + tableLimit - rightSize,
      startY + boxHeight * 9,
      rightSize,
      boxHeight
    )
    .lineWidth(line)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(=) Valor cobrado',
      startX + tableLimit - rightSize + smallGutterX,
      startY + boxHeight * 9 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      chargeValue,
      startX + tableLimit - rightSize + gutterX,
      startY + boxHeight * 9 + gutterY
    )

  doc
    .rect(startX, startY + boxHeight * 10, tableLimit, boxHeight * 3)
    .lineWidth(line)
    .stroke(lineColor)

  // Payer info box
  doc
    .rect(startX, startY + boxHeight * 10, tableLimit, boxHeight * 3)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Sacado',
      startX + smallGutterX,
      startY + boxHeight * 10 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontBold)
    .text(
      recibo.payer.name + ' - ' + recibo.payer.registerNumber,
      startX + 30,
      startY + boxHeight * 10 + 3
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.payer.street +
        ', ' +
        recibo.payer.number +
        ' ' +
        recibo.payer.complement +
        ' - ' +
        recibo.payer.district,
      startX + 30,
      startY + boxHeight * 10 + 13
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.payer.city +
        ' - ' +
        recibo.payer.state +
        ' - CEP: ' +
        recibo.payer.postalCode,
      startX + 30,
      startY + boxHeight * 10 + 23
    )

  if (guarantor) {
    doc
      .fontSize(smallFontSize)
      .font(fontRegular)
      .text(
        'Sacador/Cedente',
        startX + smallGutterX,
        startY + boxHeight * 10 + 40
      )

    doc
      .fontSize(7)
      .font(fontRegular)
      .text(
        recibo.guarantor.name + ' - ' + recibo.guarantor.registerNumber,
        startX + 50,
        startY + boxHeight * 10 + 43
      )

    doc
      .fontSize(7)
      .font(fontRegular)
      .text(
        recibo.guarantor.street +
          ', ' +
          recibo.guarantor.number +
          ', ' +
          recibo.guarantor.district,
        startX + 50,
        startY + boxHeight * 10 + 53
      )

    doc
      .fontSize(7)
      .font(fontRegular)
      .text(
        recibo.guarantor.city +
          ' - ' +
          recibo.guarantor.state +
          ' - CEP: ' +
          recibo.guarantor.postalCode,
        startX + 50,
        startY + boxHeight * 10 + 63
      )
  }

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Auntênticação Mecânica - Recibo',
      tableLimit - 115,
      startY + boxHeight * 13 + 5
    )
}
