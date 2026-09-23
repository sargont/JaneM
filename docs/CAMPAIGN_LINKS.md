# Wear Jane.M campaign links

Use a tagged link whenever Jane.M posts a website link on a social platform, in a YouTube description, in a WhatsApp Status or in a partnership post. This allows Google Analytics to attribute visits and consultation intent to the actual channel instead of grouping them as Direct traffic.

Use lower-case values with hyphens. Never put a client name, phone number or any personal detail in a link.

## Ready-to-use examples

| Channel and purpose | Link |
| --- | --- |
| Instagram bio | `https://wearjanem.com/?utm_source=instagram&utm_medium=organic-social&utm_campaign=profile` |
| Instagram wedding post | `https://wearjanem.com/wedding-dresses-lesotho/?utm_source=instagram&utm_medium=organic-social&utm_campaign=wedding-portfolio` |
| Facebook graduation post | `https://wearjanem.com/graduation-dresses-lesotho/?utm_source=facebook&utm_medium=organic-social&utm_campaign=graduation-2026` |
| JaneM TV video description | `https://wearjanem.com/designer/?utm_source=youtube&utm_medium=organic-video&utm_campaign=janem-tv` |
| WhatsApp Status | `https://wearjanem.com/booking/?utm_source=whatsapp&utm_medium=status&utm_campaign=consultation` |
| Google Business Profile website button | `https://wearjanem.com/?utm_source=google-business-profile&utm_medium=organic-local&utm_campaign=profile` |
| Google Business Profile booking or post | `https://wearjanem.com/booking/?utm_source=google-business-profile&utm_medium=organic-local&utm_campaign=consultation` |

Use the normal clean domain, `https://wearjanem.com/`, for spoken references, print material and places where a long link looks unprofessional. Use the tagged versions where the platform lets you paste a website link and the full link will not be shown prominently to customers.

## Profile update checklist

- Google Business Profile website: `https://wearjanem.com/?utm_source=google-business-profile&utm_medium=organic-local&utm_campaign=profile`
- Google Business Profile booking/posts: `https://wearjanem.com/booking/?utm_source=google-business-profile&utm_medium=organic-local&utm_campaign=consultation`
- Instagram bio: `https://wearjanem.com/?utm_source=instagram&utm_medium=organic-social&utm_campaign=profile`
- Facebook page website: `https://wearjanem.com/?utm_source=facebook&utm_medium=organic-social&utm_campaign=profile`
- YouTube channel link: `https://wearjanem.com/designer/?utm_source=youtube&utm_medium=organic-video&utm_campaign=janem-tv`
- WhatsApp Business catalogue/profile: `https://wearjanem.com/booking/?utm_source=whatsapp&utm_medium=profile&utm_campaign=consultation`

## Event funnel to review monthly

1. `consultation_request_view` — visitor reached the booking page.
2. `consultation_request_start` — visitor began the form.
3. `consultation_request_submit` / `consultation_request_prepared` — visitor prepared the request.
4. `consultation_whatsapp_open` — visitor opened WhatsApp with the prepared request.
5. `style_studio_whatsapp_click` — visitor moved from Style Studio into WhatsApp.

Mark steps 4 and 5 as **key events** in GA4 after the next deployment. They show stronger intent than a generic page view, while still not claiming a confirmed appointment or sale.

A confirmed consultation, deposit or completed order must be recorded in the workflow system rather than inferred from a website click.
