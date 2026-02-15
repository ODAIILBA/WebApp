import { MicrosoftCertificate } from './microsoft-certificate';
import { AdobeCertificate } from './adobe-certificate';
import { KasperskyCertificate } from './kaspersky-certificate';
import { GenericCertificate } from './generic-certificate';

export const CertificateSelector = (certificate: any) => {
  // Detect brand from product name or brand field
  const brand = (certificate.brand || certificate.product_name || '').toLowerCase();
  
  // Microsoft brands
  if (brand.includes('microsoft') || brand.includes('office') || brand.includes('windows') || brand.includes('visual studio') || brand.includes('sql server')) {
    return MicrosoftCertificate(certificate);
  }
  
  // Adobe brands
  if (brand.includes('adobe') || brand.includes('photoshop') || brand.includes('illustrator') || brand.includes('acrobat') || brand.includes('indesign') || brand.includes('premiere')) {
    return AdobeCertificate(certificate);
  }
  
  // Kaspersky brands
  if (brand.includes('kaspersky') || brand.includes('antivirus') || brand.includes('internet security') || brand.includes('total security')) {
    return KasperskyCertificate(certificate);
  }
  
  // Default: Generic certificate
  return GenericCertificate(certificate);
};

// Helper function to detect brand name
export const detectBrand = (productName: string): string => {
  const name = (productName || '').toLowerCase();
  
  if (name.includes('microsoft') || name.includes('office') || name.includes('windows')) {
    return 'Microsoft';
  }
  
  if (name.includes('adobe') || name.includes('photoshop') || name.includes('illustrator')) {
    return 'Adobe';
  }
  
  if (name.includes('kaspersky')) {
    return 'Kaspersky';
  }
  
  return 'Generic';
};
