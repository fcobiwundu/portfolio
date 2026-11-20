# FCOBIWUNDU Portfolio

A responsive, multi-page professional portfolio for Festus Chinedu Obiwundu.

## Included

- Home, About, Expertise, Experience, Projects, Resume and Contact pages.
- Individual Mevapay and Navirado Services project case studies.
- Light and dark themes using the agreed colour palette.
- Theme preference saved in local storage, with system preference used on first visit.
- Responsive navigation with a CSS-free, inline SVG menu control.
- Project category filters.
- Accessible contact form with client-side and server-side validation.
- Express contact endpoint with rate limiting and a honeypot field.
- Nodemailer SMTP delivery, activated after credentials are supplied.
- SEO metadata, 404 page, robots file and sitemap setup instructions.
- Optional Sanity schema foundation for projects and certifications.

## Design system

### Light theme

| Token | Value |
|---|---|
| Background | `#FCFCFC` |
| Main text | `#1A1A1A` |
| Secondary text | `#666666` |
| Blue accent | `#2563EB` |
| Cards | `#FFFFFF` |
| Borders | `#E5E5E5` |

### Dark theme

| Token | Value |
|---|---|
| Background | `#0D0D0D` |
| Main text | `#F2F2F2` |
| Secondary text | `#A1A1AA` |
| Blue accent | `#60A5FA` |
| Cards | `#161616` |
| Borders | `#333333` |

No icon library is used. Theme and navigation icons are inline SVG. The design uses no italic text and no em dash punctuation.

## Requirements

- Node.js 18 or later.
- npm.
- SMTP credentials for live contact form delivery.
- Optional Sanity project and dataset if you want CMS editing.

## Run locally

1. Extract the project folder.
2. Open a terminal in the project directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env`.
5. Add the SMTP settings described below.
6. Start the server:

   ```bash
   npm start
   ```

7. Open `http://localhost:3000`.

For development with automatic server restarts:

```bash
npm run dev
```

Check JavaScript syntax:

```bash
npm run check
```

## Contact form configuration

The form does not pretend to send messages when email delivery is not configured. It returns a clear error and provides the direct email address.

Set these values in `.env`:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
CONTACT_FROM=
CONTACT_TO=fcobiwundu@gmail.com
```

Use the SMTP server and credentials provided by your email host. For port 465, set `SMTP_SECURE=true`. For port 587, the usual setting is `SMTP_SECURE=false` with STARTTLS.

Keep `.env` private. Never commit it to GitHub. Restart the server after changing environment variables.

Test the form locally and confirm that a real message arrives at the recipient inbox before publishing.

## Add your real profile photograph

The supplied image attachments in this conversation were document scans, not usable profile photographs or portfolio project screenshots. No unrelated scan has been used as a portrait.

1. Create `assets/images/`.
2. Add your selected professional portrait as `assets/images/profile.jpg`.
3. Replace the portrait placeholder in `index.html` and the About page with an image element using that file.
4. Use a well-lit, high-resolution image and provide meaningful alt text.

The current hero uses an honest FCO monogram placeholder rather than an invented or stock portrait.

## Add real project screenshots

Add genuine screenshots to `assets/images/projects/` and update the project visual blocks when the screenshots are available. The current project covers are typographic CSS treatments, not fabricated screenshots.

Do not add client information, credentials or private data to public screenshots.

## Add your CV PDF

Place the approved, real PDF at:

`resume/Festus-Chinedu-Obiwundu-CV.pdf`

The Resume page links to this exact path. The file was not supplied with the current materials, so no empty or fabricated PDF has been created. After adding the file, verify both the embedded viewer and download link.

## Optional Sanity CMS

The `sanity/` folder contains schemas for projects and certifications and a configuration example. Read `sanity/README.md` before connecting it.

A live Sanity project has not been created or connected because its project ID and dataset must come from your account. The portfolio continues to work with its static project content. The optional server endpoint `/api/content/projects` reads published project records once Sanity is configured.

Do not expose private Sanity tokens in frontend code.

## Deployment

The site includes an Express server, so deploy it to a Node.js-capable host or VPS.

1. Upload the project folder.
2. Install dependencies with `npm install`.
3. Configure the production environment variables.
4. Run `npm start` using the hosting provider's Node.js application manager or process manager.
5. Configure the domain to point to the Node.js application.
6. Enable HTTPS.
7. Test every page directly, the contact form, the theme switch and mobile navigation.
8. Add the CV and genuine images before announcing the site.

For a shared cPanel Node.js host, configure the Node.js application root to this folder, select Node.js 18 or later, run the install command and set the startup file to `server.js`. Follow the host's specific instructions for environment variables and application restarts.

## Sitemap and domain

The domain for this portfolio was not provided. Do not publish a guessed canonical URL.

After choosing the final domain, replace the placeholder origin in `sitemap.xml` with the real HTTPS domain and update the sitemap reference in `robots.txt`. Then submit the sitemap in Google Search Console.

## Final pre-publication checklist

- [ ] Add and test the real profile photograph.
- [ ] Add genuine screenshots for projects where available.
- [ ] Add the approved CV PDF.
- [ ] Verify all project descriptions against the current repositories and live sites.
- [ ] Configure SMTP and test actual message delivery.
- [ ] Decide whether to connect Sanity CMS.
- [ ] Set the final domain in the sitemap and SEO configuration.
- [ ] Test the site on mobile, tablet and desktop.
- [ ] Test keyboard navigation and reduced-motion settings.
- [ ] Test all external links and social profiles.
- [ ] Confirm HTTPS and production environment settings.
