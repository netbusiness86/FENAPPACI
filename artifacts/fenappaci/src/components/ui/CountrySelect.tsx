import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const COUNTRIES: { code: string; fr: string; en: string; flag: string }[] = [
  { code: "AF", flag: "🇦🇫", fr: "Afghanistan",                    en: "Afghanistan" },
  { code: "ZA", flag: "🇿🇦", fr: "Afrique du Sud",                 en: "South Africa" },
  { code: "AL", flag: "🇦🇱", fr: "Albanie",                        en: "Albania" },
  { code: "DZ", flag: "🇩🇿", fr: "Algérie",                        en: "Algeria" },
  { code: "DE", flag: "🇩🇪", fr: "Allemagne",                      en: "Germany" },
  { code: "AD", flag: "🇦🇩", fr: "Andorre",                        en: "Andorra" },
  { code: "AO", flag: "🇦🇴", fr: "Angola",                         en: "Angola" },
  { code: "AI", flag: "🇦🇮", fr: "Anguilla",                       en: "Anguilla" },
  { code: "AG", flag: "🇦🇬", fr: "Antigua-et-Barbuda",             en: "Antigua and Barbuda" },
  { code: "SA", flag: "🇸🇦", fr: "Arabie Saoudite",                en: "Saudi Arabia" },
  { code: "AR", flag: "🇦🇷", fr: "Argentine",                      en: "Argentina" },
  { code: "AM", flag: "🇦🇲", fr: "Arménie",                        en: "Armenia" },
  { code: "AU", flag: "🇦🇺", fr: "Australie",                      en: "Australia" },
  { code: "AT", flag: "🇦🇹", fr: "Autriche",                       en: "Austria" },
  { code: "AZ", flag: "🇦🇿", fr: "Azerbaïdjan",                    en: "Azerbaijan" },
  { code: "BS", flag: "🇧🇸", fr: "Bahamas",                        en: "Bahamas" },
  { code: "BH", flag: "🇧🇭", fr: "Bahreïn",                        en: "Bahrain" },
  { code: "BD", flag: "🇧🇩", fr: "Bangladesh",                     en: "Bangladesh" },
  { code: "BB", flag: "🇧🇧", fr: "Barbade",                        en: "Barbados" },
  { code: "BE", flag: "🇧🇪", fr: "Belgique",                       en: "Belgium" },
  { code: "BZ", flag: "🇧🇿", fr: "Belize",                         en: "Belize" },
  { code: "BJ", flag: "🇧🇯", fr: "Bénin",                          en: "Benin" },
  { code: "BT", flag: "🇧🇹", fr: "Bhoutan",                        en: "Bhutan" },
  { code: "BY", flag: "🇧🇾", fr: "Biélorussie",                    en: "Belarus" },
  { code: "MM", flag: "🇲🇲", fr: "Birmanie (Myanmar)",             en: "Myanmar" },
  { code: "BO", flag: "🇧🇴", fr: "Bolivie",                        en: "Bolivia" },
  { code: "BA", flag: "🇧🇦", fr: "Bosnie-Herzégovine",             en: "Bosnia and Herzegovina" },
  { code: "BW", flag: "🇧🇼", fr: "Botswana",                       en: "Botswana" },
  { code: "BR", flag: "🇧🇷", fr: "Brésil",                         en: "Brazil" },
  { code: "BN", flag: "🇧🇳", fr: "Brunei",                         en: "Brunei" },
  { code: "BG", flag: "🇧🇬", fr: "Bulgarie",                       en: "Bulgaria" },
  { code: "BF", flag: "🇧🇫", fr: "Burkina Faso",                   en: "Burkina Faso" },
  { code: "BI", flag: "🇧🇮", fr: "Burundi",                        en: "Burundi" },
  { code: "KH", flag: "🇰🇭", fr: "Cambodge",                       en: "Cambodia" },
  { code: "CM", flag: "🇨🇲", fr: "Cameroun",                       en: "Cameroon" },
  { code: "CA", flag: "🇨🇦", fr: "Canada",                         en: "Canada" },
  { code: "CV", flag: "🇨🇻", fr: "Cap-Vert",                       en: "Cape Verde" },
  { code: "CF", flag: "🇨🇫", fr: "Centrafrique",                   en: "Central African Republic" },
  { code: "CL", flag: "🇨🇱", fr: "Chili",                          en: "Chile" },
  { code: "CN", flag: "🇨🇳", fr: "Chine",                          en: "China" },
  { code: "CY", flag: "🇨🇾", fr: "Chypre",                         en: "Cyprus" },
  { code: "CO", flag: "🇨🇴", fr: "Colombie",                       en: "Colombia" },
  { code: "KM", flag: "🇰🇲", fr: "Comores",                        en: "Comoros" },
  { code: "CG", flag: "🇨🇬", fr: "Congo",                          en: "Congo" },
  { code: "CD", flag: "🇨🇩", fr: "Congo (RDC)",                    en: "DR Congo" },
  { code: "KP", flag: "🇰🇵", fr: "Corée du Nord",                  en: "North Korea" },
  { code: "KR", flag: "🇰🇷", fr: "Corée du Sud",                   en: "South Korea" },
  { code: "CR", flag: "🇨🇷", fr: "Costa Rica",                     en: "Costa Rica" },
  { code: "HR", flag: "🇭🇷", fr: "Croatie",                        en: "Croatia" },
  { code: "CU", flag: "🇨🇺", fr: "Cuba",                           en: "Cuba" },
  { code: "DK", flag: "🇩🇰", fr: "Danemark",                       en: "Denmark" },
  { code: "DJ", flag: "🇩🇯", fr: "Djibouti",                       en: "Djibouti" },
  { code: "DM", flag: "🇩🇲", fr: "Dominique",                      en: "Dominica" },
  { code: "EG", flag: "🇪🇬", fr: "Égypte",                         en: "Egypt" },
  { code: "AE", flag: "🇦🇪", fr: "Émirats Arabes Unis",            en: "United Arab Emirates" },
  { code: "EC", flag: "🇪🇨", fr: "Équateur",                       en: "Ecuador" },
  { code: "ER", flag: "🇪🇷", fr: "Érythrée",                       en: "Eritrea" },
  { code: "ES", flag: "🇪🇸", fr: "Espagne",                        en: "Spain" },
  { code: "EE", flag: "🇪🇪", fr: "Estonie",                        en: "Estonia" },
  { code: "SZ", flag: "🇸🇿", fr: "Eswatini",                       en: "Eswatini" },
  { code: "ET", flag: "🇪🇹", fr: "Éthiopie",                       en: "Ethiopia" },
  { code: "FJ", flag: "🇫🇯", fr: "Fidji",                          en: "Fiji" },
  { code: "FI", flag: "🇫🇮", fr: "Finlande",                       en: "Finland" },
  { code: "FR", flag: "🇫🇷", fr: "France",                         en: "France" },
  { code: "GA", flag: "🇬🇦", fr: "Gabon",                          en: "Gabon" },
  { code: "GM", flag: "🇬🇲", fr: "Gambie",                         en: "Gambia" },
  { code: "GE", flag: "🇬🇪", fr: "Géorgie",                        en: "Georgia" },
  { code: "GH", flag: "🇬🇭", fr: "Ghana",                          en: "Ghana" },
  { code: "GR", flag: "🇬🇷", fr: "Grèce",                          en: "Greece" },
  { code: "GD", flag: "🇬🇩", fr: "Grenade",                        en: "Grenada" },
  { code: "GT", flag: "🇬🇹", fr: "Guatemala",                      en: "Guatemala" },
  { code: "GN", flag: "🇬🇳", fr: "Guinée",                         en: "Guinea" },
  { code: "GW", flag: "🇬🇼", fr: "Guinée-Bissau",                  en: "Guinea-Bissau" },
  { code: "GQ", flag: "🇬🇶", fr: "Guinée équatoriale",             en: "Equatorial Guinea" },
  { code: "GY", flag: "🇬🇾", fr: "Guyana",                         en: "Guyana" },
  { code: "HT", flag: "🇭🇹", fr: "Haïti",                          en: "Haiti" },
  { code: "HN", flag: "🇭🇳", fr: "Honduras",                       en: "Honduras" },
  { code: "HU", flag: "🇭🇺", fr: "Hongrie",                        en: "Hungary" },
  { code: "IN", flag: "🇮🇳", fr: "Inde",                           en: "India" },
  { code: "ID", flag: "🇮🇩", fr: "Indonésie",                      en: "Indonesia" },
  { code: "IQ", flag: "🇮🇶", fr: "Irak",                           en: "Iraq" },
  { code: "IR", flag: "🇮🇷", fr: "Iran",                           en: "Iran" },
  { code: "IE", flag: "🇮🇪", fr: "Irlande",                        en: "Ireland" },
  { code: "IS", flag: "🇮🇸", fr: "Islande",                        en: "Iceland" },
  { code: "IL", flag: "🇮🇱", fr: "Israël",                         en: "Israel" },
  { code: "IT", flag: "🇮🇹", fr: "Italie",                         en: "Italy" },
  { code: "JM", flag: "🇯🇲", fr: "Jamaïque",                       en: "Jamaica" },
  { code: "JP", flag: "🇯🇵", fr: "Japon",                          en: "Japan" },
  { code: "JO", flag: "🇯🇴", fr: "Jordanie",                       en: "Jordan" },
  { code: "KZ", flag: "🇰🇿", fr: "Kazakhstan",                     en: "Kazakhstan" },
  { code: "KE", flag: "🇰🇪", fr: "Kenya",                          en: "Kenya" },
  { code: "KG", flag: "🇰🇬", fr: "Kirghizistan",                   en: "Kyrgyzstan" },
  { code: "KI", flag: "🇰🇮", fr: "Kiribati",                       en: "Kiribati" },
  { code: "KW", flag: "🇰🇼", fr: "Koweït",                         en: "Kuwait" },
  { code: "LA", flag: "🇱🇦", fr: "Laos",                           en: "Laos" },
  { code: "LS", flag: "🇱🇸", fr: "Lesotho",                        en: "Lesotho" },
  { code: "LV", flag: "🇱🇻", fr: "Lettonie",                       en: "Latvia" },
  { code: "LB", flag: "🇱🇧", fr: "Liban",                          en: "Lebanon" },
  { code: "LR", flag: "🇱🇷", fr: "Libéria",                        en: "Liberia" },
  { code: "LY", flag: "🇱🇾", fr: "Libye",                          en: "Libya" },
  { code: "LI", flag: "🇱🇮", fr: "Liechtenstein",                  en: "Liechtenstein" },
  { code: "LT", flag: "🇱🇹", fr: "Lituanie",                       en: "Lithuania" },
  { code: "LU", flag: "🇱🇺", fr: "Luxembourg",                     en: "Luxembourg" },
  { code: "MK", flag: "🇲🇰", fr: "Macédoine du Nord",              en: "North Macedonia" },
  { code: "MG", flag: "🇲🇬", fr: "Madagascar",                     en: "Madagascar" },
  { code: "MY", flag: "🇲🇾", fr: "Malaisie",                       en: "Malaysia" },
  { code: "MW", flag: "🇲🇼", fr: "Malawi",                         en: "Malawi" },
  { code: "MV", flag: "🇲🇻", fr: "Maldives",                       en: "Maldives" },
  { code: "ML", flag: "🇲🇱", fr: "Mali",                           en: "Mali" },
  { code: "MT", flag: "🇲🇹", fr: "Malte",                          en: "Malta" },
  { code: "MA", flag: "🇲🇦", fr: "Maroc",                          en: "Morocco" },
  { code: "MH", flag: "🇲🇭", fr: "Marshall (Îles)",                en: "Marshall Islands" },
  { code: "MU", flag: "🇲🇺", fr: "Maurice",                        en: "Mauritius" },
  { code: "MR", flag: "🇲🇷", fr: "Mauritanie",                     en: "Mauritania" },
  { code: "MX", flag: "🇲🇽", fr: "Mexique",                        en: "Mexico" },
  { code: "FM", flag: "🇫🇲", fr: "Micronésie",                     en: "Micronesia" },
  { code: "MD", flag: "🇲🇩", fr: "Moldavie",                       en: "Moldova" },
  { code: "MC", flag: "🇲🇨", fr: "Monaco",                         en: "Monaco" },
  { code: "MN", flag: "🇲🇳", fr: "Mongolie",                       en: "Mongolia" },
  { code: "ME", flag: "🇲🇪", fr: "Monténégro",                     en: "Montenegro" },
  { code: "MZ", flag: "🇲🇿", fr: "Mozambique",                     en: "Mozambique" },
  { code: "NA", flag: "🇳🇦", fr: "Namibie",                        en: "Namibia" },
  { code: "NR", flag: "🇳🇷", fr: "Nauru",                          en: "Nauru" },
  { code: "NP", flag: "🇳🇵", fr: "Népal",                          en: "Nepal" },
  { code: "NI", flag: "🇳🇮", fr: "Nicaragua",                      en: "Nicaragua" },
  { code: "NE", flag: "🇳🇪", fr: "Niger",                          en: "Niger" },
  { code: "NG", flag: "🇳🇬", fr: "Nigeria",                        en: "Nigeria" },
  { code: "NO", flag: "🇳🇴", fr: "Norvège",                        en: "Norway" },
  { code: "NZ", flag: "🇳🇿", fr: "Nouvelle-Zélande",               en: "New Zealand" },
  { code: "OM", flag: "🇴🇲", fr: "Oman",                           en: "Oman" },
  { code: "UG", flag: "🇺🇬", fr: "Ouganda",                        en: "Uganda" },
  { code: "UZ", flag: "🇺🇿", fr: "Ouzbékistan",                    en: "Uzbekistan" },
  { code: "PK", flag: "🇵🇰", fr: "Pakistan",                       en: "Pakistan" },
  { code: "PW", flag: "🇵🇼", fr: "Palaos",                         en: "Palau" },
  { code: "PA", flag: "🇵🇦", fr: "Panama",                         en: "Panama" },
  { code: "PG", flag: "🇵🇬", fr: "Papouasie-Nouvelle-Guinée",      en: "Papua New Guinea" },
  { code: "PY", flag: "🇵🇾", fr: "Paraguay",                       en: "Paraguay" },
  { code: "NL", flag: "🇳🇱", fr: "Pays-Bas",                       en: "Netherlands" },
  { code: "PE", flag: "🇵🇪", fr: "Pérou",                          en: "Peru" },
  { code: "PH", flag: "🇵🇭", fr: "Philippines",                    en: "Philippines" },
  { code: "PL", flag: "🇵🇱", fr: "Pologne",                        en: "Poland" },
  { code: "PT", flag: "🇵🇹", fr: "Portugal",                       en: "Portugal" },
  { code: "QA", flag: "🇶🇦", fr: "Qatar",                          en: "Qatar" },
  { code: "RO", flag: "🇷🇴", fr: "Roumanie",                       en: "Romania" },
  { code: "GB", flag: "🇬🇧", fr: "Royaume-Uni",                    en: "United Kingdom" },
  { code: "RU", flag: "🇷🇺", fr: "Russie",                         en: "Russia" },
  { code: "RW", flag: "🇷🇼", fr: "Rwanda",                         en: "Rwanda" },
  { code: "KN", flag: "🇰🇳", fr: "Saint-Kitts-et-Nevis",           en: "Saint Kitts and Nevis" },
  { code: "LC", flag: "🇱🇨", fr: "Sainte-Lucie",                   en: "Saint Lucia" },
  { code: "VC", flag: "🇻🇨", fr: "Saint-Vincent-et-les-Grenadines",en: "Saint Vincent and the Grenadines" },
  { code: "SB", flag: "🇸🇧", fr: "Salomon (Îles)",                 en: "Solomon Islands" },
  { code: "SV", flag: "🇸🇻", fr: "Salvador",                       en: "El Salvador" },
  { code: "WS", flag: "🇼🇸", fr: "Samoa",                          en: "Samoa" },
  { code: "ST", flag: "🇸🇹", fr: "São Tomé-et-Príncipe",           en: "São Tomé and Príncipe" },
  { code: "SN", flag: "🇸🇳", fr: "Sénégal",                        en: "Senegal" },
  { code: "RS", flag: "🇷🇸", fr: "Serbie",                         en: "Serbia" },
  { code: "SC", flag: "🇸🇨", fr: "Seychelles",                     en: "Seychelles" },
  { code: "SL", flag: "🇸🇱", fr: "Sierra Leone",                   en: "Sierra Leone" },
  { code: "SG", flag: "🇸🇬", fr: "Singapour",                      en: "Singapore" },
  { code: "SK", flag: "🇸🇰", fr: "Slovaquie",                      en: "Slovakia" },
  { code: "SI", flag: "🇸🇮", fr: "Slovénie",                       en: "Slovenia" },
  { code: "SO", flag: "🇸🇴", fr: "Somalie",                        en: "Somalia" },
  { code: "SD", flag: "🇸🇩", fr: "Soudan",                         en: "Sudan" },
  { code: "SS", flag: "🇸🇸", fr: "Soudan du Sud",                  en: "South Sudan" },
  { code: "LK", flag: "🇱🇰", fr: "Sri Lanka",                      en: "Sri Lanka" },
  { code: "SE", flag: "🇸🇪", fr: "Suède",                          en: "Sweden" },
  { code: "CH", flag: "🇨🇭", fr: "Suisse",                         en: "Switzerland" },
  { code: "SR", flag: "🇸🇷", fr: "Suriname",                       en: "Suriname" },
  { code: "SY", flag: "🇸🇾", fr: "Syrie",                          en: "Syria" },
  { code: "TJ", flag: "🇹🇯", fr: "Tadjikistan",                    en: "Tajikistan" },
  { code: "TZ", flag: "🇹🇿", fr: "Tanzanie",                       en: "Tanzania" },
  { code: "TD", flag: "🇹🇩", fr: "Tchad",                          en: "Chad" },
  { code: "CZ", flag: "🇨🇿", fr: "Tchéquie",                       en: "Czech Republic" },
  { code: "TH", flag: "🇹🇭", fr: "Thaïlande",                      en: "Thailand" },
  { code: "TL", flag: "🇹🇱", fr: "Timor-Leste",                    en: "Timor-Leste" },
  { code: "TG", flag: "🇹🇬", fr: "Togo",                           en: "Togo" },
  { code: "TO", flag: "🇹🇴", fr: "Tonga",                          en: "Tonga" },
  { code: "TT", flag: "🇹🇹", fr: "Trinité-et-Tobago",              en: "Trinidad and Tobago" },
  { code: "TN", flag: "🇹🇳", fr: "Tunisie",                        en: "Tunisia" },
  { code: "TM", flag: "🇹🇲", fr: "Turkménistan",                   en: "Turkmenistan" },
  { code: "TR", flag: "🇹🇷", fr: "Turquie",                        en: "Turkey" },
  { code: "TV", flag: "🇹🇻", fr: "Tuvalu",                         en: "Tuvalu" },
  { code: "UA", flag: "🇺🇦", fr: "Ukraine",                        en: "Ukraine" },
  { code: "UY", flag: "🇺🇾", fr: "Uruguay",                        en: "Uruguay" },
  { code: "VU", flag: "🇻🇺", fr: "Vanuatu",                        en: "Vanuatu" },
  { code: "VE", flag: "🇻🇪", fr: "Venezuela",                      en: "Venezuela" },
  { code: "VN", flag: "🇻🇳", fr: "Vietnam",                        en: "Vietnam" },
  { code: "YE", flag: "🇾🇪", fr: "Yémen",                          en: "Yemen" },
  { code: "ZM", flag: "🇿🇲", fr: "Zambie",                         en: "Zambia" },
  { code: "ZW", flag: "🇿🇼", fr: "Zimbabwe",                       en: "Zimbabwe" },
  { code: "CI", flag: "🇨🇮", fr: "Côte d'Ivoire",                  en: "Ivory Coast" },
  { code: "US", flag: "🇺🇸", fr: "États-Unis",                     en: "United States" },
];

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  lang: "fr" | "en";
  placeholder?: string;
  error?: boolean;
}

