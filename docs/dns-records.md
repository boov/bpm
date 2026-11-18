# DNS records for launch

Action for someone with access to the domain at [34SP.com](https://www.34sp.com), where `belgarum-property.co.uk` is registered and its DNS is hosted (nameservers `ns.34sp.com` and `ns2.34sp.com`). This cannot be done from the codebase.

The Netlify site `belgarum-pm` already has `www.belgarum-property.co.uk` as its primary domain, and Netlify redirects `belgarum-property.co.uk` to it.

## Remove

| Type | Host  | Value            |
| ---- | ----- | ---------------- |
| A    | `@`   | `176.58.100.173` |
| A    | `www` | `176.58.100.173` |

These point to the old site. Remove the `www` A record before you add the CNAME, because a host cannot have both.

## Add

| Type  | Host  | Value                                                                  | Purpose                      |
| ----- | ----- | ---------------------------------------------------------------------- | ---------------------------- |
| A     | `@`   | `75.2.60.5`                                                            | Netlify load balancer (root) |
| CNAME | `www` | `belgarum-pm.netlify.app`                                              | Netlify site (primary)       |
| TXT   | `@`   | `google-site-verification=fkEHSj4uxi7_H-cGXtuqMtZnhBzxHvB6Jb3OyB_zPcg` | Google Search Console        |

Use the default TTL. Keep the TXT record after verification, because Google checks it again from time to time.

## Not affected

- **Email** uses `bpmanagement.org`, so these changes cannot affect it. `belgarum-property.co.uk` has no MX records.
- **Netlify Forms**, **Google Tag Manager** and **Fixflo** need no DNS records.

## After the change

1. Check that the records resolve:

   ```bash
   dig +short belgarum-property.co.uk A
   dig +short www.belgarum-property.co.uk CNAME
   dig +short belgarum-property.co.uk TXT
   ```

2. In Netlify, wait until both domains show as verified and the HTTPS certificate is issued, then turn on **Force HTTPS**.
3. In Google Search Console, verify the Domain property for `belgarum-property.co.uk`, then submit `https://www.belgarum-property.co.uk/sitemap-index.xml`.

If the DNS moves to Netlify DNS later, add the TXT record there before you change the nameservers, or Search Console verification will lapse.
