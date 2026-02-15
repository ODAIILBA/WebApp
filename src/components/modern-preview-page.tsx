export function ModernPreviewPage() {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern 3D Design Preview - SOFTWAREKING24</title>
    
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    
    <style>
        :root {
            --navy: #001f3f;
            --navy-medium: #003366;
            --navy-light: #003d7a;
            --gold: #FFC107;
            --white: #ffffff;
            --light-gray: #f8f9fa;
            --border: #e0e0e0;
            --text: #333;
            --card-shadow: 0 20px 60px rgba(0, 31, 63, 0.12);
            --card-shadow-hover: 0 30px 80px rgba(0, 31, 63, 0.18);
            --card-lift: translateY(-8px);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            color: var(--text);
            line-height: 1.6;
            background: var(--light-gray);
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .preview-header {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            padding: 60px 0;
            text-align: center;
            border-bottom: 4px solid var(--gold);
        }
        
        .preview-header h1 {
            color: white;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 12px;
        }
        
        .preview-header p {
            color: rgba(255,255,255,0.9);
            font-size: 1.2rem;
        }
        
        .back-link {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 30px;
            background: var(--gold);
            color: var(--navy);
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .back-link:hover {
            background: #FFD54F;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 193, 7, 0.3);
        }
    </style>
    <link href="/static/modern-3d-styles.css" rel="stylesheet">
</head>
<body>
    <!-- Preview Header -->
    <div class="preview-header">
        <div class="container">
            <h1><i class="fas fa-cube"></i> Modern 3D Design Preview</h1>
            <p>Premium E-Commerce Body with 3D Elements & Motion</p>
            <a href="/" class="back-link">
                <i class="fas fa-arrow-left"></i> Zurück zur Hauptseite
            </a>
        </div>
    </div>
    
    <!-- Modern 3D Sections Content -->
    <div id="modern-preview-content"></div>
    
    <script src="/static/modern-3d-renderers.js"></script>
    <script>
        // Render all modern 3D sections for preview
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('modern-preview-content');
            
            // Add hero section
            if (typeof render3DHeroSection === 'function') {
                container.innerHTML += render3DHeroSection();
            }
            
            // Add deals section
            if (typeof render3DDealsSection === 'function') {
                container.innerHTML += render3DDealsSection();
            }
            
            // Add trust section
            if (typeof render3DTrustSection === 'function') {
                container.innerHTML += render3DTrustSection();
            }
            
            // Add how it works
            if (typeof render3DHowItWorksSection === 'function') {
                container.innerHTML += render3DHowItWorksSection();
            }
            
            // Add why choose us
            if (typeof render3DWhyChooseSection === 'function') {
                container.innerHTML += render3DWhyChooseSection();
            }
            
            // Add enterprise section
            if (typeof render3DEnterpriseSection === 'function') {
                container.innerHTML += render3DEnterpriseSection();
            }
            
        });
    </script>
</body>
</html>
  `
}
