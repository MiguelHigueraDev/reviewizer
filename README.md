# Reviewizer

Steam review summarizer built with NextJS, TypeScript + Google Generative AI (Gemini)

![Reviewizer screenshot](/github/reviewizer.png)

## How it works

- It searches Steam games by scraping their store page (only visible games work)
- After the user selects up to **3** games and requests reviews, the application fetches reviews from Steam's review endpoint
- The reviews are sent to the Gemini API and JSON is returned in a format that's then parsed by the application and displayed

## Live demo

https://reviewizer.vercel.app

## Contributions

Feel free to open an issue or submit a PR if you have a suggestion/new feature to add!