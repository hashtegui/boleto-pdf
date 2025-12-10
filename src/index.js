import generateBbPdf from './bb/generate-pdf'
import generateBradescoPdf from './bradesco/generate-pdf'
import generateCaixaPdf from './caixa/generate-pdf'
import generateItauPdf from './itau/generate-pdf'
import generateOmniPdf from './omni/generate-pdf'
import generateSantanderPdf from './santander/generate-pdf'
import generateSafraPdf from './safra/generate-pdf'

export default {
  bradesco: generateBradescoPdf,
  omni: generateOmniPdf,
  bb: generateBbPdf,
  caixa: generateCaixaPdf,
  itau: generateItauPdf,
  santander: generateSantanderPdf,
  safra: generateSafraPdf
}
