/**
 * Shared Image Assets Resolver for Ayelin Boutique
 * Guarantees high-resolution asset paths that work in Vite development
 * and production static deployments on Cloud Run / CDN.
 */

export const IMAGES = {
  logo: '/assets/images/ayelin_boutiq_logo_c4a85613.jpg',
  dressHero: '/assets/images/dress_1_70648e46.jpg',
  
  // Atelier & Tailoring Craft
  atelierTailor: '/assets/images/atelier_tailoring_craft_1793981346137.jpg',
  craftDraping: '/assets/images/craft_silhouette_drape_1793985795807.jpg',
  craftMeasurements: '/assets/images/craft_measurements_1793985764885.jpg',
  craftStencil: '/assets/images/craft_stencil_tracing_1793985811593.jpg',
  craftAari: '/assets/images/craft_aari_embroidery_1793985779595.jpg',
  craftAssembly: '/assets/images/craft_couture_assembly_1793985830549.jpg',

  // Haute Couture Collections
  bridalBlouse: '/assets/images/bridal_blouse_embroidery_1793981342674.jpg',
  bridalLehenga: '/assets/images/luxury_bridal_lehenga_1793981343801.jpg',
  anarkali: '/assets/images/designer_ethnic_anarkali_1793981344315.jpg',
  motherDaughter: '/assets/images/mother_daughter_couture_1793981346242.jpg',
} as const;

/**
 * Handle image fallback in case a path fails to load
 */
export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc?: string) {
  const target = e.currentTarget;
  const currentSrc = target.getAttribute('src') || '';
  
  // If it failed from /assets/images, try /images/
  if (currentSrc.startsWith('/assets/images/')) {
    target.src = currentSrc.replace('/assets/images/', '/images/');
    return;
  }
  
  // If it failed from /assets/aistudio, try /assets/images/
  if (currentSrc.startsWith('/assets/aistudio/')) {
    target.src = currentSrc.replace('/assets/aistudio/', '/assets/images/');
    return;
  }

  // Fallback to designated image or hero gown
  if (fallbackSrc) {
    target.src = fallbackSrc;
  } else {
    target.src = IMAGES.dressHero;
  }
}
