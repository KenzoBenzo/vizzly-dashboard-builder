This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Other technologies used: [Chakra-ui](https://chakra-ui.com/) + [Saas-ui](https://saas-ui.dev/), and [Recharts](https://recharts.org/en-US).

## Local development

First install dependencies and then run the development server with:

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Hosted project

Open [https://vizzly-dashboard-builder.vercel.app/](https://vizzly-dashboard-builder.vercel.app/) in your desktop browser.

## Notes on the project

For original tech choices, Nextjs and TypeScript are no-brainer choices that I kept. However I feel that Recharts is more composable than Chart.js. I'm also faster in Chakra than Tailwind and due to this being an MVP, makes the most sense to work with.

#### Recharts vs Chart.js

In the short run, Chart.js would have been a faster choice with it's built in timeseries plugins, however Recharts has a few positives that I think make it a better choice for this MVP.

- Recharts is more composable, allowing for more flexibility in the future and cleaner code.
- Recharts has more advanced charts (first class support, plugins/extensions there are more for chart.js)
- Recharts is built with SVG and therefore is more performant than Chart.js using Canvas
- Recharts accepts data in a way that APIs will typically deliver data in the first place (an array of objects), unlike chart.js' bespoke structure

#### Chakra ui/Saas ui vs Tailwind

This is a personal preference, I'm more familiar with Chakra and Saas ui and I feel that they are faster to develop with than Tailwind because they are component libraries rather than styling only.

### General

My perspective on an MVP: "what is the minimum that provides value to a certain cohort of users and makes them want to use it". Also sometimes reffered to as an MLP — most loveable product. For a dashboard builder to provide value, I think many things not included in this task are still needed (as well as some things that I was unable to get to in the time period). Thinking on paper, those things would be:

- For this to be a true MVP, persistence of data would need to be a real consideration. The components are set up to where this would be relatively easy to implement.
- Being able to upload your own data as a user would be necessary to use this.
- Bundling for external embedding. This is a multi-step todo that would include changeing the dashboard to having an edit mode and a view mode. Then we'd also need to build in a concept of what is being passed through, either by some form of authentication of who this is or maybe a copiable string that has the data needed in query params. Choosing a bundler (I'd look at either tsup or rollup.js) and then distributing via NPM.

Details that effect the user experience that need to be prioritized:

- Aggregate functions need to be implemented for the measure and dimensions as well as timeseries handles.
- The ability to add multiple measures and dimensions to a chart.

## Closing

Overall, this was a fun project to build. I can really empathize with the importance of deciding what's important to expose in customizability.
