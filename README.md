# Compifly
![complify-cover](https://user-images.githubusercontent.com/58589519/182483686-bc46ea7a-418e-461d-80d8-7364593ef8f7.jpg)

Compifly is an app that allows users to create a profile and showcase their **competitive ratings / titles / stars using badges**, users can see others profile and their **ratings on different cp websites**, they can add others as friends and see **rankings among their friends**.

## Tech/Library/Framework/Tools/APIs
#### Frontend
- Made with [Next.js](https://nextjs.org/)
- Written in [Typescript](https://www.typescriptlang.org/)
- Styled with [Tailwindcss](https://tailwindcss.com/), using components from [Chakra UI](https://chakra-ui.com/)
- [Axios](https://www.npmjs.com/package/axios) as API Request client

#### Backend
- [Firebase](https://firebase.google.com/) for backend (Auth, Cloud Firestore Database, Storage)

#### REST API
- [Competitive_Programming_Score_API](https://github.com/Abhijeet-AR/Competitive_Programming_Score_API) to fetch users ratings.


## Run the development server

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
