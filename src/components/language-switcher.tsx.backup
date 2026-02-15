// Language Switcher Component
import type { FC } from 'hono/jsx'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, type Language } from '../lib/i18n'

interface LanguageSwitcherProps {
  currentLang?: Language
  currentPath?: string
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ 
  currentLang = DEFAULT_LANGUAGE, 
  currentPath = '/' 
}) => {
  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  return (
    <div class="language-switcher relative group">
      {/* Current Language Button */}
      <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <span class="text-xl">{currentLang === 'de' ? '🇩🇪' : '🇬🇧'}</span>
        <span class="font-medium text-gray-700">{currentLang === 'de' ? 'DE' : 'EN'}</span>
        <i class="fas fa-chevron-down text-xs text-gray-500"></i>
      </button>

      {/* Dropdown Menu */}
      <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map(lang => (
          <a
            href={getLanguageUrl(currentPath, lang.code as Language)}
            class={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              currentLang === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <span class="text-2xl">{lang.flag}</span>
            <span class="font-medium">{lang.name}</span>
            {currentLang === lang.code && (
              <i class="fas fa-check ml-auto text-blue-600"></i>
            )}
          </a>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .language-switcher:hover .group-hover\\:opacity-100 {
          opacity: 1;
          visibility: visible;
        }
      `}} />
    </div>
  )
}

// Helper function to generate language-specific URLs
function getLanguageUrl(path: string, targetLang: Language): string {
  // Remove existing language prefix
  const cleanPath = path.replace(/^\/(en|de)(\/|$)/, '/');
  
  // Add language prefix for non-default language
  if (targetLang !== DEFAULT_LANGUAGE) {
    return `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`;
  }
  
  return cleanPath;
}

// Mobile Language Switcher
export const MobileLanguageSwitcher: FC<LanguageSwitcherProps> = ({ 
  currentLang = DEFAULT_LANGUAGE, 
  currentPath = '/' 
}) => {
  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  return (
    <div class="mobile-language-switcher border-t border-gray-200 pt-4 mt-4">
      <p class="text-xs text-gray-500 uppercase font-semibold mb-3 px-4">Sprache / Language</p>
      <div class="space-y-1">
        {languages.map(lang => (
          <a
            href={getLanguageUrl(currentPath, lang.code as Language)}
            class={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
              currentLang === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <span class="text-2xl">{lang.flag}</span>
            <span class="font-medium">{lang.name}</span>
            {currentLang === lang.code && (
              <i class="fas fa-check ml-auto text-blue-600"></i>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
