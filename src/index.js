import generateBbPdf from './bb/generate-pdf'
import generateBradescoPdf from './bradesco/generate-pdf'
import generateOmniPdf from './omni/generate-pdf'

export default {
  bradesco: generateBradescoPdf,
  omni: generateOmniPdf,
  bb: generateBbPdf
}
