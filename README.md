# Compifly
![complify-cover](https://user-images.githubusercontent.com/58589519/182483686-bc46ea7a-418e-461d-80d8-7364593ef8f7.jpg)

Compifly is an app that allows users to create a profile and showcase their **competitive ratings / titles / stars using badges**, users can see others profile and their **ratings on different cp websites**, they can add others as friends and see **rankings among their friends**.

## Screenshots
![Screenshot from 2022-08-03 04-17-09](https://user-images.githubusercontent.com/58589519/182632798-5cf2d354-ff20-4e95-a165-bcdffc5ae772.png)
![Screenshot from 2022-08-03 04-18-17](https://user-images.githubusercontent.com/58589519/182632820-003ac992-3cb6-4d2b-88d5-0c421d433cd2.png)
![Screenshot from 2022-08-03 04-22-50](https://user-images.githubusercontent.com/58589519/182632828-50570ebd-2fe6-4add-82e5-3fdbf7b1b9a3.png)
![Screenshot from 2022-08-03 04-23-41](https://user-images.githubusercontent.com/58589519/182632833-6b2fa74c-0ce3-4235-8ac8-225a0d19ea4e.png)
![Screenshot from 2022-08-03 19-51-21](https://user-images.githubusercontent.com/58589519/182632838-bca2d27f-6e5c-4088-867e-3c6b87271ab1.png)
![Screenshot from 2022-08-03 19-57-00](https://user-images.githubusercontent.com/58589519/182633918-0fe8b314-8396-4446-91e8-b29a6b5becdc.png)
![Screenshot from 2022-08-03 19-57-41](https://user-images.githubusercontent.com/58589519/182633925-4c1d168c-d244-46b7-98b7-9c3a01325fd6.png)
![Screenshot from 2022-08-03 19-58-08](https://user-images.githubusercontent.com/58589519/182633931-ef821ca2-b8f9-4ab6-b3bb-aed9d5ebbb5f.png)


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
