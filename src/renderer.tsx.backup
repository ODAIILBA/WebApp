import type { PropsWithChildren } from 'hono/jsx'

export const renderer = (c: any, next: any) => {
  return next().then(() => {
    // No transformation needed - let Hono handle the JSX rendering
  })
}

export const Layout = ({ children, title }: PropsWithChildren<{ title?: string }>) => {
  const pageTitle = title || 'Premium Software Store - Instant Delivery';
  
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link 
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" 
          rel="stylesheet" 
        />
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#1a2a4e',
                  gold: '#d4af37',
                  darkblue: '#0f1729'
                }
              }
            }
          }
        `}} />
        <style dangerouslySetInnerHTML={{__html: `
          .gold-border {
            border: 2px solid #d4af37;
          }
          
          .discount-badge {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: #1a2a4e;
            font-weight: bold;
          }
          
          .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
          }
          
          .trust-badge {
            background: white;
            border: 1px solid #e5e7eb;
            transition: all 0.3s ease;
          }
          
          .trust-badge:hover {
            border-color: #d4af37;
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
          }
          
          .btn-gold {
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: #1a2a4e;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          
          .btn-gold:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
          }
          
          .mega-menu {
            display: none;
            position: absolute;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 50;
          }
          
          .has-mega-menu:hover .mega-menu {
            display: block;
          }
        `}} />
      </head>
      <body class="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
