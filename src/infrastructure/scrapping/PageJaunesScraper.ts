import puppeteer, { Browser, Page } from 'puppeteer';
import { BatchScraper } from '../../domain/services/BatchScraper';
import { Etablissement } from '../../domain/entities/Etablissement';

export class PagesJaunesScraper implements BatchScraper {
    async scrape(keyword: string, city: string): Promise<Etablissement[]> {
       console.log("search", `${keyword}-${city}`);
         const baseUrl = `https://www.pagesjaunes.fr/recherche/${city}/${keyword}`;
         let allEtablissements: any[] = [];
       
         try {
           allEtablissements = await this.getAllEtablissements(baseUrl);
         } catch (error: any) {
           console.error('Erreur lors de la récupération des établissements:', error.message);
           throw new Error(`Impossible de récupérer les établissements : ${error.message}`);
         }
         allEtablissements = allEtablissements.slice(0,5);
         for await (let etablissement of allEtablissements) {
           try {
             const detailPage = await this.startPage('https://www.pagesjaunes.fr' + etablissement.link, 'Mozilla/5.0');
             console.log('https://www.pagesjaunes.fr' + etablissement.link);
             await this.setInformationEtablissement(detailPage, etablissement);
             await detailPage.close();
       
             if (etablissement.website) {
               console.log(`Navigating to website: ${etablissement.website}`);
               
               if (!etablissement.website.startsWith('http://') && !etablissement.website.startsWith('https://')) {
                 etablissement.website = 'https://' + etablissement.website;
               }
               try {
                 const websitePage = await this.startPage(etablissement.website, 'Mozilla/5.0');
                 const additionalInfo = await this.getAdditionalInfoFromWebsite(websitePage);
                 etablissement.email = additionalInfo.email;
                 etablissement.phone = additionalInfo.phone || etablissement.phone;
                 console.log(`email : ${etablissement.email}`);
                 console.log(`phone : ${etablissement.phone}`);
                 await websitePage.close();
               } catch (error: any) {
                 console.error(`Erreur lors de la navigation vers le site ${etablissement.website}:`, error.message);
               }
             }
       
            } catch (error: any) {
                console.error(`Erreur lors du traitement de l'établissement ${etablissement.name}:`, error.message);
            }
         }
         return allEtablissements;
    }

    async startPage(baseurl: string, userAgent: string) {
        try {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setUserAgent(userAgent);
            await page.goto(baseurl);
            return page;
        } catch (error: any) {
            console.error(`Erreur lors de l'ouverture de la page ${baseurl}:`, error.message);
            throw new Error(`Impossible de démarrer la page : ${error.message}`);
        }
    }
async getAllEtablissements(baseUrl: string): Promise<any[]> {
  let pageNumber: number = 1;
  let etablissements: any[] = [];
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const currentPageUrl: string = `${baseUrl}?page=${pageNumber}`;
      const page = await this.startPage(currentPageUrl, 'Mozilla/5.0');
      console.log(`Scraping page: ${currentPageUrl}`);
      const pageEtablissements = await this.getEtablissements(page);
      etablissements = [...etablissements, ...pageEtablissements];

      hasNextPage = await page.evaluate(() => {
        const nextButton = document.querySelector('#pagination-next');
        return nextButton !== null;
      });

      await page.close();
      pageNumber++;
    } catch (error: any) {
      console.error(`Erreur lors de la récupération des établissements à la page ${pageNumber}:`, error.message);
      hasNextPage = false;
    }
  }

  return etablissements;
}

async setInformationEtablissement(detailPage: Page, etablissement: any) {
  try {
    const details = await detailPage.evaluate(() => {
      const address = document.querySelector('#blocCoordonnees .teaser-item .noTrad')?.textContent || null;
      const phone = document.querySelector('#blocCoordonnees .coord-numero')?.textContent || null;
      const siret = (() => {
          const dts = Array.from(document.querySelectorAll('dt'));
          for (const dt of dts) {
            if (dt.textContent?.trim().toUpperCase() === 'SIRET') {
              const dd = dt.nextElementSibling;
              return dd?.querySelector('strong')?.textContent?.trim() || dd?.textContent?.trim() || null;
            }
          }
          return null;
        })();
      let website = document.querySelector('#blocCoordonnees .bloc-info-sites-reseaux .premiere-visibilite .SITE_EXTERNE .value')?.textContent || null;
      if (website === null) {
        website = document.querySelector('#blocCoordonnees .bloc-info-sites-reseaux .premiere-visibilite .SITE_ESSENTIEL .value')?.textContent || null;
      }

      return { address, phone, website, siret, siren: siret ? siret.slice(0,9) : null };
    });
    console.log(details);
    etablissement.address = details.address;
    etablissement.phone = details.phone;
    etablissement.website = details.website;
  } catch (error: any) {
    console.error(`Erreur lors de la récupération des informations de l'établissement ${etablissement.name}:`, error.message);
  }
}

async getEtablissements(page: Page) {
  try {
    return await page.evaluate(() => {
      const links: any[] = [];
      const blocs = document.querySelectorAll('.bi-generic');
      blocs.forEach(bloc => {
        const name = bloc.querySelector('.bi-denomination')?.textContent?.trim() || null;
        const link = bloc.querySelector('.bi-denomination')?.getAttribute('href') || null;
        links.push({ name, link });
      });
      return links;
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des établissements sur la page:', error.message);
    return [];
  }
}

async getAdditionalInfoFromWebsite(page: Page): Promise<{ email: string | null; phone: string | null }> {
  let info;
   const contactPaths = [
    '/',
    '/contact',
    '/contact-us',
    '/contactez-nous',
    '/nous-contacter',
    '/about',
    '/about-us',
    '/a-propos',
    '/qui-sommes-nous',
    '/mentions-legales',
    '/mentions_legales',
    '/legal',
    '/legal-notice',
    '/impressum',
    '/info',
    '/infos',
    '/coordonnees',
    '/nous-joindre',
    '/support',
    '/help',
    '/aide',
    '/service-client',
    '/customer-service',
    '/services',
    '/team',
    '/equipe',
    '/administration',
    '/bureau',
    '/office',
    '/contact-form',
    '/formulaire-contact',
    '/contacts',
    '/contactus',
    '/contact_us',
    '/contacteznous',
    '/contactez_nous'
  ];
  const baseUrl = page.url().replace(/\/$/, '');
  for await (const path of contactPaths) {
    try {
      const contactUrl = baseUrl + path;
      const contactPage = await page.browser().newPage();
      await contactPage.goto(contactUrl, { waitUntil: 'domcontentloaded', timeout: 5000 });
      info = await contactPage.evaluate(() => {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const phoneRegex = /(?:(?:\+33|0033)[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}/g;
        const bodyText = document.body.innerText;
        const email = bodyText.match(emailRegex)?.[0] || null;
        const phone = bodyText.match(phoneRegex)?.[0] || null;
        return { email, phone };
      });
      await contactPage.close();
      if (info.email && info.phone) {
        break;
      }
    } catch (error) {
      continue;
    }
    }
    return info ?? { email: null, phone: null };
  }
}