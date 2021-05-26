import cheerio from 'cheerio'
import Response from '@layer0/core/router/Response'
import Request from '@layer0/core/router/Request'
import { injectBrowserScript } from '@layer0/starter'

export default function transform(response: Response, request: Request) {
  // inject browser.ts into the document returned from the origin
  injectBrowserScript(response)

  if (response.body) {
    const $ = cheerio.load(response.body)
    // console.log("Transform script running on '"+response.req.originalUrl+"'") // for testing

    // Those 2 scripts are added using server side transformation just for Proof of Concept purposes.
    // For production those 2 scripts should be included in original website base code.
    $('head').append(`
      <script src="/__layer0__/cache-manifest.js" defer="defer"></script>
      <script src="/main.js" defer="defer"></script>
    `)

    // Relativise links
    $('a[href^="https://www.foxnews.com"]').map((i, el) => {
      var link = $(el).attr('href') || '';
      $(el).attr('href', link.replace('https://www.foxnews.com/', '/'));
    })

    $('img[src^="https://a57.foxnews.com"]').map((i, el) => {
      var currentSrc = $(el).attr('src') || '';
      var newSrc = currentSrc.replace('https://a57.foxnews.com/', '/l0-images/')
      $(el).attr('src', newSrc)
    })

    $('script:contains("window.__NUXT__")').map((i, el) => {
      var currentScriptContent = $(el).html() || '';
      var newScriptContent = currentScriptContent.replace(/https:\\u002F\\u002Fa57.foxnews.com\u002F/g, '\u002Fl0-images\u002F')
      $(el).html('newScriptContent')
    })

    response.body = $.html()
    // .replace(/https:\/\/a57\.foxnews\.com\//g, '/l0-images/')
    // .replace(/https:\\u002F\\u002Fa57.foxnews.com/g, '/l0-images/')


  }
}
