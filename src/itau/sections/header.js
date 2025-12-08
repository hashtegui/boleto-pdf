import formatDate from '../../commons/utils/format-date'

/**
 * Renderiza o cabeçalho (header/recibo) do boleto do Itaú
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
export default function(
  doc,
  {
    digitableLine,
    paymentPlace,
    beneficiary,
    beneficiaryAddress,
    agency,
    agencyDigit,
    account,
    accountDigit,
    expirationDay,
    documentDate,
    processingDate,
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
    payer,
    guarantor,
    bank
  },
  {
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
  }
) {
  doc.image(logo, startX + smallGutterX, startY + boxHeight, {
    height: 23
  })

  doc.rect(startX + 120, startY + boxHeight, line, boxHeight).fill(lineColor)

  doc
    .fontSize(largefontSize)
    .font(fontBold)
    .text(bank, startX + 130, startY + 8 + boxHeight)

  doc.rect(startX + 170, startY + boxHeight, line, boxHeight).fill(lineColor)

  doc
    .fontSize(largefontSize)
    .text('RECIBO DO SACADO', startX + 400, startY + 8 + boxHeight)

  doc.rect(startX, startY + boxHeight, tableLimit, line).fill(lineColor)

  // Box
  // doc.rect(startX, startY + boxHeight, tableLimit, boxHeight).lineWidth(line).stroke(lineColor);

  // doc.fontSize(smallFontSize).font(fontRegular).text('Local de Pagamento', startX + smallGutterX, startY + boxHeight + smallGutterY);

  // doc.fontSize(fontSize).font(fontBold).text(recibo.paymentPlace, startX + gutterX, startY + boxHeight + gutterY);

  doc
    .rect(startX, startY + boxHeight * 2, tableLimit * (2 / 4), boxHeight)
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
    .text(recibo.beneficiaryAddress, startX + 20, startY + boxHeight * 2 + 15)

  doc
    .rect(
      startX + tableLimit * (2 / 4),
      startY + boxHeight * 2,
      tableLimit * (1 / 4),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Agência / Código do Cedente',
      startX + tableLimit * (2 / 4) + smallGutterX,
      startY + boxHeight * 2 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      `${recibo.agency}${recibo.agencyDigit} / ${account}${accountDigit}`,
      startX + tableLimit * (2 / 4) + 50,
      startY + boxHeight * 2 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (3 / 4),
      startY + boxHeight * 2,
      tableLimit * (1 / 4),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Data de Vencimento',
      startX + tableLimit * (3 / 4) + smallGutterX,
      startY + boxHeight * 2 + smallGutterY
    )

  doc
    .fontSize(mediumFontSize)
    .font(fontBold)
    .text(
      formatDate(recibo.expirationDay),
      startX + tableLimit * (3 / 4) + 65,
      startY + boxHeight * 2 + 7
    )

  // Next line table
  doc
    .rect(startX, startY + boxHeight * 3, tableLimit * (1.5 / 10), boxHeight)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Data do Documento',
      startX + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      formatDate(recibo.documentDate),
      startX + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (1.5 / 10),
      startY + boxHeight * 3,
      tableLimit * (1.5 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Data do Processamento',
      startX + tableLimit * (1.5 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      formatDate(recibo.processingDate),
      startX + tableLimit * (1.5 / 10) + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (3 / 10),
      startY + boxHeight * 3,
      tableLimit * (0.6 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Carteira',
      startX + tableLimit * (3 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.card,
      startX + tableLimit * (3 / 10) + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (3.6 / 10),
      startY + boxHeight * 3,
      tableLimit * (2 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'N° documento',
      startX + tableLimit * (3.6 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.documentNumber,
      startX + tableLimit * (3.6 / 10) + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (5.6 / 10),
      startY + boxHeight * 3,
      tableLimit * (2.2 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Nosso Número',
      startX + tableLimit * (5.6 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(mediumFontSize)
    .font(fontBold)
    .text(
      recibo.formatedOurNumber,
      startX + tableLimit * (5.6 / 10) + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (7.8 / 10),
      startY + boxHeight * 3,
      tableLimit * (2.2 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(=) Valor do documento',
      startX + tableLimit * (7.8 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc.fontSize(mediumFontSize).font(fontBold)

  const widthStringValue = doc.widthOfString(recibo.formatedValue)

  doc.text(
    recibo.formatedValue,
    startX + tableLimit - widthStringValue - 10,
    startY + boxHeight * 3 + 9
  )

  // New line
  doc
    .rect(startX, startY + boxHeight * 4, tableLimit * (1 / 5), boxHeight)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(-) Desconto / Abatimento',
      startX + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.descountValue,
      startX + gutterX,
      startY + boxHeight * 4 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (1 / 5),
      startY + boxHeight * 4,
      tableLimit * (1 / 5),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(-) Outras deduções',
      startX + tableLimit * (1 / 5) + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.otherDiscounts,
      startX + tableLimit * (1 / 5) + gutterX,
      startY + boxHeight * 4 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (2 / 5),
      startY + boxHeight * 4,
      tableLimit * (1 / 5),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(+) Mora / Multa',
      startX + tableLimit * (2 / 5) + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.feeValue,
      startX + tableLimit * (2 / 5) + gutterX,
      startY + boxHeight * 4 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (3 / 5),
      startY + boxHeight * 4,
      tableLimit * (1 / 5),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(-) Outros Acrécimos',
      startX + tableLimit * (3 / 5) + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.outherFees,
      startX + tableLimit * (3 / 5) + gutterX,
      startY + boxHeight * 4 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (4 / 5),
      startY + boxHeight * 4,
      tableLimit * (1 / 5),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(=) Valor cobrado',
      startX + tableLimit * (4 / 5) + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc.fontSize(mediumFontSize).font(fontBold)

  const widthOfStringCharge = doc.widthOfString(recibo.chargeValue)

  doc.text(
    recibo.chargeValue,
    tableLimit - widthOfStringCharge + gutterX,
    startY + boxHeight * 4 + gutterY
  )

  // Payer info box
  doc
    .rect(startX, startY + boxHeight * 5, tableLimit, boxHeight * 3)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Sacado',
      startX + smallGutterX,
      startY + boxHeight * 5 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontBold)
    .text(
      recibo.payer.name + ' - ' + recibo.payer.registerNumber,
      startX + 30,
      startY + boxHeight * 5 + 3
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
      startY + boxHeight * 5 + 13
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
      startY + boxHeight * 5 + 23
    )

  if (guarantor) {
    doc
      .fontSize(smallFontSize)
      .font(fontRegular)
      .text(
        'Sacador/Cedente',
        startX + smallGutterX,
        startY + boxHeight * 5 + 40
      )

    doc
      .fontSize(7)
      .font(fontRegular)
      .text(
        recibo.guarantor.name + ' - ' + recibo.guarantor.registerNumber,
        startX + 50,
        startY + boxHeight * 5 + 43
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
        startY + boxHeight * 5 + 53
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
        startY + boxHeight * 5 + 63
      )
  }

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Auntênticação Mecânica - Recibo',
      tableLimit - 70,
      startY + boxHeight * 8 + 5
    )
}
