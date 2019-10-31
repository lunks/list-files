import Hapi from '@hapi/hapi'
import klaw from 'klaw'

const PORT = process.env.PORT || 3000
const BASE_PATH = process.env.BASE_PATH || '/tmp/files'
const BASE_URL = process.env.BASE_URL || 'http://localhost/'

const init = async () => {
  const server = Hapi.server({
    port: PORT
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: async () => {
      const items = []
      for await (const file of klaw(BASE_PATH)) {
        if (!file.stats.isDirectory()) {
          items.push({
            url:
              BASE_URL +
              file.path
                .replace(BASE_PATH, '')
                .split('/')
                .map(encodeURIComponent)
                .join('/'),
            size: file.stats.size
          })
        }
      }

      return {
        files: items
      }
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
