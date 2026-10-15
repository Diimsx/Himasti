/**
 * Official organization contact links, read from src/content/settings.json (editable via CMS).
 * Empty values are dropped so the UI never renders a dead link.
 */
import settings from '../content/settings.json';

export interface ContactLink {
  name: 'instagram' | 'linkedin' | 'email';
  label: string;
  href: string;
}

export function getContactLinks(): ContactLink[] {
  const links: ContactLink[] = [];
  if (settings.instagram) links.push({ name: 'instagram', label: 'Instagram HIMASTI', href: settings.instagram });
  if (settings.linkedin) links.push({ name: 'linkedin', label: 'LinkedIn HIMASTI', href: settings.linkedin });
  if (settings.email) links.push({ name: 'email', label: 'Email HIMASTI', href: `mailto:${settings.email}` });
  return links;
}

export const contactEmail: string = settings.email ?? '';
