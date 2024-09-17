declare module 'virtual:remix/server-build' {
  import { type ServerBuild } from '@remix-run/node'
  export const routes: ServerBuild['routes']
}
