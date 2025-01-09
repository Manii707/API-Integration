'use server'
export async function generateLandingPage(title: string, description: string, callToAction: string) {
  const landingPageHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        .cta { background: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${description}</p>
      <a href="#" class="cta">${callToAction}</a>
    </body>
    </html>  `
  return { success: true, landingPageHTML }
}
