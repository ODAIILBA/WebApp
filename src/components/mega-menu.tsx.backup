import type { FC } from 'hono/jsx';

export const MegaMenu: FC = () => {
  const menuData = [
    {
      title: 'Windows',
      icon: 'fab fa-windows',
      items: [
        { name: 'Windows 11', items: ['Windows 11 Home', 'Windows 11 Pro', 'Windows 11 Enterprise'] },
        { name: 'Windows 10', items: ['Windows 10 Home', 'Windows 10 Pro', 'Windows 10 Enterprise'] },
        { name: 'Windows 8.1', items: ['Windows 8.1', 'Windows 8.1 Pro'] },
        { name: 'Windows 7', items: ['Windows 7 Home', 'Windows 7 Professional', 'Windows 7 Ultimate'] },
        { name: 'Ältere Versionen', items: ['Windows Vista', 'Windows XP', 'Windows 98', 'Windows ME', 'Windows 2000'] },
        { name: 'Windows Server', items: ['Windows Server 2025', 'Windows Server 2022', 'Windows Server 2019', 'Windows Server 2016'] }
      ]
    },
    {
      title: 'Office',
      icon: 'fas fa-file-alt',
      items: [
        { name: 'Microsoft 365', items: ['Microsoft 365 Business Basic', 'Microsoft 365 Business Standard', 'Microsoft 365 Business Premium', 'Microsoft 365 Apps'] },
        { name: 'Office 2024', items: ['Office 2024 Home & Business', 'Office 2024 Professional Plus'] },
        { name: 'Office 2021', items: ['Office 2021 Home & Business', 'Office 2021 Professional Plus'] },
        { name: 'Office 2019', items: ['Office 2019 Home & Business', 'Office 2019 Professional Plus'] },
        { name: 'Office 2016', items: ['Office 2016 Home & Business', 'Office 2016 Professional Plus'] },
        { name: 'Office 2013', items: ['Office 2013 Home & Business', 'Office 2013 Professional Plus'] }
      ]
    },
    {
      title: 'Server & CAL',
      icon: 'fas fa-server',
      items: [
        { name: 'Windows Server', items: ['Windows Server 2025', 'Windows Server 2022', 'Windows Server 2019', 'Windows Server 2016'] },
        { name: 'SQL Server', items: ['SQL Server 2022', 'SQL Server 2019', 'SQL Server 2017'] },
        { name: 'CAL Lizenzen', items: ['Windows Server CAL', 'Remote Desktop Services CAL', 'Exchange Server CAL'] },
        { name: 'Business Software', items: ['Project Professional', 'Visio Professional', 'SharePoint Server'] }
      ]
    },
    {
      title: 'Games',
      icon: 'fas fa-gamepad',
      items: [
        { name: 'Steam', items: ['Steam Gift Cards', 'Steam Wallet Codes'] },
        { name: 'Origin', items: ['Origin Gift Cards', 'EA Play'] },
        { name: 'Microsoft Store', items: ['Xbox Game Pass', 'Xbox Live Gold', 'Microsoft Store Cards'] },
        { name: 'PlayStation', items: ['PSN Cards', 'PlayStation Plus'] },
        { name: 'Nintendo', items: ['Nintendo eShop Cards', 'Nintendo Switch Online'] }
      ]
    },
    {
      title: 'Entwicklung',
      icon: 'fas fa-code',
      items: [
        { name: 'Visual Studio', items: ['Visual Studio 2026 Enterprise', 'Visual Studio 2022 Enterprise', 'Visual Studio 2019 Enterprise', 'Visual Studio 2017 Enterprise'] },
        { name: 'Development Tools', items: ['GitHub Copilot', 'JetBrains IntelliJ IDEA', 'JetBrains PyCharm'] }
      ]
    },
    {
      title: 'Antivirus',
      icon: 'fas fa-shield-alt',
      items: [
        { name: 'Norton', items: ['Norton 360 Deluxe', 'Norton 360 Premium', 'Norton AntiVirus Plus'] },
        { name: 'Kaspersky', items: ['Kaspersky Total Security', 'Kaspersky Internet Security', 'Kaspersky Anti-Virus'] },
        { name: 'Bitdefender', items: ['Bitdefender Total Security', 'Bitdefender Internet Security', 'Bitdefender Antivirus Plus'] },
        { name: 'ESET', items: ['ESET Smart Security Premium', 'ESET Internet Security', 'ESET NOD32 Antivirus'] },
        { name: 'Avira', items: ['Avira Prime', 'Avira Internet Security', 'Avira Antivirus Pro'] },
        { name: 'McAfee', items: ['McAfee Total Protection', 'McAfee Internet Security', 'McAfee AntiVirus Plus'] },
        { name: 'Andere', items: ['Avast Premium Security', 'AVG Ultimate', 'Malwarebytes Premium'] }
      ]
    },
    {
      title: 'Bundles',
      icon: 'fas fa-box',
      items: [
        { name: 'Software Bundles', items: ['Windows + Office Bundle', 'Security Bundle', 'Complete Business Bundle'] },
        { name: 'Sonderangebote', items: ['Ultimate Bundle', 'Mega Bundle', 'Premium Bundle'] }
      ]
    },
    {
      title: 'Retro Software',
      icon: 'fas fa-history',
      items: [
        { name: 'Klassiker', items: ['Windows XP Professional', 'Windows 98', 'Office 2003', 'Office XP'] }
      ]
    },
    {
      title: 'PC Software',
      icon: 'fas fa-desktop',
      items: [
        { name: 'Adobe', items: ['Adobe Acrobat Pro', 'Adobe Creative Cloud'] },
        { name: 'Design Software', items: ['Corel Draw', 'AutoCAD'] },
        { name: 'Utilities', items: ['WinRAR', 'CCleaner Professional'] }
      ]
    }
  ];

  return (
    <nav style={{ backgroundColor: '#1a2a4e', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto', flexWrap: 'wrap' }}>
          {menuData.map((category, idx) => (
            <li 
              key={idx}
              class="mega-menu-item"
              style={{ position: 'relative' }}
            >
              <a 
                href={`/category/${category.title.toLowerCase().replace(' ', '-')}`}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                <i class={category.icon} style={{ marginRight: '0.5rem', color: '#d4af37' }}></i>
                {category.title}
                <i class="fas fa-chevron-down" style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}></i>
              </a>

              {/* Mega Menu Dropdown */}
              <div 
                class="mega-menu-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  borderRadius: '0 0 8px 8px',
                  padding: '1.5rem',
                  minWidth: '800px',
                  display: 'none',
                  zIndex: 1000,
                  border: '2px solid #d4af37',
                  borderTop: 'none'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  {category.items.map((section, sectionIdx) => (
                    <div key={sectionIdx}>
                      <h3 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '600', 
                        color: '#1a2a4e', 
                        marginBottom: '0.75rem',
                        paddingBottom: '0.5rem',
                        borderBottom: '2px solid #d4af37'
                      }}>
                        {section.name}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} style={{ marginBottom: '0.5rem' }}>
                            <a 
                              href={`/products/${item.toLowerCase().replace(/\s+/g, '-')}`}
                              style={{ 
                                color: '#4b5563', 
                                textDecoration: 'none', 
                                fontSize: '0.85rem',
                                display: 'block',
                                padding: '0.25rem 0',
                                transition: 'all 0.2s'
                              }}
                            >
                              <i class="fas fa-angle-right" style={{ marginRight: '0.5rem', color: '#d4af37', fontSize: '0.75rem' }}></i>
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Special Offers Banner */}
                <div style={{ 
                  marginTop: '1.5rem', 
                  padding: '1rem', 
                  backgroundColor: '#fef3c7', 
                  borderRadius: '6px',
                  border: '1px solid #d4af37'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600', color: '#1a2a4e' }}>
                        <i class="fas fa-star" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                        Sonderangebote in {category.title}
                      </p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
                        Bis zu 80% Rabatt auf ausgewählte Produkte
                      </p>
                    </div>
                    <a 
                      href={`/deals/${category.title.toLowerCase()}`}
                      style={{ 
                        backgroundColor: '#d4af37', 
                        color: '#1a2a4e', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '6px', 
                        textDecoration: 'none', 
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Jetzt ansehen
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mega Menu CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .mega-menu-item:hover > a {
          background-color: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }
        
        .mega-menu-item:hover .mega-menu-dropdown {
          display: block !important;
          animation: fadeIn 0.2s ease-in;
        }
        
        .mega-menu-dropdown a:hover {
          color: #d4af37 !important;
          transform: translateX(4px);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .mega-menu-dropdown {
            min-width: 100vw !important;
            left: -1rem !important;
          }
        }
      ` }}></style>
    </nav>
  );
};
