# Wear Jane.M domain launch

## Brand system

- **Business and Google Business Profile name:** Jane.M Atelier
- **Customer-facing expression:** Wear Jane.M
- **Primary website:** https://wearjanem.com
- **Legacy GitHub Pages address:** https://sargont.github.io/JaneM/

Jane.M Atelier remains the business name. `wearjanem.com` is the memorable public address and “Wear Jane.M” is the campaign expression. Do not rename the Google Business Profile to the domain name; Google expects the real-world business name.

## GitHub Pages

This repository deploys `JaneM_Website/CNAME` with the value `wearjanem.com`. After this change is published, configure the repository’s GitHub Pages custom domain as `wearjanem.com` and enable **Enforce HTTPS** once GitHub has issued the certificate.

## Namecheap DNS

Use Namecheap BasicDNS and remove any conflicting records before adding the following records for the apex domain:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `sargont.github.io` |

Do not create a CNAME record for `@` in Namecheap BasicDNS. DNS and certificate issuance can take time to propagate.

## Google Business Profile

After `https://wearjanem.com` opens correctly, update the Website field to that address. Keep the profile name as **Jane.M Atelier**.

Suggested description:

> Jane.M Atelier is a Maseru-based made-to-measure womenswear studio founded by fashion designer Liteboho Mokhethi. Wear Jane.M for custom graduation dresses, wedding dresses, corsetry, bridesmaid dresses and evening gowns. Consultations are available by appointment in Maseru and remotely for South African clients; travel may be considered for larger projects. Explore the collection, begin a consultation and discover JaneM TV.

## Search Console

After the domain resolves and HTTPS is enabled:

1. Add `https://wearjanem.com/` as a URL-prefix property in Google Search Console.
2. Submit `https://wearjanem.com/sitemap.xml`.
3. Inspect and request indexing for the home page, wedding-dresses page and graduation-dresses page.
4. Keep the existing GitHub Pages property during migration so Google can observe the new canonical URLs and redirects.

## Social and messaging touchpoints

Use the same identity everywhere: **Jane.M Atelier** is the business name; **Wear Jane.M** is the invitation and campaign line; `wearjanem.com` is the one website link.

| Touchpoint | Name or headline | Website / bio copy |
|---|---|---|
| Facebook | **Jane.M Atelier** | Made-to-measure womenswear in Maseru. Wedding, graduation, corsetry and occasion dressing. Consultations in Lesotho and remotely for South Africa. **Wear Jane.M** · wearjanem.com |
| Instagram | Display name: **Jane.M Atelier \| Wear Jane.M** | Made-to-measure fashion · Maseru, Lesotho<br>Wedding · graduation · corsetry · occasion<br>Consultations by appointment + remotely 🇱🇸 🇿🇦<br>↓ wearjanem.com |
| YouTube / JaneM TV | **JaneM TV by Jane.M Atelier** | Fashion, corsetry and design education from Liteboho Mokhethi. Explore the atelier and book a consultation at wearjanem.com. |
| WhatsApp Business | **Jane.M Atelier** | Welcome to Jane.M Atelier. Share your occasion, date, preferred style and budget, or browse wearjanem.com to begin. |
| Google Business Profile | **Jane.M Atelier** (only if this is the business name used on signage and client-facing materials) | Use the suggested Google description above and set the Website field to `https://wearjanem.com`. |

Do not replace old social usernames just to match the domain. Keep established handles where changing them would lose recognition, then update the display name, bio and one website link.
