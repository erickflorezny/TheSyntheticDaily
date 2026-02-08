/**
 * Utility functions for generating and working with URL slugs
 */

/**
 * Generates a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim() // Trim whitespace
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generates a unique slug with a numeric suffix if needed
 * @param text - The text to convert to a slug
 * @param existingSlugs - Array of existing slugs to check for uniqueness
 * @returns A unique URL-friendly slug
 */
export function generateUniqueSlug(text: string, existingSlugs: string[]): string {
  const baseSlug = generateSlug(text);
  let slug = baseSlug;
  let counter = 1;
  
  // Check if slug already exists and add numeric suffix if needed
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

/**
 * Extracts the ID from a slug (for backward compatibility)
 * @param slug - The slug to extract ID from
 * @returns The numeric ID if present, null otherwise
 */
export function extractIdFromSlug(slug: string): number | null {
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Validates if a string is a valid slug
 * @param slug - The slug to validate
 * @returns True if valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}