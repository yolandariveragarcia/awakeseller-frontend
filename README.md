
## Features
- ⚡️ Next.js 13
- ⚛️ React 18
- ✨ Styled Components - CssInJs for component styling
- 📏 ESLint — To find and fix problems in your code


## Quick Start

The best way to start with this template is using [Create Next App](https://nextjs.org/docs/api-reference/create-next-app).

```
# yarn
yarn create next-app -e https://github.com/yolandariveragarcia/awakeseller-frontend
# npm
npx create-next-app -e https://github.com/yolandariveragarcia/awakeseller-frontend
```

### Development

To start the project locally, run:

```bash
  npm dev
  our
  yarn dev
```

Open `http://localhost:3000` with your browser to see the result.


### Requirements

- Node.js >= 18.02.0
- npm our yarn

### Directory Structure

- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.<br>

### Scripts
- `yarn/npm dev` — Starts the application in development mode at `http://localhost:3000`.
- `yarn/npm build` — Creates an optimized production build of your application.
- `yarn/npm start` — Starts the application in production mode.
- `yarn/npm lint` — Runs ESLint for all files in the `src` directory.

### SSl
- `npx local-ssl-proxy --source 3001 --target 3000` - Iniciar proxy HTTP SSL para desarrollo en local 

### Path Mapping

```jsx
import { Button } from '~/presentation/components/Button';
// To import images or other files from the public folder
import avatar from '~/public/avatar.png';
```


<a id="license"></a>

## License

[MIT](https://github.com/yolandariveragarcia/awakeseller-frontend/blob/main/LICENSE) © [Yolanda Rivera](https://www.linkedin.com/in/yolandariveragarcia/)