export function CountrySelect({ value, onChange, lang, placeholder, error }: CountrySelectProps) {
  const [open, setOpen] = useState(false);

  const selected = COUNTRIES.find(c => c[lang] === value);

  const displayPlaceholder = placeholder ?? (lang === "fr" ? "— Choisir un pays —" : "— Select a country —");
  const searchPlaceholder = lang === "fr" ? "Rechercher un pays…" : "Search a country…";
  const emptyText = lang === "fr" ? "Aucun pays trouvé." : "No country found.";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full h-12 justify-between font-normal bg-gray-50 hover:bg-gray-100 px-3",
            error && "border-red-500 focus:ring-red-500",
            !value && "text-muted-foreground"
          )}
        >
          <span className="flex items-center gap-2 truncate">
            {selected ? (
              <>
                <span className="text-xl leading-none">{selected.flag}</span>
                <span>{selected[lang]}</span>
              </>
            ) : (
              <span className="text-muted-foreground">{displayPlaceholder}</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-10" />
          <CommandList className="max-h-64">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {COUNTRIES.map(country => (
                <CommandItem
                  key={country.code}
                  value={`${country.fr} ${country.en}`}
                  onSelect={() => {
                    onChange(country[lang]);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-xl leading-none">{country.flag}</span>
                  <span>{country[lang]}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === country[lang] ? "opacity-100 text-green-600" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
